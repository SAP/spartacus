/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  inject,
  Injectable,
  Injector,
  isDevMode,
  OnDestroy,
} from '@angular/core';
import {
  CxEvent,
  EventService,
  LoggerService,
  WindowRef,
} from '@spartacus/core';
import { merge, Observable, Subscription } from 'rxjs';
import { TmsConfig } from '../config/tms-config';
import { TmsCollector } from '../model/tms.model';

/**
 * This service interacts with the configured data layer object by pushing the Spartacus events to it.
 */
@Injectable({ providedIn: 'root' })
export class TmsService implements OnDestroy {
  /**
   * Stores subscriptions to events.
   */
  protected subscription = new Subscription();

  protected logger = inject(LoggerService);

  constructor(
    protected eventsService: EventService,
    protected windowRef: WindowRef,
    protected tmsConfig: TmsConfig,
    protected injector: Injector
  ) {}

  /**
   * Called only once to start collecting and dispatching events
   */
  collect(): void {
    if (!this.windowRef.isBrowser()) {
      return;
    }

    for (const tmsCollectorConfig in this.tmsConfig.tagManager) {
      if (!this.tmsConfig.tagManager?.hasOwnProperty(tmsCollectorConfig)) {
        continue;
      }

      const collectorConfig =
        this.tmsConfig.tagManager[tmsCollectorConfig] ?? {};

      if (!collectorConfig.collector) {
        if (isDevMode()) {
          this.logger.warn(
            `Skipping the '${tmsCollectorConfig}', as the collector is not defined.`
          );
        }
        continue;
      }

      const events =
        collectorConfig.events?.map((event) => this.eventsService.get(event)) ||
        [];
      const collector = this.injector.get<TmsCollector>(
        collectorConfig.collector
      );
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      collector.init(collectorConfig, this.windowRef.nativeWindow!);

      this.subscription.add(
        this.mapEvents(events).subscribe((event) => {
          if (collectorConfig.debug) {
            this.logger.log(
              `🎤 Pushing the following event to ${tmsCollectorConfig}: `,
              event
            );
          }

          event = collector.map?.(event) ?? event;
          collector.pushEvent(
            collectorConfig,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.windowRef.nativeWindow!,
            event
          );
        })
      );
    }
  }

  /**
   * Maps the given events to an appropriate type that fits the specified TMS' structure.
   *
   * @param events - the events to map
   * @param collector - a name of the collector for which the events should be mapped
   */
  protected mapEvents<T extends CxEvent>(
    events: Observable<T>[]
  ): Observable<T> {
    return merge(...events);
  }

  /**
   * Angular's callback
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { isPlatformServer } from '@angular/common';
import {
  Inject,
  Injectable,
  Injector,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { CxEvent, EventService, WindowRef } from '@spartacus/core';
import { merge, Observable, Subscription } from 'rxjs';
import { TmsCollectorConfig, TmsConfig } from '../config/tms-config';
import { TmsMapper } from '../model/tms.model';

/**
 * This service interacts with the configured data layer object by pushing the Spartacus events to it.
 */
@Injectable({ providedIn: 'root' })
export class TmsService implements OnDestroy {
  /**
   * Stores subscriptions to events.
   */
  protected subscription = new Subscription();

  constructor(
    protected eventsService: EventService,
    protected windowRef: WindowRef,
    protected tmsConfig: TmsConfig,
    protected injector: Injector,
    @Inject(PLATFORM_ID) protected platformId: any
  ) {}

  /**
   * This method is called only once to start collecting and dispatching events to GTM
   */
  collect(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    for (const collector in this.tmsConfig.tagManager) {
      const collectorConfig = this.tmsConfig.tagManager[collector] ?? {};

      const events =
        collectorConfig.events?.map((event) => this.eventsService.get(event)) ||
        [];
      this.subscription.add(
        this.mapEvents(events, collector).subscribe((event) => {
          if (collectorConfig.debug) {
            console.log(
              `🎤 Pushing the following event to ${collector}: `,
              event
            );
          }
          if (collectorConfig.pushStrategy) {
            event = this.invokeMapper(event, collectorConfig);

            collectorConfig.pushStrategy(
              event,
              this.windowRef.nativeWindow,
              collectorConfig
            );
          }
        })
      );
    }
  }

  private invokeMapper<T extends CxEvent>(
    event: T,
    collectorConfig: TmsCollectorConfig
  ): T | any {
    if (!collectorConfig.eventMapper) {
      return event;
    }

    const mapper: TmsMapper = this.injector.get(collectorConfig.eventMapper);
    return mapper.map(event);
  }

  /**
   * Maps the given events to an appropriate type that fits the specified TMS' structure.
   *
   * @param events - the events to map
   * @param collector - a name of the collector for which the events should be mapped
   */
  protected mapEvents<T extends CxEvent>(
    events: Observable<T>[],
    _collector: string
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

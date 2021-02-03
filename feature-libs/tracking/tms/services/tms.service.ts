import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CxEvent, EventService, WindowRef } from '@spartacus/core';
import { merge, Observable, Subscription } from 'rxjs';
import { TmsConfig } from '../config/tms-config';

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
    @Inject(PLATFORM_ID) protected platformId: any
  ) {}

  /**
   * This method is called only once to start collecting and dispatching events to GTM
   */
  collect(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    for (const collector in this.tmsConfig.tms) {
      const collectorConfig = this.tmsConfig.tms[collector];

      collectorConfig.dataLayerInit(this.windowRef);

      const events =
        collectorConfig.events?.map((event) => this.eventsService.get(event)) ||
        [];
      // TODO:#tms - should we subscribe per collector?
      this.subscription.add(
        this.mapEvents(events).subscribe((event) => {
          if (collectorConfig.debug) {
            console.log(
              `🎤 Pushing the following event to ${collector}: `,
              event
            );
          }
          collectorConfig.dataLayerPush(event, this.windowRef);
        })
      );
    }
  }

  /**
   * Maps the given events to an appropriate type that fits the specified TMS' structure.
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

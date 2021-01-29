import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CxEvent, EventService, WindowRef } from '@spartacus/core';
import { TmsConfig } from '@spartacus/tms/core';
import { merge, Observable, Subscription } from 'rxjs';

export interface GtmWindow extends Window {
  dataLayer?: any[];
}

/**
 * This service interacts with the configured data layer object by pushing the Spartacus events to it.
 */
@Injectable({ providedIn: 'root' })
export class GoogleTagManagerService implements OnDestroy {
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

    this.prepareDataLayer();

    const events =
      this.tmsConfig.tms?.gtm?.events?.map((event) =>
        this.eventsService.get(event)
      ) || [];
    this.subscription = this.mapEvents(events).subscribe((event) =>
      this.push(event)
    );
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
   * Prepares the data layer object on the `window`.
   */
  protected prepareDataLayer(): void {
    if (this.window) {
      this.window.dataLayer = this.window.dataLayer ?? [];
    }
  }

  /**
   * Called each time an event fires.
   *
   * @param event Spartacus event to push to the data layer.
   */
  protected push<T extends CxEvent>(event: T): void {
    if (this.tmsConfig.tms?.gtm?.debug) {
      console.log(`🎤 GTM received event: ${JSON.stringify(event)}`);
    }
    if (this.window) {
      this.window.dataLayer?.push(event);
    }
  }

  /**
   * Returns a Window object (if not in SSR) enriched with the data layer property.
   */
  get window(): GtmWindow | undefined {
    return this.windowRef.nativeWindow;
  }

  /**
   * Angular's callback
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

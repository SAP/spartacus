import { Injectable, OnDestroy } from '@angular/core';
import { CxEvent, EventService, WindowRef } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TmsConfig } from '../config/tms-config';

export interface GtmWindow extends Window {
  dataLayer?: any[];
}

/**
 * This service dispatches events to the GTM's `Window.dataLayer`.
 */
@Injectable({ providedIn: 'root' })
export class GoogleTagManagerService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected eventsService: EventService,
    protected windowRef: WindowRef,
    protected tmsConfig: TmsConfig
  ) {}

  /**
   * This method is called only once to start collecting and dispatching events to GTM
   */
  collect(): void {
    // prep the data layer
    if (this.window) {
      this.window.dataLayer = this.window.dataLayer || [];
    }

    const events =
      this.tmsConfig.tms?.gtm?.events?.map((event) =>
        this.eventsService.get(event)
      ) || [];
    this.subscription = merge(...events)
      .pipe(tap((x) => console.log('gtm event: ', x)))
      .subscribe((event) => this.pushToDataLayer(event));
  }

  /**
   * Called every time an event fires.
   *
   * @param event Spartacus event to dispatch
   */
  protected pushToDataLayer<T extends CxEvent>(event: T): void {
    this.window?.dataLayer?.push(event);
  }

  /**
   * Returns a Window object (if not in SSR) enriched with the GTM's data layer property.
   */
  get window(): GtmWindow | undefined {
    return this.windowRef.nativeWindow;
  }

  /**
   * Angular's lifecycle hook
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

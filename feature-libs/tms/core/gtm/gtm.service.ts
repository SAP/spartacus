import { Injectable, isDevMode, OnDestroy } from '@angular/core';
import { CxEvent, EventService, WindowRef } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { TmsConfig } from '../config/tms-config';

export type GtmDataLayer = any[];

export interface GtmWindow extends Window {
  dataLayer?: GtmDataLayer;
}

/**
 * This service interacts with the configured data layer object by pushing the Spartacus events to it.
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
    this.prepareDataLayer();

    const events =
      this.tmsConfig.tms?.gtm?.events?.map((event) =>
        this.eventsService.get(event)
      ) || [];
    this.subscription = merge(...events).subscribe((event) =>
      this.pushToDataLayer(event)
    );
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
   * @param event Spartacus event to dispatch
   */
  protected pushToDataLayer<T extends CxEvent>(event: T): void {
    if (isDevMode()) {
      console.log(`🎤 GTM received event: ${JSON.stringify(event)}`);
    }
    this.window?.dataLayer?.push(event);
  }

  /**
   * Returns a Window object (if not in SSR) enriched with the data layer property.
   */
  get window(): GtmWindow | undefined {
    return this.windowRef.nativeWindow;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

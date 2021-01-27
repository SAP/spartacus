import { Injectable, OnDestroy } from '@angular/core';
import { CxEvent, EventService, WindowRef } from '@spartacus/core';
import { TmsConfig } from '@spartacus/tms/core';
import { merge, Observable, Subscription } from 'rxjs';

export type AdobeLaunchDataLayer = (
  data: any,
  linkObject?: any,
  eventObject?: any
) => void;

export interface AdobeLaunchWindow extends Window {
  _trackData?: AdobeLaunchDataLayer;
}

/**
 * This service interacts with the configured data layer object by pushing the Spartacus events to it.
 */
@Injectable({ providedIn: 'root' })
export class AdobeLaunchService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected eventsService: EventService,
    protected windowRef: WindowRef,
    protected tmsConfig: TmsConfig
  ) {}

  /**
   * This method is called only once to start collecting and dispatching events to Adobe Launch
   */
  collect(): void {
    this.prepareDataLayer();

    const events =
      this.tmsConfig.tms?.adobeLaunch?.events?.map((event) =>
        this.eventsService.get(event)
      ) || [];
    this.subscription = this.mapEvents(events).subscribe((event) =>
      this.pushToDataLayer(event)
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
      this.window._trackData =
        this.window._trackData ??
        function (_data: any, _linkObject?: any, _eventObject?: any): void {};
    }
  }

  /**
   * Called each time an event fires.
   *
   * @param event Spartacus event to dispatch
   */
  protected pushToDataLayer<T extends CxEvent>(event: T): void {
    if (this.tmsConfig.tms?.adobeLaunch?.debug) {
      console.log(`🎤 Adobe Launch received event: ${JSON.stringify(event)}`);
    }
    this.window?._trackData(event);
  }

  /**
   * Returns a Window object (if not in SSR) enriched with the data layer property.
   */
  get window(): AdobeLaunchWindow | undefined {
    return this.windowRef.nativeWindow;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

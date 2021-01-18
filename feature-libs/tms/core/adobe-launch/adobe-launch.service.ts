import { Injectable, OnDestroy } from '@angular/core';
import { CxEvent, EventService, WindowRef } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TmsConfig } from '../config/tms-config';

export interface AdobeLaunchPayload {
  [key: string]: any;
}

export interface AdobeLaunchWindow extends Window {
  _tackData?: (payload: AdobeLaunchPayload) => void;
}

/**
 * This service dispatches events to the Adobe Launch's `Window._trackData`.
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
    // prep the data layer
    if (this.window) {
      this.window._tackData = this.window._tackData
        ? this.window._tackData
        : (_payload: AdobeLaunchPayload): void => {};
    }

    const events =
      this.tmsConfig.tms?.adobeLaunch?.events?.map((event) =>
        this.eventsService.get(event)
      ) || [];
    this.subscription = merge(...events)
      .pipe(tap((x) => console.log('adobe event: ', x)))
      .subscribe((event) => this.pushToDataLayer(event));
  }

  /**
   * Called every time an event fires.
   *
   * @param event Spartacus event to dispatch
   */
  protected pushToDataLayer<T extends CxEvent>(event: T): void {
    const type = Object.getPrototypeOf(event).constructor.type;
    this.window?._tackData({ [type]: event });
  }

  /**
   * Returns a Window object (if not in SSR) enriched with the Adobe Launch's data layer property.
   */
  get window(): AdobeLaunchWindow | undefined {
    return this.windowRef.nativeWindow;
  }

  /**
   * Angular's lifecycle hook
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { CxEvent, EventService, WindowRef } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TmsConfig } from '../config/tms-config';

export interface GtmWindow extends Window {
  dataLayer?: any[];
}

@Injectable({ providedIn: 'root' })
export class GoogleTagManagerService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected eventsService: EventService,
    protected windowRef: WindowRef,
    protected tmsConfig: TmsConfig
  ) {}

  collect(): void {
    // prep data layer
    if (this.window) {
      this.window.dataLayer = this.window.dataLayer || [];
    }

    const events =
      this.tmsConfig.tms?.gtm?.events?.map((event) =>
        this.eventsService.get(event)
      ) || [];
    this.subscription = merge(...events)
      .pipe(tap((x) => console.log('gtm event: ', x)))
      .subscribe((event) => this.pushToTms(event));
  }

  protected pushToTms<T extends CxEvent>(event: T): void {
    this.window?.dataLayer?.push(event);
  }

  get window(): GtmWindow | undefined {
    return this.windowRef.nativeWindow;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

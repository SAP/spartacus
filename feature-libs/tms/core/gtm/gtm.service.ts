import { Injectable } from '@angular/core';
import { EventService, WindowRef } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TmsConfig } from '../config/tms-config';

export interface GtmWindow extends Window {
  dataLayer?: any[];
}

@Injectable({ providedIn: 'root' })
export class GoogleTagManagerService {
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

    this.tmsConfig.tms?.gtm?.events?.forEach((event) => {
      this.subscription.add(
        this.eventsService
          .get(event)
          .pipe(tap((x) => console.log('gtm event: ', x)))
          .subscribe((event) => this.pushToTms(event))
      );
    });
  }

  protected pushToTms(data: any): void {
    this.window?.dataLayer?.push(data);
  }

  get window(): GtmWindow | undefined {
    return this.windowRef.nativeWindow;
  }
}

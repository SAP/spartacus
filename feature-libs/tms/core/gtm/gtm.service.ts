import { Injectable } from '@angular/core';
import { EventService, TmsEvent, WindowRef } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface GtmWindow extends Window {
  dataLayer?: any[];
}

@Injectable({ providedIn: 'root' })
export class GoogleTagManagerService {
  protected subscription = new Subscription();

  constructor(
    protected eventsService: EventService,
    protected windowRef: WindowRef
  ) {}

  collect(): void {
    // prep data layer
    if (this.window) {
      this.window.dataLayer = this.window.dataLayer || [];
    }

    this.subscription.add(
      this.eventsService
        .get(TmsEvent)
        .pipe(tap((x) => console.log('xxx: ', x)))
        .subscribe((tmsEvent) => this.pushToTms(tmsEvent))
    );
  }

  protected pushToTms(data: any): void {
    this.window?.dataLayer?.push(data);
  }

  get window(): GtmWindow | undefined {
    return this.windowRef.nativeWindow;
  }
}

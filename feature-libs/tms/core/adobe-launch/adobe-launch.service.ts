import { Injectable, OnDestroy } from '@angular/core';
import { CxEvent, EventService, WindowRef } from '@spartacus/core';
import { merge, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TmsConfig } from '../config/tms-config';

export interface AdobeLaunchWindow extends Window {
  _satellite?: {
    track?: (identifier: string, data: any) => void;
  };
}

@Injectable({ providedIn: 'root' })
export class AdobeLaunchService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected eventsService: EventService,
    protected windowRef: WindowRef,
    protected tmsConfig: TmsConfig
  ) {}

  collect(): void {
    // prep the window object
    if (this.window) {
      this.window._satellite = this.window._satellite ?? {
        track: (_identifier: string, _payload: any): void => {},
      };
    }

    const events =
      this.tmsConfig.tms?.adobeLaunch?.events?.map((event) =>
        this.eventsService.get(event)
      ) || [];
    this.subscription = merge(...events)
      .pipe(tap((x) => console.log('adobe event: ', x)))
      .subscribe((event) => this.pushToTms(event));
  }

  protected pushToTms<T extends CxEvent>(event: T): void {
    const type = Object.getPrototypeOf(event).constructor.type;
    this.window?._satellite?.track(type, event);
  }

  get window(): AdobeLaunchWindow | undefined {
    return this.windowRef.nativeWindow;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

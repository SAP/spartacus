import { Inject, Injectable, Optional } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { TmsDataCollector, TMS_COLLECTORS } from './tms.collector';

export interface GtmWindow extends Window {
  dataLayer?: any[];
}

@Injectable({ providedIn: 'root' })
export class GoogleTagManagerService {
  protected subscription = new Subscription();

  constructor(
    @Optional()
    @Inject(TMS_COLLECTORS)
    protected collectors: TmsDataCollector[],
    protected windowRef: WindowRef
  ) {}

  collect() {
    // prep data layer
    this.window.dataLayer = this.window.dataLayer || [];

    // collect data through all injected collectors and store it in the data layer
    (this.collectors || []).forEach((collector) =>
      this.subscription.add(
        collector.collect().subscribe((data) => this.store(data))
      )
    );
  }

  protected store(data: any) {
    this.window.dataLayer.push(data);
  }

  get window(): GtmWindow {
    return this.windowRef.nativeWindow;
  }
}

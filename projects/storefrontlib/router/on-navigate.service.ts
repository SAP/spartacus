import { ViewportScroller } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { OnNavigateConfig } from './config';

@Injectable({
  providedIn: 'root',
})
export class OnNavigateService implements OnDestroy {
  protected subscription: Subscription;

  constructor(
    protected config: OnNavigateConfig,
    protected router: Router,
    protected viewportScroller: ViewportScroller
  ) {}

  /**
   * Reads configuration and enables features based on flags set.
   */
  initializeWithConfig(): void {
    if (this.config?.enableResetViewOnNavigate?.active) {
      this.setResetViewOnNavigate(this.config.enableResetViewOnNavigate.active);
    }
  }

  /**
   * Resets view back to the original position when performing a back navigation and to the top when performing a front navigation
   * @param enable Enable or disable this feature
   */
  setResetViewOnNavigate(enable: boolean): void {
    this.subscription?.unsubscribe();

    if (enable) {
      console.log('enabled');
      this.subscription = this.router.events
        .pipe(
          filter((event): event is Scroll => event instanceof Scroll),
          pairwise()
        )
        .subscribe((event: Scroll[]) => {
          // Will be used in upcoming customizable forward navigation config
          // const previousRoute = event[0];
          const currentRoute = event[1];

          if (currentRoute.position) {
            console.log('b4');
            this.viewportScroller.scrollToPosition(currentRoute.position);
          } else {
            console.log('aft');
            this.viewportScroller.scrollToPosition([0, 0]);
            console.log('vat');
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

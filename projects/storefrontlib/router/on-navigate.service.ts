import { ViewportScroller } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  Injectable,
  Injector,
} from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { OnNavigateConfig } from './config';

@Injectable({
  providedIn: 'root',
})
export class OnNavigateService {
  protected subscription: Subscription;

  get hostComponent(): ComponentRef<any> {
    return this.injector.get(ApplicationRef)?.components?.[0];
  }

  constructor(
    protected config: OnNavigateConfig,
    protected router: Router,
    protected viewportScroller: ViewportScroller,
    protected injector: Injector
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
   * and sets the focus back to the top of the page before skiplinks for any type of navigation
   * @param enable Enable or disable this feature
   */
  setResetViewOnNavigate(enable: boolean): void {
    this.subscription?.unsubscribe();

    if (enable) {
      this.subscription = this.router.events
        .pipe(
          filter((event): event is Scroll => event instanceof Scroll),
          pairwise()
        )
        .subscribe((event) => {
          const previousRoute = event[0];
          const currentRoute = event[1];

          if (currentRoute.position) {
            // allow the pages to be repainted before scrolling to proper position
            setTimeout(() =>
              this.viewportScroller.scrollToPosition(currentRoute.position)
            );
          } else {
            if (
              this.config.enableResetViewOnNavigate?.ignoreQueryString &&
              this.isPathEqual(previousRoute, currentRoute)
            ) {
              return;
            }

            if (this.isChildRoute(currentRoute)) {
              return;
            }

            setTimeout(
              () => this.viewportScroller.scrollToPosition([0, 0]),
              100
            );
          }

          this.hostComponent?.location?.nativeElement.focus();
        });
    }
  }

  /**
   * Verifies if the current route is a child route from the given ignore config route
   *
   * @param route
   * @returns boolean whether the route is a child route
   */
  private isChildRoute(route: Scroll): boolean {
    return (
      this.config.enableResetViewOnNavigate?.ignoreRoutes?.some((configRoute) =>
        route.routerEvent.urlAfterRedirects.split('/').includes(configRoute)
      ) ?? false
    );
  }

  /**
   * Verifies if the previous and current route are the same without the query string
   *
   * @param previousRoute
   * @param currentRoute
   * @returns boolean depending on the previous and current route are equal without the query strings
   */
  private isPathEqual(previousRoute: Scroll, currentRoute: Scroll): boolean {
    return (
      previousRoute.routerEvent.urlAfterRedirects.split('?')[0] ===
      currentRoute.routerEvent.urlAfterRedirects.split('?')[0]
    );
  }
}

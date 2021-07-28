import { ViewportScroller } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router, Scroll } from '@angular/router';
import { WindowRef } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, pairwise, take } from 'rxjs/operators';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../config';
import { KeyboardFocusConfig } from '../config';

/**
 * Shared service for keyboard focus features called when the browser navigates.
 */
@Injectable({
  providedIn: 'root',
})
export class OnNavigateFocusService implements OnDestroy {
  protected resetFocusOnNavigate: Subscription;
  protected resetViewOnNavigate: Subscription;

  constructor(
    protected config: KeyboardFocusConfig,
    protected router: Router,
    protected breakpointService: BreakpointService,
    protected winRef: WindowRef,
    protected viewportScroller: ViewportScroller
  ) {}

  ngOnDestroy(): void {
    this.resetFocusOnNavigate?.unsubscribe();
    this.resetViewOnNavigate?.unsubscribe();
  }

  /**
   * Reads configuration and enables features based on flags set.
   */
  initializeWithConfig(): void {
    if (!this.winRef.isBrowser()) {
      return;
    }

    if (this.config?.keyboardFocus?.enableResetFocusOnNavigate) {
      this.setResetFocusOnNavigate(
        this.config.keyboardFocus.enableResetFocusOnNavigate
      );
    }

    if (this.config?.keyboardFocus?.enableResetViewOnNavigate) {
      this.setResetViewOnNavigate(
        this.config.keyboardFocus.enableResetViewOnNavigate
      );
    }
  }

  /**
   * Resets focus back to body element in the DOM tree when a navigation is started.
   * @param enable Enable or disable this feature. Set this to an array of BREAKPOINTS to enable for specified screen widths.
   */
  setResetFocusOnNavigate(enable: boolean | BREAKPOINT[]): void {
    this.resetFocusOnNavigate?.unsubscribe();

    if (enable) {
      this.resetFocusOnNavigate = this.router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe(() => {
          if (Array.isArray(enable)) {
            this.breakpointService.breakpoint$
              .pipe(take(1))
              .subscribe((breakpoint: BREAKPOINT) => {
                if (enable.includes(breakpoint)) {
                  this.winRef.document.body.focus();
                }
              });
          } else if (typeof enable === 'boolean') {
            this.winRef.document.body.focus();
          }
        });
    }
  }

  /**
   * Resets view back to body element in the DOM tree when a navigation is started.
   * @param enable Enable or disable this feature. Set this to an array of BREAKPOINTS to enable for specified screen widths.
   */
  setResetViewOnNavigate(enable: boolean | BREAKPOINT[]): void {
    this.resetViewOnNavigate?.unsubscribe();

    /**
     * This entire service may be dropped and this is just a draft
     *
     * Won't be included to 4.0 anymore, but is an improvement to current behavior
     * focus and navigation should go hand to hand too
     */

    if (enable) {
      this.resetViewOnNavigate = this.router.events
        .pipe(
          filter((event): event is Scroll => event instanceof Scroll),
          pairwise()
        )
        .subscribe((event: Scroll[]) => {
          /**
           * The previous url is accessible through event[0], however, it is not used as we want to keep the behavior the same as before.
           * const previous = event[0];
           */
          const current = event[1];

          if (current.position) {
            /**
             * if data is loaded, scroll into view
             * may need to build new events, tokens, etc
             * need to make it configurable
             *
             **/

            this.viewportScroller.scrollToPosition(current.position);
          } else {
            if (Array.isArray(enable)) {
              this.breakpointService.breakpoint$
                .pipe(take(1))
                .subscribe((breakpoint: BREAKPOINT) => {
                  if (enable.includes(breakpoint)) {
                    this.viewportScroller.scrollToPosition([0, 0]);
                  }
                });
            } else if (typeof enable === 'boolean') {
              /**
               * if pre.afterRedirectUrl.splt('?')[0] ! == curr.afterRedirectionUrl.split('?')[0]
               * || if route.include(routes)
               * || if etc
               *
               * exclude paths / query param / etc to not go on top
               * need to make it configurable
               **/

              this.viewportScroller.scrollToPosition([0, 0]);
            }
          }
        });
    }
  }
}

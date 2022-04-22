import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { WindowRef } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../config';
import { KeyboardFocusConfig } from '../config';

/**
 * @deprecated since 4.2, refer to spartacus issues (#13762)
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
    protected winRef: WindowRef
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

    if (enable) {
      this.resetViewOnNavigate = this.router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe(() => {
          if (Array.isArray(enable)) {
            this.breakpointService.breakpoint$
              .pipe(take(1))
              .subscribe((breakpoint: BREAKPOINT) => {
                if (enable.includes(breakpoint)) {
                  this.winRef.document.body.scrollIntoView();
                }
              });
          } else if (typeof enable === 'boolean') {
            this.winRef.document.body.scrollIntoView();
          }
        });
    }
  }
}

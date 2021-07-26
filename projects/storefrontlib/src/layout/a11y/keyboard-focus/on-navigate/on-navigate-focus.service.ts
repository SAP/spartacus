import { isPlatformServer } from '@angular/common';
import { ApplicationRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { BREAKPOINT } from '../../../config';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { KeyboardFocusConfig } from '../config';

/**
 * Shared service for keyboard focus features called when the browser navigates.
 */
@Injectable({
  providedIn: 'root',
})
export class OnNavigateFocusService {
  protected resetFocusOnNavigate: Subscription;
  protected resetViewOnNavigate: Subscription;

  constructor(
    protected config: KeyboardFocusConfig,
    protected router: Router,
    protected breakpointService: BreakpointService,
    protected applicationRef: ApplicationRef,
    @Inject(PLATFORM_ID) protected platformId: any
  ) {}

  protected get rootComponent(): HTMLElement | undefined {
    return this.applicationRef?.components?.[0]?.location?.nativeElement;
  }

  /**
   * Reads configuration and enables features based on flags set.
   */
  initializeWithConfig(): void {
    if (isPlatformServer(this.platformId)) {
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
   * Resets focus back to root element `<cx-storefront>` in the DOM tree when a navigation is started.
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
                  this.rootComponent?.focus();
                }
              });
          } else if (typeof enable === 'boolean') {
            this.rootComponent?.focus();
          }
        });
    }
  }

  /**
   * Resets view back to root element `<cx-storefront>` in the DOM tree when a navigation is started.
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
                  this.rootComponent?.scrollIntoView();
                }
              });
          } else if (typeof enable === 'boolean') {
            this.rootComponent?.scrollIntoView();
          }
        });
    }
  }
}

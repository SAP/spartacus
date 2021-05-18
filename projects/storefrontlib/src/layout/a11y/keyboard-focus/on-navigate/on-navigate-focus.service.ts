import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { KeyboardFocusConfig } from '../config';

/**
 * Shared service for keyboard focus features called when the browser navigates.
 */
@Injectable({
  providedIn: 'root',
})
export class OnNavigateFocusService {
  protected resetFocusOnNavigate: Subscription;

  constructor(
    protected config: KeyboardFocusConfig,
    protected router: Router,
    @Inject(DOCUMENT) protected document: any
  ) {}

  /**
   * Reads configuration and enables features based on flags set.
   */
  initializeWithConfig(): void {
    if (this.config?.keyboardFocus?.enableResetFocusOnNavigate) {
      this.setResetFocusOnNavigate();
    }
  }

  /**
   * Resets focus back to root element `<cx-storefront>` in the DOM tree when a navigation is started.
   * @param enable (default: true): Enable or disable this feature.
   */
  setResetFocusOnNavigate(enable = true): void {
    this.resetFocusOnNavigate?.unsubscribe();

    if (enable) {
      this.resetFocusOnNavigate = this.router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe(() => {
          this.document.getElementsByTagName('cx-storefront')[0].focus();
        });
    }
  }
}

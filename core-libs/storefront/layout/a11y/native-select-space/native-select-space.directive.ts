/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, HostListener, inject } from '@angular/core';
import { FeatureToggles } from '@spartacus/core';

/**
 * Fixes WCAG 2.5.2 (Level A) on native `<select>` elements: holding the
 * spacebar should not repeatedly open/close the dropdown.
 *
 * When `a11yNavigationSpaceKeyOnKeyUp` is enabled:
 * - `keydown` Space is suppressed (prevents browser from opening the dropdown
 *   on every key-repeat tick, which causes a visible blink).
 * - `keyup` Space triggers a `click()` on the element, opening the dropdown
 *   exactly once on key release.
 *
 * Affects: `SiteContextSelectorComponent`, `SiteThemeSwitcherComponent`
 */
@Directive({
  selector: 'select[cxNativeSelectSpace]',
  standalone: true,
})
export class NativeSelectSpaceDirective {
  private featureToggles = inject(FeatureToggles);

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (
      this.featureToggles?.a11yNavigationSpaceKeyOnKeyUp &&
      (event.key === ' ' || event.code === 'Space')
    ) {
      if (event.repeat) {
        event.preventDefault();
      }
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (
      this.featureToggles?.a11yNavigationSpaceKeyOnKeyUp &&
      (event.key === ' ' || event.code === 'Space')
    ) {
      (event.target as HTMLSelectElement).click();
    }
  }
}

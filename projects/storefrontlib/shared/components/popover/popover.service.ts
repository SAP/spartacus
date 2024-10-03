/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElementRef, Injectable, Optional, inject } from '@angular/core';
import { FeatureConfigService } from '@spartacus/core';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { PopoverEvent } from './popover.model';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  @Optional() featureConfigService? = inject(FeatureConfigService, {
    optional: true,
  });
  /**
   * For a11y improvements method returns different `FocusConfig`
   * based on which event popover was triggered.
   */
  getFocusConfig(event: PopoverEvent, appendToBody: boolean): FocusConfig {
    let config = {};

    if (event === PopoverEvent.OPEN_BY_KEYBOARD && appendToBody) {
      config = {
        trap: true,
        block: true,
        focusOnEscape: false,
        autofocus: true,
      };
    }

    return config;
  }

  // TODO: (CXSPA-6594) - Remove feature flag next major release.
  setFocusOnElement(
    element: ElementRef,
    focusConfig?: FocusConfig,
    appendToBody?: boolean
  ) {
    if (this.featureConfigService?.isEnabled('a11yPopoverFocus')) {
      setTimeout(() => {
        element.nativeElement.focus();
      }, 0);
    } else {
      if (focusConfig && appendToBody) {
        element.nativeElement.focus();
      }
    }
  }
}

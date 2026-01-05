/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TemplateRef } from '@angular/core';
import { Translatable } from '@spartacus/core';
import { BREAKPOINT } from '../../../layout/config/layout-config';

export interface Tab {
  /**
   * Name the tab with an i18n key.
   */
  headerKey?: string;
  /**
   * Params passed down to the translation function
   */
  headerParams?: Record<string, any>;
  /**
   * Name the tab with a string.
   */
  header?: string;
  /**
   * Content to display in tab panel when open.
   */
  content?: TemplateRef<any>;
  /**
   * Identifies the index of the tab to set attributes by.
   */
  id?: number;
  /**
   * Disables the tabindex on the border element so that the border
   * of the tab can no longer be focused.
   */
  disableBorderFocus?: boolean;
}

export interface TabConfig {
  /**
   * Translatable key to set aria-label of tablist.
   */
  label?: Translatable | string;
  /**
   * Use this to set the tab mode. Defaults to 'TAB' when not set.
   */
  mode?: TAB_MODE;
  /**
   * Breakpoint to switch responsively between 'TAB' and 'ACCORDIAN' modes.
   * Uses 'ACCORDIAN' mode when under the breakpoint and 'TAB' mode when over it.
   * Set this to use responsive modes.
   */
  breakpoint?: BREAKPOINT;
  /**
   * The indexes of tabs to have open initially.
   */
  openTabs?: number[];
  /**
   * Restricts the direction keys that can be used to navigate between tabs.
   * When enabled, tab mode can only use left/right arrow keys and accordian mode up/down.
   */
  restrictDirectionKeys?: boolean;
}

export enum TAB_MODE {
  TAB = 'TAB',
  ACCORDIAN = 'ACCORDIAN',
}

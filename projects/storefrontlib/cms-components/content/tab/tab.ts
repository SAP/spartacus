import { TemplateRef } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { BREAKPOINT } from '../../../layout/config/layout-config';

export interface Tab {
  /**
   * Name the tab with an i18n key.
   */
  headerKey?: string;
  /**
   * Name the tab with a string.
   */
  header?: string;
  /**
   * Content to display in tab panel when open.
   */
  content?: TemplateRef<any> | ContentSlotComponentData;
  id?: string;
}

export interface TabConfig {
  /**
   *
   */
  label?: string;
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
}

export interface TabAttributes {
  ariaSelected?: boolean;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaLabelledBy?: string;
  tabIndex?: number;
  id?: string;
  active?: boolean;
  role?: string;
}

export enum TAB_MODE {
  TAB = 'TAB',
  ACCORDIAN = 'ACCORDIAN',
}

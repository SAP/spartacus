import { TemplateRef } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { BREAKPOINT } from '../../../layout/config/layout-config';

export interface Tab {
  headerKey?: string;
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
  mode?: TAB_TYPE;
  breakpoint?: BREAKPOINT;
  /**
   * The indexes of tabs to have open initially.
   */
  openTabs?: number[];
  /**
   * The maximum number of tabs the user can have open at once.
   */
  maxOpenTabs?: number;
}

export enum TAB_TYPE {
  TAB = 'TAB',
  ACCORDIAN = 'ACCORDIAN',
}

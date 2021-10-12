import { TemplateRef } from '@angular/core';
import { BREAKPOINT } from '../../../layout/config/layout-config';

export interface Tab {
  headerKey?: string;
  header?: string;
  /**
   * Template to display in tab panel when open.
   */
  template?: TemplateRef<any>;
  /**
   * cxComponent to display in tab panel when open.
   */
  cxComponent?: any;
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

import { TemplateRef } from '@angular/core';
import { TAB_TYPE } from './tab.component';

export interface Tab {
  title: string;
  template?: TemplateRef<any>;
  cxComponent?: any;
  id?: string;
}

export interface TabConfig {
  label: string;
  mode?: TAB_TYPE;
}

export const defaultTabConfig: TabConfig = {
  label: 'Product Information',
};

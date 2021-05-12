import { TemplateRef } from '@angular/core';

export interface Tab {
  title: string;
  template?: TemplateRef<any>;
  cxComponent?: any;
  id?: string;
}

export interface TabConfig {
  label: string;
}

export const defaultTabConfig: TabConfig = {
  label: 'Product Information',
};

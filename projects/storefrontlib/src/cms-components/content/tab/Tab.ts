import { TemplateRef } from '@angular/core';

export interface Tab {
  title: string;
  template?: TemplateRef<any>;
  cxComponent?: any;
}

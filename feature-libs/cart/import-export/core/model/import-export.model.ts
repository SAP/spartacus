import { CmsComponent } from '@spartacus/core';

export interface CmsImportExportComponent extends CmsComponent {
  importButtonDisplayRoutes: string[];
  exportButtonDisplayRoutes: string[];
}

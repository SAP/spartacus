import { CmsComponent } from '@spartacus/core';

export enum CartTypes {
  ACTIVE_CART = 'ACTIVE_CART',
  NEW_SAVED_CART = 'NEW_SAVED_CART',
  QUICK_ORDER = 'QUICK_ORDER',
  SAVED_CART = 'SAVED_CART',
}

export interface CmsImportExportComponent extends CmsComponent {
  importButtonDisplayRoutes: string[];
  exportButtonDisplayRoutes: string[];
}

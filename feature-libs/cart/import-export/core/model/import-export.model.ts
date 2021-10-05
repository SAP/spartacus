import { CmsComponent } from '@spartacus/core';

export enum CartTypes {
  NEW_SAVED_CART = 'NEW_SAVED_CART',
  SAVED_CART = 'SAVED_CART',
  ACTIVE_CART = 'ACTIVE_CART',
}

export interface CmsImportExportComponent extends CmsComponent {
  importButtonDisplayRoutes: string[];
  exportButtonDisplayRoutes: string[];
  routesCartMapping: { [route: string]: CartTypes };
}

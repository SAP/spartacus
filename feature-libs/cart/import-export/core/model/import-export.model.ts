import { CmsComponent } from '@spartacus/core';

export enum CartTypes {
  NEW_SAVED_CART = 'NEW_SAVED_CART',
  SAVED_CART = 'SAVED_CART',
  ACTIVE_CART = 'ACTIVE_CART',
}

export interface CmsImportExportComponent extends CmsComponent {
  importButtonDisplayPages: string[];
  exportButtonDisplayPages: string[];
  routesCartMapping: Map<string, CartTypes>;
}

import { CmsComponent } from '@spartacus/core';

export enum CartTypes {
  NEW_SAVED_CART = 'savedCarts',
  EXISTING_SAVED_CART = 'savedCartsDetails',
  ACTIVE_CART = 'cart',
}

export interface CmsImportExportComponent extends CmsComponent {
  importButtonDisplayPages: string[];
  exportButtonDisplayPages: string[];
  routesCartMapping: Map<string, CartTypes>;
}

import { CmsComponent } from '@spartacus/core';

export enum CartTypes {
  NEW_SAVED_CART,
  EXISTING_SAVED_CART,
  ACTIVE_CART,
}

export interface CmsImportExportComponent extends CmsComponent {
  importButtonDisplayPages: string[];
  exportButtonDisplayPages: string[];
  routesCartMapping: Map<string, CartTypes>;
}

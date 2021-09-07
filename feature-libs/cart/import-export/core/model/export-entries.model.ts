import { Translatable } from '@spartacus/core';

export interface ExportColumn {
  name: Translatable;
  value: string;
}

export enum ExportCartRoutes {
  SAVED_CART_DETAILS = 'savedCartsDetails',
  CART = 'cart',
}

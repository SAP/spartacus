import { Cart } from '@spartacus/core';

export enum SavedCartFormType {
  EDIT = 'edit',
  DELETE = 'delete',
}

export interface SaveCartResult {
  savedCartData?: Cart;
}

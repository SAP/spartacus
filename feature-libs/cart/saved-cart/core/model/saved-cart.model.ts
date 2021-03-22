import { Cart } from '@spartacus/core';

export enum SavedCartFormType {
  EDIT = 'edit',
  DELETE = 'delete',
  SAVE = 'save',
}

export interface SaveCartResult {
  savedCartData?: Cart;
}

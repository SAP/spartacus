import { CartModification } from '@spartacus/core';

export interface CartModificationList {
  cartModifications?: CartModification[];
}

export enum CartValidationStatusCode {
  NO_STOCK = 'noStock',
  LOW_STOCK = 'lowStock'
}

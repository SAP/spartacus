import { CartEvent } from '@spartacus/core';

// TODO:#5687 - check payloads

export class CartRemoveEntryEvent implements CartEvent {
  cartId: string;
  userId: string;
  productCode: string;
}

export class CartRemoveEntrySuccessEvent implements CartEvent {
  cartId: string;
  userId: string;
  productCode: string;
}

export class CartRemoveEntryFailEvent implements CartEvent {
  cartId: string;
  userId: string;
  productCode: string;
}

export class CartUpdateEvent implements CartEvent {
  cartId: string;
  userId: string;
}

export class CartUpdateSuccessEvent implements CartEvent {
  cartId: string;
  userId: string;
}

export class CartUpdateFailEvent implements CartEvent {
  cartId: string;
  userId: string;
}

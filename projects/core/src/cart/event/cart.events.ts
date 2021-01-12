import { OrderEntry } from '../../model/order.model';

/**
 * Base cart event. Most cart events should have `cartId` and `userId`.
 */
export interface CartEvent {
  cartId: string;
  cartCode: string;
  userId: string;
}

// =====================================================================

export class CartAddEntryEvent implements CartEvent {
  static readonly type = 'CartAddEntryEvent';
  cartId: string;
  cartCode: string;
  userId: string;
  productCode: string;
  quantity: number;
}

export class CartAddEntrySuccessEvent implements CartEvent {
  static readonly type = 'CartAddEntrySuccessEvent';
  cartId: string;
  cartCode: string;
  userId: string;
  productCode: string;
  quantity: number;
  entry: OrderEntry;
  quantityAdded: number;
  deliveryModeChanged: boolean;
}

export class CartAddEntryFailEvent implements CartEvent {
  static readonly type = 'CartAddEntryFailEvent';
  cartId: string;
  cartCode: string;
  userId: string;
  productCode: string;
  quantity: number;
}

export class CartRemoveEntrySuccessEvent implements CartEvent {
  static readonly type = 'CartRemoveEntrySuccessEvent';
  cartId: string;
  cartCode: string;
  userId: string;
  entry: OrderEntry;
}

export class CartUpdateEntrySuccessEvent implements CartEvent {
  static readonly type = 'CartUpdateEntrySuccessEvent';
  cartId: string;
  cartCode: string;
  userId: string;
  quantity: number;
  entry: OrderEntry;
}

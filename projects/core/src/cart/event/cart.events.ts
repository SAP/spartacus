import { OrderEntry } from '../../model/order.model';

/**
 * Base cart event. Most cart events should have `cartId` and `userId`.
 */
export interface CartEvent {
  cartId: string;
  userId: string;
}

// =====================================================================

export class CartAddEntryEvent implements CartEvent {
  cartId: string;
  userId: string;
  productCode: string;
  quantity: number;
}

export class CartAddEntrySuccessEvent implements CartEvent {
  cartId: string;
  userId: string;
  productCode: string;
  quantity: number;
  entry: OrderEntry;
  quantityAdded: number;
  deliveryModeChanged: boolean;
}

export class CartAddEntryFailEvent implements CartEvent {
  cartId: string;
  userId: string;
  productCode: string;
  quantity: number;
}


export class CartRemoveEntrySuccessEvent implements CartEvent {
  cartId: string;
  userId: string;
  entry: OrderEntry;
}

export class CartUpdateEntrySuccessEvent implements CartEvent {
  cartId: string;
  userId: string;
  quantity: number;
  entry: OrderEntry;
}
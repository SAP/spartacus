import { CxEvent } from '../../event/cx-event';
import { OrderEntry } from '../../model/order.model';

/**
 * Base cart event. Most cart events should have `cartId` and `userId`.
 */
export class CartEvent extends CxEvent {
  static type = 'CartEvent';
  cartId: string;
  cartCode: string;
  userId: string;
}

// =====================================================================

export class CartAddEntryEvent extends CartEvent {
  static type = 'CartAddEntryEvent';
  productCode: string;
  quantity: number;
}

export class CartAddEntrySuccessEvent extends CartEvent {
  static type = 'CartAddEntrySuccessEvent';
  productCode: string;
  quantity: number;
  entry: OrderEntry;
  quantityAdded: number;
  deliveryModeChanged: boolean;
}

export class CartAddEntryFailEvent extends CartEvent {
  static type = 'CartAddEntryFailEvent';
  productCode: string;
  quantity: number;
}

export class CartRemoveEntrySuccessEvent extends CartEvent {
  static type = 'CartRemoveEntrySuccessEvent';
  entry: OrderEntry;
}

export class CartUpdateEntrySuccessEvent extends CartEvent {
  static type = 'CartUpdateEntrySuccessEvent';
  quantity: number;
  entry: OrderEntry;
}

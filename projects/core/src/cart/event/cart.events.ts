import { CxEvent } from '../../event/cx-event';
import { OrderEntry } from '../../model/order.model';

/**
 * Base cart event. Most cart events should have these properties.
 */
export abstract class CartEvent extends CxEvent {
  cartId: string;
  cartCode: string;
  userId: string;
}

// =====================================================================

export class CartAddEntryEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartAddEntryEvent';
  productCode: string;
  quantity: number;
}

export class CartAddEntrySuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartAddEntrySuccessEvent';
  productCode: string;
  quantity: number;
  entry?: OrderEntry;
  quantityAdded?: number;
  deliveryModeChanged?: boolean;
}

export class CartAddEntryFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartAddEntryFailEvent';
  productCode: string;
  quantity: number;
  error?: unknown;
}

export class CartRemoveEntryFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartRemoveEntryFailEvent';
  entry: OrderEntry;
}

export class CartRemoveEntrySuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartRemoveEntrySuccessEvent';
  entry: OrderEntry;
}

export class CartUpdateEntrySuccessEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartUpdateEntrySuccessEvent';
  quantity: number;
  entry: OrderEntry;
}

export class CartUpdateEntryFailEvent extends CartEvent {
  /**
   * Event's type
   */
  static readonly type = 'CartUpdateEntryFailEvent';
  quantity: number;
  entry: OrderEntry;
}

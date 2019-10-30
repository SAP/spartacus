import { BaseEvent } from '../../events/event.model';

/**
 * Indicates any (asynchronize) processing of the cart.
 * A boolean value is emited whenever the state changes.
 */
export class CartBusyEvent extends BaseEvent {}
/** Indicates any error while operating on the cart */
export class CartErrorEvent extends BaseEvent {}
/** indicates succesful load of the cart */
export class CartLoadEvent extends BaseEvent {}
/** Indicates the add to cart action. */
export class CartAddEvent extends BaseEvent {}
/** indicates any change to the cart */
export class CartChangeEvent extends BaseEvent {}
/**
 * Indicates a cart merge, typically happens when an
 * anonymous cart is merged to a personal cart.
 */
export class CartMergeEvent extends BaseEvent {}
/** Indicates the succesful creation of a cart entry. */
export class CartEntryAddEvent extends BaseEvent {}
/** Indicates the succesful update of a cart entry. */
export class CartEntryUpdateEvent extends BaseEvent {}
/** Indicates the succesful removal of a cart entry. */
export class CartEntryRemoveEvent extends BaseEvent {}

import { CxStateEvent } from '../../events/event.model';

/**
 * Indicates any (asynchronize) processing of the cart.
 * A boolean value is emited whenever the state changes.
 */

export class CartBusyEvent extends CxStateEvent<Boolean> {}

/** Indicates any error while operating on the cart */
export class CartErrorEvent extends CxStateEvent<any> {}
/** indicates succesful load of the cart */
export class CartLoadEvent extends CxStateEvent<any> {}
/** Indicates the add to cart action. */
export class CartAddEvent extends CxStateEvent<any> {}
/** indicates any change to the cart */
export class CartChangeEvent extends CxStateEvent<any> {}
/**
 * Indicates a cart merge, typically happens when an
 * anonymous cart is merged to a personal cart.
 */
export class CartMergeEvent extends CxStateEvent<any> {}
/** Indicates the succesful creation of a cart entry. */
export class CartAddEntryEvent extends CxStateEvent<any> {}
/** Indicates the succesful update of a cart entry. */
export class CartUpdateEntryEvent extends CxStateEvent<any> {}
/** Indicates the succesful removal of a cart entry. */
export class CartRemoveEntryEvent extends CxStateEvent<any> {}

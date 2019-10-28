export const enum CartEventType {
  /** Indicates any (asynchronize) processing of the cart.
   * A boolean value is emited whenever the state changes. */
  BUSY = '[CART] BUSY',

  /** Indicates any error while operating on the cart */
  ERROR = '[CART] ERROR',

  /** indicates succesful load of the cart */
  LOAD = '[CART] LOAD',

  /** indicates any change to the cart */
  CHANGE = '[CART] CHANGE',

  /** indicates a cart merge, typically happens when an anonymous cart
   * is merged to a personal cart  */
  MERGE = '[CART] MERGE',

  /** Indicates the add to cart action. */
  ADD = '[CART] ADD',

  /** Indicates the succesful creation of a cart entry. */
  ENTRY_CREATED = '[CART ENTRY] CREATED',

  /** Indicates the succesful update of a cart entry. */
  ENTRY_UPDATED = '[CART ENTRY] UPDATED',

  /** Indicates the succesful removal of a cart entry. */
  ENTRY_REMOVED = '[CART ENTRY] REMOVED',
}

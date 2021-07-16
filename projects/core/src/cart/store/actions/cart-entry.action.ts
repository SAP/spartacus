import { OrderEntry } from '../../../model/order.model';
import {
  EntityProcessesDecrementAction,
  EntityProcessesIncrementAction,
} from '../../../state/utils/entity-processes-loader/entity-processes-loader.action';
import { MULTI_CART_DATA } from '../multi-cart-state';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_ADD_ENTRY = '[Cart-entry] Add Entry';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_REMOVE_ENTRY = '[Cart-entry] Remove Entry';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_UPDATE_ENTRY = '[Cart-entry] Update Entry';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const CART_UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartAddEntry extends EntityProcessesIncrementAction {
  readonly type = CART_ADD_ENTRY;
  constructor(
    public payload: {
      cartId: string;
      userId: string;
      productCode: string;
      quantity: number;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartAddEntrySuccess extends EntityProcessesDecrementAction {
  readonly type = CART_ADD_ENTRY_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      productCode: string;
      quantity: number;
      deliveryModeChanged?: boolean;
      entry?: OrderEntry;
      quantityAdded?: number;
      statusCode?: string;
      statusMessage?: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartAddEntryFail extends EntityProcessesDecrementAction {
  readonly type = CART_ADD_ENTRY_FAIL;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      productCode: string;
      quantity: number;
      error: any;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartRemoveEntry extends EntityProcessesIncrementAction {
  readonly type = CART_REMOVE_ENTRY;
  constructor(
    public payload: { cartId: string; userId: string; entryNumber: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartRemoveEntrySuccess extends EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRY_SUCCESS;
  constructor(
    public payload: { userId: string; cartId: string; entryNumber: string }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartRemoveEntryFail extends EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRY_FAIL;
  constructor(
    public payload: {
      error: any;
      cartId: string;
      userId: string;
      entryNumber: string;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartUpdateEntry extends EntityProcessesIncrementAction {
  readonly type = CART_UPDATE_ENTRY;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      entryNumber: string;
      quantity: number;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartUpdateEntrySuccess extends EntityProcessesDecrementAction {
  readonly type = CART_UPDATE_ENTRY_SUCCESS;
  constructor(
    public payload: {
      userId: string;
      cartId: string;
      entryNumber: string;
      quantity?: number;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export class CartUpdateEntryFail extends EntityProcessesDecrementAction {
  readonly type = CART_UPDATE_ENTRY_FAIL;
  constructor(
    public payload: {
      error: any;
      userId: string;
      cartId: string;
      entryNumber: string;
      quantity?: number;
    }
  ) {
    super(MULTI_CART_DATA, payload.cartId);
  }
}

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export type CartEntryAction =
  | CartAddEntry
  | CartAddEntrySuccess
  | CartAddEntryFail
  | CartRemoveEntry
  | CartRemoveEntrySuccess
  | CartRemoveEntryFail
  | CartUpdateEntry
  | CartUpdateEntrySuccess
  | CartUpdateEntryFail;

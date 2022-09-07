/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry } from '@spartacus/cart/base/root';
import { StateUtils } from '@spartacus/core';
import { MULTI_CART_DATA } from '../multi-cart-state';
import {
  CartAddEntryFailPayload,
  CartAddEntryPayload,
  CartAddEntrySuccessPayload,
  CartRemoveEntryFailPayload,
  CartRemoveEntryPayload,
  CartRemoveEntrySuccessPayload,
  CartUpdateEntryFailPayload,
  CartUpdateEntryPayload,
  CartUpdateEntrySuccessPayload,
} from './cart-entry.action.model';

export const CART_ADD_ENTRY = '[Cart-entry] Add Entry';
export const CART_ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
export const CART_ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';
export const CART_REMOVE_ENTRY = '[Cart-entry] Remove Entry';
export const CART_REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
export const CART_REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';

export const CART_UPDATE_ENTRY = '[Cart-entry] Update Entry';
export const CART_UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
export const CART_UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

// TODO:#object-extensibility-deprecation - remove
/**
 * @deprecated since 5.1.0 - a helper method for resolving the types. Will be removed in the future major version
 */
export function isCartAddEntryOption(
  payload:
    | CartAddEntryPayload
    | {
        cartId: string;
        userId: string;
        productCode: string;
        quantity: number;
      }
): payload is CartAddEntryPayload {
  return (payload as CartAddEntryPayload).options !== undefined;
}

// TODO:#object-extensibility-deprecation - remove
/**
 * @deprecated since 5.1.0 - a helper method for resolving the types. Will be removed in the future major version
 */
export function isCartAddEntrySuccessOption(
  payload:
    | CartAddEntrySuccessPayload
    | {
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
): payload is CartAddEntrySuccessPayload {
  return (payload as CartAddEntrySuccessPayload).options !== undefined;
}

// TODO:#object-extensibility-deprecation - remove
/**
 * @deprecated since 5.1.0 - a helper method for resolving the types. Will be removed in the future major version
 */
export function isCartAddEntryFailOption(
  payload:
    | CartAddEntryFailPayload
    | {
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        error: any;
      }
): payload is CartAddEntryFailPayload {
  return (payload as CartAddEntryFailPayload).options !== undefined;
}

// TODO:#object-extensibility-deprecation - remove
/**
 * @deprecated since 5.1.0 - a helper method for resolving the types. Will be removed in the future major version
 */
export function isCartUpdateEntryOption(
  payload:
    | CartUpdateEntryPayload
    | {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity: number;
      }
): payload is CartUpdateEntryPayload {
  return (payload as CartUpdateEntryPayload).options !== undefined;
}

// TODO:#object-extensibility-deprecation - remove
/**
 * @deprecated since 5.1.0 - a helper method for resolving the types. Will be removed in the future major version
 */
export function isCartUpdateEntrySuccessOption(
  payload:
    | CartUpdateEntrySuccessPayload
    | {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity: number;
      }
): payload is CartUpdateEntrySuccessPayload {
  return (payload as CartUpdateEntrySuccessPayload).options !== undefined;
}

// TODO:#object-extensibility-deprecation - remove
/**
 * @deprecated since 5.1.0 - a helper method for resolving the types. Will be removed in the future major version
 */
export function isCartUpdateEntryFailOption(
  payload:
    | CartUpdateEntryFailPayload
    | {
        error: any;
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
      }
): payload is CartUpdateEntryFailPayload {
  return (payload as CartUpdateEntryFailPayload).options !== undefined;
}

// TODO:#object-extensibility-deprecation - remove
/**
 * @deprecated since 5.1.0 - a helper method for resolving the types. Will be removed in the future major version
 */
export function isCartRemoveEntryOption(
  payload:
    | CartRemoveEntryPayload
    | { cartId: string; userId: string; entryNumber: string }
): payload is CartRemoveEntryPayload {
  return (payload as CartRemoveEntryPayload).options !== undefined;
}

// TODO:#object-extensibility-deprecation - remove
/**
 * @deprecated since 5.1.0 - a helper method for resolving the types. Will be removed in the future major version
 */
export function isCartRemoveEntrySuccessOption(
  payload:
    | CartRemoveEntrySuccessPayload
    | { cartId: string; userId: string; entryNumber: string }
): payload is CartRemoveEntrySuccessPayload {
  return (payload as CartRemoveEntrySuccessPayload).options !== undefined;
}

// TODO:#object-extensibility-deprecation - remove
/**
 * @deprecated since 5.1.0 - a helper method for resolving the types. Will be removed in the future major version
 */
export function isCartRemoveEntryFailOption(
  payload:
    | CartRemoveEntryFailPayload
    | {
        error: any;
        cartId: string;
        userId: string;
        entryNumber: string;
      }
): payload is CartRemoveEntryFailPayload {
  return (payload as CartRemoveEntryFailPayload).options !== undefined;
}

export class CartAddEntry extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_ADD_ENTRY;

  /**
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `constructor(payload: CartAddEntryPayload)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  constructor(payload: {
    cartId: string;
    userId: string;
    productCode: string;
    quantity: number;
  });
  // TODO:#object-extensibility-deprecation - remove
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: CartAddEntryPayload);
  constructor(
    // TODO:#object-extensibility-deprecation - use the `public` visibility modifier for the `payload`
    public payload:
      | CartAddEntryPayload
      // TODO:#object-extensibility-deprecation - remove
      | {
          cartId: string;
          userId: string;
          productCode: string;
          quantity: number;
        }
  ) {
    super(
      MULTI_CART_DATA,
      // TODO:#object-extensibility-deprecation - remove the whole expression, and just pass payload.options.cartId
      isCartAddEntryOption(payload) ? payload.options.cartId : payload.cartId
    );
  }
}

export class CartAddEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_ADD_ENTRY_SUCCESS;

  /**
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `constructor(payload: CartAddEntrySuccessPayload)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  constructor(payload: {
    userId: string;
    cartId: string;
    productCode: string;
    quantity: number;
    deliveryModeChanged?: boolean;
    entry?: OrderEntry;
    quantityAdded?: number;
    statusCode?: string;
    statusMessage?: string;
  });
  // TODO:#object-extensibility-deprecation - remove
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: CartAddEntrySuccessPayload);
  constructor(
    // TODO:#object-extensibility-deprecation - use the `public` visibility modifier for the `payload`
    public payload:
      | CartAddEntrySuccessPayload
      // TODO:#object-extensibility-deprecation - remove
      | {
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
    super(
      MULTI_CART_DATA,
      // TODO:#object-extensibility-deprecation - remove the whole expression, and just pass payload.options.cartId
      isCartAddEntrySuccessOption(payload)
        ? payload.options.cartId
        : payload.cartId
    );
  }
}

export class CartAddEntryFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_ADD_ENTRY_FAIL;

  /**
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `constructor(payload: CartAddEntryFailPayload)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  constructor(payload: {
    userId: string;
    cartId: string;
    productCode: string;
    quantity: number;
    error: any;
  });
  // TODO:#object-extensibility-deprecation - remove
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: CartAddEntryFailPayload);
  constructor(
    // TODO:#object-extensibility-deprecation - use the `public` visibility modifier for the `payload`
    public payload:
      | CartAddEntryFailPayload
      // TODO:#object-extensibility-deprecation - remove
      | {
          userId: string;
          cartId: string;
          productCode: string;
          quantity: number;
          error: any;
        }
  ) {
    super(
      MULTI_CART_DATA,
      // TODO:#object-extensibility-deprecation - remove the whole expression, and just pass payload.options.cartId
      isCartAddEntryFailOption(payload)
        ? payload.options.cartId
        : payload.cartId
    );
  }
}

export class CartRemoveEntry extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_REMOVE_ENTRY;

  /**
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `constructor(payload: CartRemoveEntryPayload)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  constructor(payload: { cartId: string; userId: string; entryNumber: string });
  // TODO:#object-extensibility-deprecation - remove
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: CartRemoveEntryPayload);
  constructor(
    // TODO:#object-extensibility-deprecation - use the `public` visibility modifier for the `payload`
    public payload:
      | CartRemoveEntryPayload
      // TODO:#object-extensibility-deprecation - remove
      | { cartId: string; userId: string; entryNumber: string }
  ) {
    super(
      MULTI_CART_DATA,
      // TODO:#object-extensibility-deprecation - remove the whole expression, and just pass payload.options.cartId
      isCartRemoveEntryOption(payload) ? payload.options.cartId : payload.cartId
    );
  }
}

export class CartRemoveEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRY_SUCCESS;

  /**
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `constructor(payload: CartRemoveEntrySuccessPayload)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  constructor(payload: { cartId: string; userId: string; entryNumber: string });
  // TODO:#object-extensibility-deprecation - remove
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: CartRemoveEntrySuccessPayload);
  constructor(
    // TODO:#object-extensibility-deprecation - use the `public` visibility modifier for the `payload`
    public payload:
      | CartRemoveEntrySuccessPayload
      // TODO:#object-extensibility-deprecation - remove
      | { cartId: string; userId: string; entryNumber: string }
  ) {
    super(
      MULTI_CART_DATA,
      // TODO:#object-extensibility-deprecation - remove the whole expression, and just pass payload.options.cartId
      isCartRemoveEntrySuccessOption(payload)
        ? payload.options.cartId
        : payload.cartId
    );
  }
}

export class CartRemoveEntryFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRY_FAIL;

  /**
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `constructor(payload: CartRemoveEntryFailPayload)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  constructor(payload: {
    error: any;
    cartId: string;
    userId: string;
    entryNumber: string;
  });
  // TODO:#object-extensibility-deprecation - remove
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: CartRemoveEntryFailPayload);
  constructor(
    // TODO:#object-extensibility-deprecation - use the `public` visibility modifier for the `payload`
    public payload:
      | CartRemoveEntryFailPayload
      // TODO:#object-extensibility-deprecation - remove
      | {
          error: any;
          cartId: string;
          userId: string;
          entryNumber: string;
        }
  ) {
    super(
      MULTI_CART_DATA,
      // TODO:#object-extensibility-deprecation - remove the whole expression, and just pass payload.options.cartId
      isCartRemoveEntryFailOption(payload)
        ? payload.options.cartId
        : payload.cartId
    );
  }
}

export class CartUpdateEntry extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_UPDATE_ENTRY;

  /**
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `constructor(payload: CartUpdateEntryPayload)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  constructor(payload: {
    userId: string;
    cartId: string;
    entryNumber: string;
    quantity: number;
  });
  // TODO:#object-extensibility-deprecation - remove
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: CartUpdateEntryPayload);
  constructor(
    // TODO:#object-extensibility-deprecation - use the `public` visibility modifier for the `payload`
    public payload:
      | CartUpdateEntryPayload
      // TODO:#object-extensibility-deprecation - remove
      | {
          userId: string;
          cartId: string;
          entryNumber: string;
          quantity: number;
        }
  ) {
    super(
      MULTI_CART_DATA,
      // TODO:#object-extensibility-deprecation - remove the whole expression, and just pass payload.options.cartId
      isCartUpdateEntryOption(payload) ? payload.options.cartId : payload.cartId
    );
  }
}

export class CartUpdateEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_UPDATE_ENTRY_SUCCESS;

  /**
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `constructor(payload: CartUpdateEntrySuccessPayload)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  constructor(payload: {
    userId: string;
    cartId: string;
    entryNumber: string;
    quantity: number;
  });
  // TODO:#object-extensibility-deprecation - remove
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: CartUpdateEntrySuccessPayload);
  constructor(
    // TODO:#object-extensibility-deprecation - use the `public` visibility modifier for the `payload`
    public payload:
      | CartUpdateEntrySuccessPayload
      // TODO:#object-extensibility-deprecation - remove
      | {
          userId: string;
          cartId: string;
          entryNumber: string;
          quantity: number;
        }
  ) {
    super(
      MULTI_CART_DATA,
      // TODO:#object-extensibility-deprecation - remove the whole expression, and just pass payload.options.cartId
      isCartUpdateEntrySuccessOption(payload)
        ? payload.options.cartId
        : payload.cartId
    );
  }
}

export class CartUpdateEntryFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_UPDATE_ENTRY_FAIL;

  /**
   * @deprecated since 5.1.0, and will be removed in the future major version.
   * Instead, use `constructor(payload: CartUpdateEntryFailPayload)`.
   */
  // TODO:#object-extensibility-deprecation - remove
  constructor(payload: {
    error: any;
    userId: string;
    cartId: string;
    entryNumber: string;
    quantity?: number;
  });
  // TODO:#object-extensibility-deprecation - remove
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  constructor(payload: CartUpdateEntryFailPayload);
  constructor(
    // TODO:#object-extensibility-deprecation - use the `public` visibility modifier for the `payload`
    public payload:
      | CartUpdateEntryFailPayload
      // TODO:#object-extensibility-deprecation - remove
      | {
          error: any;
          userId: string;
          cartId: string;
          entryNumber: string;
          quantity?: number;
        }
  ) {
    super(
      MULTI_CART_DATA,
      // TODO:#object-extensibility-deprecation - remove the whole expression, and just pass payload.options.cartId
      isCartUpdateEntryFailOption(payload)
        ? payload.options.cartId
        : payload.cartId
    );
  }
}

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

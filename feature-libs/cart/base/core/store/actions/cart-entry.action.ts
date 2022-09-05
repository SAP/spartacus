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

// TODO:#xxx - handle breaking changes

export const CART_ADD_ENTRY = '[Cart-entry] Add Entry';
export const CART_ADD_ENTRY_SUCCESS = '[Cart-entry] Add Entry Success';
export const CART_ADD_ENTRY_FAIL = '[Cart-entry] Add Entry Fail';
export const CART_REMOVE_ENTRY = '[Cart-entry] Remove Entry';
export const CART_REMOVE_ENTRY_SUCCESS = '[Cart-entry] Remove Entry Success';
export const CART_REMOVE_ENTRY_FAIL = '[Cart-entry] Remove Entry Fail';

export const CART_UPDATE_ENTRY = '[Cart-entry] Update Entry';
export const CART_UPDATE_ENTRY_SUCCESS = '[Cart-entry] Update Entry Success';
export const CART_UPDATE_ENTRY_FAIL = '[Cart-entry] Update Entry Fail';

export class CartAddEntry extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_ADD_ENTRY;

  // TODO:#object-extensibility-deprecation - remove
  payload: CartAddEntryPayload;
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
    payload:
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
      (payload as CartAddEntryPayload).options !== undefined
        ? (payload as CartAddEntryPayload).options.cartId
        : (payload as any).cartId
    );
    // TODO:#object-extensibility-deprecation - remove, and just use payload.options.cartId
    this.payload =
      (payload as CartAddEntryPayload).options !== undefined
        ? (payload as CartAddEntryPayload)
        : {
            options: payload as any,
          };
  }
}

export class CartAddEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_ADD_ENTRY_SUCCESS;

  // TODO:#object-extensibility-deprecation - remove
  payload: CartAddEntrySuccessPayload;
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
    payload:
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
      (payload as CartAddEntrySuccessPayload).options !== undefined
        ? (payload as CartAddEntrySuccessPayload).options.cartId
        : (payload as any).cartId
    );
    // TODO:#object-extensibility-deprecation - remove, and just use payload.options.cartId
    this.payload =
      (payload as CartAddEntrySuccessPayload).options !== undefined
        ? (payload as CartAddEntrySuccessPayload)
        : {
            options: {
              userId: (payload as any).userId,
              cartId: (payload as any).cartId,
              productCode: (payload as any).productCode,
              quantity: (payload as any).quantity,
            },
            result: {
              deliveryModeChanged: (payload as any).deliveryModeChanged,
              entry: (payload as any).entry,
              quantityAdded: (payload as any).quantityAdded,
              statusCode: (payload as any).statusCode,
              statusMessage: (payload as any).statusMessage,
            },
          };
  }
}

export class CartAddEntryFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_ADD_ENTRY_FAIL;

  // TODO:#object-extensibility-deprecation - remove
  payload: CartAddEntryFailPayload;
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
    payload:
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
      (payload as CartAddEntryFailPayload).options !== undefined
        ? (payload as CartAddEntryFailPayload).options.cartId
        : (payload as any).cartId
    );
    // TODO:#object-extensibility-deprecation - remove, and just use payload.options.cartId
    this.payload =
      (payload as CartAddEntryFailPayload).options !== undefined
        ? (payload as CartAddEntryFailPayload)
        : {
            options: {
              userId: (payload as any).userId,
              cartId: (payload as any).cartId,
              productCode: (payload as any).productCode,
              quantity: (payload as any).quantity,
            },
            error: (payload as any).error,
          };
  }
}

export class CartRemoveEntry extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_REMOVE_ENTRY;
  constructor(public payload: CartRemoveEntryPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartRemoveEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRY_SUCCESS;
  constructor(public payload: CartRemoveEntrySuccessPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartRemoveEntryFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_REMOVE_ENTRY_FAIL;
  constructor(public payload: CartRemoveEntryFailPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartUpdateEntry extends StateUtils.EntityProcessesIncrementAction {
  readonly type = CART_UPDATE_ENTRY;
  constructor(public payload: CartUpdateEntryPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartUpdateEntrySuccess extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_UPDATE_ENTRY_SUCCESS;
  constructor(public payload: CartUpdateEntrySuccessPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
  }
}

export class CartUpdateEntryFail extends StateUtils.EntityProcessesDecrementAction {
  readonly type = CART_UPDATE_ENTRY_FAIL;
  constructor(public payload: CartUpdateEntryFailPayload) {
    super(MULTI_CART_DATA, payload.options.cartId);
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

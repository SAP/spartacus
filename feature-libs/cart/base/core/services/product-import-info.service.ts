/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, isDevMode } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import {
  ProductImportInfo,
  ProductImportStatus,
} from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CartActions } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class ProductImportInfoService {
  protected constructor(protected actionsSubject: ActionsSubject) {}

  /**
   * Get emission of add entry results from actions subject
   *
   * @param {string} cartId
   * @returns {Observable<ProductImportInfo>}
   */
  getResults(cartId: string): Observable<ProductImportInfo> {
    return this.actionsSubject.pipe(
      ofType(
        CartActions.CART_ADD_ENTRY_SUCCESS,
        CartActions.CART_ADD_ENTRY_FAIL
      ),
      filter(
        (
          action: CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail
        ) => {
          // TODO:#object-extensibility-deprecation - remove the whole if-else block, and just do this: `return action.payload.options.cartId === cartId`
          let payloadCartId = '';
          if (action instanceof CartActions.CartAddEntrySuccess) {
            payloadCartId = CartActions.isCartAddEntrySuccessOption(
              action.payload
            )
              ? (payloadCartId = action.payload.options.cartId)
              : action.payload.cartId;
          } else {
            payloadCartId = CartActions.isCartAddEntryFailOption(action.payload)
              ? action.payload.options.cartId
              : action.payload.cartId;
          }

          return payloadCartId === cartId;
        }
      ),
      map((action) => this.mapMessages(action))
    );
  }

  /**
   * Map actions to summary messages
   *
   * @param {CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail} action
   * @returns ProductImportInfo
   */
  protected mapMessages(
    action: CartActions.CartAddEntrySuccess | CartActions.CartAddEntryFail
  ): ProductImportInfo {
    let productCode = '';
    if (action instanceof CartActions.CartAddEntrySuccess) {
      // TODO:#object-extensibility-deprecation - just get the property directly from action.payload.options
      ({ productCode } = CartActions.isCartAddEntrySuccessOption(action.payload)
        ? action.payload.options
        : action.payload);
      // TODO:#object-extensibility-deprecation - just get the property directly from action.payload.options
      const { quantity } = CartActions.isCartAddEntrySuccessOption(
        action.payload
      )
        ? action.payload.options
        : action.payload;
      // TODO:#object-extensibility-deprecation - just get the properties directly from action.payload.options
      const { quantityAdded, entry, statusCode } =
        CartActions.isCartAddEntrySuccessOption(action.payload)
          ? action.payload.result
          : action.payload;

      if (statusCode === ProductImportStatus.LOW_STOCK) {
        return {
          productCode,
          statusCode,
          productName: entry?.product?.name,
          quantity,
          quantityAdded,
        };
      }
      if (
        statusCode === ProductImportStatus.SUCCESS ||
        statusCode === ProductImportStatus.NO_STOCK
      ) {
        return { productCode, statusCode, productName: entry?.product?.name };
      }
    } else if (action instanceof CartActions.CartAddEntryFail) {
      const { error } = action.payload;
      if (error?.details[0]?.type === 'UnknownIdentifierError') {
        // TODO:#object-extensibility-deprecation - just get the property directly from action.payload.options
        ({ productCode } = CartActions.isCartAddEntryFailOption(action.payload)
          ? action.payload.options
          : action.payload);
        return {
          productCode,
          statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
        };
      }
    }
    if (isDevMode()) {
      console.warn(
        'Unrecognized cart add entry action type while mapping messages',
        action
      );
    }
    return { productCode, statusCode: ProductImportStatus.UNKNOWN_ERROR };
  }
}

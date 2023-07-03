/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, isDevMode } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import {
  ProductImportInfo,
  ProductImportStatus,
} from '@spartacus/cart/base/root';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CartActions } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class ProductImportInfoService {
  protected logger = inject(LoggerService);
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
        ) => action.payload.cartId === cartId
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
    const { productCode } = action.payload;
    if (action instanceof CartActions.CartAddEntrySuccess) {
      const { quantity, quantityAdded, entry, statusCode } = action.payload;
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
        return {
          productCode,
          statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
        };
      }
    }
    if (isDevMode()) {
      this.logger.warn(
        'Unrecognized cart add entry action type while mapping messages',
        action
      );
    }
    return { productCode, statusCode: ProductImportStatus.UNKNOWN_ERROR };
  }
}

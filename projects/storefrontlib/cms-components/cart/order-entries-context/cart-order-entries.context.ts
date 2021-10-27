import { isDevMode } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { CartActions } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import {
  ProductData,
  ProductImportInfo,
  ProductImportStatus,
} from './import-to-cart.model';

/**
 * An abstract class for contexts based on cart (active cart, saved cart) which share part of logic - mainly handle cart actions and map results.
 */
export abstract class CartOrderEntriesContext {
  protected constructor(protected actionsSubject: ActionsSubject) {}

  addEntries(products: ProductData[]): Observable<ProductImportInfo> {
    return this.add(products).pipe(
      switchMap((cartId: string) => this.getResults(cartId)),
      take(products.length)
    );
  }

  /**
   * Add products and returns cartId of context cart
   *
   * @param { ProductData[] } products
   * @returns {string} cartId - necessary to get results
   */
  protected abstract add(products: ProductData[]): Observable<string>;

  /**
   * Get emission of add entry results from actions subject
   *
   * @param {string} cartId
   * @returns {Observable<ProductImportInfo>}
   */
  protected getResults(cartId: string): Observable<ProductImportInfo> {
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
      console.warn(
        'Unrecognized cart add entry action type while mapping messages',
        action
      );
    }
    return { productCode, statusCode: ProductImportStatus.UNKNOWN_ERROR };
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  CartAddEntrySuccessEvent,
  facadeFactory,
  OrderEntry,
  Product,
} from '@spartacus/core';
import { CART_QUICK_ORDER_CORE_FEATURE } from '../feature-name';

export function quickOrderFacadeFactory() {
  return facadeFactory({
    facade: QuickOrderFacade,
    feature: CART_QUICK_ORDER_CORE_FEATURE,
    methods: [
      'getEntries',
      'getShowError',
      'setShowError',
      'getCartErrors',
      'setCartError',
      'clearCartErrors',
      'search',
      'clearList',
      'loadEntries',
      'updateEntryQuantity',
      'removeEntry',
      'addProduct',
      'getProductAdded',
      'setProductAdded',
      'addToCart',
    ],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: quickOrderFacadeFactory,
})
export abstract class QuickOrderFacade {
  /**
   * Get entries
   */
  abstract getEntries(): BehaviorSubject<OrderEntry[]>;

  /**
   * Get show error flag
   */
  abstract getShowError(): boolean;

  /**
   * Set show error flag
   */
  abstract setShowError(value: boolean): void;

  /**
   * Get cart errors
   */
  abstract getCartErrors(): CartAddEntrySuccessEvent[];

  /**
   * Set cart errors
   */
  abstract setCartError(value: CartAddEntrySuccessEvent[]): void;

  /**
   * Clear cart errors
   */
  abstract clearCartErrors(): void;

  /**
   * Search product using sku
   */
  abstract search(productCode: string): Observable<Product>;

  /**
   * Clear a list of added entries
   */
  abstract clearList(): void;

  /**
   * Load a list of entries
   */
  abstract loadEntries(entries: OrderEntry[]): void;

  /**
   * Load a list of entries
   */
  abstract updateEntryQuantity(entryIndex: number, quantity: number): void;

  /**
   * Remove single entry from the list
   */
  abstract removeEntry(index: number): void;

  /**
   * Add product to the quick order list
   */
  abstract addProduct(product: Product): void;

  /**
   * Return product added subject
   */
  abstract getProductAdded(): Subject<string>;

  /**
   * Set product added subject
   */
  abstract setProductAdded(productCode: string): void;

  /**
   * Adding to cart all products from the list
   */
  abstract addToCart(): Observable<number>;
}

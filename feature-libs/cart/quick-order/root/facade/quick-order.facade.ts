import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { facadeFactory, OrderEntry, Product } from '@spartacus/core';
import { CART_QUICK_ORDER_CORE_FEATURE } from '../feature-name';
import { QuickOrderAddEntryEvent } from '../models/quick-order.model';
import { DeletedEntriesObject } from '@spartacus/cart/quick-order/core';

export function quickOrderFacadeFactory() {
  return facadeFactory({
    facade: QuickOrderFacade,
    feature: CART_QUICK_ORDER_CORE_FEATURE,
    methods: [
      'addProduct',
      'addToCart',
      'clearList',
      'getEntries',
      'getProductAdded',
      'loadEntries',
      'removeEntry',
      'search',
      'setProductAdded',
      'updateEntryQuantity',
      'addDeletedEntry',
      'getDeletedEntries',
      'undoDeletedEntry',
      'clearDeletedEntry',
      'clearTimeoutSubscriptions',
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
   * Search product using query
   */
  abstract search(query: string, maxProducts?: number): Observable<Product[]>;

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
  abstract addToCart(): Observable<[OrderEntry[], QuickOrderAddEntryEvent[]]>;

  /**
   * Add deleted entry
   */
  abstract addDeletedEntry(entry: OrderEntry, clearTimeout: boolean): void;

  /**
   * Return deleted entries
   */
  abstract getDeletedEntries(): Observable<DeletedEntriesObject>;

  /**
   * Undo deleted entry
   */
  abstract undoDeletedEntry(productCode: string): void;

  /**
   * Clear deleted entry from the list
   */
  abstract clearDeletedEntry(productCode: string): void;

  /**
   * Clear all deleted entry timeout subscriptions
   */
  abstract clearTimeoutSubscriptions(): void;
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { facadeFactory, OrderEntry, Product } from '@spartacus/core';
import { CART_QUICK_ORDER_CORE_FEATURE } from '../feature-name';
import { QuickOrderAddEntryEvent } from '../models/quick-order.model';

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
      'softDeleteEntry',
      'search',
      'setProductAdded',
      'updateEntryQuantity',
      'getSoftDeletedEntries',
      'restoreSoftDeletedEntry',
      'hardDeletedEntry',
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
   * Delete single entry from the list
   */
  abstract softDeleteEntry(index: number): void;

  /**
   * @deprecated since 4.2 - use softDeleteEntry instead
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
   * Return soft deleted entries
   */
  abstract getSoftDeletedEntries(): Observable<Record<string, OrderEntry>>;

  /**
   * Restore soft deleted entry
   */
  abstract restoreSoftDeletedEntry(productCode: string): void;

  /**
   * Clear deleted entry from the list
   */
  abstract hardDeletedEntry(productCode: string): void;

  /**
   * Clear all deleted entry timeout subscriptions
   */
  abstract clearTimeoutSubscriptions(): void;
}

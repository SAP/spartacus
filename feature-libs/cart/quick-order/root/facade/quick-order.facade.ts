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
      'canAdd',
      'setListLimit',
      'getEntries',
      'getProductAdded',
      'loadEntries',
      'softDeleteEntry',
      'searchProducts',
      'setProductAdded',
      'updateEntryQuantity',
      'getSoftDeletedEntries',
      'restoreSoftDeletedEntry',
      'hardDeleteEntry',
      'clearDeletedEntries',
      'getNonPurchasableProductError',
      'setNonPurchasableProductError',
      'clearNonPurchasableProductError',
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
   * Search products using query
   */
  abstract searchProducts(
    query: string,
    maxProducts?: number
  ): Observable<Product[]>;

  /**
   * Clear a list of added entries
   */
  abstract clearList(): void;

  /**
   * Get information about the possibility to add the next product
   */
  abstract canAdd(code?: string): Observable<boolean>;

  /**
   * Set quick order list limit property
   */
  abstract setListLimit(limit: number): void;

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
   * Add product to the quick order list
   */
  abstract addProduct(product: Product, quantity?: number): void;

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
  abstract hardDeleteEntry(productCode: string): void;

  /**
   * Clear all deleted entries and timeout subscriptions
   */
  abstract clearDeletedEntries(): void;

  /**
   *  Return non purchasable product error
   */
  abstract getNonPurchasableProductError(): Observable<Product | null>;

  /**
   * Set error that selected product is not purchasable
   */
  abstract setNonPurchasableProductError(product: Product): void;

  /**
   * Clear not purchasable product error
   */
  abstract clearNonPurchasableProductError(): void;
}

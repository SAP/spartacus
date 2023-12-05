import { OrderEntry, ProductData } from '@spartacus/cart/base/root';
import { Product } from '@spartacus/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { QuickOrderAddEntryEvent } from '../models/quick-order.model';
import * as i0 from "@angular/core";
export declare function quickOrderFacadeFactory(): QuickOrderFacade;
export declare abstract class QuickOrderFacade {
    /**
     * Get entries
     */
    abstract getEntries(): BehaviorSubject<OrderEntry[]>;
    /**
     * Search products using query
     */
    abstract searchProducts(query: string, maxProducts?: number): Observable<Product[]>;
    /**
     * Clear a list of added entries
     */
    abstract clearList(): void;
    /**
     * Get information about the possibility to add the next product
     */
    abstract canAdd(code?: string, productsData?: ProductData[]): Observable<boolean>;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickOrderFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QuickOrderFacade>;
}

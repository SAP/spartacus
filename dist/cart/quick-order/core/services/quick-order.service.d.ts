import { OnDestroy } from '@angular/core';
import { ActiveCartFacade, OrderEntry, ProductData } from '@spartacus/cart/base/root';
import { QuickOrderAddEntryEvent, QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { Config, EventService, Product, ProductSearchConnector } from '@spartacus/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class QuickOrderService implements QuickOrderFacade, OnDestroy {
    protected activeCartService: ActiveCartFacade;
    protected config: Config;
    protected eventService: EventService;
    protected productSearchConnector: ProductSearchConnector;
    protected productAdded$: Subject<string>;
    protected entries$: BehaviorSubject<OrderEntry[]>;
    protected softDeletedEntries$: BehaviorSubject<Record<string, OrderEntry>>;
    protected nonPurchasableProductError$: BehaviorSubject<Product | null>;
    protected hardDeleteTimeout: number;
    protected quickOrderListLimit: number;
    protected clearDeleteTimeouts: Record<string, Subscription>;
    constructor(activeCartService: ActiveCartFacade, config: Config, eventService: EventService, productSearchConnector: ProductSearchConnector);
    ngOnDestroy(): void;
    /**
     * Get entries
     */
    getEntries(): BehaviorSubject<OrderEntry[]>;
    /**
     * Search products using query
     */
    searchProducts(query: string, maxProducts?: number): Observable<Product[]>;
    /**
     * Clear a list of added entries
     */
    clearList(): void;
    /**
     * Get information about the possibility to add the next product
     */
    canAdd(code?: string, productData?: ProductData[]): Observable<boolean>;
    /**
     * Set quick order list limit property
     */
    setListLimit(limit: number): void;
    /**
     * Load a list of entries
     */
    loadEntries(entries?: OrderEntry[]): void;
    /**
     * Load a list of entries
     */
    updateEntryQuantity(entryIndex: number, quantity: number): void;
    /**
     * Delete single entry from the list
     */
    softDeleteEntry(index: number): void;
    /**
     * Add product to the quick order list
     */
    addProduct(product: Product, quantity?: number): void;
    /**
     * Return product added subject
     */
    getProductAdded(): Subject<string>;
    /**
     * Set product added subject
     */
    setProductAdded(productCode: string): void;
    /**
     * Adding to cart all products from the list
     */
    addToCart(): Observable<[OrderEntry[], QuickOrderAddEntryEvent[]]>;
    /**
     * Return soft deleted entries
     */
    getSoftDeletedEntries(): Observable<Record<string, OrderEntry>>;
    /**
     * Restore soft deleted entry
     */
    restoreSoftDeletedEntry(productCode: string): void;
    /**
     * Clear deleted entry from the list
     */
    hardDeleteEntry(productCode: string): void;
    /**
     * Clear all deleted entries and timeout subscriptions
     */
    clearDeletedEntries(): void;
    /**
     *  Return non purchasable product error
     */
    getNonPurchasableProductError(): Observable<Product | null>;
    /**
     * Set error that selected product is not purchasable
     */
    setNonPurchasableProductError(product: Product): void;
    /**
     * Clear not purchasable product error
     */
    clearNonPurchasableProductError(): void;
    /**
     * Add soft deleted entry to the cached list
     */
    protected addSoftEntryDeletion(entry: OrderEntry, clearTimeout?: boolean): void;
    /**
     * Get soft deletion entry
     */
    protected getSoftDeletedEntry(productCode: string): OrderEntry;
    /**
     * Generate Order Entry from Product
     */
    protected generateOrderEntry(product: Product, quantity?: number): OrderEntry;
    /**
     * Add single entry to the list
     */
    protected addEntry(entry: OrderEntry): void;
    /**
     * Verify if product is already on the list
     */
    protected isProductOnTheList(productCode: string): boolean;
    protected isLimitExceeded(code?: string, productsData?: ProductData[]): boolean;
    /**
     * Get the index of the missing product in the productsData array identified by code
     * from the entries array.
     */
    protected getMissingProductIndex(entries: OrderEntry[], code: string, productsData: ProductData[]): number;
    private createQuickOrderResultEvent;
    protected clearDeleteTimeout(productCode: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickOrderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QuickOrderService>;
}

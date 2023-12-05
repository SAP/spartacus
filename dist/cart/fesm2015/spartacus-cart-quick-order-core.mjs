import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i1$1 from '@spartacus/cart/quick-order/root';
import { defaultQuickOrderConfig, QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import * as i1 from '@spartacus/cart/base/root';
import { CartAddEntrySuccessEvent, CartAddEntryFailEvent } from '@spartacus/cart/base/root';
import * as i2 from '@spartacus/core';
import { HttpErrorModel, BASE_SITE_CONTEXT_ID, StorageSyncType } from '@spartacus/core';
import { Subject, BehaviorSubject, of, timer, Subscription } from 'rxjs';
import { map, take, first, switchMap, filter, tap } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QuickOrderService {
    constructor(activeCartService, config, eventService, productSearchConnector) {
        var _a, _b;
        this.activeCartService = activeCartService;
        this.config = config;
        this.eventService = eventService;
        this.productSearchConnector = productSearchConnector;
        this.productAdded$ = new Subject();
        this.entries$ = new BehaviorSubject([]);
        this.softDeletedEntries$ = new BehaviorSubject({});
        this.nonPurchasableProductError$ = new BehaviorSubject(null);
        this.hardDeleteTimeout = ((_b = (_a = this.config.quickOrder) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.hardDeleteTimeout) || 7000;
        this.quickOrderListLimit = 0;
        this.clearDeleteTimeouts = {};
    }
    ngOnDestroy() {
        this.clearDeletedEntries();
    }
    /**
     * Get entries
     */
    getEntries() {
        return this.entries$;
    }
    /**
     * Search products using query
     */
    searchProducts(query, maxProducts) {
        var _a, _b;
        // TODO(#14059): Remove condition
        if (this.productSearchConnector) {
            const searchConfig = {
                pageSize: maxProducts ||
                    ((_b = (_a = defaultQuickOrderConfig.quickOrder) === null || _a === void 0 ? void 0 : _a.searchForm) === null || _b === void 0 ? void 0 : _b.maxProducts),
            };
            return this.productSearchConnector
                .search(query, searchConfig)
                .pipe(map((searchPage) => searchPage.products || []));
        }
        else {
            return of([]);
        }
    }
    /**
     * Clear a list of added entries
     */
    clearList() {
        this.entries$.next([]);
    }
    /**
     * Get information about the possibility to add the next product
     */
    canAdd(code, productData) {
        if (code && productData) {
            return of(this.isProductOnTheList(code) ||
                !this.isLimitExceeded(code, productData));
        }
        else if (code) {
            return of(this.isProductOnTheList(code) || !this.isLimitExceeded());
        }
        else {
            return of(!this.isLimitExceeded());
        }
    }
    /**
     * Set quick order list limit property
     */
    setListLimit(limit) {
        this.quickOrderListLimit = limit;
    }
    /**
     * Load a list of entries
     */
    loadEntries(entries = []) {
        this.entries$.next(entries);
    }
    /**
     * Load a list of entries
     */
    updateEntryQuantity(entryIndex, quantity) {
        const entries = this.entries$.getValue() || [];
        entries[entryIndex].quantity = quantity;
        this.entries$.next(entries);
    }
    /**
     * Delete single entry from the list
     */
    softDeleteEntry(index) {
        this.entries$.pipe(take(1)).subscribe((entries) => {
            const entriesList = entries;
            this.addSoftEntryDeletion(entriesList[index], true);
            entriesList.splice(index, 1);
            this.entries$.next(entriesList);
        });
    }
    /**
     * Add product to the quick order list
     */
    addProduct(product, quantity = 1) {
        const entry = this.generateOrderEntry(product, quantity);
        this.addEntry(entry);
    }
    /**
     * Return product added subject
     */
    getProductAdded() {
        return this.productAdded$;
    }
    /**
     * Set product added subject
     */
    setProductAdded(productCode) {
        this.productAdded$.next(productCode);
    }
    /**
     * Adding to cart all products from the list
     */
    addToCart() {
        let entries = [];
        const events = [];
        const subscription = this.eventService
            .get(CartAddEntrySuccessEvent)
            .subscribe((cartEvent) => {
            if (cartEvent.quantityAdded === 0 ||
                (!!cartEvent.quantityAdded &&
                    cartEvent.quantityAdded < cartEvent.quantity)) {
                events.push(this.createQuickOrderResultEvent(cartEvent));
            }
        });
        subscription.add(this.eventService
            .get(CartAddEntryFailEvent)
            .subscribe((cartEvent) => {
            events.push(this.createQuickOrderResultEvent(cartEvent));
        }));
        return this.getEntries().pipe(first(), switchMap((elements) => {
            entries = elements;
            this.activeCartService.addEntries(elements);
            this.clearList();
            return this.activeCartService.isStable();
        }), filter((isStable) => isStable), map(() => [entries, events]), tap(() => subscription.unsubscribe()));
    }
    /**
     * Return soft deleted entries
     */
    getSoftDeletedEntries() {
        return this.softDeletedEntries$;
    }
    /**
     * Restore soft deleted entry
     */
    restoreSoftDeletedEntry(productCode) {
        const entry = this.getSoftDeletedEntry(productCode);
        this.addEntry(entry);
        this.hardDeleteEntry(productCode);
    }
    /**
     * Clear deleted entry from the list
     */
    hardDeleteEntry(productCode) {
        const entry = this.getSoftDeletedEntry(productCode);
        const deletedEntries = this.softDeletedEntries$.getValue();
        if (entry) {
            delete deletedEntries[productCode];
            this.softDeletedEntries$.next(deletedEntries);
        }
        this.clearDeleteTimeout(productCode);
    }
    /**
     * Clear all deleted entries and timeout subscriptions
     */
    clearDeletedEntries() {
        Object.values(this.clearDeleteTimeouts).forEach((subscription) => subscription.unsubscribe());
        this.softDeletedEntries$.next({});
        this.clearDeleteTimeouts = {};
    }
    /**
     *  Return non purchasable product error
     */
    getNonPurchasableProductError() {
        return this.nonPurchasableProductError$;
    }
    /**
     * Set error that selected product is not purchasable
     */
    setNonPurchasableProductError(product) {
        this.nonPurchasableProductError$.next(product);
    }
    /**
     * Clear not purchasable product error
     */
    clearNonPurchasableProductError() {
        this.nonPurchasableProductError$.next(null);
    }
    /**
     * Add soft deleted entry to the cached list
     */
    addSoftEntryDeletion(entry, clearTimeout = true) {
        var _a;
        const deletedEntries = this.softDeletedEntries$.getValue();
        const productCode = (_a = entry === null || entry === void 0 ? void 0 : entry.product) === null || _a === void 0 ? void 0 : _a.code;
        if (productCode) {
            deletedEntries[productCode] = entry;
            this.softDeletedEntries$.next(deletedEntries);
            if (clearTimeout) {
                const subscription = timer(this.hardDeleteTimeout).subscribe(() => {
                    this.hardDeleteEntry(productCode);
                });
                this.clearDeleteTimeouts[productCode] = subscription;
            }
        }
    }
    /**
     * Get soft deletion entry
     */
    getSoftDeletedEntry(productCode) {
        const deletedEntries = this.softDeletedEntries$.getValue();
        return deletedEntries[productCode];
    }
    /**
     * Generate Order Entry from Product
     */
    generateOrderEntry(product, quantity) {
        return {
            basePrice: product.price,
            product,
            quantity,
            totalPrice: product.price,
        };
    }
    /**
     * Add single entry to the list
     */
    addEntry(entry) {
        var _a, _b, _c, _d, _e;
        if (((_a = entry === null || entry === void 0 ? void 0 : entry.product) === null || _a === void 0 ? void 0 : _a.code) &&
            !this.isProductOnTheList(entry.product.code) &&
            this.isLimitExceeded()) {
            return;
        }
        const entries = this.entries$.getValue() || [];
        const entryStockLevel = (_c = (_b = entry.product) === null || _b === void 0 ? void 0 : _b.stock) === null || _c === void 0 ? void 0 : _c.stockLevel;
        if (entryStockLevel && entry.quantity && entry.quantity > entryStockLevel) {
            entry.quantity = entryStockLevel;
        }
        if (((_d = entry.product) === null || _d === void 0 ? void 0 : _d.code) && this.isProductOnTheList(entry.product.code)) {
            const entryIndex = entries.findIndex((item) => { var _a, _b; return ((_a = item.product) === null || _a === void 0 ? void 0 : _a.code) === ((_b = entry.product) === null || _b === void 0 ? void 0 : _b.code); });
            const quantity = entries[entryIndex].quantity;
            if (quantity && entry.quantity) {
                entries[entryIndex].quantity = quantity + (entry === null || entry === void 0 ? void 0 : entry.quantity);
                const newQuantity = entries[entryIndex].quantity;
                if (newQuantity && entryStockLevel && newQuantity > entryStockLevel) {
                    entries[entryIndex].quantity = entryStockLevel;
                }
                this.entries$.next([...entries]);
            }
        }
        else {
            this.entries$.next([...entries, ...[entry]]);
        }
        this.productAdded$.next((_e = entry.product) === null || _e === void 0 ? void 0 : _e.code);
    }
    /**
     * Verify if product is already on the list
     */
    isProductOnTheList(productCode) {
        const entries = this.entries$.getValue() || [];
        return !!entries.find((item) => { var _a; return ((_a = item.product) === null || _a === void 0 ? void 0 : _a.code) === productCode; });
    }
    isLimitExceeded(code, productsData) {
        const entries = this.entries$.getValue() || [];
        /**
         * Used to offset the amount of existing entries with the index of the missing
         * entry to be added. We can use this offset to see if adding the missing product
         * would hit the list limit before we attempt to add it.
         */
        const missingProductIndex = code && productsData
            ? this.getMissingProductIndex(entries, code, productsData)
            : 0;
        return (entries.length + (missingProductIndex || 0) >= this.quickOrderListLimit);
    }
    /**
     * Get the index of the missing product in the productsData array identified by code
     * from the entries array.
     */
    getMissingProductIndex(entries, code, productsData) {
        const missingProducts = (productsData === null || productsData === void 0 ? void 0 : productsData.filter((product) => !entries
            .map((entry) => { var _a; return (_a = entry.product) === null || _a === void 0 ? void 0 : _a.code; })
            .includes(product.productCode))) || [];
        return missingProducts.findIndex((product) => product.productCode === code);
    }
    createQuickOrderResultEvent(cartEvent) {
        var _a, _b, _c;
        const evt = {
            productCode: cartEvent.productCode,
            quantity: cartEvent.quantity,
        };
        if ('entry' in cartEvent) {
            evt.entry = cartEvent.entry;
        }
        if ('quantityAdded' in cartEvent) {
            evt.quantityAdded = cartEvent.quantityAdded;
        }
        if ('error' in cartEvent && cartEvent.error instanceof HttpErrorModel) {
            evt.error = cartEvent.error;
        }
        if ((_b = (_a = evt.error) === null || _a === void 0 ? void 0 : _a.details) === null || _b === void 0 ? void 0 : _b.length) {
            const isOutOfStock = (_c = evt.error) === null || _c === void 0 ? void 0 : _c.details.some((e) => e.type === 'InsufficientStockError');
            evt.quantityAdded = isOutOfStock ? 0 : evt.quantity;
        }
        return evt;
    }
    clearDeleteTimeout(productCode) {
        const clearMessageTimout = this.clearDeleteTimeouts[productCode];
        if (clearMessageTimout) {
            clearMessageTimout.unsubscribe();
            delete this.clearDeleteTimeouts[productCode];
        }
    }
}
QuickOrderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.Config }, { token: i2.EventService }, { token: i2.ProductSearchConnector }], target: i0.ɵɵFactoryTarget.Injectable });
QuickOrderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.Config }, { type: i2.EventService }, { type: i2.ProductSearchConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    QuickOrderService,
    {
        provide: QuickOrderFacade,
        useExisting: QuickOrderService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QuickOrderStatePersistenceService {
    constructor(quickOrderService, siteContextParamsService, statePersistenceService) {
        this.quickOrderService = quickOrderService;
        this.siteContextParamsService = siteContextParamsService;
        this.statePersistenceService = statePersistenceService;
        this.subscription = new Subscription();
        /**
         * Identifier used for storage key.
         */
        this.key = 'quick-order';
    }
    /**
     * Initializes the synchronization between state and browser storage.
     */
    initSync() {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: this.key,
            state$: this.quickOrderService.getEntries(),
            context$: this.siteContextParamsService.getValues([
                BASE_SITE_CONTEXT_ID,
            ]),
            storageType: StorageSyncType.SESSION_STORAGE,
            onRead: (state) => this.onRead(state),
        }));
    }
    onRead(state) {
        if (state) {
            this.quickOrderService.loadEntries(state);
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
QuickOrderStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderStatePersistenceService, deps: [{ token: i1$1.QuickOrderFacade }, { token: i2.SiteContextParamsService }, { token: i2.StatePersistenceService }], target: i0.ɵɵFactoryTarget.Injectable });
QuickOrderStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.QuickOrderFacade }, { type: i2.SiteContextParamsService }, { type: i2.StatePersistenceService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class QuickOrderCoreModule {
    static forRoot() {
        return {
            ngModule: QuickOrderCoreModule,
        };
    }
}
QuickOrderCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QuickOrderCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderCoreModule });
QuickOrderCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderCoreModule, providers: [...facadeProviders, QuickOrderStatePersistenceService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [...facadeProviders, QuickOrderStatePersistenceService],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { QuickOrderCoreModule, QuickOrderService, QuickOrderStatePersistenceService };
//# sourceMappingURL=spartacus-cart-quick-order-core.mjs.map

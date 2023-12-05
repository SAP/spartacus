/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CartAddEntryFailEvent, CartAddEntrySuccessEvent, } from '@spartacus/cart/base/root';
import { defaultQuickOrderConfig, } from '@spartacus/cart/quick-order/root';
import { HttpErrorModel, } from '@spartacus/core';
import { BehaviorSubject, Subject, of, timer, } from 'rxjs';
import { filter, first, map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
export class QuickOrderService {
    constructor(activeCartService, config, eventService, productSearchConnector) {
        this.activeCartService = activeCartService;
        this.config = config;
        this.eventService = eventService;
        this.productSearchConnector = productSearchConnector;
        this.productAdded$ = new Subject();
        this.entries$ = new BehaviorSubject([]);
        this.softDeletedEntries$ = new BehaviorSubject({});
        this.nonPurchasableProductError$ = new BehaviorSubject(null);
        this.hardDeleteTimeout = this.config.quickOrder?.list?.hardDeleteTimeout || 7000;
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
        // TODO(#14059): Remove condition
        if (this.productSearchConnector) {
            const searchConfig = {
                pageSize: maxProducts ||
                    defaultQuickOrderConfig.quickOrder?.searchForm?.maxProducts,
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
        const deletedEntries = this.softDeletedEntries$.getValue();
        const productCode = entry?.product?.code;
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
        if (entry?.product?.code &&
            !this.isProductOnTheList(entry.product.code) &&
            this.isLimitExceeded()) {
            return;
        }
        const entries = this.entries$.getValue() || [];
        const entryStockLevel = entry.product?.stock?.stockLevel;
        if (entryStockLevel && entry.quantity && entry.quantity > entryStockLevel) {
            entry.quantity = entryStockLevel;
        }
        if (entry.product?.code && this.isProductOnTheList(entry.product.code)) {
            const entryIndex = entries.findIndex((item) => item.product?.code === entry.product?.code);
            const quantity = entries[entryIndex].quantity;
            if (quantity && entry.quantity) {
                entries[entryIndex].quantity = quantity + entry?.quantity;
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
        this.productAdded$.next(entry.product?.code);
    }
    /**
     * Verify if product is already on the list
     */
    isProductOnTheList(productCode) {
        const entries = this.entries$.getValue() || [];
        return !!entries.find((item) => item.product?.code === productCode);
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
        const missingProducts = productsData?.filter((product) => !entries
            .map((entry) => entry.product?.code)
            .includes(product.productCode)) || [];
        return missingProducts.findIndex((product) => product.productCode === code);
    }
    createQuickOrderResultEvent(cartEvent) {
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
        if (evt.error?.details?.length) {
            const isOutOfStock = evt.error?.details.some((e) => e.type === 'InsufficientStockError');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3F1aWNrLW9yZGVyL2NvcmUvc2VydmljZXMvcXVpY2stb3JkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBRUwscUJBQXFCLEVBQ3JCLHdCQUF3QixHQUd6QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFHTCx1QkFBdUIsR0FDeEIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBR0wsY0FBYyxHQUtmLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLGVBQWUsRUFFZixPQUFPLEVBRVAsRUFBRSxFQUNGLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzFFLE1BQU0sT0FBTyxpQkFBaUI7SUFjNUIsWUFDWSxpQkFBbUMsRUFDbkMsTUFBYyxFQUNkLFlBQTBCLEVBQzFCLHNCQUE4QztRQUg5QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBakJoRCxrQkFBYSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3ZELGFBQVEsR0FBa0MsSUFBSSxlQUFlLENBRXJFLEVBQUUsQ0FBQyxDQUFDO1FBQ0ksd0JBQW1CLEdBQzNCLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUMsQ0FBQztRQUM1QyxnQ0FBMkIsR0FDbkMsSUFB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LEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWpFLElBQUksa0JBQWtCLEVBQUU7WUFDdEIsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDOzs4R0FuYVUsaUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aXZlQ2FydEZhY2FkZSxcbiAgQ2FydEFkZEVudHJ5RmFpbEV2ZW50LFxuICBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQsXG4gIE9yZGVyRW50cnksXG4gIFByb2R1Y3REYXRhLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIFF1aWNrT3JkZXJBZGRFbnRyeUV2ZW50LFxuICBRdWlja09yZGVyRmFjYWRlLFxuICBkZWZhdWx0UXVpY2tPcmRlckNvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3F1aWNrLW9yZGVyL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ29uZmlnLFxuICBFdmVudFNlcnZpY2UsXG4gIEh0dHBFcnJvck1vZGVsLFxuICBQcm9kdWN0LFxuICBQcm9kdWN0U2VhcmNoQ29ubmVjdG9yLFxuICBQcm9kdWN0U2VhcmNoUGFnZSxcbiAgU2VhcmNoQ29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBPYnNlcnZhYmxlLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpcHRpb24sXG4gIG9mLFxuICB0aW1lcixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBtYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVpY2tPcmRlclNlcnZpY2UgaW1wbGVtZW50cyBRdWlja09yZGVyRmFjYWRlLCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgcHJvZHVjdEFkZGVkJDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICBwcm90ZWN0ZWQgZW50cmllcyQ6IEJlaGF2aW9yU3ViamVjdDxPcmRlckVudHJ5W10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxcbiAgICBPcmRlckVudHJ5W11cbiAgPihbXSk7XG4gIHByb3RlY3RlZCBzb2Z0RGVsZXRlZEVudHJpZXMkOiBCZWhhdmlvclN1YmplY3Q8UmVjb3JkPHN0cmluZywgT3JkZXJFbnRyeT4+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PFJlY29yZDxzdHJpbmcsIE9yZGVyRW50cnk+Pih7fSk7XG4gIHByb3RlY3RlZCBub25QdXJjaGFzYWJsZVByb2R1Y3RFcnJvciQ6IEJlaGF2aW9yU3ViamVjdDxQcm9kdWN0IHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8UHJvZHVjdCB8IG51bGw+KG51bGwpO1xuICBwcm90ZWN0ZWQgaGFyZERlbGV0ZVRpbWVvdXQgPVxuICAgIHRoaXMuY29uZmlnLnF1aWNrT3JkZXI/Lmxpc3Q/LmhhcmREZWxldGVUaW1lb3V0IHx8IDcwMDA7XG4gIHByb3RlY3RlZCBxdWlja09yZGVyTGlzdExpbWl0ID0gMDtcbiAgcHJvdGVjdGVkIGNsZWFyRGVsZXRlVGltZW91dHM6IFJlY29yZDxzdHJpbmcsIFN1YnNjcmlwdGlvbj4gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydFNlcnZpY2U6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnLFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdFNlYXJjaENvbm5lY3RvcjogUHJvZHVjdFNlYXJjaENvbm5lY3RvclxuICApIHt9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckRlbGV0ZWRFbnRyaWVzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGVudHJpZXNcbiAgICovXG4gIGdldEVudHJpZXMoKTogQmVoYXZpb3JTdWJqZWN0PE9yZGVyRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmVudHJpZXMkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCBwcm9kdWN0cyB1c2luZyBxdWVyeVxuICAgKi9cbiAgc2VhcmNoUHJvZHVjdHMocXVlcnk6IHN0cmluZywgbWF4UHJvZHVjdHM/OiBudW1iZXIpOiBPYnNlcnZhYmxlPFByb2R1Y3RbXT4ge1xuICAgIC8vIFRPRE8oIzE0MDU5KTogUmVtb3ZlIGNvbmRpdGlvblxuICAgIGlmICh0aGlzLnByb2R1Y3RTZWFyY2hDb25uZWN0b3IpIHtcbiAgICAgIGNvbnN0IHNlYXJjaENvbmZpZzogU2VhcmNoQ29uZmlnID0ge1xuICAgICAgICBwYWdlU2l6ZTpcbiAgICAgICAgICBtYXhQcm9kdWN0cyB8fFxuICAgICAgICAgIGRlZmF1bHRRdWlja09yZGVyQ29uZmlnLnF1aWNrT3JkZXI/LnNlYXJjaEZvcm0/Lm1heFByb2R1Y3RzLFxuICAgICAgfTtcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RTZWFyY2hDb25uZWN0b3JcbiAgICAgICAgLnNlYXJjaChxdWVyeSwgc2VhcmNoQ29uZmlnKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoKHNlYXJjaFBhZ2U6IFByb2R1Y3RTZWFyY2hQYWdlKSA9PiBzZWFyY2hQYWdlLnByb2R1Y3RzIHx8IFtdKVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2YoW10pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhIGxpc3Qgb2YgYWRkZWQgZW50cmllc1xuICAgKi9cbiAgY2xlYXJMaXN0KCk6IHZvaWQge1xuICAgIHRoaXMuZW50cmllcyQubmV4dChbXSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGluZm9ybWF0aW9uIGFib3V0IHRoZSBwb3NzaWJpbGl0eSB0byBhZGQgdGhlIG5leHQgcHJvZHVjdFxuICAgKi9cbiAgY2FuQWRkKGNvZGU/OiBzdHJpbmcsIHByb2R1Y3REYXRhPzogUHJvZHVjdERhdGFbXSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGlmIChjb2RlICYmIHByb2R1Y3REYXRhKSB7XG4gICAgICByZXR1cm4gb2YoXG4gICAgICAgIHRoaXMuaXNQcm9kdWN0T25UaGVMaXN0KGNvZGUpIHx8XG4gICAgICAgICAgIXRoaXMuaXNMaW1pdEV4Y2VlZGVkKGNvZGUsIHByb2R1Y3REYXRhKVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGNvZGUpIHtcbiAgICAgIHJldHVybiBvZih0aGlzLmlzUHJvZHVjdE9uVGhlTGlzdChjb2RlKSB8fCAhdGhpcy5pc0xpbWl0RXhjZWVkZWQoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZighdGhpcy5pc0xpbWl0RXhjZWVkZWQoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBxdWljayBvcmRlciBsaXN0IGxpbWl0IHByb3BlcnR5XG4gICAqL1xuICBzZXRMaXN0TGltaXQobGltaXQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucXVpY2tPcmRlckxpc3RMaW1pdCA9IGxpbWl0O1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYSBsaXN0IG9mIGVudHJpZXNcbiAgICovXG4gIGxvYWRFbnRyaWVzKGVudHJpZXM6IE9yZGVyRW50cnlbXSA9IFtdKTogdm9pZCB7XG4gICAgdGhpcy5lbnRyaWVzJC5uZXh0KGVudHJpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYSBsaXN0IG9mIGVudHJpZXNcbiAgICovXG4gIHVwZGF0ZUVudHJ5UXVhbnRpdHkoZW50cnlJbmRleDogbnVtYmVyLCBxdWFudGl0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZW50cmllcyQuZ2V0VmFsdWUoKSB8fCBbXTtcbiAgICBlbnRyaWVzW2VudHJ5SW5kZXhdLnF1YW50aXR5ID0gcXVhbnRpdHk7XG5cbiAgICB0aGlzLmVudHJpZXMkLm5leHQoZW50cmllcyk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlIHNpbmdsZSBlbnRyeSBmcm9tIHRoZSBsaXN0XG4gICAqL1xuICBzb2Z0RGVsZXRlRW50cnkoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZW50cmllcyQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKGVudHJpZXM6IE9yZGVyRW50cnlbXSkgPT4ge1xuICAgICAgY29uc3QgZW50cmllc0xpc3QgPSBlbnRyaWVzO1xuICAgICAgdGhpcy5hZGRTb2Z0RW50cnlEZWxldGlvbihlbnRyaWVzTGlzdFtpbmRleF0sIHRydWUpO1xuICAgICAgZW50cmllc0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMuZW50cmllcyQubmV4dChlbnRyaWVzTGlzdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHByb2R1Y3QgdG8gdGhlIHF1aWNrIG9yZGVyIGxpc3RcbiAgICovXG4gIGFkZFByb2R1Y3QocHJvZHVjdDogUHJvZHVjdCwgcXVhbnRpdHk6IG51bWJlciA9IDEpOiB2b2lkIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2VuZXJhdGVPcmRlckVudHJ5KHByb2R1Y3QsIHF1YW50aXR5KTtcbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gcHJvZHVjdCBhZGRlZCBzdWJqZWN0XG4gICAqL1xuICBnZXRQcm9kdWN0QWRkZWQoKTogU3ViamVjdDxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9kdWN0QWRkZWQkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBwcm9kdWN0IGFkZGVkIHN1YmplY3RcbiAgICovXG4gIHNldFByb2R1Y3RBZGRlZChwcm9kdWN0Q29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5wcm9kdWN0QWRkZWQkLm5leHQocHJvZHVjdENvZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZGluZyB0byBjYXJ0IGFsbCBwcm9kdWN0cyBmcm9tIHRoZSBsaXN0XG4gICAqL1xuICBhZGRUb0NhcnQoKTogT2JzZXJ2YWJsZTxbT3JkZXJFbnRyeVtdLCBRdWlja09yZGVyQWRkRW50cnlFdmVudFtdXT4ge1xuICAgIGxldCBlbnRyaWVzOiBPcmRlckVudHJ5W10gPSBbXTtcbiAgICBjb25zdCBldmVudHM6IFF1aWNrT3JkZXJBZGRFbnRyeUV2ZW50W10gPSBbXTtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgLmdldChDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQpXG4gICAgICAuc3Vic2NyaWJlKChjYXJ0RXZlbnQ6IENhcnRBZGRFbnRyeVN1Y2Nlc3NFdmVudCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY2FydEV2ZW50LnF1YW50aXR5QWRkZWQgPT09IDAgfHxcbiAgICAgICAgICAoISFjYXJ0RXZlbnQucXVhbnRpdHlBZGRlZCAmJlxuICAgICAgICAgICAgY2FydEV2ZW50LnF1YW50aXR5QWRkZWQgPCBjYXJ0RXZlbnQucXVhbnRpdHkpXG4gICAgICAgICkge1xuICAgICAgICAgIGV2ZW50cy5wdXNoKHRoaXMuY3JlYXRlUXVpY2tPcmRlclJlc3VsdEV2ZW50KGNhcnRFdmVudCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZVxuICAgICAgICAuZ2V0KENhcnRBZGRFbnRyeUZhaWxFdmVudClcbiAgICAgICAgLnN1YnNjcmliZSgoY2FydEV2ZW50OiBDYXJ0QWRkRW50cnlGYWlsRXZlbnQpID0+IHtcbiAgICAgICAgICBldmVudHMucHVzaCh0aGlzLmNyZWF0ZVF1aWNrT3JkZXJSZXN1bHRFdmVudChjYXJ0RXZlbnQpKTtcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RW50cmllcygpLnBpcGUoXG4gICAgICBmaXJzdCgpLFxuICAgICAgc3dpdGNoTWFwKChlbGVtZW50cykgPT4ge1xuICAgICAgICBlbnRyaWVzID0gZWxlbWVudHM7XG4gICAgICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2UuYWRkRW50cmllcyhlbGVtZW50cyk7XG4gICAgICAgIHRoaXMuY2xlYXJMaXN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2UuaXNTdGFibGUoKTtcbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKChpc1N0YWJsZSkgPT4gaXNTdGFibGUpLFxuICAgICAgbWFwKCgpID0+IFtlbnRyaWVzLCBldmVudHNdIGFzIFtPcmRlckVudHJ5W10sIFF1aWNrT3JkZXJBZGRFbnRyeUV2ZW50W11dKSxcbiAgICAgIHRhcCgoKSA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBzb2Z0IGRlbGV0ZWQgZW50cmllc1xuICAgKi9cbiAgZ2V0U29mdERlbGV0ZWRFbnRyaWVzKCk6IE9ic2VydmFibGU8UmVjb3JkPHN0cmluZywgT3JkZXJFbnRyeT4+IHtcbiAgICByZXR1cm4gdGhpcy5zb2Z0RGVsZXRlZEVudHJpZXMkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3RvcmUgc29mdCBkZWxldGVkIGVudHJ5XG4gICAqL1xuICByZXN0b3JlU29mdERlbGV0ZWRFbnRyeShwcm9kdWN0Q29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldFNvZnREZWxldGVkRW50cnkocHJvZHVjdENvZGUpO1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gICAgdGhpcy5oYXJkRGVsZXRlRW50cnkocHJvZHVjdENvZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGRlbGV0ZWQgZW50cnkgZnJvbSB0aGUgbGlzdFxuICAgKi9cbiAgaGFyZERlbGV0ZUVudHJ5KHByb2R1Y3RDb2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0U29mdERlbGV0ZWRFbnRyeShwcm9kdWN0Q29kZSk7XG4gICAgY29uc3QgZGVsZXRlZEVudHJpZXMgPSB0aGlzLnNvZnREZWxldGVkRW50cmllcyQuZ2V0VmFsdWUoKTtcblxuICAgIGlmIChlbnRyeSkge1xuICAgICAgZGVsZXRlIGRlbGV0ZWRFbnRyaWVzW3Byb2R1Y3RDb2RlXTtcbiAgICAgIHRoaXMuc29mdERlbGV0ZWRFbnRyaWVzJC5uZXh0KGRlbGV0ZWRFbnRyaWVzKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsZWFyRGVsZXRlVGltZW91dChwcm9kdWN0Q29kZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYWxsIGRlbGV0ZWQgZW50cmllcyBhbmQgdGltZW91dCBzdWJzY3JpcHRpb25zXG4gICAqL1xuICBjbGVhckRlbGV0ZWRFbnRyaWVzKCk6IHZvaWQge1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5jbGVhckRlbGV0ZVRpbWVvdXRzKS5mb3JFYWNoKFxuICAgICAgKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxuICAgICk7XG5cbiAgICB0aGlzLnNvZnREZWxldGVkRW50cmllcyQubmV4dCh7fSk7XG4gICAgdGhpcy5jbGVhckRlbGV0ZVRpbWVvdXRzID0ge307XG4gIH1cblxuICAvKipcbiAgICogIFJldHVybiBub24gcHVyY2hhc2FibGUgcHJvZHVjdCBlcnJvclxuICAgKi9cbiAgZ2V0Tm9uUHVyY2hhc2FibGVQcm9kdWN0RXJyb3IoKTogT2JzZXJ2YWJsZTxQcm9kdWN0IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLm5vblB1cmNoYXNhYmxlUHJvZHVjdEVycm9yJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZXJyb3IgdGhhdCBzZWxlY3RlZCBwcm9kdWN0IGlzIG5vdCBwdXJjaGFzYWJsZVxuICAgKi9cbiAgc2V0Tm9uUHVyY2hhc2FibGVQcm9kdWN0RXJyb3IocHJvZHVjdDogUHJvZHVjdCk6IHZvaWQge1xuICAgIHRoaXMubm9uUHVyY2hhc2FibGVQcm9kdWN0RXJyb3IkLm5leHQocHJvZHVjdCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgbm90IHB1cmNoYXNhYmxlIHByb2R1Y3QgZXJyb3JcbiAgICovXG4gIGNsZWFyTm9uUHVyY2hhc2FibGVQcm9kdWN0RXJyb3IoKTogdm9pZCB7XG4gICAgdGhpcy5ub25QdXJjaGFzYWJsZVByb2R1Y3RFcnJvciQubmV4dChudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc29mdCBkZWxldGVkIGVudHJ5IHRvIHRoZSBjYWNoZWQgbGlzdFxuICAgKi9cbiAgcHJvdGVjdGVkIGFkZFNvZnRFbnRyeURlbGV0aW9uKFxuICAgIGVudHJ5OiBPcmRlckVudHJ5LFxuICAgIGNsZWFyVGltZW91dDogYm9vbGVhbiA9IHRydWVcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZGVsZXRlZEVudHJpZXMgPSB0aGlzLnNvZnREZWxldGVkRW50cmllcyQuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBwcm9kdWN0Q29kZSA9IGVudHJ5Py5wcm9kdWN0Py5jb2RlO1xuXG4gICAgaWYgKHByb2R1Y3RDb2RlKSB7XG4gICAgICBkZWxldGVkRW50cmllc1twcm9kdWN0Q29kZV0gPSBlbnRyeTtcblxuICAgICAgdGhpcy5zb2Z0RGVsZXRlZEVudHJpZXMkLm5leHQoZGVsZXRlZEVudHJpZXMpO1xuXG4gICAgICBpZiAoY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gdGltZXIoXG4gICAgICAgICAgdGhpcy5oYXJkRGVsZXRlVGltZW91dFxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYXJkRGVsZXRlRW50cnkocHJvZHVjdENvZGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNsZWFyRGVsZXRlVGltZW91dHNbcHJvZHVjdENvZGVdID0gc3Vic2NyaXB0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc29mdCBkZWxldGlvbiBlbnRyeVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFNvZnREZWxldGVkRW50cnkocHJvZHVjdENvZGU6IHN0cmluZyk6IE9yZGVyRW50cnkge1xuICAgIGNvbnN0IGRlbGV0ZWRFbnRyaWVzID0gdGhpcy5zb2Z0RGVsZXRlZEVudHJpZXMkLmdldFZhbHVlKCk7XG5cbiAgICByZXR1cm4gZGVsZXRlZEVudHJpZXNbcHJvZHVjdENvZGVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIE9yZGVyIEVudHJ5IGZyb20gUHJvZHVjdFxuICAgKi9cbiAgcHJvdGVjdGVkIGdlbmVyYXRlT3JkZXJFbnRyeShcbiAgICBwcm9kdWN0OiBQcm9kdWN0LFxuICAgIHF1YW50aXR5PzogbnVtYmVyXG4gICk6IE9yZGVyRW50cnkge1xuICAgIHJldHVybiB7XG4gICAgICBiYXNlUHJpY2U6IHByb2R1Y3QucHJpY2UsXG4gICAgICBwcm9kdWN0LFxuICAgICAgcXVhbnRpdHksXG4gICAgICB0b3RhbFByaWNlOiBwcm9kdWN0LnByaWNlLFxuICAgIH0gYXMgT3JkZXJFbnRyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2luZ2xlIGVudHJ5IHRvIHRoZSBsaXN0XG4gICAqL1xuICBwcm90ZWN0ZWQgYWRkRW50cnkoZW50cnk6IE9yZGVyRW50cnkpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICBlbnRyeT8ucHJvZHVjdD8uY29kZSAmJlxuICAgICAgIXRoaXMuaXNQcm9kdWN0T25UaGVMaXN0KGVudHJ5LnByb2R1Y3QuY29kZSkgJiZcbiAgICAgIHRoaXMuaXNMaW1pdEV4Y2VlZGVkKClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5lbnRyaWVzJC5nZXRWYWx1ZSgpIHx8IFtdO1xuICAgIGNvbnN0IGVudHJ5U3RvY2tMZXZlbCA9IGVudHJ5LnByb2R1Y3Q/LnN0b2NrPy5zdG9ja0xldmVsO1xuXG4gICAgaWYgKGVudHJ5U3RvY2tMZXZlbCAmJiBlbnRyeS5xdWFudGl0eSAmJiBlbnRyeS5xdWFudGl0eSA+IGVudHJ5U3RvY2tMZXZlbCkge1xuICAgICAgZW50cnkucXVhbnRpdHkgPSBlbnRyeVN0b2NrTGV2ZWw7XG4gICAgfVxuXG4gICAgaWYgKGVudHJ5LnByb2R1Y3Q/LmNvZGUgJiYgdGhpcy5pc1Byb2R1Y3RPblRoZUxpc3QoZW50cnkucHJvZHVjdC5jb2RlKSkge1xuICAgICAgY29uc3QgZW50cnlJbmRleCA9IGVudHJpZXMuZmluZEluZGV4KFxuICAgICAgICAoaXRlbTogT3JkZXJFbnRyeSkgPT4gaXRlbS5wcm9kdWN0Py5jb2RlID09PSBlbnRyeS5wcm9kdWN0Py5jb2RlXG4gICAgICApO1xuICAgICAgY29uc3QgcXVhbnRpdHkgPSBlbnRyaWVzW2VudHJ5SW5kZXhdLnF1YW50aXR5O1xuXG4gICAgICBpZiAocXVhbnRpdHkgJiYgZW50cnkucXVhbnRpdHkpIHtcbiAgICAgICAgZW50cmllc1tlbnRyeUluZGV4XS5xdWFudGl0eSA9IHF1YW50aXR5ICsgZW50cnk/LnF1YW50aXR5O1xuICAgICAgICBjb25zdCBuZXdRdWFudGl0eSA9IGVudHJpZXNbZW50cnlJbmRleF0ucXVhbnRpdHk7XG5cbiAgICAgICAgaWYgKG5ld1F1YW50aXR5ICYmIGVudHJ5U3RvY2tMZXZlbCAmJiBuZXdRdWFudGl0eSA+IGVudHJ5U3RvY2tMZXZlbCkge1xuICAgICAgICAgIGVudHJpZXNbZW50cnlJbmRleF0ucXVhbnRpdHkgPSBlbnRyeVN0b2NrTGV2ZWw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVudHJpZXMkLm5leHQoWy4uLmVudHJpZXNdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnRyaWVzJC5uZXh0KFsuLi5lbnRyaWVzLCAuLi5bZW50cnldXSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9kdWN0QWRkZWQkLm5leHQoZW50cnkucHJvZHVjdD8uY29kZSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmeSBpZiBwcm9kdWN0IGlzIGFscmVhZHkgb24gdGhlIGxpc3RcbiAgICovXG4gIHByb3RlY3RlZCBpc1Byb2R1Y3RPblRoZUxpc3QocHJvZHVjdENvZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmVudHJpZXMkLmdldFZhbHVlKCkgfHwgW107XG5cbiAgICByZXR1cm4gISFlbnRyaWVzLmZpbmQoXG4gICAgICAoaXRlbTogT3JkZXJFbnRyeSkgPT4gaXRlbS5wcm9kdWN0Py5jb2RlID09PSBwcm9kdWN0Q29kZVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNMaW1pdEV4Y2VlZGVkKFxuICAgIGNvZGU/OiBzdHJpbmcsXG4gICAgcHJvZHVjdHNEYXRhPzogUHJvZHVjdERhdGFbXVxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5lbnRyaWVzJC5nZXRWYWx1ZSgpIHx8IFtdO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBvZmZzZXQgdGhlIGFtb3VudCBvZiBleGlzdGluZyBlbnRyaWVzIHdpdGggdGhlIGluZGV4IG9mIHRoZSBtaXNzaW5nXG4gICAgICogZW50cnkgdG8gYmUgYWRkZWQuIFdlIGNhbiB1c2UgdGhpcyBvZmZzZXQgdG8gc2VlIGlmIGFkZGluZyB0aGUgbWlzc2luZyBwcm9kdWN0XG4gICAgICogd291bGQgaGl0IHRoZSBsaXN0IGxpbWl0IGJlZm9yZSB3ZSBhdHRlbXB0IHRvIGFkZCBpdC5cbiAgICAgKi9cbiAgICBjb25zdCBtaXNzaW5nUHJvZHVjdEluZGV4ID1cbiAgICAgIGNvZGUgJiYgcHJvZHVjdHNEYXRhXG4gICAgICAgID8gdGhpcy5nZXRNaXNzaW5nUHJvZHVjdEluZGV4KGVudHJpZXMsIGNvZGUsIHByb2R1Y3RzRGF0YSlcbiAgICAgICAgOiAwO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGVudHJpZXMubGVuZ3RoICsgKG1pc3NpbmdQcm9kdWN0SW5kZXggfHwgMCkgPj0gdGhpcy5xdWlja09yZGVyTGlzdExpbWl0XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGluZGV4IG9mIHRoZSBtaXNzaW5nIHByb2R1Y3QgaW4gdGhlIHByb2R1Y3RzRGF0YSBhcnJheSBpZGVudGlmaWVkIGJ5IGNvZGVcbiAgICogZnJvbSB0aGUgZW50cmllcyBhcnJheS5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRNaXNzaW5nUHJvZHVjdEluZGV4KFxuICAgIGVudHJpZXM6IE9yZGVyRW50cnlbXSxcbiAgICBjb2RlOiBzdHJpbmcsXG4gICAgcHJvZHVjdHNEYXRhOiBQcm9kdWN0RGF0YVtdXG4gICkge1xuICAgIGNvbnN0IG1pc3NpbmdQcm9kdWN0cyA9XG4gICAgICBwcm9kdWN0c0RhdGE/LmZpbHRlcihcbiAgICAgICAgKHByb2R1Y3QpID0+XG4gICAgICAgICAgIWVudHJpZXNcbiAgICAgICAgICAgIC5tYXAoKGVudHJ5KSA9PiBlbnRyeS5wcm9kdWN0Py5jb2RlKVxuICAgICAgICAgICAgLmluY2x1ZGVzKHByb2R1Y3QucHJvZHVjdENvZGUpXG4gICAgICApIHx8IFtdO1xuICAgIHJldHVybiBtaXNzaW5nUHJvZHVjdHMuZmluZEluZGV4KChwcm9kdWN0KSA9PiBwcm9kdWN0LnByb2R1Y3RDb2RlID09PSBjb2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUXVpY2tPcmRlclJlc3VsdEV2ZW50KFxuICAgIGNhcnRFdmVudDogQ2FydEFkZEVudHJ5U3VjY2Vzc0V2ZW50IHwgQ2FydEFkZEVudHJ5RmFpbEV2ZW50XG4gICk6IFF1aWNrT3JkZXJBZGRFbnRyeUV2ZW50IHtcbiAgICBjb25zdCBldnQ6IFF1aWNrT3JkZXJBZGRFbnRyeUV2ZW50ID0ge1xuICAgICAgcHJvZHVjdENvZGU6IGNhcnRFdmVudC5wcm9kdWN0Q29kZSxcbiAgICAgIHF1YW50aXR5OiBjYXJ0RXZlbnQucXVhbnRpdHksXG4gICAgfTtcblxuICAgIGlmICgnZW50cnknIGluIGNhcnRFdmVudCkge1xuICAgICAgZXZ0LmVudHJ5ID0gY2FydEV2ZW50LmVudHJ5O1xuICAgIH1cbiAgICBpZiAoJ3F1YW50aXR5QWRkZWQnIGluIGNhcnRFdmVudCkge1xuICAgICAgZXZ0LnF1YW50aXR5QWRkZWQgPSBjYXJ0RXZlbnQucXVhbnRpdHlBZGRlZDtcbiAgICB9XG4gICAgaWYgKCdlcnJvcicgaW4gY2FydEV2ZW50ICYmIGNhcnRFdmVudC5lcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvck1vZGVsKSB7XG4gICAgICBldnQuZXJyb3IgPSBjYXJ0RXZlbnQuZXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKGV2dC5lcnJvcj8uZGV0YWlscz8ubGVuZ3RoKSB7XG4gICAgICBjb25zdCBpc091dE9mU3RvY2sgPSBldnQuZXJyb3I/LmRldGFpbHMuc29tZShcbiAgICAgICAgKGUpID0+IGUudHlwZSA9PT0gJ0luc3VmZmljaWVudFN0b2NrRXJyb3InXG4gICAgICApO1xuICAgICAgZXZ0LnF1YW50aXR5QWRkZWQgPSBpc091dE9mU3RvY2sgPyAwIDogZXZ0LnF1YW50aXR5O1xuICAgIH1cblxuICAgIHJldHVybiBldnQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xlYXJEZWxldGVUaW1lb3V0KHByb2R1Y3RDb2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBjbGVhck1lc3NhZ2VUaW1vdXQgPSB0aGlzLmNsZWFyRGVsZXRlVGltZW91dHNbcHJvZHVjdENvZGVdO1xuXG4gICAgaWYgKGNsZWFyTWVzc2FnZVRpbW91dCkge1xuICAgICAgY2xlYXJNZXNzYWdlVGltb3V0LnVuc3Vic2NyaWJlKCk7XG4gICAgICBkZWxldGUgdGhpcy5jbGVhckRlbGV0ZVRpbWVvdXRzW3Byb2R1Y3RDb2RlXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
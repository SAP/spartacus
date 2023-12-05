/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./stock.adapter";
/**
 * Connector for finding stock levels of a product in stores.
 */
export class StockConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    /**
     * Finds stock levels of a product at stores near a location.
     * @param productCode the product code of the product to find stock levels for
     * @param location the location to find stock levels at, either lat long or free text search
     */
    loadStockLevels(productCode, location) {
        return this.adapter.loadStockLevels(productCode, location);
    }
    /**
     * Finds stock levels of a product at an individual store.
     * @param productCode the product code of the product to find stock levels for
     * @param storeName the name of the store to find stock levels at
     */
    loadStockLevelAtStore(productCode, storeName) {
        return this.adapter.loadStockLevelAtStore(productCode, storeName);
    }
}
StockConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockConnector, deps: [{ token: i1.StockAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
StockConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StockConnector, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.StockAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvY2suY29ubmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb3JlL2Nvbm5lY3RvcnMvc3RvY2suY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8sY0FBYztJQUN6QixZQUFzQixPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO0lBQUcsQ0FBQztJQUUvQzs7OztPQUlHO0lBQ0gsZUFBZSxDQUNiLFdBQW1CLEVBQ25CLFFBQThCO1FBRTlCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gscUJBQXFCLENBQ25CLFdBQW1CLEVBQ25CLFNBQWlCO1FBRWpCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7MkdBekJVLGNBQWM7K0dBQWQsY0FBYyxjQURELE1BQU07MkZBQ25CLGNBQWM7a0JBRDFCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvY2ssIFN0b3JlRmluZGVyU3RvY2tTZWFyY2hQYWdlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExvY2F0aW9uU2VhcmNoUGFyYW1zIH0gZnJvbSAnQHNwYXJ0YWN1cy9waWNrdXAtaW4tc3RvcmUvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdG9ja0FkYXB0ZXIgfSBmcm9tICcuL3N0b2NrLmFkYXB0ZXInO1xuXG4vKipcbiAqIENvbm5lY3RvciBmb3IgZmluZGluZyBzdG9jayBsZXZlbHMgb2YgYSBwcm9kdWN0IGluIHN0b3Jlcy5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBTdG9ja0Nvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGFwdGVyOiBTdG9ja0FkYXB0ZXIpIHt9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHN0b2NrIGxldmVscyBvZiBhIHByb2R1Y3QgYXQgc3RvcmVzIG5lYXIgYSBsb2NhdGlvbi5cbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlIHRoZSBwcm9kdWN0IGNvZGUgb2YgdGhlIHByb2R1Y3QgdG8gZmluZCBzdG9jayBsZXZlbHMgZm9yXG4gICAqIEBwYXJhbSBsb2NhdGlvbiB0aGUgbG9jYXRpb24gdG8gZmluZCBzdG9jayBsZXZlbHMgYXQsIGVpdGhlciBsYXQgbG9uZyBvciBmcmVlIHRleHQgc2VhcmNoXG4gICAqL1xuICBsb2FkU3RvY2tMZXZlbHMoXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZyxcbiAgICBsb2NhdGlvbjogTG9jYXRpb25TZWFyY2hQYXJhbXNcbiAgKTogT2JzZXJ2YWJsZTxTdG9yZUZpbmRlclN0b2NrU2VhcmNoUGFnZT4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIubG9hZFN0b2NrTGV2ZWxzKHByb2R1Y3RDb2RlLCBsb2NhdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgc3RvY2sgbGV2ZWxzIG9mIGEgcHJvZHVjdCBhdCBhbiBpbmRpdmlkdWFsIHN0b3JlLlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGUgdGhlIHByb2R1Y3QgY29kZSBvZiB0aGUgcHJvZHVjdCB0byBmaW5kIHN0b2NrIGxldmVscyBmb3JcbiAgICogQHBhcmFtIHN0b3JlTmFtZSB0aGUgbmFtZSBvZiB0aGUgc3RvcmUgdG8gZmluZCBzdG9jayBsZXZlbHMgYXRcbiAgICovXG4gIGxvYWRTdG9ja0xldmVsQXRTdG9yZShcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nLFxuICAgIHN0b3JlTmFtZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8U3RvY2s+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmxvYWRTdG9ja0xldmVsQXRTdG9yZShwcm9kdWN0Q29kZSwgc3RvcmVOYW1lKTtcbiAgfVxufVxuIl19
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./future-stock.adapter";
export class FutureStockConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getFutureStock(userId, productCode) {
        return this.adapter.getFutureStock(userId, productCode);
    }
    getFutureStocks(userId, productCodes) {
        return this.adapter.getFutureStocks(userId, productCodes);
    }
}
FutureStockConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockConnector, deps: [{ token: i1.FutureStockAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
FutureStockConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FutureStockAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLXN0b2NrLmNvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L2Z1dHVyZS1zdG9jay9jb3JlL2Nvbm5lY3RvcnMvZnV0dXJlLXN0b2NrLmNvbm5lY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUzNDLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFBc0IsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFBRyxDQUFDO0lBRTlDLGNBQWMsQ0FDbkIsTUFBYyxFQUNkLFdBQW1CO1FBRW5CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSxlQUFlLENBQ3BCLE1BQWMsRUFDZCxZQUFvQjtRQUVwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM1RCxDQUFDOztpSEFmVSxvQkFBb0I7cUhBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgUHJvZHVjdEZ1dHVyZVN0b2NrLFxuICBQcm9kdWN0RnV0dXJlU3RvY2tMaXN0LFxufSBmcm9tICcuLi9tb2RlbC9mdXR1cmUtc3RvY2subW9kZWwnO1xuaW1wb3J0IHsgRnV0dXJlU3RvY2tBZGFwdGVyIH0gZnJvbSAnLi9mdXR1cmUtc3RvY2suYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGdXR1cmVTdG9ja0Nvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGFwdGVyOiBGdXR1cmVTdG9ja0FkYXB0ZXIpIHt9XG5cbiAgcHVibGljIGdldEZ1dHVyZVN0b2NrKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxQcm9kdWN0RnV0dXJlU3RvY2s+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmdldEZ1dHVyZVN0b2NrKHVzZXJJZCwgcHJvZHVjdENvZGUpO1xuICB9XG5cbiAgcHVibGljIGdldEZ1dHVyZVN0b2NrcyhcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBwcm9kdWN0Q29kZXM6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFByb2R1Y3RGdXR1cmVTdG9ja0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmdldEZ1dHVyZVN0b2Nrcyh1c2VySWQsIHByb2R1Y3RDb2Rlcyk7XG4gIH1cbn1cbiJdfQ==
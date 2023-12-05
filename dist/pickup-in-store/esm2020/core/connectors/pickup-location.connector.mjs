/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./pickup-location.adapter";
/**
 * Connector for getting store details.
 */
export class PickupLocationConnector {
    constructor(adapter) {
        this.adapter = adapter;
        // Intentional empty constructor
    }
    /**
     * Get the store details by store name.
     * @param storeName The store name to get details for
     */
    getStoreDetails(storeName) {
        return this.adapter.getStoreDetails(storeName);
    }
}
PickupLocationConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationConnector, deps: [{ token: i1.PickupLocationAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
PickupLocationConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationConnector, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.PickupLocationAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWxvY2F0aW9uLmNvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9waWNrdXAtaW4tc3RvcmUvY29yZS9jb25uZWN0b3JzL3BpY2t1cC1sb2NhdGlvbi5jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUszQzs7R0FFRztBQUVILE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFBc0IsT0FBOEI7UUFBOUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFDbEQsZ0NBQWdDO0lBQ2xDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlLENBQUMsU0FBaUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxDQUFDOztvSEFYVSx1QkFBdUI7d0hBQXZCLHVCQUF1QixjQURWLE1BQU07MkZBQ25CLHVCQUF1QjtrQkFEbkMsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2ludE9mU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQaWNrdXBMb2NhdGlvbkFkYXB0ZXIgfSBmcm9tICcuL3BpY2t1cC1sb2NhdGlvbi5hZGFwdGVyJztcblxuLyoqXG4gKiBDb25uZWN0b3IgZm9yIGdldHRpbmcgc3RvcmUgZGV0YWlscy5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBQaWNrdXBMb2NhdGlvbkNvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGFwdGVyOiBQaWNrdXBMb2NhdGlvbkFkYXB0ZXIpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3RvcmUgZGV0YWlscyBieSBzdG9yZSBuYW1lLlxuICAgKiBAcGFyYW0gc3RvcmVOYW1lIFRoZSBzdG9yZSBuYW1lIHRvIGdldCBkZXRhaWxzIGZvclxuICAgKi9cbiAgZ2V0U3RvcmVEZXRhaWxzKHN0b3JlTmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQb2ludE9mU2VydmljZT4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuZ2V0U3RvcmVEZXRhaWxzKHN0b3JlTmFtZSk7XG4gIH1cbn1cbiJdfQ==
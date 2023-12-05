/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { AsmActions } from '../store/actions/index';
import { AsmSelectors } from '../store/index';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../connectors/asm.connector";
import * as i3 from "@ngrx/store";
export class AsmCustomerListService {
    constructor(queryService, asmConnector, store) {
        this.queryService = queryService;
        this.asmConnector = asmConnector;
        this.store = store;
        this.customerListQuery$ = this.queryService.create(() => this.asmConnector.customerLists(), {
            reloadOn: undefined,
            resetOn: undefined,
        });
    }
    getCustomerLists() {
        return this.customerListQuery$.get();
    }
    getCustomerListsState() {
        return this.customerListQuery$.getState();
    }
    /**
     * Search for customers in a customer list
     */
    customerListCustomersSearch(options) {
        this.store.dispatch(new AsmActions.CustomerListCustomersSearch(options));
    }
    /**
     * Returns the customer search result data for a customer list
     */
    getCustomerListCustomersSearchResults() {
        return this.store.pipe(select(AsmSelectors.getCustomerListCustomersSearchResults));
    }
    /**
     * Returns the customer list customers search result loading status.
     */
    getCustomerListCustomersSearchResultsLoading() {
        return this.store.pipe(select(AsmSelectors.getCustomerListCustomersSearchResultsLoading));
    }
    /**
     * Reset the customer list customers search result data to the initial state.
     */
    customerListCustomersSearchReset() {
        this.store.dispatch(new AsmActions.CustomerListCustomersSearchReset());
    }
    /**
     * Returns the customer list customers search result error status.
     */
    getCustomerListCustomersSearchResultsError() {
        return this.store.pipe(select(AsmSelectors.getCustomerListCustomersSearchResultsError));
    }
}
AsmCustomerListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListService, deps: [{ token: i1.QueryService }, { token: i2.AsmConnector }, { token: i3.Store }], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomerListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.QueryService }, { type: i2.AsmConnector }, { type: i3.Store }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29yZS9mYWNhZGUvYXNtLWN1c3RvbWVyLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBVTVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBRzlDLE1BQU0sT0FBTyxzQkFBc0I7SUFPakMsWUFDWSxZQUEwQixFQUMxQixZQUEwQixFQUMxQixLQUEwQjtRQUYxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFxQjtRQVQ1Qix1QkFBa0IsR0FDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNoRSxRQUFRLEVBQUUsU0FBUztZQUNuQixPQUFPLEVBQUUsU0FBUztTQUNuQixDQUFDLENBQUM7SUFNRixDQUFDO0lBRUosZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELHFCQUFxQjtRQUNuQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCwyQkFBMkIsQ0FBQyxPQUE4QjtRQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRDs7T0FFRztJQUNILHFDQUFxQztRQUNuQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNwQixNQUFNLENBQUMsWUFBWSxDQUFDLHFDQUFxQyxDQUFDLENBQzNELENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCw0Q0FBNEM7UUFDMUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDcEIsTUFBTSxDQUFDLFlBQVksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUNsRSxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0NBQWdDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksVUFBVSxDQUFDLGdDQUFnQyxFQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQ0FBMEM7UUFDeEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDcEIsTUFBTSxDQUFDLFlBQVksQ0FBQywwQ0FBMEMsQ0FBQyxDQUNoRSxDQUFDO0lBQ0osQ0FBQzs7bUhBNURVLHNCQUFzQjt1SEFBdEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7a0JBRGxDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHtcbiAgQXNtQ3VzdG9tZXJMaXN0RmFjYWRlLFxuICBDdXN0b21lckxpc3RzUGFnZSxcbiAgQ3VzdG9tZXJTZWFyY2hPcHRpb25zLFxuICBDdXN0b21lclNlYXJjaFBhZ2UsXG59IGZyb20gJ0BzcGFydGFjdXMvYXNtL3Jvb3QnO1xuaW1wb3J0IHsgUXVlcnksIFF1ZXJ5U2VydmljZSwgUXVlcnlTdGF0ZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBc21Db25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL2FzbS5jb25uZWN0b3InO1xuaW1wb3J0IHsgQXNtQWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHsgU3RhdGVXaXRoQXNtIH0gZnJvbSAnLi4vc3RvcmUvYXNtLXN0YXRlJztcbmltcG9ydCB7IEFzbVNlbGVjdG9ycyB9IGZyb20gJy4uL3N0b3JlL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFzbUN1c3RvbWVyTGlzdFNlcnZpY2UgaW1wbGVtZW50cyBBc21DdXN0b21lckxpc3RGYWNhZGUge1xuICBwcm90ZWN0ZWQgY3VzdG9tZXJMaXN0UXVlcnkkOiBRdWVyeTxDdXN0b21lckxpc3RzUGFnZT4gPVxuICAgIHRoaXMucXVlcnlTZXJ2aWNlLmNyZWF0ZSgoKSA9PiB0aGlzLmFzbUNvbm5lY3Rvci5jdXN0b21lckxpc3RzKCksIHtcbiAgICAgIHJlbG9hZE9uOiB1bmRlZmluZWQsXG4gICAgICByZXNldE9uOiB1bmRlZmluZWQsXG4gICAgfSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHF1ZXJ5U2VydmljZTogUXVlcnlTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhc21Db25uZWN0b3I6IEFzbUNvbm5lY3RvcixcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aEFzbT5cbiAgKSB7fVxuXG4gIGdldEN1c3RvbWVyTGlzdHMoKTogT2JzZXJ2YWJsZTxDdXN0b21lckxpc3RzUGFnZSB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmN1c3RvbWVyTGlzdFF1ZXJ5JC5nZXQoKTtcbiAgfVxuXG4gIGdldEN1c3RvbWVyTGlzdHNTdGF0ZSgpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8Q3VzdG9tZXJMaXN0c1BhZ2U+PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tZXJMaXN0UXVlcnkkLmdldFN0YXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoIGZvciBjdXN0b21lcnMgaW4gYSBjdXN0b21lciBsaXN0XG4gICAqL1xuICBjdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2gob3B0aW9uczogQ3VzdG9tZXJTZWFyY2hPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQXNtQWN0aW9ucy5DdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2gob3B0aW9ucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1c3RvbWVyIHNlYXJjaCByZXN1bHQgZGF0YSBmb3IgYSBjdXN0b21lciBsaXN0XG4gICAqL1xuICBnZXRDdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXN1bHRzKCk6IE9ic2VydmFibGU8Q3VzdG9tZXJTZWFyY2hQYWdlPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChBc21TZWxlY3RvcnMuZ2V0Q3VzdG9tZXJMaXN0Q3VzdG9tZXJzU2VhcmNoUmVzdWx0cylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1c3RvbWVyIGxpc3QgY3VzdG9tZXJzIHNlYXJjaCByZXN1bHQgbG9hZGluZyBzdGF0dXMuXG4gICAqL1xuICBnZXRDdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXN1bHRzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KEFzbVNlbGVjdG9ycy5nZXRDdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXN1bHRzTG9hZGluZylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBjdXN0b21lciBsaXN0IGN1c3RvbWVycyBzZWFyY2ggcmVzdWx0IGRhdGEgdG8gdGhlIGluaXRpYWwgc3RhdGUuXG4gICAqL1xuICBjdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBc21BY3Rpb25zLkN1c3RvbWVyTGlzdEN1c3RvbWVyc1NlYXJjaFJlc2V0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1c3RvbWVyIGxpc3QgY3VzdG9tZXJzIHNlYXJjaCByZXN1bHQgZXJyb3Igc3RhdHVzLlxuICAgKi9cbiAgZ2V0Q3VzdG9tZXJMaXN0Q3VzdG9tZXJzU2VhcmNoUmVzdWx0c0Vycm9yKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoQXNtU2VsZWN0b3JzLmdldEN1c3RvbWVyTGlzdEN1c3RvbWVyc1NlYXJjaFJlc3VsdHNFcnJvcilcbiAgICApO1xuICB9XG59XG4iXX0=
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { ProcessSelectors, } from '@spartacus/core';
import { map, tap } from 'rxjs/operators';
import { OrderActions } from '../store/actions/index';
import { CANCEL_REPLENISHMENT_ORDER_PROCESS_ID, } from '../store/order-state';
import { OrderSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
export class ReplenishmentOrderHistoryService {
    constructor(store, processStateStore, userIdService) {
        this.store = store;
        this.processStateStore = processStateStore;
        this.userIdService = userIdService;
    }
    /**
     * Returns replenishment order details for a given 'current' user
     *
     * @param replenishmentOrderCode a replenishment order code
     */
    loadReplenishmentOrderDetails(replenishmentOrderCode) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                this.store.dispatch(new OrderActions.LoadReplenishmentOrderDetails({
                    userId,
                    replenishmentOrderCode,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Returns a replenishment order details
     */
    getReplenishmentOrderDetails() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrderDetailsValue));
    }
    /**
     * Returns a replenishment order details loading flag
     */
    getReplenishmentOrderDetailsLoading() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrderDetailsLoading));
    }
    /**
     * Returns a replenishment order details success flag
     */
    getReplenishmentOrderDetailsSuccess() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrderDetailsSuccess));
    }
    /**
     * Returns a replenishment order details error flag
     */
    getReplenishmentOrderDetailsError() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrderDetailsError));
    }
    /**
     * Clears the replenishment orders details state
     */
    clearReplenishmentOrderDetails() {
        this.store.dispatch(new OrderActions.ClearReplenishmentOrderDetails());
    }
    /**
     * Cancels a specific replenishment order for a given 'current' user
     *
     * @param replenishmentOrderCode a replenishment order code
     */
    cancelReplenishmentOrder(replenishmentOrderCode) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                this.store.dispatch(new OrderActions.CancelReplenishmentOrder({
                    userId,
                    replenishmentOrderCode,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Returns the cancel replenishment order loading flag
     */
    getCancelReplenishmentOrderLoading() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessLoadingFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID)));
    }
    /**
     * Returns the cancel replenishment order success flag
     */
    getCancelReplenishmentOrderSuccess() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessSuccessFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID)));
    }
    /**
     * Returns the cancel replenishment order error flag
     */
    getCancelReplenishmentOrderError() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessErrorFactory(CANCEL_REPLENISHMENT_ORDER_PROCESS_ID)));
    }
    /**
     * Clears the cancel replenishment order processing state
     */
    clearCancelReplenishmentOrderProcessState() {
        this.store.dispatch(new OrderActions.ClearCancelReplenishmentOrder());
    }
    /**
     * Returns replenishment order history list
     */
    getReplenishmentOrderHistoryList(pageSize) {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrdersState), tap((replenishmentOrderListState) => {
            const attemptedLoad = replenishmentOrderListState.loading ||
                replenishmentOrderListState.success ||
                replenishmentOrderListState.error;
            if (!attemptedLoad) {
                this.loadReplenishmentOrderList(pageSize);
            }
        }), map((replenishmentOrderListState) => replenishmentOrderListState.value));
    }
    /**
     * Returns a loading flag for replenishment order history list
     */
    getReplenishmentOrderHistoryListLoading() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrdersLoading));
    }
    /**
     * Returns a error flag for replenishment order history list
     */
    getReplenishmentOrderHistoryListError() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrdersError));
    }
    /**
     * Returns a success flag for replenishment order history list
     */
    getReplenishmentOrderHistoryListSuccess() {
        return this.store.pipe(select(OrderSelectors.getReplenishmentOrdersSuccess));
    }
    /**
     * Retrieves a replenishment order list
     * @param pageSize page size
     * @param currentPage current page
     * @param sort sort
     */
    loadReplenishmentOrderList(pageSize, currentPage, sort) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                this.store.dispatch(new OrderActions.LoadUserReplenishmentOrders({
                    userId,
                    pageSize,
                    currentPage,
                    sort,
                }));
            },
            error: () => {
                // TODO: for future releases, refactor this part to thrown errors
            },
        });
    }
    /**
     * Cleaning replenishment order list
     */
    clearReplenishmentOrderList() {
        this.store.dispatch(new OrderActions.ClearUserReplenishmentOrders());
    }
}
ReplenishmentOrderHistoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryService, deps: [{ token: i1.Store }, { token: i1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrderHistoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderHistoryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i1.Store }, { type: i2.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlci1oaXN0b3J5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29yZS9mYWNhZGUvcmVwbGVuaXNobWVudC1vcmRlci1oaXN0b3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQ0wsZ0JBQWdCLEdBR2pCLE1BQU0saUJBQWlCLENBQUM7QUFPekIsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUNMLHFDQUFxQyxHQUV0QyxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUcxRCxNQUFNLE9BQU8sZ0NBQWdDO0lBRzNDLFlBQ1ksS0FBNEIsRUFDNUIsaUJBQWdELEVBQ2hELGFBQTRCO1FBRjVCLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBQzVCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBK0I7UUFDaEQsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDckMsQ0FBQztJQUVKOzs7O09BSUc7SUFDSCw2QkFBNkIsQ0FBQyxzQkFBOEI7UUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQixJQUFJLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQztvQkFDN0MsTUFBTTtv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RUc7SUFDSCwyQkFBMkI7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7OzZIQTNOVSxnQ0FBZ0M7aUlBQWhDLGdDQUFnQzsyRkFBaEMsZ0NBQWdDO2tCQUQ1QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIFByb2Nlc3NTZWxlY3RvcnMsXG4gIFN0YXRlV2l0aFByb2Nlc3MsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBSZXBsZW5pc2htZW50T3JkZXIsXG4gIFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlGYWNhZGUsXG4gIFJlcGxlbmlzaG1lbnRPcmRlckxpc3QsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZGVyQWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHtcbiAgQ0FOQ0VMX1JFUExFTklTSE1FTlRfT1JERVJfUFJPQ0VTU19JRCxcbiAgU3RhdGVXaXRoT3JkZXIsXG59IGZyb20gJy4uL3N0b3JlL29yZGVyLXN0YXRlJztcbmltcG9ydCB7IE9yZGVyU2VsZWN0b3JzIH0gZnJvbSAnLi4vc3RvcmUvc2VsZWN0b3JzL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlTZXJ2aWNlXG4gIGltcGxlbWVudHMgUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUZhY2FkZVxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aE9yZGVyPixcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc1N0YXRlU3RvcmU6IFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+LFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogUmV0dXJucyByZXBsZW5pc2htZW50IG9yZGVyIGRldGFpbHMgZm9yIGEgZ2l2ZW4gJ2N1cnJlbnQnIHVzZXJcbiAgICpcbiAgICogQHBhcmFtIHJlcGxlbmlzaG1lbnRPcmRlckNvZGUgYSByZXBsZW5pc2htZW50IG9yZGVyIGNvZGVcbiAgICovXG4gIGxvYWRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzKHJlcGxlbmlzaG1lbnRPcmRlckNvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAodXNlcklkKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgbmV3IE9yZGVyQWN0aW9ucy5Mb2FkUmVwbGVuaXNobWVudE9yZGVyRGV0YWlscyh7XG4gICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICByZXBsZW5pc2htZW50T3JkZXJDb2RlLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICgpID0+IHtcbiAgICAgICAgLy8gVE9ETzogZm9yIGZ1dHVyZSByZWxlYXNlcywgcmVmYWN0b3IgdGhpcyBwYXJ0IHRvIHRocm93biBlcnJvcnNcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHJlcGxlbmlzaG1lbnQgb3JkZXIgZGV0YWlsc1xuICAgKi9cbiAgZ2V0UmVwbGVuaXNobWVudE9yZGVyRGV0YWlscygpOiBPYnNlcnZhYmxlPFJlcGxlbmlzaG1lbnRPcmRlcj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoT3JkZXJTZWxlY3RvcnMuZ2V0UmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc1ZhbHVlKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHJlcGxlbmlzaG1lbnQgb3JkZXIgZGV0YWlscyBsb2FkaW5nIGZsYWdcbiAgICovXG4gIGdldFJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHNMb2FkaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoT3JkZXJTZWxlY3RvcnMuZ2V0UmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc0xvYWRpbmcpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcmVwbGVuaXNobWVudCBvcmRlciBkZXRhaWxzIHN1Y2Nlc3MgZmxhZ1xuICAgKi9cbiAgZ2V0UmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc1N1Y2Nlc3MoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChPcmRlclNlbGVjdG9ycy5nZXRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzU3VjY2VzcylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSByZXBsZW5pc2htZW50IG9yZGVyIGRldGFpbHMgZXJyb3IgZmxhZ1xuICAgKi9cbiAgZ2V0UmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc0Vycm9yKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoT3JkZXJTZWxlY3RvcnMuZ2V0UmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc0Vycm9yKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSByZXBsZW5pc2htZW50IG9yZGVycyBkZXRhaWxzIHN0YXRlXG4gICAqL1xuICBjbGVhclJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHMoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgT3JkZXJBY3Rpb25zLkNsZWFyUmVwbGVuaXNobWVudE9yZGVyRGV0YWlscygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIGEgc3BlY2lmaWMgcmVwbGVuaXNobWVudCBvcmRlciBmb3IgYSBnaXZlbiAnY3VycmVudCcgdXNlclxuICAgKlxuICAgKiBAcGFyYW0gcmVwbGVuaXNobWVudE9yZGVyQ29kZSBhIHJlcGxlbmlzaG1lbnQgb3JkZXIgY29kZVxuICAgKi9cbiAgY2FuY2VsUmVwbGVuaXNobWVudE9yZGVyKHJlcGxlbmlzaG1lbnRPcmRlckNvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAodXNlcklkKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgbmV3IE9yZGVyQWN0aW9ucy5DYW5jZWxSZXBsZW5pc2htZW50T3JkZXIoe1xuICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgcmVwbGVuaXNobWVudE9yZGVyQ29kZSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNhbmNlbCByZXBsZW5pc2htZW50IG9yZGVyIGxvYWRpbmcgZmxhZ1xuICAgKi9cbiAgZ2V0Q2FuY2VsUmVwbGVuaXNobWVudE9yZGVyTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzU3RhdGVTdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NMb2FkaW5nRmFjdG9yeShcbiAgICAgICAgICBDQU5DRUxfUkVQTEVOSVNITUVOVF9PUkRFUl9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNhbmNlbCByZXBsZW5pc2htZW50IG9yZGVyIHN1Y2Nlc3MgZmxhZ1xuICAgKi9cbiAgZ2V0Q2FuY2VsUmVwbGVuaXNobWVudE9yZGVyU3VjY2VzcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzU3RhdGVTdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NTdWNjZXNzRmFjdG9yeShcbiAgICAgICAgICBDQU5DRUxfUkVQTEVOSVNITUVOVF9PUkRFUl9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNhbmNlbCByZXBsZW5pc2htZW50IG9yZGVyIGVycm9yIGZsYWdcbiAgICovXG4gIGdldENhbmNlbFJlcGxlbmlzaG1lbnRPcmRlckVycm9yKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3NTdGF0ZVN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoXG4gICAgICAgIFByb2Nlc3NTZWxlY3RvcnMuZ2V0UHJvY2Vzc0Vycm9yRmFjdG9yeShcbiAgICAgICAgICBDQU5DRUxfUkVQTEVOSVNITUVOVF9PUkRFUl9QUk9DRVNTX0lEXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgY2FuY2VsIHJlcGxlbmlzaG1lbnQgb3JkZXIgcHJvY2Vzc2luZyBzdGF0ZVxuICAgKi9cbiAgY2xlYXJDYW5jZWxSZXBsZW5pc2htZW50T3JkZXJQcm9jZXNzU3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgT3JkZXJBY3Rpb25zLkNsZWFyQ2FuY2VsUmVwbGVuaXNobWVudE9yZGVyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcmVwbGVuaXNobWVudCBvcmRlciBoaXN0b3J5IGxpc3RcbiAgICovXG4gIGdldFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlMaXN0KFxuICAgIHBhZ2VTaXplOiBudW1iZXJcbiAgKTogT2JzZXJ2YWJsZTxSZXBsZW5pc2htZW50T3JkZXJMaXN0IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChPcmRlclNlbGVjdG9ycy5nZXRSZXBsZW5pc2htZW50T3JkZXJzU3RhdGUpLFxuICAgICAgdGFwKChyZXBsZW5pc2htZW50T3JkZXJMaXN0U3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0ZW1wdGVkTG9hZCA9XG4gICAgICAgICAgcmVwbGVuaXNobWVudE9yZGVyTGlzdFN0YXRlLmxvYWRpbmcgfHxcbiAgICAgICAgICByZXBsZW5pc2htZW50T3JkZXJMaXN0U3RhdGUuc3VjY2VzcyB8fFxuICAgICAgICAgIHJlcGxlbmlzaG1lbnRPcmRlckxpc3RTdGF0ZS5lcnJvcjtcbiAgICAgICAgaWYgKCFhdHRlbXB0ZWRMb2FkKSB7XG4gICAgICAgICAgdGhpcy5sb2FkUmVwbGVuaXNobWVudE9yZGVyTGlzdChwYWdlU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbWFwKChyZXBsZW5pc2htZW50T3JkZXJMaXN0U3RhdGUpID0+IHJlcGxlbmlzaG1lbnRPcmRlckxpc3RTdGF0ZS52YWx1ZSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsb2FkaW5nIGZsYWcgZm9yIHJlcGxlbmlzaG1lbnQgb3JkZXIgaGlzdG9yeSBsaXN0XG4gICAqL1xuICBnZXRSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5TGlzdExvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChPcmRlclNlbGVjdG9ycy5nZXRSZXBsZW5pc2htZW50T3JkZXJzTG9hZGluZylcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBlcnJvciBmbGFnIGZvciByZXBsZW5pc2htZW50IG9yZGVyIGhpc3RvcnkgbGlzdFxuICAgKi9cbiAgZ2V0UmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUxpc3RFcnJvcigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKHNlbGVjdChPcmRlclNlbGVjdG9ycy5nZXRSZXBsZW5pc2htZW50T3JkZXJzRXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3VjY2VzcyBmbGFnIGZvciByZXBsZW5pc2htZW50IG9yZGVyIGhpc3RvcnkgbGlzdFxuICAgKi9cbiAgZ2V0UmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUxpc3RTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICBzZWxlY3QoT3JkZXJTZWxlY3RvcnMuZ2V0UmVwbGVuaXNobWVudE9yZGVyc1N1Y2Nlc3MpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSByZXBsZW5pc2htZW50IG9yZGVyIGxpc3RcbiAgICogQHBhcmFtIHBhZ2VTaXplIHBhZ2Ugc2l6ZVxuICAgKiBAcGFyYW0gY3VycmVudFBhZ2UgY3VycmVudCBwYWdlXG4gICAqIEBwYXJhbSBzb3J0IHNvcnRcbiAgICovXG4gIGxvYWRSZXBsZW5pc2htZW50T3JkZXJMaXN0KFxuICAgIHBhZ2VTaXplPzogbnVtYmVyLFxuICAgIGN1cnJlbnRQYWdlPzogbnVtYmVyLFxuICAgIHNvcnQ/OiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQodHJ1ZSkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICh1c2VySWQpID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICBuZXcgT3JkZXJBY3Rpb25zLkxvYWRVc2VyUmVwbGVuaXNobWVudE9yZGVycyh7XG4gICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICBwYWdlU2l6ZSxcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFuaW5nIHJlcGxlbmlzaG1lbnQgb3JkZXIgbGlzdFxuICAgKi9cbiAgY2xlYXJSZXBsZW5pc2htZW50T3JkZXJMaXN0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IE9yZGVyQWN0aW9ucy5DbGVhclVzZXJSZXBsZW5pc2htZW50T3JkZXJzKCkpO1xuICB9XG59XG4iXX0=
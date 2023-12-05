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
import { CANCEL_RETURN_PROCESS_ID } from '../store/order-state';
import { OrderSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
export class OrderReturnRequestService {
    constructor(store, processStateStore, userIdService) {
        this.store = store;
        this.processStateStore = processStateStore;
        this.userIdService = userIdService;
    }
    /**
     * Create order return request
     * @param orderCode an order code
     * @param returnRequestInput order return request entry input
     */
    createOrderReturnRequest(returnRequestInput) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new OrderActions.CreateOrderReturnRequest({
                userId,
                returnRequestInput,
            }));
        });
    }
    /**
     * Return an order return request
     */
    getOrderReturnRequest() {
        return this.store.pipe(select(OrderSelectors.getOrderReturnRequest));
    }
    /**
     * Gets order return request list
     */
    getOrderReturnRequestList(pageSize) {
        return this.store.pipe(select(OrderSelectors.getOrderReturnRequestListState), tap((returnListState) => {
            const attemptedLoad = returnListState.loading ||
                returnListState.success ||
                returnListState.error;
            if (!attemptedLoad) {
                this.loadOrderReturnRequestList(pageSize);
            }
        }), map((returnListState) => returnListState.value));
    }
    /**
     * Loads order return request detail
     * @param returnRequestCode
     */
    loadOrderReturnRequestDetail(returnRequestCode) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new OrderActions.LoadOrderReturnRequest({
                userId,
                returnRequestCode,
            }));
        });
    }
    /**
     * Loads order return request list
     * @param pageSize page size
     * @param currentPage current page
     * @param sort sort
     */
    loadOrderReturnRequestList(pageSize, currentPage, sort) {
        this.userIdService.takeUserId(true).subscribe({
            next: (userId) => {
                this.store.dispatch(new OrderActions.LoadOrderReturnRequestList({
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
     * Cleaning order return request list
     */
    clearOrderReturnRequestList() {
        this.store.dispatch(new OrderActions.ClearOrderReturnRequestList());
    }
    /**
     * Get the order return request loading flag
     */
    getReturnRequestLoading() {
        return this.store.pipe(select(OrderSelectors.getOrderReturnRequestLoading));
    }
    /**
     * Get the order return request success flag
     */
    getReturnRequestSuccess() {
        return this.store.pipe(select(OrderSelectors.getOrderReturnRequestSuccess));
    }
    /**
     * Cleaning order return request details
     */
    clearOrderReturnRequestDetail() {
        this.store.dispatch(new OrderActions.ClearOrderReturnRequest());
    }
    /*
     * Cancel order return request
     */
    cancelOrderReturnRequest(returnRequestCode, returnRequestModification) {
        this.userIdService.takeUserId().subscribe((userId) => {
            this.store.dispatch(new OrderActions.CancelOrderReturnRequest({
                userId,
                returnRequestCode,
                returnRequestModification,
            }));
        });
    }
    /**
     * Returns the cancel return request loading flag
     */
    getCancelReturnRequestLoading() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessLoadingFactory(CANCEL_RETURN_PROCESS_ID)));
    }
    /**
     * Returns the cancel return request success flag
     */
    getCancelReturnRequestSuccess() {
        return this.processStateStore.pipe(select(ProcessSelectors.getProcessSuccessFactory(CANCEL_RETURN_PROCESS_ID)));
    }
    /**
     * Resets the cancel return request process flags
     */
    resetCancelReturnRequestProcessState() {
        return this.store.dispatch(new OrderActions.ResetCancelReturnProcess());
    }
}
OrderReturnRequestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestService, deps: [{ token: i1.Store }, { token: i1.Store }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
OrderReturnRequestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderReturnRequestService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i1.Store }, { type: i2.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcmV0dXJuLXJlcXVlc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb3JlL2ZhY2FkZS9vcmRlci1yZXR1cm4tcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQVMsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUNMLGdCQUFnQixHQUdqQixNQUFNLGlCQUFpQixDQUFDO0FBU3pCLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSx3QkFBd0IsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFHMUQsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQyxZQUNZLEtBQTRCLEVBQzVCLGlCQUFnRCxFQUNoRCxhQUE0QjtRQUY1QixVQUFLLEdBQUwsS0FBSyxDQUF1QjtRQUM1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQStCO1FBQ2hELGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ3JDLENBQUM7SUFFSjs7OztPQUlHO0lBQ0gsd0JBQXdCLENBQ3RCLGtCQUErQztRQUUvQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQixJQUFJLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQztnQkFDeEMsTUFBTTtnQkFDTixrQkFBa0I7YUFDbkIsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILHFCQUFxQjtRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7T0FFRztJQUNILHlCQUF5QixDQUN2QixRQUFpQjtRQUVqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNwQixNQUFNLENBQUMsY0FBYyxDQUFDLDhCQUE4QixDQUFDLEVBQ3JELEdBQUcsQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3RCLE1BQU0sYUFBYSxHQUNqQixlQUFlLENBQUMsT0FBTztnQkFDdkIsZUFBZSxDQUFDLE9BQU87Z0JBQ3ZCLGVBQWUsQ0FBQyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNDO1FBQ0gsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQ2hELENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsNEJBQTRCLENBQUMsaUJBQXlCO1FBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ2pCLElBQUksWUFBWSxDQUFDLHNCQUFzQixDQUFDO2dCQUN0QyxNQUFNO2dCQUNOLGlCQUFpQjthQUNsQixDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsMEJBQTBCLENBQ3hCLFFBQWlCLEVBQ2pCLFdBQW9CLEVBQ3BCLElBQWE7UUFFYixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQ2pCLElBQUksWUFBWSxDQUFDLDBCQUEwQixDQUFDO29CQUMxQyxNQUFNO29CQUNOLFFBQVE7b0JBQ1IsV0FBVztvQkFDWCxJQUFJO2lCQUNMLENBQUMsQ0FDSCxDQUFDO1lBQ0osQ0FBQztZQUNELEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ1YsaUVBQWlFO1lBQ25FLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwyQkFBMkI7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7T0FFRztJQUNILHVCQUF1QjtRQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7T0FFRztJQUNILHVCQUF1QjtRQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7T0FFRztJQUNILDZCQUE2QjtRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsd0JBQXdCLENBQ3RCLGlCQUF5QixFQUN6Qix5QkFBb0Q7UUFFcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDakIsSUFBSSxZQUFZLENBQUMsd0JBQXdCLENBQUM7Z0JBQ3hDLE1BQU07Z0JBQ04saUJBQWlCO2dCQUNqQix5QkFBeUI7YUFDMUIsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILDZCQUE2QjtRQUMzQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQ2hDLE1BQU0sQ0FDSixnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUNwRSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCw2QkFBNkI7UUFDM0IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUNoQyxNQUFNLENBQ0osZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsd0JBQXdCLENBQUMsQ0FDcEUsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0NBQW9DO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7O3NIQXpLVSx5QkFBeUI7MEhBQXpCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQURyQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIFByb2Nlc3NTZWxlY3RvcnMsXG4gIFN0YXRlV2l0aFByb2Nlc3MsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBPcmRlclJldHVyblJlcXVlc3RGYWNhZGUsXG4gIFJldHVyblJlcXVlc3QsXG4gIFJldHVyblJlcXVlc3RFbnRyeUlucHV0TGlzdCxcbiAgUmV0dXJuUmVxdWVzdExpc3QsXG4gIFJldHVyblJlcXVlc3RNb2RpZmljYXRpb24sXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9yZGVyQWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHsgQ0FOQ0VMX1JFVFVSTl9QUk9DRVNTX0lELCBTdGF0ZVdpdGhPcmRlciB9IGZyb20gJy4uL3N0b3JlL29yZGVyLXN0YXRlJztcbmltcG9ydCB7IE9yZGVyU2VsZWN0b3JzIH0gZnJvbSAnLi4vc3RvcmUvc2VsZWN0b3JzL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9yZGVyUmV0dXJuUmVxdWVzdFNlcnZpY2UgaW1wbGVtZW50cyBPcmRlclJldHVyblJlcXVlc3RGYWNhZGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aE9yZGVyPixcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc1N0YXRlU3RvcmU6IFN0b3JlPFN0YXRlV2l0aFByb2Nlc3M8dm9pZD4+LFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogQ3JlYXRlIG9yZGVyIHJldHVybiByZXF1ZXN0XG4gICAqIEBwYXJhbSBvcmRlckNvZGUgYW4gb3JkZXIgY29kZVxuICAgKiBAcGFyYW0gcmV0dXJuUmVxdWVzdElucHV0IG9yZGVyIHJldHVybiByZXF1ZXN0IGVudHJ5IGlucHV0XG4gICAqL1xuICBjcmVhdGVPcmRlclJldHVyblJlcXVlc3QoXG4gICAgcmV0dXJuUmVxdWVzdElucHV0OiBSZXR1cm5SZXF1ZXN0RW50cnlJbnB1dExpc3RcbiAgKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQoKS5zdWJzY3JpYmUoKHVzZXJJZCkgPT4ge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgbmV3IE9yZGVyQWN0aW9ucy5DcmVhdGVPcmRlclJldHVyblJlcXVlc3Qoe1xuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICByZXR1cm5SZXF1ZXN0SW5wdXQsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBvcmRlciByZXR1cm4gcmVxdWVzdFxuICAgKi9cbiAgZ2V0T3JkZXJSZXR1cm5SZXF1ZXN0KCk6IE9ic2VydmFibGU8UmV0dXJuUmVxdWVzdD4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoc2VsZWN0KE9yZGVyU2VsZWN0b3JzLmdldE9yZGVyUmV0dXJuUmVxdWVzdCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgb3JkZXIgcmV0dXJuIHJlcXVlc3QgbGlzdFxuICAgKi9cbiAgZ2V0T3JkZXJSZXR1cm5SZXF1ZXN0TGlzdChcbiAgICBwYWdlU2l6ZT86IG51bWJlclxuICApOiBPYnNlcnZhYmxlPFJldHVyblJlcXVlc3RMaXN0IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChPcmRlclNlbGVjdG9ycy5nZXRPcmRlclJldHVyblJlcXVlc3RMaXN0U3RhdGUpLFxuICAgICAgdGFwKChyZXR1cm5MaXN0U3RhdGUpID0+IHtcbiAgICAgICAgY29uc3QgYXR0ZW1wdGVkTG9hZCA9XG4gICAgICAgICAgcmV0dXJuTGlzdFN0YXRlLmxvYWRpbmcgfHxcbiAgICAgICAgICByZXR1cm5MaXN0U3RhdGUuc3VjY2VzcyB8fFxuICAgICAgICAgIHJldHVybkxpc3RTdGF0ZS5lcnJvcjtcbiAgICAgICAgaWYgKCFhdHRlbXB0ZWRMb2FkKSB7XG4gICAgICAgICAgdGhpcy5sb2FkT3JkZXJSZXR1cm5SZXF1ZXN0TGlzdChwYWdlU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbWFwKChyZXR1cm5MaXN0U3RhdGUpID0+IHJldHVybkxpc3RTdGF0ZS52YWx1ZSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIG9yZGVyIHJldHVybiByZXF1ZXN0IGRldGFpbFxuICAgKiBAcGFyYW0gcmV0dXJuUmVxdWVzdENvZGVcbiAgICovXG4gIGxvYWRPcmRlclJldHVyblJlcXVlc3REZXRhaWwocmV0dXJuUmVxdWVzdENvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKCkuc3Vic2NyaWJlKCh1c2VySWQpID0+IHtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgIG5ldyBPcmRlckFjdGlvbnMuTG9hZE9yZGVyUmV0dXJuUmVxdWVzdCh7XG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIHJldHVyblJlcXVlc3RDb2RlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBvcmRlciByZXR1cm4gcmVxdWVzdCBsaXN0XG4gICAqIEBwYXJhbSBwYWdlU2l6ZSBwYWdlIHNpemVcbiAgICogQHBhcmFtIGN1cnJlbnRQYWdlIGN1cnJlbnQgcGFnZVxuICAgKiBAcGFyYW0gc29ydCBzb3J0XG4gICAqL1xuICBsb2FkT3JkZXJSZXR1cm5SZXF1ZXN0TGlzdChcbiAgICBwYWdlU2l6ZT86IG51bWJlcixcbiAgICBjdXJyZW50UGFnZT86IG51bWJlcixcbiAgICBzb3J0Pzogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKHRydWUpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAodXNlcklkKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgICAgbmV3IE9yZGVyQWN0aW9ucy5Mb2FkT3JkZXJSZXR1cm5SZXF1ZXN0TGlzdCh7XG4gICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICBwYWdlU2l6ZSxcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE86IGZvciBmdXR1cmUgcmVsZWFzZXMsIHJlZmFjdG9yIHRoaXMgcGFydCB0byB0aHJvd24gZXJyb3JzXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFuaW5nIG9yZGVyIHJldHVybiByZXF1ZXN0IGxpc3RcbiAgICovXG4gIGNsZWFyT3JkZXJSZXR1cm5SZXF1ZXN0TGlzdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBPcmRlckFjdGlvbnMuQ2xlYXJPcmRlclJldHVyblJlcXVlc3RMaXN0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgb3JkZXIgcmV0dXJuIHJlcXVlc3QgbG9hZGluZyBmbGFnXG4gICAqL1xuICBnZXRSZXR1cm5SZXF1ZXN0TG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKHNlbGVjdChPcmRlclNlbGVjdG9ycy5nZXRPcmRlclJldHVyblJlcXVlc3RMb2FkaW5nKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBvcmRlciByZXR1cm4gcmVxdWVzdCBzdWNjZXNzIGZsYWdcbiAgICovXG4gIGdldFJldHVyblJlcXVlc3RTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoc2VsZWN0KE9yZGVyU2VsZWN0b3JzLmdldE9yZGVyUmV0dXJuUmVxdWVzdFN1Y2Nlc3MpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbmluZyBvcmRlciByZXR1cm4gcmVxdWVzdCBkZXRhaWxzXG4gICAqL1xuICBjbGVhck9yZGVyUmV0dXJuUmVxdWVzdERldGFpbCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBPcmRlckFjdGlvbnMuQ2xlYXJPcmRlclJldHVyblJlcXVlc3QoKSk7XG4gIH1cblxuICAvKlxuICAgKiBDYW5jZWwgb3JkZXIgcmV0dXJuIHJlcXVlc3RcbiAgICovXG4gIGNhbmNlbE9yZGVyUmV0dXJuUmVxdWVzdChcbiAgICByZXR1cm5SZXF1ZXN0Q29kZTogc3RyaW5nLFxuICAgIHJldHVyblJlcXVlc3RNb2RpZmljYXRpb246IFJldHVyblJlcXVlc3RNb2RpZmljYXRpb25cbiAgKTogdm9pZCB7XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlLnRha2VVc2VySWQoKS5zdWJzY3JpYmUoKHVzZXJJZCkgPT4ge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgbmV3IE9yZGVyQWN0aW9ucy5DYW5jZWxPcmRlclJldHVyblJlcXVlc3Qoe1xuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICByZXR1cm5SZXF1ZXN0Q29kZSxcbiAgICAgICAgICByZXR1cm5SZXF1ZXN0TW9kaWZpY2F0aW9uLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYW5jZWwgcmV0dXJuIHJlcXVlc3QgbG9hZGluZyBmbGFnXG4gICAqL1xuICBnZXRDYW5jZWxSZXR1cm5SZXF1ZXN0TG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzU3RhdGVTdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NMb2FkaW5nRmFjdG9yeShDQU5DRUxfUkVUVVJOX1BST0NFU1NfSUQpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYW5jZWwgcmV0dXJuIHJlcXVlc3Qgc3VjY2VzcyBmbGFnXG4gICAqL1xuICBnZXRDYW5jZWxSZXR1cm5SZXF1ZXN0U3VjY2VzcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzU3RhdGVTdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9jZXNzU2VsZWN0b3JzLmdldFByb2Nlc3NTdWNjZXNzRmFjdG9yeShDQU5DRUxfUkVUVVJOX1BST0NFU1NfSUQpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGNhbmNlbCByZXR1cm4gcmVxdWVzdCBwcm9jZXNzIGZsYWdzXG4gICAqL1xuICByZXNldENhbmNlbFJldHVyblJlcXVlc3RQcm9jZXNzU3RhdGUoKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IE9yZGVyQWN0aW9ucy5SZXNldENhbmNlbFJldHVyblByb2Nlc3MoKSk7XG4gIH1cbn1cbiJdfQ==
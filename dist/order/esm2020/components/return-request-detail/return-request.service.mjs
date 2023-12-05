/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/order/root";
export class ReturnRequestService {
    constructor(routingService, returnRequestService, globalMessageService) {
        this.routingService = routingService;
        this.returnRequestService = returnRequestService;
        this.globalMessageService = globalMessageService;
    }
    get isCancelling$() {
        return this.returnRequestService.getCancelReturnRequestLoading();
    }
    get isCancelSuccess$() {
        return this.returnRequestService.getCancelReturnRequestSuccess();
    }
    getReturnRequest() {
        return combineLatest([
            this.routingService.getRouterState(),
            this.returnRequestService.getOrderReturnRequest(),
            this.returnRequestService.getReturnRequestLoading(),
        ]).pipe(map(([routingState, returnRequest, isLoading]) => [
            routingState.state.params['returnCode'],
            returnRequest,
            isLoading,
        ]), filter(([returnCode]) => Boolean(returnCode)), tap(([returnCode, returnRequest, isLoading]) => {
            if ((returnRequest === undefined || returnRequest.rma !== returnCode) &&
                !isLoading) {
                this.returnRequestService.loadOrderReturnRequestDetail(returnCode);
            }
        }), map(([_, returnRequest]) => returnRequest), filter((returnRequest) => Boolean(returnRequest)), distinctUntilChanged());
    }
    clearReturnRequest() {
        this.returnRequestService.clearOrderReturnRequestDetail();
    }
    cancelReturnRequest(returnRequestCode) {
        this.returnRequestService.cancelOrderReturnRequest(returnRequestCode, {
            status: 'CANCELLING',
        });
    }
    cancelSuccess(rma) {
        this.returnRequestService.resetCancelReturnRequestProcessState();
        this.globalMessageService.add({
            key: 'returnRequest.cancelSuccess',
            params: { rma },
        }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        this.routingService.go({
            cxRoute: 'orders',
        });
    }
    backToList() {
        this.routingService.go({ cxRoute: 'orders' }, {
            state: {
                activeTab: 1,
            },
        });
    }
}
ReturnRequestService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestService, deps: [{ token: i1.RoutingService }, { token: i2.OrderReturnRequestFacade }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
ReturnRequestService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.OrderReturnRequestFacade }, { type: i1.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLXJlcXVlc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL3JldHVybi1yZXF1ZXN0LWRldGFpbC9yZXR1cm4tcmVxdWVzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxpQkFBaUIsR0FFbEIsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBS3hFLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFDWSxjQUE4QixFQUM5QixvQkFBOEMsRUFDOUMsb0JBQTBDO1FBRjFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTBCO1FBQzlDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7SUFDbkQsQ0FBQztJQUVKLElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLDZCQUE2QixFQUFFLENBQUM7SUFDbkUsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLDZCQUE2QixFQUFFLENBQUM7SUFDbkUsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsRUFBRTtZQUNqRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsdUJBQXVCLEVBQUU7U0FDcEQsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2hELFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUN2QyxhQUFhO1lBQ2IsU0FBUztTQUNWLENBQUMsRUFDRixNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFDN0MsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFDRSxDQUFDLGFBQWEsS0FBSyxTQUFTLElBQUksYUFBYSxDQUFDLEdBQUcsS0FBSyxVQUFVLENBQUM7Z0JBQ2pFLENBQUMsU0FBUyxFQUNWO2dCQUNBLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNwRTtRQUNILENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFDMUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsRUFDakQsb0JBQW9CLEVBQUUsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLDZCQUE2QixFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVELG1CQUFtQixDQUFDLGlCQUF5QjtRQUMzQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLEVBQUU7WUFDcEUsTUFBTSxFQUFFLFlBQVk7U0FDckIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCO1lBQ0UsR0FBRyxFQUFFLDZCQUE2QjtZQUNsQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUU7U0FDaEIsRUFDRCxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FDeEMsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQ3BCLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUNyQjtZQUNFLEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUUsQ0FBQzthQUNiO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7aUhBMUVVLG9CQUFvQjtxSEFBcEIsb0JBQW9CLGNBRm5CLE1BQU07MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPcmRlclJldHVyblJlcXVlc3RGYWNhZGUsIFJldHVyblJlcXVlc3QgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBSZXR1cm5SZXF1ZXN0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJldHVyblJlcXVlc3RTZXJ2aWNlOiBPcmRlclJldHVyblJlcXVlc3RGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgZ2V0IGlzQ2FuY2VsbGluZyQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMucmV0dXJuUmVxdWVzdFNlcnZpY2UuZ2V0Q2FuY2VsUmV0dXJuUmVxdWVzdExvYWRpbmcoKTtcbiAgfVxuXG4gIGdldCBpc0NhbmNlbFN1Y2Nlc3MkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnJldHVyblJlcXVlc3RTZXJ2aWNlLmdldENhbmNlbFJldHVyblJlcXVlc3RTdWNjZXNzKCk7XG4gIH1cblxuICBnZXRSZXR1cm5SZXF1ZXN0KCk6IE9ic2VydmFibGU8UmV0dXJuUmVxdWVzdD4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ2V0Um91dGVyU3RhdGUoKSxcbiAgICAgIHRoaXMucmV0dXJuUmVxdWVzdFNlcnZpY2UuZ2V0T3JkZXJSZXR1cm5SZXF1ZXN0KCksXG4gICAgICB0aGlzLnJldHVyblJlcXVlc3RTZXJ2aWNlLmdldFJldHVyblJlcXVlc3RMb2FkaW5nKCksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW3JvdXRpbmdTdGF0ZSwgcmV0dXJuUmVxdWVzdCwgaXNMb2FkaW5nXSkgPT4gW1xuICAgICAgICByb3V0aW5nU3RhdGUuc3RhdGUucGFyYW1zWydyZXR1cm5Db2RlJ10sXG4gICAgICAgIHJldHVyblJlcXVlc3QsXG4gICAgICAgIGlzTG9hZGluZyxcbiAgICAgIF0pLFxuICAgICAgZmlsdGVyKChbcmV0dXJuQ29kZV0pID0+IEJvb2xlYW4ocmV0dXJuQ29kZSkpLFxuICAgICAgdGFwKChbcmV0dXJuQ29kZSwgcmV0dXJuUmVxdWVzdCwgaXNMb2FkaW5nXSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHJldHVyblJlcXVlc3QgPT09IHVuZGVmaW5lZCB8fCByZXR1cm5SZXF1ZXN0LnJtYSAhPT0gcmV0dXJuQ29kZSkgJiZcbiAgICAgICAgICAhaXNMb2FkaW5nXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMucmV0dXJuUmVxdWVzdFNlcnZpY2UubG9hZE9yZGVyUmV0dXJuUmVxdWVzdERldGFpbChyZXR1cm5Db2RlKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtYXAoKFtfLCByZXR1cm5SZXF1ZXN0XSkgPT4gcmV0dXJuUmVxdWVzdCksXG4gICAgICBmaWx0ZXIoKHJldHVyblJlcXVlc3QpID0+IEJvb2xlYW4ocmV0dXJuUmVxdWVzdCkpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICBjbGVhclJldHVyblJlcXVlc3QoKTogdm9pZCB7XG4gICAgdGhpcy5yZXR1cm5SZXF1ZXN0U2VydmljZS5jbGVhck9yZGVyUmV0dXJuUmVxdWVzdERldGFpbCgpO1xuICB9XG5cbiAgY2FuY2VsUmV0dXJuUmVxdWVzdChyZXR1cm5SZXF1ZXN0Q29kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZXR1cm5SZXF1ZXN0U2VydmljZS5jYW5jZWxPcmRlclJldHVyblJlcXVlc3QocmV0dXJuUmVxdWVzdENvZGUsIHtcbiAgICAgIHN0YXR1czogJ0NBTkNFTExJTkcnLFxuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsU3VjY2VzcyhybWE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmV0dXJuUmVxdWVzdFNlcnZpY2UucmVzZXRDYW5jZWxSZXR1cm5SZXF1ZXN0UHJvY2Vzc1N0YXRlKCk7XG4gICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICB7XG4gICAgICAgIGtleTogJ3JldHVyblJlcXVlc3QuY2FuY2VsU3VjY2VzcycsXG4gICAgICAgIHBhcmFtczogeyBybWEgfSxcbiAgICAgIH0sXG4gICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT05cbiAgICApO1xuICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oe1xuICAgICAgY3hSb3V0ZTogJ29yZGVycycsXG4gICAgfSk7XG4gIH1cblxuICBiYWNrVG9MaXN0KCk6IHZvaWQge1xuICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oXG4gICAgICB7IGN4Um91dGU6ICdvcmRlcnMnIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgYWN0aXZlVGFiOiAxLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==
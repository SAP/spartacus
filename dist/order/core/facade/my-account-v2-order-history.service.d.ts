import { Store } from '@ngrx/store';
import { StateUtils, UserIdService } from '@spartacus/core';
import { ConsignmentTracking, Order, OrderHistoryListView, OrderView } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderHistoryService } from './order-history.service';
import { OrderReturnRequestService } from './order-return-request.service';
import * as i0 from "@angular/core";
export declare class MyAccountV2OrderHistoryService {
    protected orderReturnRequestService: OrderReturnRequestService;
    protected store: Store<any>;
    protected userIdService: UserIdService;
    protected orderHistoryService: OrderHistoryService;
    clearOrderList(): void;
    getOrderDetailsWithTracking(orderCode: string): Observable<OrderView | undefined>;
    getOrderHistoryListWithDetails(pageSize: number): Observable<OrderHistoryListView | undefined>;
    getOrderHistoryList(pageSize: number): Observable<OrderHistoryListView | undefined>;
    protected getOrderDetailsValue(code: string): Observable<Order>;
    protected getOrderDetailsState(code: string): Observable<StateUtils.LoaderState<Order>>;
    protected loadOrderDetails(code: string): void;
    getOrderDetails(code: string): Observable<Order>;
    protected getConsignmentTrackingValue(orderCode: string, consignmentCode: string): Observable<ConsignmentTracking>;
    protected getConsignmentTrackingState(orderCode: string, consignmentCode: string): Observable<StateUtils.LoaderState<ConsignmentTracking>>;
    protected loadConsignmentTracking(orderCode: string, consignmentCode: string): void;
    getConsignmentTracking(orderCode: string, consignmentCode: string): Observable<ConsignmentTracking>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyAccountV2OrderHistoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MyAccountV2OrderHistoryService>;
}

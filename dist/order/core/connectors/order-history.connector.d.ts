import { CancellationRequestEntryInputList, ConsignmentTracking, Order, OrderHistoryList, ReturnRequest, ReturnRequestEntryInputList, ReturnRequestList, ReturnRequestModification } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderHistoryAdapter } from './order-history.adapter';
import * as i0 from "@angular/core";
export declare class OrderHistoryConnector {
    protected adapter: OrderHistoryAdapter;
    constructor(adapter: OrderHistoryAdapter);
    get(userId: string, orderCode: string): Observable<Order>;
    getHistory(userId: string, pageSize?: number, currentPage?: number, sort?: string): Observable<OrderHistoryList>;
    getConsignmentTracking(orderCode: string, consignmentCode: string, userId?: string): Observable<ConsignmentTracking>;
    cancel(userId: string, orderCode: string, cancelRequestInput: CancellationRequestEntryInputList): Observable<{}>;
    return(userId: string, returnRequestInput: ReturnRequestEntryInputList): Observable<ReturnRequest>;
    getReturnRequestDetail(userId: string, returnRequestCode: string): Observable<ReturnRequest>;
    getReturnRequestList(userId: string, pageSize?: number, currentPage?: number, sort?: string): Observable<ReturnRequestList>;
    cancelReturnRequest(userId: string, returnRequestCode: string, returnRequestModification: ReturnRequestModification): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderHistoryConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderHistoryConnector>;
}

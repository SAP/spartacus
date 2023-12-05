import { HttpClient } from '@angular/common/http';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { OrderHistoryAdapter } from '@spartacus/order/core';
import { CancellationRequestEntryInputList, ConsignmentTracking, Order, OrderHistoryList, ReturnRequest, ReturnRequestEntryInputList, ReturnRequestList, ReturnRequestModification } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccOrderHistoryAdapter implements OrderHistoryAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string, orderCode: string): Observable<Order>;
    loadHistory(userId: string, pageSize?: number, currentPage?: number, sort?: string): Observable<OrderHistoryList>;
    getConsignmentTracking(orderCode: string, consignmentCode: string, userId?: string): Observable<ConsignmentTracking>;
    cancel(userId: string, orderCode: string, cancelRequestInput: CancellationRequestEntryInputList): Observable<{}>;
    createReturnRequest(userId: string, returnRequestInput: ReturnRequestEntryInputList): Observable<ReturnRequest>;
    loadReturnRequestList(userId: string, pageSize?: number, currentPage?: number, sort?: string): Observable<ReturnRequestList>;
    loadReturnRequestDetail(userId: string, returnRequestCode: string): Observable<ReturnRequest>;
    cancelReturnRequest(userId: string, returnRequestCode: string, returnRequestModification: ReturnRequestModification): Observable<{}>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrderHistoryAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrderHistoryAdapter>;
}

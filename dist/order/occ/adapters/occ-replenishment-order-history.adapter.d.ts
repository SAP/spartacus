import { HttpClient } from '@angular/common/http';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { ReplenishmentOrderHistoryAdapter } from '@spartacus/order/core';
import { OrderHistoryList, ReplenishmentOrder, ReplenishmentOrderList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccReplenishmentOrderHistoryAdapter implements ReplenishmentOrderHistoryAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string, replenishmentOrderCode: string): Observable<ReplenishmentOrder>;
    loadReplenishmentDetailsHistory(userId: string, replenishmentOrderCode: string, pageSize?: number, currentPage?: number, sort?: string): Observable<OrderHistoryList>;
    cancelReplenishmentOrder(userId: string, replenishmentOrderCode: string): Observable<ReplenishmentOrder>;
    loadHistory(userId: string, pageSize?: number, currentPage?: number, sort?: string): Observable<ReplenishmentOrderList>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccReplenishmentOrderHistoryAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccReplenishmentOrderHistoryAdapter>;
}

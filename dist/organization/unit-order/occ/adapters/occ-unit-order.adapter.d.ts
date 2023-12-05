import { HttpClient } from '@angular/common/http';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { UnitOrderAdapter } from '@spartacus/organization/unit-order/core';
import * as i0 from "@angular/core";
export declare class OccUnitOrderAdapter implements UnitOrderAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    loadUnitOrderHistory(userId: string, pageSize?: number, currentPage?: number, filters?: string, sort?: string): Observable<OrderHistoryList>;
    loadUnitOrderDetail(userId: string, orderCode: string): Observable<Order>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUnitOrderAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUnitOrderAdapter>;
}

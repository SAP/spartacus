import { Order, OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { UnitOrderAdapter } from './unit-order.adapter';
import * as i0 from "@angular/core";
export declare class UnitOrderConnector {
    protected adapter: UnitOrderAdapter;
    constructor(adapter: UnitOrderAdapter);
    getUnitOrderHistory(userId: string, pageSize?: number, currentPage?: number, filters?: string, sort?: string): Observable<OrderHistoryList>;
    getUnitOrderDetail(userId: string, orderCode: string): Observable<Order>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitOrderConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitOrderConnector>;
}

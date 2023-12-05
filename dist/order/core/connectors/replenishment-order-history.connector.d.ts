import { OrderHistoryList, ReplenishmentOrder, ReplenishmentOrderList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ReplenishmentOrderHistoryAdapter } from './replenishment-order-history.adapter';
import * as i0 from "@angular/core";
export declare class ReplenishmentOrderHistoryConnector {
    protected adapter: ReplenishmentOrderHistoryAdapter;
    constructor(adapter: ReplenishmentOrderHistoryAdapter);
    load(userId: string, replenishmentOrderCode: string): Observable<ReplenishmentOrder>;
    loadReplenishmentDetailsHistory(userId: string, replenishmentOrderCode: string, pageSize?: number, currentPage?: number, sort?: string): Observable<OrderHistoryList>;
    cancelReplenishmentOrder(userId: string, replenishmentOrderCode: string): Observable<ReplenishmentOrder>;
    loadHistory(userId: string, pageSize?: number, currentPage?: number, sort?: string): Observable<ReplenishmentOrderList>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReplenishmentOrderHistoryConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReplenishmentOrderHistoryConnector>;
}

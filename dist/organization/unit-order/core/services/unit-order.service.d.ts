import { Store } from '@ngrx/store';
import { RoutingService, UserIdService } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { UnitOrderFacade } from '@spartacus/organization/unit-order/root';
import { Observable } from 'rxjs';
import { StateWithUnitOrder } from '../store';
import * as i0 from "@angular/core";
export declare class UnitOrderService implements UnitOrderFacade {
    protected store: Store<StateWithUnitOrder>;
    protected userIdService: UserIdService;
    protected routingService: RoutingService;
    constructor(store: Store<StateWithUnitOrder>, userIdService: UserIdService, routingService: RoutingService);
    /**
     * Returns order history list
     */
    getOrderHistoryList(pageSize: number): Observable<OrderHistoryList | undefined>;
    /**
     * Returns a loaded flag for order history list
     */
    getOrderHistoryListLoaded(): Observable<boolean>;
    /**
     * Retrieves an order list
     * @param pageSize page size
     * @param currentPage current page
     * @param sort sort
     */
    loadOrderList(pageSize: number, currentPage?: number, filters?: string, sort?: string): void;
    /**
     * Cleaning order list
     */
    clearOrderList(): void;
    /**
     * Returns an order's detail
     */
    getOrderDetails(): Observable<Order>;
    /**
     * Retrieves order's details
     *
     * @param orderCode an order code
     */
    loadOrderDetails(orderCode: string): void;
    /**
     * Clears order's details
     */
    clearOrderDetails(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitOrderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitOrderService>;
}

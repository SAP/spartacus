import { Store } from '@ngrx/store';
import { RoutingService, StateWithProcess, UserIdService } from '@spartacus/core';
import { CancellationRequestEntryInputList, ConsignmentTracking, Order, OrderHistoryFacade, OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { StateWithOrder } from '../store/order-state';
import * as i0 from "@angular/core";
export declare class OrderHistoryService implements OrderHistoryFacade {
    protected store: Store<StateWithOrder>;
    protected processStateStore: Store<StateWithProcess<void>>;
    protected userIdService: UserIdService;
    protected routingService: RoutingService;
    constructor(store: Store<StateWithOrder>, processStateStore: Store<StateWithProcess<void>>, userIdService: UserIdService, routingService: RoutingService);
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
    loadOrderList(pageSize: number, currentPage?: number, sort?: string): void;
    /**
     * Cleaning order list
     */
    clearOrderList(): void;
    /**
     *  Returns a consignment tracking detail
     */
    getConsignmentTracking(): Observable<ConsignmentTracking>;
    /**
     * Retrieves consignment tracking details
     * @param orderCode an order code
     * @param consignmentCode a consignment code
     */
    loadConsignmentTracking(orderCode: string, consignmentCode: string): void;
    /**
     * Cleaning consignment tracking
     */
    clearConsignmentTracking(): void;
    cancelOrder(orderCode: string, cancelRequestInput: CancellationRequestEntryInputList): void;
    /**
     * Returns the cancel order loading flag
     */
    getCancelOrderLoading(): Observable<boolean>;
    /**
     * Returns the cancel order success flag
     */
    getCancelOrderSuccess(): Observable<boolean>;
    /**
     * Resets the cancel order process flags
     */
    resetCancelOrderProcessState(): void;
    /**
     * Returns the order details loading flag
     */
    getOrderDetailsLoading(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderHistoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderHistoryService>;
}

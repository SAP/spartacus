import { Order, OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare function unitOrderFacadeFactory(): UnitOrderFacade;
export declare abstract class UnitOrderFacade {
    /**
     * Returns order history list
     */
    abstract getOrderHistoryList(pageSize: number): Observable<OrderHistoryList | undefined>;
    /**
     * Returns a loaded flag for order history list
     */
    abstract getOrderHistoryListLoaded(): Observable<boolean>;
    /**
     * Retrieves an order list
     * @param pageSize page size
     * @param currentPage current page
     * @param filters filters values for buyer and unit given in format '::user:<userFilter>:unit:<unitFilter>'
     * @param sort sort
     */
    abstract loadOrderList(pageSize: number, currentPage?: number, filters?: string, sort?: string): void;
    /**
     * Cleaning order list
     */
    abstract clearOrderList(): void;
    /**
     * Returns an order's detail
     */
    abstract getOrderDetails(): Observable<Order>;
    /**
     * Retrieves order's details
     *
     * @param orderCode an order code
     */
    abstract loadOrderDetails(orderCode: string): void;
    /**
     * Clears order's details
     */
    abstract clearOrderDetails(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitOrderFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitOrderFacade>;
}

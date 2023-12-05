import { Observable } from 'rxjs';
import { ReturnRequest, ReturnRequestEntryInputList, ReturnRequestList, ReturnRequestModification } from '../model/order.model';
import * as i0 from "@angular/core";
export declare function orderReturnRequestFacadeFactory(): OrderReturnRequestFacade;
export declare abstract class OrderReturnRequestFacade {
    /**
     * Create order return request
     * @param orderCode an order code
     * @param returnRequestInput order return request entry input
     */
    abstract createOrderReturnRequest(returnRequestInput: ReturnRequestEntryInputList): void;
    /**
     * Return an order return request
     */
    abstract getOrderReturnRequest(): Observable<ReturnRequest>;
    /**
     * Gets order return request list
     */
    abstract getOrderReturnRequestList(pageSize: number): Observable<ReturnRequestList | undefined>;
    /**
     * Loads order return request detail
     * @param returnRequestCode
     */
    abstract loadOrderReturnRequestDetail(returnRequestCode: string): void;
    /**
     * Loads order return request list
     * @param pageSize page size
     * @param currentPage current page
     * @param sort sort
     */
    abstract loadOrderReturnRequestList(pageSize: number, currentPage?: number, sort?: string): void;
    /**
     * Cleaning order return request list
     */
    abstract clearOrderReturnRequestList(): void;
    /**
     * Get the order return request loading flag
     */
    abstract getReturnRequestLoading(): Observable<boolean>;
    /**
     * Get the order return request success flag
     */
    abstract getReturnRequestSuccess(): Observable<boolean>;
    /**
     * Cleaning order return request details
     */
    abstract clearOrderReturnRequestDetail(): void;
    abstract cancelOrderReturnRequest(returnRequestCode: string, returnRequestModification: ReturnRequestModification): void;
    /**
     * Returns the cancel return request loading flag
     */
    abstract getCancelReturnRequestLoading(): Observable<boolean>;
    /**
     * Returns the cancel return request success flag
     */
    abstract getCancelReturnRequestSuccess(): Observable<boolean>;
    /**
     * Resets the cancel return request process flags
     */
    abstract resetCancelReturnRequestProcessState(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderReturnRequestFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderReturnRequestFacade>;
}

import { Injectable } from '@angular/core';
import {
  facadeFactory,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  ReturnRequestModification,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ORDER_CORE_FEATURE } from '../feature-name';

export function orderReturnRequestFacadeFactory() {
  return facadeFactory({
    facade: OrderReturnRequestFacade,
    feature: ORDER_CORE_FEATURE,
    methods: [
      'createOrderReturnRequest',
      'getOrderReturnRequest',
      'getOrderReturnRequestList',
      'loadOrderReturnRequestDetail',
      'loadOrderReturnRequestList',
      'clearOrderReturnRequestList',
      'getReturnRequestLoading',
      'getReturnRequestSuccess',
      'clearOrderReturnRequestDetail',
      'cancelOrderReturnRequest',
      'getCancelReturnRequestLoading',
      'getCancelReturnRequestSuccess',
      'resetCancelReturnRequestProcessState',
    ],
    async: true,
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: orderReturnRequestFacadeFactory,
})
export abstract class OrderReturnRequestFacade {
  /**
   * Create order return request
   * @param orderCode an order code
   * @param returnRequestInput order return request entry input
   */
  abstract createOrderReturnRequest(
    returnRequestInput: ReturnRequestEntryInputList
  ): void;

  /**
   * Return an order return request
   */
  abstract getOrderReturnRequest(): Observable<ReturnRequest>;

  /**
   * Gets order return request list
   */
  abstract getOrderReturnRequestList(
    pageSize: number
  ): Observable<ReturnRequestList | undefined>;

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
  abstract loadOrderReturnRequestList(
    pageSize: number,
    currentPage?: number,
    sort?: string
  ): void;

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

  /*
   * Cancel order return request
   */
  abstract cancelOrderReturnRequest(
    returnRequestCode: string,
    returnRequestModification: ReturnRequestModification
  ): void;

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
}

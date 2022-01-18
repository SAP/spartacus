import {
  CancellationRequestEntryInputList,
  Order,
  OrderHistoryList,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  ReturnRequestModification,
} from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { Observable } from 'rxjs';

export abstract class OrderAdapter {
  /**
   * Abstract method used to load order data.
   *
   * @param userId The `userId` for given user
   * @param orderCode The `orderCode` for given order
   */
  abstract load(userId: string, orderCode: string): Observable<Order>;

  /**
   * Abstract method used to load order history for an user.
   *
   * @param userId The `userId` for given user
   * @param pageSize
   * @param currentPage
   * @param sort Sorting method
   */
  abstract loadHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList>;

  /**
   * Abstract method used to get consignment tracking details
   * @param orderCode an order code
   * @param consignmentCode a consignment code
   * @param userId user id related to order
   */
  abstract getConsignmentTracking(
    orderCode: string,
    consignmentCode: string,
    userId?: string
  ): Observable<ConsignmentTracking>;

  /**
   * Abstract method used to create return request
   * @param userId The `userId` for given user
   * @param returnRequestInput Return request entry input list
   */
  abstract createReturnRequest(
    userId: string,
    returnRequestInput: ReturnRequestEntryInputList
  ): Observable<ReturnRequest>;

  /**
   * Abstract method used to load order return request details
   * @param userId
   * @param returnRequestCode
   */
  abstract loadReturnRequestDetail(
    userId: string,
    returnRequestCode: string
  ): Observable<ReturnRequest>;

  /**
   * Abstract method used to load order return request list for an user.
   * @param userId
   * @param pageSize
   * @param currentPage
   * @param sort
   */
  abstract loadReturnRequestList(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<ReturnRequestList>;

  /**
   * Abstract method used to cancel order
   * @param userId
   * @param orderCode
   * @param cancelRequestInput Cancel request entry input list
   */
  abstract cancel(
    userId: string,
    orderCode: string,
    cancelRequestInput: CancellationRequestEntryInputList
  ): Observable<{}>;

  /**
   * Abstract method used to cancel one return request
   * @param userId
   * @param returnRequestCode
   * @param returnRequestModification
   */
  abstract cancelReturnRequest(
    userId: string,
    returnRequestCode: string,
    returnRequestModification: ReturnRequestModification
  ): Observable<{}>;
}

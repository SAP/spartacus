import { Observable } from 'rxjs';
import { ConsignmentTracking } from '../../../model/consignment-tracking.model';
import {
  Order,
  OrderHistoryList,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
} from '../../../model/order.model';

export abstract class UserOrderAdapter {
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
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<OrderHistoryList>;

  /**
   * Abstract method used to get consignment tracking details
   * @param orderCode an order code
   * @param consignmentCode a consignment code
   */
  abstract getConsignmentTracking(
    orderCode: string,
    consignmentCode: string
  ): Observable<ConsignmentTracking>;

  /**
   * Abstract method used to create return request
   * @param userId The `userId` for given user
   * @param orderCode The `orderCode` for given order
   * @param returnRequestInput Return request entry input list
   */
  abstract createReturnRequest(
    userId: string,
    orderCode: string,
    returnRequestInput: ReturnRequestEntryInputList
  ): Observable<ReturnRequest>;

  /**
   * Abstract method used to load order return requests for an user.
   * @param userId
   * @param pageSize
   * @param currentPage
   * @param sort
   */
  abstract loadReturnRequests(
    userId: string,
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<ReturnRequestList>;
}

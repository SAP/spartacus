import {
  ConsignmentTracking,
  Order,
  OrderHistoryList,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';

export abstract class UnitOrderAdapter {
  /**
   * Abstract method used to load order data.
   *
   * @param userId The `userId` for given user
   * @param orderCode The `orderCode` for given order
   */
  abstract load(userId: string, orderCode: string): Observable<Order>;

  /**
   * Abstract method used to load order history for units.
   *
   * @param userId The `userId` for given user
   * @param pageSize
   * @param currentPage
   * @param sort Sorting method
   */
  abstract loadUnitOrderHistory(
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
}

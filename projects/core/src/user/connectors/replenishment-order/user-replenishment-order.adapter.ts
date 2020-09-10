import { Observable } from 'rxjs';
import { OrderHistoryList, ReplenishmentOrder } from '../../../model/index';

export abstract class UserReplenishmentOrderAdapter {
  /**
   * Abstract method used to load replenishment order details.
   *
   * @param userId The `userId` for given user
   * @param replenishmentOrderCode The `replenishmentOrderCode` for a given scheduled replenishment
   */
  abstract load(
    userId: string,
    replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder>;

  /**
   * Abstract method used to load order history from a replenishment order.
   *
   * @param userId The `userId` for given user
   * @param replenishmentOrderCode The `replenishmentOrderCode` for a given scheduled replenishment
   * @param pageSize The `pageSize` to display number of data as order history
   * @param currentPage The `currentPage` of the order history list
   * @param sort The `sort` for a sorting method
   */
  abstract loadReplenishmentDetailsHistory(
    userId: string,
    replenishmentOrderCode: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList>;

  /**
   * Abstract method used to cancel a replenishment order.
   *
   * @param userId The `userId` for given user
   * @param replenishmentOrderCode The `replenishmentOrderCode` for a given scheduled replenishment
   */
  abstract cancelReplenishmentOrder(
    userId: string,
    replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder>;
}

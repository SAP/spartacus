import { OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';

export abstract class UnitOrderAdapter {
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
}

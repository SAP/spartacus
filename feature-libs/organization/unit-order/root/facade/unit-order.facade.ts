import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ORGANIZATION_UNIT_ORDER_FEATURE } from '../feature-name';

export function unitOrderFacadeFactory() {
  return facadeFactory({
    facade: UnitOrderFacade,
    feature: ORGANIZATION_UNIT_ORDER_FEATURE,
    methods: [
      'getOrderHistoryList',
      'getOrderHistoryListLoaded',
      'loadOrderList',
      'clearOrderList',
    ],
    async: true,
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: unitOrderFacadeFactory,
})
export abstract class UnitOrderFacade {
  /**
   * Returns order history list
   */
  abstract getOrderHistoryList(
    pageSize: number
  ): Observable<OrderHistoryList | undefined>;

  /**
   * Returns a loaded flag for order history list
   */
  abstract getOrderHistoryListLoaded(): Observable<boolean>;

  /**
   * Retrieves an order list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  abstract loadOrderList(
    pageSize: number,
    currentPage?: number,
    sort?: string
  ): void;

  /**
   * Cleaning order list
   */
  abstract clearOrderList(): void;
}

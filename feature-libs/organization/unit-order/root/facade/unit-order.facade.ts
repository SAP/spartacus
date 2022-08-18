import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ConsignmentTracking, Order, OrderHistoryList } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { ORGANIZATION_UNIT_ORDER_FEATURE } from '../feature-name';

export function unitOrderFacadeFactory() {
  return facadeFactory({
    facade: UnitOrderFacade,
    feature: ORGANIZATION_UNIT_ORDER_FEATURE,
    methods: [
      'getOrderDetails',
      'loadOrderDetails',
      'clearOrderDetails',
      'getOrderHistoryList',
      'getOrderHistoryListLoaded',
      'loadOrderList',
      'clearOrderList',
      'getConsignmentTracking',
      'loadConsignmentTracking',
      'clearConsignmentTracking',
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

  /**
   * Returns order history list
   */
  abstract getOrderHistoryList(
    pageSize: number,
    unitLevelOrderCode?: string
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
   * @param unitLevelOrderCode
   */
  abstract loadOrderList(
    pageSize: number,
    currentPage?: number,
    sort?: string,
    unitLevelOrderCode?: string
  ): void;

  /**
   * Cleaning order list
   */
  abstract clearOrderList(): void;

  /**
   *  Returns a consignment tracking detail
   */
  abstract getConsignmentTracking(): Observable<ConsignmentTracking>;

  /**
   * Retrieves consignment tracking details
   * @param orderCode an order code
   * @param consignmentCode a consignment code
   */
  abstract loadConsignmentTracking(
    orderCode: string,
    consignmentCode: string
  ): void;

  /**
   * Cleaning consignment tracking
   */
  abstract clearConsignmentTracking(): void;


}

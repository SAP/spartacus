import { Injectable } from '@angular/core';
import {
  CancellationRequestEntryInputList,
  facadeFactory,
  Order,
  OrderHistoryList,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ORDER_CORE_FEATURE } from '../feature-name';
import { ConsignmentTracking } from '../model/consignment-tracking.model';

export function orderFacadeFactory() {
  return facadeFactory({
    facade: OrderFacade,
    feature: ORDER_CORE_FEATURE,
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
      'cancelOrder',
      'getCancelOrderLoading',
      'getCancelOrderSuccess',
      'resetCancelOrderProcessState',
    ],
    async: true,
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: orderFacadeFactory,
})
export abstract class OrderFacade {
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

  /*
   * Cancel an order
   */
  abstract cancelOrder(
    orderCode: string,
    cancelRequestInput: CancellationRequestEntryInputList
  ): void;

  /**
   * Returns the cancel order loading flag
   */
  abstract getCancelOrderLoading(): Observable<boolean>;

  /**
   * Returns the cancel order success flag
   */
  abstract getCancelOrderSuccess(): Observable<boolean>;

  /**
   * Resets the cancel order process flags
   */
  abstract resetCancelOrderProcessState(): void;
}

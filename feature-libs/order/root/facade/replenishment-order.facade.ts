import { Injectable } from '@angular/core';
import {
  facadeFactory,
  ReplenishmentOrder,
  ReplenishmentOrderList,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ORDER_CORE_FEATURE } from '../feature-name';

export function replenishmentOrderFacadeFactory() {
  return facadeFactory({
    facade: ReplenishmentOrderFacade,
    feature: ORDER_CORE_FEATURE,
    methods: [
      'loadReplenishmentOrderDetails',
      'getReplenishmentOrderDetails',
      'getReplenishmentOrderDetailsLoading',
      'getReplenishmentOrderDetailsSuccess',
      'getReplenishmentOrderDetailsError',
      'clearReplenishmentOrderDetails',
      'cancelReplenishmentOrder',
      'getCancelReplenishmentOrderLoading',
      'getCancelReplenishmentOrderSuccess',
      'getCancelReplenishmentOrderError',
      'clearCancelReplenishmentOrderProcessState',
      'getReplenishmentOrderHistoryList',
      'getReplenishmentOrderHistoryListLoading',
      'getReplenishmentOrderHistoryListError',
      'getReplenishmentOrderHistoryListSuccess',
      'loadReplenishmentOrderList',
      'clearReplenishmentOrderList',
    ],
    async: true,
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: replenishmentOrderFacadeFactory,
})
export abstract class ReplenishmentOrderFacade {
  /**
   * Returns replenishment order details for a given 'current' user
   *
   * @param replenishmentOrderCode a replenishment order code
   */
  abstract loadReplenishmentOrderDetails(replenishmentOrderCode: string): void;

  /**
   * Returns a replenishment order details
   */
  abstract getReplenishmentOrderDetails(): Observable<ReplenishmentOrder>;

  /**
   * Returns a replenishment order details loading flag
   */
  abstract getReplenishmentOrderDetailsLoading(): Observable<boolean>;

  /**
   * Returns a replenishment order details success flag
   */
  abstract getReplenishmentOrderDetailsSuccess(): Observable<boolean>;

  /**
   * Returns a replenishment order details error flag
   */
  abstract getReplenishmentOrderDetailsError(): Observable<boolean>;

  /**
   * Clears the replenishment orders details state
   */
  abstract clearReplenishmentOrderDetails(): void;

  /**
   * Cancels a specific replenishment order for a given 'current' user
   *
   * @param replenishmentOrderCode a replenishment order code
   */
  abstract cancelReplenishmentOrder(replenishmentOrderCode: string): void;

  /**
   * Returns the cancel replenishment order loading flag
   */
  abstract getCancelReplenishmentOrderLoading(): Observable<boolean>;

  /**
   * Returns the cancel replenishment order success flag
   */
  abstract getCancelReplenishmentOrderSuccess(): Observable<boolean>;

  /**
   * Returns the cancel replenishment order error flag
   */
  abstract getCancelReplenishmentOrderError(): Observable<boolean>;

  /**
   * Clears the cancel replenishment order processing state
   */
  abstract clearCancelReplenishmentOrderProcessState(): void;

  /**
   * Returns replenishment order history list
   */
  abstract getReplenishmentOrderHistoryList(
    pageSize: number
  ): Observable<ReplenishmentOrderList | undefined>;

  /**
   * Returns a loading flag for replenishment order history list
   */
  abstract getReplenishmentOrderHistoryListLoading(): Observable<boolean>;

  /**
   * Returns a error flag for replenishment order history list
   */
  abstract getReplenishmentOrderHistoryListError(): Observable<boolean>;

  /**
   * Returns a success flag for replenishment order history list
   */
  abstract getReplenishmentOrderHistoryListSuccess(): Observable<boolean>;

  /**
   * Retrieves a replenishment order list
   * @param pageSize page size
   * @param currentPage current page
   * @param sort sort
   */
  abstract loadReplenishmentOrderList(
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): void;

  /**
   * Cleaning replenishment order list
   */
  abstract clearReplenishmentOrderList(): void;
}

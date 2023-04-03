/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CxDatePipe,
  OccEndpointsService,
  RoutingService,
  UserIdService,
  TranslationService,
} from '@spartacus/core';
import { mergeMap, switchMap } from 'rxjs/operators';
import { cdpOrderAdapter } from '../../occ/adapter/cdp-order-adapter';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from '../model/ImageDetail/product';
import { finalOrder } from '../model/order/finalOrder';
import { order } from '../model/orderDetail/order';
import { Injectable } from '@angular/core';
import { CdpOrderFacade } from '../facade/cdp-order-facade';

@Injectable()
export class CdpOrderService implements CdpOrderFacade {
  constructor(
    private userIdService: UserIdService,
    private cdpOrderAdapter: cdpOrderAdapter,
    protected datePipe: CxDatePipe,
    protected routing: RoutingService,
    protected occEndpointsService: OccEndpointsService,
    protected translation: TranslationService
  ) {}

  orderValue: finalOrder = { orders: [] };
  totalPrice: number = 0;
  totalItem: number[] = [];
  orderDetail: Record<string, order> = {};
  orderStatus: Record<string, Record<string, number>> = {};
  orderImage: Record<string, product[]> = {};
  userId: string;
  tabTitleParam$ = new BehaviorSubject(0);
  public loading$ = new BehaviorSubject<boolean>(true);
  sortType: string;
  obser$: Observable<finalOrder>;
  orderData: order;

  public getOrder(page_size: number): Observable<finalOrder> {
    this.obser$ = this.userIdService
      .takeUserId()
      .pipe(
        switchMap((userId) => this.cdpOrderAdapter.getOrder(userId, page_size))
      );

    return this.obser$;
  }

  public fetchOrder(page: number, page_size: number): Observable<finalOrder> {
    this.obser$ = this.userIdService
      .takeUserId()
      .pipe(
        switchMap((userId) =>
          this.cdpOrderAdapter.getOrderPerPage(userId, page_size, page)
        )
      );
    return this.obser$;
  }

  public async fetchOrderDetail(
    finalResult: finalOrder
  ): Promise<Record<string, order>> {
    for (let orderval of finalResult.orders) {
      await this.userIdService
        .takeUserId()
        .pipe(
          mergeMap((userId) =>
            this.cdpOrderAdapter.getOrderDetail(userId, orderval)
          )
        )
        .toPromise()
        .then((data) => {
          this.orderDetail[orderval.code] = data;
        });
    }
    return this.orderDetail;
  }

  public fetchOrderStatus(
    detail: Record<string, order>
  ): Record<string, Record<string, number>> {
    this.clearCart();
    // eslint-disable-next-line guard-for-in
    for (let orderCode in detail) {
      this.orderStatus[orderCode] ??= {};
      this.orderImage[orderCode] ??= [];
      detail[orderCode].consignments.forEach((ord) => {
        this.orderStatus[orderCode][ord.status] ??= 0;
        ord.entries.forEach((entr) => {
          this.orderStatus[orderCode][ord.status] =
            this.orderStatus[orderCode][ord.status] + entr.quantity;
        });
      });
    }
    return this.orderStatus;
  }

  public fetchOrderImage(
    detail: Record<string, order>
  ): Record<string, product[]> {
    this.clearCart();
    // eslint-disable-next-line guard-for-in
    for (let orderCode in detail) {
      this.orderImage[orderCode] ??= [];
      detail[orderCode].entries.forEach((entr) => {
        entr.product.images.forEach((prd) => {
          if (prd.url) {
            prd.url =
              this.occEndpointsService.getBaseUrl({
                prefix: false,
                baseSite: false,
              }) + prd.url;
          }
        });
        this.orderImage[orderCode].push(entr.product);
      });
    }
    return this.orderImage;
  }

  private clearCart() {
    this.orderValue = { orders: [] };
    this.orderImage = {};
    this.orderDetail = {};
    this.orderStatus = {};
  }
}

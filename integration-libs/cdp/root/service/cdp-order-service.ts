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
import { returnOrder } from '../model/returnDetail/returnOrder';

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
  orderImage: Record<string, product[]> = {};
  userId: string;
  tabTitleParam$ = new BehaviorSubject(0);
  public loading$ = new BehaviorSubject<boolean>(true);
  sortType: string;
  order$: Observable<finalOrder>;
  returnObser$: Observable<returnOrder>;
  orderData: order;
  returnDate: Record<string, string> = {};

  public getOrder(page_size: number): Observable<finalOrder> {
    this.order$ = this.userIdService
      .takeUserId()
      .pipe(
        switchMap((userId) => this.cdpOrderAdapter.getOrder(userId, page_size))
      );

    return this.order$;
  }

  public fetchOrder(page: number, page_size: number): Observable<finalOrder> {
    this.order$ = this.userIdService
      .takeUserId()
      .pipe(
        switchMap((userId) =>
          this.cdpOrderAdapter.getOrderPerPage(userId, page_size, page)
        )
      );
    return this.order$;
  }

  public fetchReturn(): Observable<returnOrder> {
    return this.userIdService
      .takeUserId()
      .pipe(switchMap((userId) => this.cdpOrderAdapter.getRetunDetail(userId)));
  }

  mapReturnDate(
    returnSub: returnOrder,
    returnDate: Record<string, string>
  ) {
    if (Array.isArray(returnSub.returnRequests)) {
      returnSub.returnRequests.forEach((returnval) => {
        returnDate[returnval.order.code] = returnval.creationTime;
      });
    }
  }

  mapReturnStatus(returnSub: returnOrder,orderStatus: Record<string, Record<string, number>>,detail: Record<string, order>){
    if (Array.isArray(returnSub.returnRequests)) {
      returnSub.returnRequests.forEach((returnval)=>
      {
        if(typeof orderStatus[returnval.order.code]==='undefined')
          orderStatus[returnval.order.code] ??= {};
        orderStatus[returnval.order.code]['RETURNED'] ??= 0;
        if (Array.isArray(returnval.order?.entries)) {
          returnval.order.entries.forEach((entry) => {
          if(detail[returnval.order.code] && detail[returnval.order.code].deliveryItemsQuantity)
          detail[returnval.order.code].deliveryItemsQuantity = detail[returnval.order.code].deliveryItemsQuantity + entry.quantity;
          orderStatus[returnval.order.code]['RETURNED']+= entry.quantity;
          });
       }
      });
    }
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
    detail: Record<string, order>,
    orderStatus: Record<string, Record<string, number>>
  ){
    this.clearCart();
    // eslint-disable-next-line guard-for-in
    for (let orderCode in detail) {
      if (typeof orderStatus[orderCode] === 'undefined')
        orderStatus[orderCode] ??= {};
      if (detail[orderCode].consignments != null) {
        detail[orderCode].consignments.forEach((ord) => {
          orderStatus[orderCode][ord.status] ??= 0;
          ord.entries.forEach((entr) => {
            orderStatus[orderCode][ord.status] =
              orderStatus[orderCode][ord.status] + entr.quantity;
          });
        });
      } else if (detail[orderCode].deliveryStatus != null) {
        orderStatus[orderCode][detail[orderCode].deliveryStatus] ??= 0;
        detail[orderCode].entries.forEach((entr) => {
          orderStatus[orderCode][detail[orderCode].deliveryStatus] =
            orderStatus[orderCode][detail[orderCode].deliveryStatus] +
            entr.quantity;
        });
      }
    }
    console.log(orderStatus);
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
    console.log(this.orderImage);
    return this.orderImage;
  }

  private clearCart() {
    this.orderValue = { orders: [] };
    this.orderImage = {};
    this.orderDetail = {};
  }
}

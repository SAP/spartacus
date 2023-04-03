/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, Optional } from '@angular/core';
import {
  CxDatePipe,
  FeatureConfigService,
  OccEndpointsService,
  RoutingService,
  TranslationService,
  UserIdService,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { product } from '../../model/ImageDetail/product';
import { cdpOrderAdapter } from '../../adapter/cdp-order-adapter';
import { result } from '../../model/result';
import { finalOrder } from '../../model/order/finalOrder';
import { order } from '../../model/orderDetail/order';
import {
  OrderHistoryFacade,
  OrderHistoryList,
  ReplenishmentOrderHistoryFacade,
} from '@spartacus/order/root';
import { OrderHistoryComponent } from '@spartacus/order/components';

@Component({
  selector: 'cx-cdp-body',
  templateUrl: './cdp-my-account.component.html',
  styleUrls: ['./cdp-my-account.component.scss'],
  providers: [CxDatePipe],
})
export class CdpMyAccountComponent
  extends OrderHistoryComponent
  implements OnInit
{
  orders: OrderHistoryList | undefined;

  constructor(
    protected routing: RoutingService,
    protected orderHistoryFacade: OrderHistoryFacade,
    protected translation: TranslationService,
    protected replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
    private userIdService: UserIdService,
    private cdpOrderAdapter: cdpOrderAdapter,
    protected occEndpointsService: OccEndpointsService,
    protected datePipe: CxDatePipe,
    @Optional() protected featureConfigService?: FeatureConfigService
  ) {
    super(
      routing,
      orderHistoryFacade,
      translation,
      replenishmentOrderHistoryFacade
    );
  }
  result: finalOrder = { orders: [] };
  totalPrice: number = 0;
  totalItem: number[] = [];
  orderDetail: Record<string, order> = {};
  orderedItems: Record<string, number> = {};
  i: number = 0;
  output: result;
  orderStatus: Record<string, Record<string, number>> = {};
  orderImage: Record<string, product[]> = {};
  userId: string;
  tabTitleParam$ = new BehaviorSubject(0);
  public loading$ = new BehaviorSubject<boolean>(true);
  length: number = 0;

  // orders$ = this.userIdService.takeUserId().pipe(switchMap((userId) => this.cdpOrderAdapter.getOrder(userId)));

  private P_SIZE = 3;
  sortType: string;
  hasPONumber: boolean | undefined;
  // this.loading$.next(true);
  orders$: Observable<OrderHistoryList | undefined> =
    this.orderHistoryFacade.getOrderHistoryList(this.P_SIZE);
  // this.loading$.next(false);
  ngOnInit(): void {
    this.getMyData();
  }

  public getMyData(): void {
    this.orders$.subscribe((res) => {
      this.orders = res;
      this.getOrderedItems(this.orders);
      // this.length=Object.keys(this.orders).length;
    });
  }

  public async getOrderedItems(orders: any): Promise<void> {
    for (let order of orders.orders) {
      await this.userIdService
        .takeUserId()
        .pipe(
          mergeMap((userId) =>
            this.cdpOrderAdapter.getOrderDetail(userId, order)
          )
        )
        .toPromise()
        .then((data) => {
          this.orderDetail[order.code] = data;
          //orderDetail->order
        });
    }
    this.getDetail();
    console.log(this.orderDetail);
  }

  public async getDetail() {
    this.loading$.next(true);
    // eslint-disable-next-line guard-for-in
    for (let orderCode in this.orderDetail) {
      this.orderStatus[orderCode] ??= {};
      this.orderImage[orderCode] ??= [];
      this.orderDetail[orderCode].consignments.forEach((ord) => {
        this.orderStatus[orderCode][ord.status] ??= 0;
        ord.entries.forEach((entr) => {
          console.log(orderCode + ' status ' + ord.status + entr.quantity);
          this.orderStatus[orderCode][ord.status] =
            this.orderStatus[orderCode][ord.status] + entr.quantity;
        });
      });

      this.orderImage[orderCode] ??= [];
      this.orderDetail[orderCode].entries.forEach((entr) => {
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
      this.loading$.next(false);
    }
    console.log(this.orderImage);
  }
}

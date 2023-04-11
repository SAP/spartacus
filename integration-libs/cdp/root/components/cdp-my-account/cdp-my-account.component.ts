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
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from '../../model/ImageDetail/product';
import { result } from '../../model/result';
import { finalOrder } from '../../model/order/finalOrder';
import { order } from '../../model/orderDetail/order';
import {
  OrderHistoryFacade,
  OrderHistoryList,
  ReplenishmentOrderHistoryFacade,
} from '@spartacus/order/root';
import { OrderHistoryComponent } from '@spartacus/order/components';
import { CdpOrderService } from '../../service';

@Component({
  selector: 'cx-cdp-body',
  templateUrl: './cdp-my-account.component.html',
  styleUrls: ['./cdp-my-account.component.scss'],
  providers: [CxDatePipe,CdpOrderService],
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
    protected cdpOrderService: CdpOrderService,
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
    await this.cdpOrderService.fetchOrderDetail(orders).then((data)=>{
      this.orderDetail= data;
    });
    this.getDetail();
  }

  public async getDetail() {
    this.loading$.next(true);
    this.orderStatus= this.cdpOrderService.fetchOrderStatus(this.orderDetail);
    this.orderImage=this.cdpOrderService.fetchOrderImage(this.orderDetail);
    this.loading$.next(false);
    if (Object.keys(this.orderDetail).length === 0) this.loading$.next(false);
  }

  getOrderDetail(order: order): void {
    this.routing.go({
      cxRoute: 'orderDetails',
      params: order,
    });
  }

}

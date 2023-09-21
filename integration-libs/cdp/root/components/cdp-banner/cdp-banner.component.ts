/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import {
  CxDatePipe,
  OccEndpointsService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from '../../model/ImageDetail/product';
import { finalOrder } from '../../model/order/finalOrder';
import { order } from '../../model/orderDetail/order';
import { CdpOrderService } from '../../service';

@Component({
  selector: 'cx-cdp-banner',
  templateUrl: './cdp-banner.component.html',
  styleUrls: ['./cdp-banner.component.scss'],
  providers: [CxDatePipe,CdpOrderService],
})

  export class CdpBannerComponent implements OnInit {
    constructor(
      protected datePipe: CxDatePipe,
      protected routing: RoutingService,
      protected occEndpointsService: OccEndpointsService,
      protected translation: TranslationService,
      protected cdpOrderService: CdpOrderService,
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
    page_size: number = 3;

    ngOnInit(): void {
      this.getMyData();
    }

    public getMyData(): void {
      this.obser$ = this.cdpOrderService.getOrder(this.page_size);
      this.obser$.subscribe((res) => {
        this.orderValue = res;
        this.tabTitleParam$.next(res.orders.length);
        this.getOrderedItems(this.orderValue);
        console.log(this.orderValue);

      });
    }

    public async getOrderedItems(finalResult: finalOrder): Promise<void> {
      await this.cdpOrderService.fetchOrderDetail(finalResult).then((data)=>{
        this.orderDetail= data;
        console.log("orderdetail",this.orderDetail);
      });
      this.getDetail();
    }

    public async getDetail() {
      this.loading$.next(true);
      this.orderImage=this.cdpOrderService.fetchOrderImage(this.orderDetail);
      this.loading$.next(false);
      if (Object.keys(this.orderDetail).length === 0) this.loading$.next(false);
    }
  }

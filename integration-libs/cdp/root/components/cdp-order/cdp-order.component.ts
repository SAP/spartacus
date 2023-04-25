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
  TranslationService
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from '../../model/ImageDetail/product';
import { finalOrder } from '../../model/order/finalOrder';
import { order } from '../../model/orderDetail/order';
import { returnOrder } from '../../model/returnDetail/returnOrder';
import { CdpOrderService } from '../../service';

@Component({
  selector: 'cx-order',
  templateUrl: './cdp-order.component.html',
  styleUrls: ['./cdp-order.component.scss'],
  providers: [CxDatePipe,CdpOrderService],
})
export class cdpOrderComponent implements OnInit {
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
  returnDate: Record<string, string>={};
  userId: string;
  tabTitleParam$ = new BehaviorSubject(0);
  public loading$ = new BehaviorSubject<boolean>(true);
  sortType: string;
  orders$: Observable<finalOrder>;
  returnObser$: Observable<returnOrder>;
  returnOrderData: returnOrder;
  page_size: number = 5;
  isOrderPresernt: boolean=false;

  ngOnInit(): void {
    this.getMyData();
  }

  public getMyData(): void {
    this.orders$ = this.cdpOrderService.getOrder(this.page_size);
    this.orders$.subscribe((res) => {
      this.loading$.next(true);
      this.orderValue = res;
      this.tabTitleParam$.next(res.orders.length);
      this.calculateTotalAmount(this.orderValue);
      this.getItemCount(this.orderValue);
      this.isOrderPresernt=res.orders.length?true:false;
    });
  }

  public calculateTotalAmount(finalResult: finalOrder): void {
    for (var val of finalResult.orders) {
      this.totalPrice = val.total.value + this.totalPrice;
    }
  }

  public async getItemCount(finalResult: finalOrder): Promise<void> {
    await this.cdpOrderService.fetchOrderDetail(finalResult).then((data)=>{
      this.orderDetail= data;
    });
    this.fetchReturn();
    this.getDetail();
  }

  public async getDetail() {
    this.cdpOrderService.fetchOrderStatus(this.orderDetail,this.orderStatus);
    this.orderImage=this.cdpOrderService.fetchOrderImage(this.orderDetail);
    if (Object.keys(this.orderDetail).length === 0) this.loading$.next(false);
  }

  pageChange(page: number): void {
    this.fetchOrders(page);
  }

  private async fetchOrders(page: number){
    this.loading$.next(true);
    this.orderStatus={};
    this.orders$ = this.cdpOrderService.fetchOrder(page,this.page_size);
    this.orders$.subscribe((res) => {
      this.orderValue = res;
      this.tabTitleParam$.next(res.orders.length);
      this.calculateTotalAmount(this.orderValue);
      this.getItemCountAFterPagniation(this.orderValue);
    });
    if (Object.keys(this.orderDetail).length === 0) this.loading$.next(false);
  }

  private fetchReturn(){
    this.cdpOrderService.fetchReturn().subscribe((data) => {
      this.returnOrderData=data;
      this.cdpOrderService.mapReturnDate(data,this.returnDate);
      this.cdpOrderService.mapReturnStatus(data,this.orderStatus,this.orderDetail);
      console.log(this.returnDate);
      this.loading$.next(false);
    });
  }

  private async getItemCountAFterPagniation(finalResult: finalOrder): Promise<void>{
    await this.cdpOrderService.fetchOrderDetail(finalResult).then((data)=>{
      this.orderDetail= data;
    });
    this.getReturn();
    this.getDetail();
  }

  private getReturn()
  {
    this.cdpOrderService.mapReturnStatus(this.returnOrderData,this.orderStatus,this.orderDetail);
    this.cdpOrderService.mapReturnDate(this.returnOrderData,this.returnDate);
    console.log(this.returnDate);
    this.loading$.next(false);
  }

  goToOrderDetail(order: order): void {
    this.routing.go({
      cxRoute: 'orderDetails',
      params: order,
    });
  }
}

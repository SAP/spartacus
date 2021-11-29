import { Component, OnInit } from '@angular/core';
import { CartOutlets, PromotionLocation } from '@spartacus/cart/main/root';
import {
  Consignment,
  Order,
  OrderDetailsContext,
  ORDER_DETAILS_CONTEXT,
} from '@spartacus/order/root';
import { ContextService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  cancelledValues,
  completedValues,
} from './order-consigned-entries/order-consigned-entries.model';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent implements OnInit {
  constructor(protected contextService: ContextService) {}

  protected orderDetailsContext$: Observable<OrderDetailsContext | undefined> =
    this.contextService.get<OrderDetailsContext>(ORDER_DETAILS_CONTEXT);

  readonly CartOutlets = CartOutlets;

  promotionLocation: PromotionLocation = PromotionLocation.Order;
  order$: Observable<Order | undefined> = this.orderDetailsContext$.pipe(
    switchMap(
      (orderDetailsContext) =>
        orderDetailsContext?.getOrderDetails?.() ?? of(undefined)
    )
  );
  others$: Observable<Consignment[] | undefined>;
  completed$: Observable<Consignment[] | undefined>;
  cancel$: Observable<Consignment[] | undefined>;

  ngOnInit() {
    this.others$ = this.getOtherStatus(...completedValues, ...cancelledValues);
    this.completed$ = this.getExactStatus(completedValues);
    this.cancel$ = this.getExactStatus(cancelledValues);
  }

  private getExactStatus(
    consignmentStatus: string[]
  ): Observable<Consignment[] | undefined> {
    return this.order$.pipe(
      map((order) => {
        if (Boolean(order?.consignments)) {
          return order?.consignments?.filter(
            (consignment) =>
              consignment.status &&
              consignmentStatus.includes(consignment.status)
          );
        }
      })
    );
  }

  private getOtherStatus(
    ...consignmentStatus: string[]
  ): Observable<Consignment[] | undefined> {
    return this.order$.pipe(
      map((order) => {
        if (Boolean(order?.consignments)) {
          return order?.consignments?.filter(
            (consignment) =>
              consignment.status &&
              !consignmentStatus.includes(consignment.status)
          );
        }
      })
    );
  }
}

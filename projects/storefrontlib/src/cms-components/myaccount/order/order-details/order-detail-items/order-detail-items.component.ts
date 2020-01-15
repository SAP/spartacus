import { Component, OnInit } from '@angular/core';
import { Consignment, Order, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent implements OnInit {
  constructor(private orderDetailsService: OrderDetailsService) {}

  othersValues = [
    'IN_TRANSIT',
    'READY_FOR_PICKUP',
    'READY_FOR_SHIPPING',
    'WAITING',
    'DELIVERING',
    'PICKPACK',
    'PAYMENT_NOT_CAPTURED',
    'READY',
    'DELIVERY_REJECTED',
    'SHIPPED',
    'TAX_NOT_COMMITED',
  ];
  completedValues = ['DELIVERY_COMPLETED', 'PICKUP_COMPLETE'];
  cancelledValues = ['CANCELLED'];

  order$: Observable<Order>;

  others$: Observable<Consignment[]>;
  completed$: Observable<Consignment[]>;
  cancel$: Observable<Consignment[]>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();

    this.others$ = this.getConsignmentStatus(this.othersValues);

    this.completed$ = this.getConsignmentStatus(this.completedValues);

    this.cancel$ = this.getConsignmentStatus(this.cancelledValues);
  }

  private getConsignmentStatus(
    consignmentStatus: string[]
  ): Observable<Consignment[]> {
    return this.orderDetailsService.getOrderDetails().pipe(
      map(order => {
        if (Boolean(order.consignments)) {
          return order.consignments.filter(consignment =>
            consignmentStatus.includes(consignment.status)
          );
        }
      })
    );
  }

  // left it for breaking change?
  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }
}

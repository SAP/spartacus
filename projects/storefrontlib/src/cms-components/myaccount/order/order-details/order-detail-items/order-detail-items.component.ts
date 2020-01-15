import { Component, OnInit } from '@angular/core';
import { Consignment, Order, OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';
import { CONSIGNMENT_STATUS } from './order-consigned-entries/order-consigned-entries.model';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent implements OnInit {
  constructor(private orderDetailsService: OrderDetailsService) {}

  order$: Observable<Order>;

  others$: Observable<Consignment[]>;
  cancel$: Observable<Consignment[]>;
  completed$: Observable<Consignment[]>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();

    // combineLatest([
    //   this.getConsignmentStatus(CONSIGNMENT_STATUS.READY),
    //   this.getConsignmentStatus(CONSIGNMENT_STATUS.CANCELLED),
    // ]).pipe(
    //   map(([x, y]) => {
    //     console.log('ready', x);
    //     console.log('cancelled', y);
    //     console.log('ready/cancelled', { ...x, ...y });

    //     return [...x, ...y];
    //   })

    // merge(
    //   this.getConsignmentStatus(CONSIGNMENT_STATUS.READY),
    //   this.getConsignmentStatus(CONSIGNMENT_STATUS.CANCELLED)
    // );

    // zip(
    //   this.getConsignmentStatus(CONSIGNMENT_STATUS.READY),
    //   this.getConsignmentStatus(CONSIGNMENT_STATUS.CANCELLED)
    // )

    this.others$ = this.getConsignmentStatus(CONSIGNMENT_STATUS.READY);

    this.completed$ = this.getConsignmentStatus(
      CONSIGNMENT_STATUS.DELIVERY_COMPLETED
    );

    this.cancel$ = this.getConsignmentStatus(CONSIGNMENT_STATUS.CANCELLED);
  }

  private getConsignmentStatus(
    consignmentStatus: CONSIGNMENT_STATUS
  ): Observable<Consignment[]> {
    return this.orderDetailsService.getOrderDetails().pipe(
      map(order => {
        if (Boolean(order.consignments)) {
          return order.consignments.filter(
            consignment => consignment.status === consignmentStatus
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

import { Component, OnInit } from '@angular/core';
import { Consignment, Order } from '@spartacus/core';
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

  inProcess$: Observable<Consignment[]>;
  cancel$: Observable<Consignment[]>;
  completed$: Observable<Consignment[]>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();

    this.inProcess$ = this.orderDetailsService.getOrderDetails().pipe(
      map(order => {
        if (Boolean(order.consignments)) {
          return order.consignments.filter(
            consignment => consignment.status === CONSIGNMENT_STATUS.READY
          );
        }
      })
    );

    this.cancel$ = this.orderDetailsService.getOrderDetails().pipe(
      map(order => {
        if (Boolean(order.consignments)) {
          return order.consignments.filter(
            consignment => consignment.status === CONSIGNMENT_STATUS.CANCELLED
          );
        }
      })
    );

    this.completed$ = this.orderDetailsService.getOrderDetails().pipe(
      map(order => {
        if (Boolean(order.consignments)) {
          return order.consignments.filter(
            consignment =>
              consignment.status === CONSIGNMENT_STATUS.DELIVERY_COMPLETED
          );
        }
      })
    );
  }
}

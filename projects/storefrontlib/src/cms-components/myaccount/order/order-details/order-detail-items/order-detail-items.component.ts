import { Component, OnInit } from '@angular/core';
import { Consignment, Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

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

    this.inProcess$ = this.orderDetailsService
      .getOrderDetails()
      .pipe(map(x => x.consignments.filter(y => y.status === 'In Progress')));

    this.cancel$ = this.orderDetailsService
      .getOrderDetails()
      .pipe(map(x => x.consignments.filter(y => y.status === 'Cancelled')));

    this.completed$ = this.orderDetailsService
      .getOrderDetails()
      .pipe(map(x => x.consignments.filter(y => y.status === 'Completed')));
  }
}

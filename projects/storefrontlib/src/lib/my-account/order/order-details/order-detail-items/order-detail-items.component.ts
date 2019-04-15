import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Order, Consignment, OrderEntry, ConsignmentTracking, UserService } from '@spartacus/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderDetailsService } from '../order-details.service';
import { TrackingEventsComponent } from './consignment-tracking/tracking-events.component';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
  styleUrls: ['./order-detail-items.component.scss'],
})
export class OrderDetailItemsComponent implements OnInit {
  constructor(
    private orderDetailsService: OrderDetailsService,
    private userService: UserService,
    private ngbModal: NgbModal
  ) { }

  order$: Observable<Order>;
  consignmentTracking$: Observable<ConsignmentTracking>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
    this.consignmentTracking$ = this.userService.getConsignmentTracking();
  }

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }

  getTrackingEvents(consignment: Consignment) {
    this.order$.subscribe(order => {
      this.userService.loadConsignmentTracking(order.code, consignment.code);
      const dialog = this.ngbModal.open(TrackingEventsComponent, {
        centered: true,
        size: 'lg'
      }).componentInstance;
      dialog.consignmentTracking$ = this.consignmentTracking$;
      dialog.shipDate = consignment.statusDate;
    });
  }

}

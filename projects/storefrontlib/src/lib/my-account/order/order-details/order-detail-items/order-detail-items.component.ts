import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Order,
  Consignment,
  OrderEntry,
  ConsignmentTracking,
  UserService,
} from '@spartacus/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderDetailsService } from '../order-details.service';
import { TrackingEventsComponent } from './consignment-tracking/tracking-events.component';
import { tap } from 'rxjs/operators';

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
  ) {}

  order$: Observable<Order>;
  consignmentTracking$: Observable<ConsignmentTracking>;
  orderCode: string;
  dialog: any;

  ngOnInit() {
    this.order$ = this.orderDetailsService
      .getOrderDetails()
      .pipe(tap(order => (this.orderCode = order.code)));
    this.consignmentTracking$ = this.userService.getConsignmentTracking();
  }

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }

  openTrackingDialog(consignment: Consignment) {
    this.userService.loadConsignmentTracking(this.orderCode, consignment.code);
    this.dialog = this.ngbModal.open(TrackingEventsComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;
    this.dialog.tracking$ = this.consignmentTracking$;
    this.dialog.shipDate = consignment.statusDate;
    this.dialog.consignmentCode = consignment.code;
  }
}

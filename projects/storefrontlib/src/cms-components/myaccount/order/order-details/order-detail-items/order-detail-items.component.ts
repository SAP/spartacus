import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Consignment,
  ConsignmentTracking,
  Order,
  OrderEntry,
  UserOrderService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';
import { TrackingEventsComponent } from './consignment-tracking/tracking-events.component';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent implements OnInit {
  consignmentStatus: string[] = [
    '',
    'SHIPPED',
    'IN_TRANSIT',
    'DELIVERY_COMPLETED',
    'DELIVERY_REJECTED',
  ];

  constructor(
    private orderDetailsService: OrderDetailsService,
    private userOrderService: UserOrderService,
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
    this.consignmentTracking$ = this.userOrderService.getConsignmentTracking();
  }

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }

  openTrackingDialog(consignment: Consignment) {
    this.userOrderService.loadConsignmentTracking(
      this.orderCode,
      consignment.code
    );
    this.dialog = this.ngbModal.open(TrackingEventsComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;
    this.dialog.tracking$ = this.consignmentTracking$;
    this.dialog.shipDate = consignment.statusDate;
    this.dialog.consignmentCode = consignment.code;
  }
}

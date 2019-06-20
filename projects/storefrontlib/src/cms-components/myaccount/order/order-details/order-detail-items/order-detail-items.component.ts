import { Component, OnInit } from '@angular/core';
import {
  Consignment,
  ConsignmentTracking,
  Order,
  OrderEntry,
  UserOrderService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ModalRef,
  ModalService,
} from '../../../../../shared/components/modal/index';
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
  modalRef: ModalRef;

  constructor(
    private orderDetailsService: OrderDetailsService,
    private userOrderService: UserOrderService,
    private modalService: ModalService
  ) {}

  order$: Observable<Order>;
  consignmentTracking$: Observable<ConsignmentTracking>;
  orderCode: string;

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
    this.consignmentTracking$ = this.userOrderService.getConsignmentTracking();

    let modalInstance: any;
    this.modalRef = this.modalService.open(TrackingEventsComponent, {
      centered: true,
      size: 'lg',
    });

    modalInstance = this.modalRef.componentInstance;
    modalInstance.tracking$ = this.consignmentTracking$;
    modalInstance.shipDate = consignment.statusDate;
    modalInstance.consignmentCode = consignment.code;
  }
}

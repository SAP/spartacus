import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { OrderDetailsService } from '@spartacus/order/components';
import {
  Consignment,
  ConsignmentTracking,
  OrderHistoryFacade,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-cdp-consignment-tracking',
  templateUrl: './cdp-consignment-tracking.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdpConsignmentTrackingComponent implements OnInit, OnDestroy {
  @Input()
  consignment: Consignment;
  @Input()
  orderCode: string;
  consignmentTracking$: Observable<ConsignmentTracking>;
  consignmentStatus = this.orderDetailsService.consignmentStatus;

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected orderHistoryFacade: OrderHistoryFacade
  ) {}

  ngOnInit() {
    this.consignmentTracking$ =
      this.orderHistoryFacade.getConsignmentTracking();
    if (this.orderCode && this.consignment) {
      if (this.consignment.code) {
        this.orderHistoryFacade.loadConsignmentTracking(
          this.orderCode,
          this.consignment.code
        );
      }
    }
  }
  ngOnDestroy(): void {
    this.orderHistoryFacade.clearConsignmentTracking();
  }
}

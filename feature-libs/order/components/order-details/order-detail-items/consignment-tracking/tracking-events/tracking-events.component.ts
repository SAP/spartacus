import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsignmentTracking, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-tracking-events',
  templateUrl: './tracking-events.component.html',
})
export class TrackingEventsComponent implements OnDestroy {
  tracking$: Observable<ConsignmentTracking>;
  shipDate: Date;
  consignmentCode: string;

  constructor(
    public activeModal: NgbActiveModal,
    private userOrderService: OrderFacade
  ) {}

  ngOnDestroy(): void {
    this.userOrderService.clearConsignmentTracking();
  }
}

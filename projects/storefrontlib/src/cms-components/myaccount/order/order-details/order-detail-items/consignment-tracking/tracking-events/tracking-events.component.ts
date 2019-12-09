import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { ConsignmentTracking, UserOrderService } from '@spartacus/core';

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
    private userOrderService: UserOrderService
  ) {}

  ngOnDestroy(): void {
    this.userOrderService.clearConsignmentTracking();
  }
}

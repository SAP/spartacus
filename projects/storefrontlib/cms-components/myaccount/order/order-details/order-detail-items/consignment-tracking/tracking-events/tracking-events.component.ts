import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsignmentTracking, UserOrderService } from '@spartacus/core';
import { Observable } from 'rxjs';

/**
 * @deprecated since 4.2 - use order lib instead
 */
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

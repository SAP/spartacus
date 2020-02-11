import { Component, OnDestroy, SecurityContext } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsignmentTracking, UserOrderService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cx-tracking-events',
  templateUrl: './tracking-events.component.html',
})
export class TrackingEventsComponent implements OnDestroy {
  tracking$: Observable<ConsignmentTracking>;
  shipDate: Date;
  consignmentCode: string;
  securityContext = SecurityContext.URL;

  constructor(
    public activeModal: NgbActiveModal,
    private userOrderService: UserOrderService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnDestroy(): void {
    this.userOrderService.clearConsignmentTracking();
  }
}

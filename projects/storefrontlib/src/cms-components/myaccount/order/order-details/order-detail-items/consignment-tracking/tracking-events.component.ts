import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsignmentTracking } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-tracking-events',
  templateUrl: './tracking-events.component.html',
})
export class TrackingEventsComponent {
  tracking$: Observable<ConsignmentTracking>;
  shipDate: Date;
  consignmentCode: string;

  constructor(public activeModal: NgbActiveModal) {}
}

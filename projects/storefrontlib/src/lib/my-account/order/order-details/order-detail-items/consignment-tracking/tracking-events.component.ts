import { Component } from '@angular/core';
import { ConsignmentTracking } from '@spartacus/core';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cx-tracking-events',
  templateUrl: './tracking-events.component.html',
  styleUrls: ['./tracking-events.component.scss']
})
export class TrackingEventsComponent {

  tracking$: Observable<ConsignmentTracking>;
  shipDate: Date;
  consignmentCode: string;

  constructor(public activeModal: NgbActiveModal) { }

}

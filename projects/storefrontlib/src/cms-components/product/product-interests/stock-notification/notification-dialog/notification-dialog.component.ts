import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cx-notification-dialog',
  templateUrl: './notification-dialog.component.html',
})
export class NotificationDialogComponent {
  selectedChannels: string[];
  subscribeSuccess$: Observable<boolean>;

  constructor(public activeModal: NgbActiveModal) {}
}

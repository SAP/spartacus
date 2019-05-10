import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cx-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss'],
})
export class NotificationDialogComponent {
  subscribeSuccess$: Observable<boolean>;
  selectedChannels: string;

  constructor(public activeModal: NgbActiveModal) {}
}

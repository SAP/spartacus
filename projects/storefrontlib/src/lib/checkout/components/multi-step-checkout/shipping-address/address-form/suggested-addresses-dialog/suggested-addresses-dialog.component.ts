import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'y-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  styleUrls: ['./suggested-addresses-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestedAddressDialogComponent {
  constructor(public activeModal: NgbActiveModal) {}

  @Input()
  suggestedAddresses: any[];
  @Input()
  enteredAddress: any;

  selectedAddress: any;
}

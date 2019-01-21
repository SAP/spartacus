import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cx-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  styleUrls: ['./suggested-addresses-dialog.component.scss']
})
export class SuggestedAddressDialogComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  @Input()
  suggestedAddresses: any[];
  @Input()
  enteredAddress: any;

  selectedAddress: any;

  ngOnInit(): void {
    this.selectedAddress = this.suggestedAddresses.length
      ? this.suggestedAddresses[0]
      : this.enteredAddress;
  }
}

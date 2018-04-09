import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  EventEmitter,
  OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'y-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  styleUrls: ['./suggested-addresses-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestedAddressDialogComponent implements OnInit {
  suggestedAddresses$;
  enteredAddress;
  onSelectedAddress = new EventEmitter();
  selectedAddress;

  constructor(
    public dialogRef: MatDialogRef<SuggestedAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.enteredAddress = this.data.address;
  }

  closeDialog() {
    if (!this.selectedAddress) {
      this.selectedAddress = this.enteredAddress;
    }
    this.onSelectedAddress.emit(this.selectedAddress);
    this.dialogRef.close();
  }

  setAddress(address) {
    this.selectedAddress = Object.assign(
      {
        titleCode: this.data.address.titleCode,
        phone: this.data.address.phone,
        selected: true
      },
      address
    );
    this.closeDialog();
  }
}

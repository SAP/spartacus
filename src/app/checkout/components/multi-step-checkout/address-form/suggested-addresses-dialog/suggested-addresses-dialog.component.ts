import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { CheckoutService } from '../../../../services';

@Component({
  selector: 'y-suggested-addresses-dialog',
  templateUrl: './suggested-addresses-dialog.component.html',
  styleUrls: ['./suggested-addresses-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestedAddressDialogComponent {
  suggestedAddresses$;
  enteredAddress;
  onSelectedAddress = new EventEmitter();
  selectedAddress;

  constructor(
    public dialogRef: MatDialogRef<SuggestedAddressDialogComponent>,
    protected store: Store<fromStore.CheckoutState>,
    private checkoutService: CheckoutService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.enteredAddress = this.data.address;

    this.checkoutService.loadSuggestedAddresses(this.enteredAddress);

    this.suggestedAddresses$ = this.store.select(
      fromStore.getSuggestedAddressesEntites
    );
  }

  closeDialog() {
    if (!this.selectedAddress) {
      this.selectedAddress = this.enteredAddress;
    }

    this.store.dispatch(new fromStore.ClearSuggestedAddresses());

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
    this.selectedAddress.titleCode = this.data.address.titleCode;
    this.closeDialog();
  }
}

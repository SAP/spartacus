import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import * as fromUserStore from '../../../../user/store';
import * as fromRouting from '../../../../routing/store';
import { CheckoutService } from '../../../services/checkout.service';

@Component({
  selector: 'y-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingAddressComponent implements OnInit {
  existingAddresses$;
  isAddressForm = false;

  @Output() addAddress = new EventEmitter<any>();

  constructor(
    protected store: Store<fromUserStore.UserState>,
    protected checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.existingAddresses$ = this.store
      .select(fromUserStore.getAddresses)
      .pipe(
        tap(addresses => {
          if (addresses.length === 0) {
            this.checkoutService.loadUserAddresses();
          }
        })
      );
  }

  addressSelected(address) {
    this.addAddress.emit({ address: address, newAddress: false });
  }

  addNewAddress(address) {
    this.addAddress.emit({ address: address, newAddress: true });
  }

  goToAddressForm() {
    this.isAddressForm = true;
  }

  backToAddress() {
    this.isAddressForm = false;
  }

  back() {
    this.store.dispatch(
      new fromRouting.Go({
        path: ['/cart']
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  Address,
  CheckoutDeliveryService,
  UserAddressService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressBookComponentService {
  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryService
  ) {}

  getAddresses(): Observable<Address[]> {
    return this.userAddressService.getAddresses();
  }

  getAddressesStateLoading(): Observable<boolean> {
    return this.userAddressService.getAddressesLoading();
  }

  loadAddresses() {
    this.userAddressService.loadAddresses();
  }

  addUserAddress(address: Address) {
    this.userAddressService.addUserAddress(address);
  }

  updateUserAddress(addressId: string, address: Address) {
    this.userAddressService.updateUserAddress(addressId, address);
    this.checkoutDeliveryService.clearCheckoutDeliveryDetails();
  }
}

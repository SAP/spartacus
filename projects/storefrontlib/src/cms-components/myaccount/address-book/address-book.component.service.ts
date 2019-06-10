import { Injectable } from '@angular/core';
import { Address, UserAddressService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export class AddressBookComponentService {
  constructor(private userAddressService: UserAddressService) {}

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
  }
}

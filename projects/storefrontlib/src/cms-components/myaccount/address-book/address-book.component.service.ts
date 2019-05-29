import { Injectable } from '@angular/core';
import { Address, UserService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export class AddressBookComponentService {
  constructor(private userService: UserService) {}

  getAddresses(): Observable<Address[]> {
    return this.userService.getAddresses();
  }

  getAddressesStateLoading(): Observable<boolean> {
    return this.userService.getAddressesLoading();
  }

  loadAddresses() {
    this.userService.loadAddresses();
  }

  addUserAddress(address: Address) {
    this.userService.addUserAddress(address);
  }

  updateUserAddress(addressId: string, address: Address) {
    this.userService.updateUserAddress(addressId, address);
  }
}

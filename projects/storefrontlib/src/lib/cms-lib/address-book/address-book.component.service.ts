import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService, Address, User } from '@spartacus/core';

@Injectable()
export class AddressBookComponentService {
  constructor(private userService: UserService) {}

  getAddresses(): Observable<Address[]> {
    return this.userService.getAddresses();
  }

  getAddressesStateLoading(): Observable<boolean> {
    return this.userService.getAddressesStateLoading();
  }

  getUserId(): Observable<string> {
    return this.userService.get().pipe(map(({ uid }: User) => uid));
  }

  loadAddresses(userId: string) {
    this.userService.loadAddresses(userId);
  }

  addUserAddress(userId: string, address: Address) {
    this.userService.addUserAddress(userId, address);
  }

  updateUserAddress(userId: string, addressId: string, address: Address) {
    this.userService.updateUserAddress(userId, addressId, address);
  }
}

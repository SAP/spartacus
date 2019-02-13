import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService, Address, User } from '@spartacus/core';

@Injectable()
export class AddressBookComponentService {
  private userId: string;
  private activeAddress = new BehaviorSubject<Address>({});
  private isAddAddressFormOpen = new BehaviorSubject<boolean>(false);
  private isEditAddressFormOpen = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService) {
    this.getUserId().pipe(
      map(id => {
        this.userId = id || null;
      })
    );
  }

  getActiveAddress(): Observable<Address> {
    return this.activeAddress.asObservable();
  }

  getIsAddAddressFormOpen(): Observable<boolean> {
    return this.isAddAddressFormOpen.asObservable();
  }

  getIsEditAddressFormOpen(): Observable<boolean> {
    return this.isEditAddressFormOpen.asObservable();
  }

  showAddAddressForm() {
    this.isAddAddressFormOpen.next(true);
  }

  hideAddAddressForm() {
    this.isAddAddressFormOpen.next(false);
  }

  showEditAddressForm(address: Address) {
    this.activeAddress.next(address);
    this.isEditAddressFormOpen.next(true);
  }

  hideEditAddressForm() {
    this.isEditAddressFormOpen.next(false);
  }

  getAddresses(): Observable<Address[]> {
    return this.userService.getAddresses();
  }

  getAddressesStateLoading(): Observable<boolean> {
    return this.userService.getAddressesStateLoading();
  }

  getAddressesStateError(): Observable<boolean> {
    return this.userService.getAddressesStateError();
  }

  getAddressesStateSuccess(): Observable<boolean> {
    return this.userService.getAddressesStateSuccess();
  }

  getUserId(): Observable<string> {
    return this.userService.get().pipe(map((data: User) => data.uid));
  }

  loadAddresses() {
    this.userService.loadAddresses(this.userId);
  }

  addUserAddress(address: Address) {
    this.userService.addUserAddress(this.userId, address);
  }

  updateUserAddress(addressId: string, address: Address) {
    this.userService.updateUserAddress(this.userId, addressId, address);
  }
}

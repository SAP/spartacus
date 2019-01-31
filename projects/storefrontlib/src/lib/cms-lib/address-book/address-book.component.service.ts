import { Injectable } from '@angular/core';
import { UserService, Address } from '@spartacus/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AddressBookComponentService {
  private userId: string;
  private isAddAddressFormOpen = new BehaviorSubject<boolean>(false);
  private isEditAddressFormOpen = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService) {
    this.getUserId().pipe(
      map(id => {
        this.userId = id || null;
      })
    );
  }

  getIsAddAddressFormOpen(): Observable<boolean> {
    return this.isAddAddressFormOpen.asObservable();
  }

  getIsEditAddressFormOpen(): Observable<boolean> {
    return this.isEditAddressFormOpen;
  }

  getIsAnyFormOpen(): Observable<boolean> {
    return this.isAddAddressFormOpen || this.isEditAddressFormOpen;
  }

  //   todo: set all to use 'next'
  showAddAddressForm() {
    this.isAddAddressFormOpen.next(true);
  }

  hideAddAddressForm() {
    this.isAddAddressFormOpen = false;
  }

  showEditAddressForm() {
    this.isEditAddressFormOpen = true;
  }

  hideEditAddressForm() {
    this.isEditAddressFormOpen = false;
  }

  getAddresses(): Observable<Address[]> {
    return this.userService.getAddresses();
  }

  getAddressesLoading(): Observable<boolean> {
    return this.userService.getAddressesLoading();
  }

  getAddressActionProcessing(): Observable<boolean> {
    return this.userService.getAddressActionProcessingStatus();
  }

  getUserId(): Observable<string> {
    return this.userService.get().pipe(map(data => data.uid));
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

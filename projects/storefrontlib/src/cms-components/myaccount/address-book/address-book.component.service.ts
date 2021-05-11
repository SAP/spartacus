import { Injectable } from '@angular/core';
import {
  Address,
  UserAddressDeleteEvent,
  UserAddressSetToDefaultEvent,
  UserAddressUpdateEvent,
  EventService,
  UserAddressService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressBookComponentService {
  constructor(
    protected userAddressService: UserAddressService,
    protected eventService: EventService
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
    this.eventService.dispatch<UserAddressUpdateEvent>(
      {
        addressId,
        address,
      },
      UserAddressUpdateEvent
    );
  }
  setAddressAsDefault(addressId: string): void {
    this.userAddressService.setAddressAsDefault(addressId);
    this.eventService.dispatch<UserAddressSetToDefaultEvent>(
      {
        addressId,
      },
      UserAddressSetToDefaultEvent
    );
  }

  deleteAddress(addressId: string): void {
    this.userAddressService.deleteUserAddress(addressId);
    this.eventService.dispatch<UserAddressDeleteEvent>(
      {
        addressId,
      },
      UserAddressDeleteEvent
    );
  }
}

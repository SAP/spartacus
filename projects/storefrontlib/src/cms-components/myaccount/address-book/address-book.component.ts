import { Component, OnInit } from '@angular/core';
import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AddressBookComponentService } from './address-book.component.service';

@Component({
  selector: 'cx-address-book',
  templateUrl: './address-book.component.html',
})
export class AddressBookComponent implements OnInit {
  addresses$: Observable<Address[]>;
  addressesStateLoading$: Observable<boolean>;
  currentAddress: Address;

  showAddAddressForm = false;
  showEditAddressForm = false;

  constructor(public service: AddressBookComponentService) {}

  ngOnInit(): void {
    this.addresses$ = this.service.getAddresses();
    this.addressesStateLoading$ = this.service.getAddressesStateLoading();
    this.service.loadAddresses();
  }

  addAddressButtonHandle(): void {
    this.showEditAddressForm = false;
    this.showAddAddressForm = true;
  }

  editAddressButtonHandle(address: Address): void {
    this.showAddAddressForm = false;
    this.showEditAddressForm = true;
    this.currentAddress = address;
  }

  addAddressSubmit(address: Address): void {
    this.showAddAddressForm = false;
    this.service.addUserAddress(address);
  }

  addAddressCancel(): void {
    this.showAddAddressForm = false;
  }

  editAddressSubmit(address: Address): void {
    this.showEditAddressForm = false;
    this.service.updateUserAddress(this.currentAddress['id'], address);
  }

  editAddressCancel(): void {
    this.showEditAddressForm = false;
  }
}

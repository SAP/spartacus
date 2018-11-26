import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AddressBookService } from './address-book.service';

@Component({
  selector: 'cx-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit, OnDestroy {
  addresses$: Observable<any>;
  isAddAddressFormOpen: boolean;
  isEditAddressFormOpen: boolean;

  subscription = new Subscription();

  constructor(private service: AddressBookService) {}

  ngOnInit() {
    this.addresses$ = this.service.loadUserAddresses();
    this.subscription = this.service.handleActionsEvents();
  }

  showAddAddressForm() {
    this.isAddAddressFormOpen = true;
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

  addUserAddress(address) {
    this.service.addUserAddress(address);
  }

  updateUserAddress(addressId, address) {
    this.service.updateUserAddress(addressId, address);
  }

  checkIfAnyFormOpen() {
    return this.isAddAddressFormOpen || this.isEditAddressFormOpen;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

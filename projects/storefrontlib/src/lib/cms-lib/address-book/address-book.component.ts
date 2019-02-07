import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';

import { Address } from '@spartacus/core';
import { AddressBookComponentService } from './address-book.component.service';

@Component({
  selector: 'cx-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  addresses$: Observable<Address[]>;
  addressesLoading$: Observable<boolean>;
  addressActionProcessing$: Observable<boolean>;
  userId$: Observable<string>;
  isAddAddressFormOpen$: Observable<boolean>;
  isEditAddressFormOpen$: Observable<boolean>;
  isAnyFormOpen$: Observable<boolean>;

  activeAddress: Address;

  constructor(public service: AddressBookComponentService) {}

  ngOnInit() {
    this.addresses$ = this.service.getAddresses();
    this.addressesLoading$ = this.service.getAddressesLoading();
    this.userId$ = this.service.getUserId();
    this.isAddAddressFormOpen$ = this.service.getIsAddAddressFormOpen();
    this.isEditAddressFormOpen$ = this.service.getIsEditAddressFormOpen();

    this.isAnyFormOpen$ = combineLatest(
      this.isAddAddressFormOpen$,
      this.isEditAddressFormOpen$,
      (add, edit) => add || edit
    );

    this.service.loadAddresses();
  }

  addNewAddress() {
    this.service.hideAddAddressForm();
  }

  // handleActionEvents() {
  //   return this.actions.subscribe(action => {
  //     switch (action.type) {
  //       case LOAD_USER_ADDRESSES_SUCCESS: {
  //         this.userService.getAddresses().subscribe(data => {
  //           this.service.hideAddAddressForm();
  //           if (data.length === 0) {
  //             this.service.showAddAddressForm();
  //           }
  //         });
  //         break;
  //       }

  //       case ADD_USER_ADDRESS_FAIL: {
  //         this.service.showAddAddressForm();
  //         break;
  //       }

  //       case UPDATE_USER_ADDRESS_FAIL: {
  //         this.service.showEditAddressForm();
  //         break;
  //       }
  //     }
  //   });
  // }
}

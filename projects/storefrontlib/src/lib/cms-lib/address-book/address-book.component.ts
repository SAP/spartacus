import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';
import {
  GlobalMessageService,
  GlobalMessageType,
  UserService,
  LOAD_USER_ADDRESSES_SUCCESS,
  ADD_USER_ADDRESS,
  ADD_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS_FAIL,
  UPDATE_USER_ADDRESS,
  UPDATE_USER_ADDRESS_SUCCESS,
  UPDATE_USER_ADDRESS_FAIL,
  DELETE_USER_ADDRESS_SUCCESS,
  Address
} from '@spartacus/core';
import { AddressBookComponentService } from './address-book.component.service';

@Component({
  selector: 'cx-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit, OnDestroy {
  addresses$: Observable<Address[]>;
  addressesLoading$: Observable<boolean>;
  addressActionProcessing$: Observable<boolean>;
  userId$: Observable<string>;
  isAddAddressFormOpen$: Observable<boolean>;
  isEditAddressFormOpen$: Observable<boolean>;
  isAnyFormOpen$: Observable<boolean>;

  activeAddress: Address;

  subscription = new Subscription();

  constructor(
    public service: AddressBookComponentService,
    private userService: UserService,
    private messagesService: GlobalMessageService,
    private actions: ActionsSubject
  ) {}

  ngOnInit() {
    this.addresses$ = this.service.getAddresses();
    this.addressesLoading$ = this.service.getAddressesLoading();
    this.addressActionProcessing$ = this.service.getAddressActionProcessing();
    this.userId$ = this.service.getUserId();
    this.isAddAddressFormOpen$ = this.service.getIsAddAddressFormOpen();
    this.isEditAddressFormOpen$ = this.service.getIsEditAddressFormOpen();
    this.isAnyFormOpen$ = this.service.getIsAnyFormOpen();

    this.service.loadAddresses();

    this.subscription = this.handleActionEvents();
  }

  addNewAddress() {
    this.service.showAddAddressForm();
  }

  // todo: delete those

  showAddAddressForm() {
    this.service.showAddAddressForm();
  }

  hideAddAddressForm() {
    this.service.hideAddAddressForm();
  }

  showEditAddressForm() {
    this.service.showEditAddressForm();
  }

  hideEditAddressForm() {
    this.service.hideEditAddressForm();
  }

  addUserAddress(address: Address) {
    this.service.addUserAddress(address);
  }

  updateUserAddress(addressId: string, address: Address) {
    this.service.updateUserAddress(addressId, address);
  }

  handleActionEvents() {
    return this.actions.subscribe(action => {
      switch (action.type) {
        case LOAD_USER_ADDRESSES_SUCCESS: {
          this.userService.getAddresses().subscribe(data => {
            this.service.hideAddAddressForm();
            if (data.length === 0) {
              this.service.showAddAddressForm();
            }
          });
          break;
        }

        case ADD_USER_ADDRESS: {
          // todo: move hide function to submit button

          this.service.hideAddAddressForm();
          break;
        }

        case ADD_USER_ADDRESS_SUCCESS: {
          // todo: move message handling to effect

          // this.messagesService.add({
          //   type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          //   text: 'New address was added successfully!'
          // });
          this.service.hideAddAddressForm();

          // todo: move reload to effect

          // this.userService.loadAddresses('');
          break;
        }

        case ADD_USER_ADDRESS_FAIL: {
          this.service.showAddAddressForm();
          break;
        }

        case UPDATE_USER_ADDRESS: {
          this.service.hideEditAddressForm();
          break;
        }

        case UPDATE_USER_ADDRESS_SUCCESS: {
          // this.messagesService.add({
          //   type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          //   text: 'Address updated successfully!'
          // });
          this.service.hideEditAddressForm();
          // this.userService.loadAddresses('');
          break;
        }

        case UPDATE_USER_ADDRESS_FAIL: {
          this.service.showEditAddressForm();
          break;
        }

        case DELETE_USER_ADDRESS_SUCCESS: {
          // this.messagesService.add({
          //   type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
          //   text: 'Address deleted successfully!'
          // });
          // this.userService.loadAddresses('');
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

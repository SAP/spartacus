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
  DELETE_USER_ADDRESS_SUCCESS
} from '@spartacus/core';

@Component({
  selector: 'cx-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit, OnDestroy {
  addresses$: Observable<any>;
  addressesLoading$: Observable<any>;
  userId: string;
  isAddAddressFormOpen: boolean;
  isEditAddressFormOpen: boolean;
  activeAddress: Object;

  subscription = new Subscription();

  constructor(
    private userService: UserService,
    private messagesService: GlobalMessageService,
    private actions: ActionsSubject
  ) {}

  ngOnInit() {
    this.addresses$ = this.userService.addressesState$;

    this.userService.user$.subscribe(data => {
      this.userId = data.uid;
      this.userService.loadAddresses(this.userId);
    });

    this.subscription = this.handleActionEvents();
  }

  showAddAddressForm() {
    this.isAddAddressFormOpen = true;
  }

  hideAddAddressForm() {
    this.isAddAddressFormOpen = false;
  }

  showEditAddressForm(address) {
    // @TODO: Since we don't get titleCode from API we need to mock it for edit.
    this.activeAddress = {
      ...address,
      titleCode: 'mr'
    };
    this.isEditAddressFormOpen = true;
  }

  hideEditAddressForm() {
    // this.activeAddress = {};
    this.isEditAddressFormOpen = false;
  }

  addUserAddress(address) {
    if (this.userId) {
      this.userService.addUserAddress(this.userId, address);
    }
  }

  updateUserAddress(addressId, address) {
    if (this.userId) {
      this.userService.updateUserAddress(this.userId, addressId, address);
    }
  }

  checkIfAnyFormOpen() {
    return this.isAddAddressFormOpen || this.isEditAddressFormOpen;
  }

  handleActionEvents() {
    return this.actions.subscribe(action => {
      switch (action.type) {
        case LOAD_USER_ADDRESSES_SUCCESS: {
          this.userService.addressesState$.subscribe(data => {
            this.hideAddAddressForm();
            if (!data.list) {
              this.showAddAddressForm();
            }
          });
          break;
        }

        case ADD_USER_ADDRESS: {
          this.hideAddAddressForm();
          break;
        }

        case ADD_USER_ADDRESS_SUCCESS: {
          this.messagesService.add({
            type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
            text: 'New address was added successfully!'
          });
          this.hideAddAddressForm();
          this.userService.loadAddresses(this.userId);
          break;
        }

        case ADD_USER_ADDRESS_FAIL: {
          this.showAddAddressForm();
          break;
        }

        case UPDATE_USER_ADDRESS: {
          this.hideEditAddressForm();
          break;
        }

        case UPDATE_USER_ADDRESS_SUCCESS: {
          this.messagesService.add({
            type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
            text: 'Address updated successfully!'
          });
          this.hideEditAddressForm();
          this.userService.loadAddresses(this.userId);
          break;
        }

        case UPDATE_USER_ADDRESS_FAIL: {
          this.showEditAddressForm(this.activeAddress);
          break;
        }

        case DELETE_USER_ADDRESS_SUCCESS: {
          this.messagesService.add({
            type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
            text: 'Address deleted successfully!'
          });
          this.userService.loadAddresses(this.userId);
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

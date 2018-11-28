import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AddressBookService } from './address-book.service';
import { ActionsSubject } from '@ngrx/store';
import { GlobalMessageService } from '../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../global-message/models/message.model';
import * as actionTypes from '../../user/store/actions/user-addresses.action';

@Component({
  selector: 'cx-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit, OnDestroy {
  addresses$: Observable<any>;
  isAddAddressFormOpen: boolean;
  isEditAddressFormOpen: boolean;
  activeAddress: Object;

  subscription = new Subscription();

  constructor(
    private service: AddressBookService,
    private messagesService: GlobalMessageService,
    private actions: ActionsSubject
  ) {}

  ngOnInit() {
    this.addresses$ = this.service.loadUserAddresses();

    this.subscription = this.handleActionEvents();
  }

  showAddAddressForm() {
    this.isAddAddressFormOpen = true;
  }

  hideAddAddressForm() {
    this.isAddAddressFormOpen = false;
  }

  showEditAddressForm(address) {
    this.activeAddress = address;
    this.isEditAddressFormOpen = true;
  }

  hideEditAddressForm() {
    this.activeAddress = {};
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

  handleActionEvents() {
    return this.actions.subscribe(action => {
      switch (action.type) {
        case actionTypes.ADD_USER_ADDRESS_SUCCESS: {
          this.messagesService.add({
            type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
            text: 'New address was added successfully!'
          });
          this.service.loadUserAddresses();
          this.hideAddAddressForm();
          break;
        }

        case actionTypes.UPDATE_USER_ADDRESS_SUCCESS: {
          this.hideEditAddressForm();
          this.service.loadUserAddresses();
          break;
        }

        case actionTypes.DELETE_USER_ADDRESS_SUCCESS: {
          this.messagesService.add({
            type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
            text: 'Address deleted successfully!'
          });
          this.service.loadUserAddresses();
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

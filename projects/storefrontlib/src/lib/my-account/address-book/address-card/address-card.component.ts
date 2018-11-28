import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '@spartacus/core';
import { AddressBookService } from '../address-book.service';

@Component({
  selector: 'cx-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent {
  editMode: boolean;
  isDefault: boolean;

  @Input()
  address: Address;

  @Output()
  editEvent = new EventEmitter<any>();

  constructor(private addressBookService: AddressBookService) {}

  openEditFormEvent() {
    this.editEvent.emit();
  }

  cancelEdit() {
    this.editMode = false;
  }

  setEditMode() {
    this.editMode = true;
  }

  setAddressAsDefault(addressId: string) {
    this.addressBookService.setAddressAsDefault(addressId);
  }

  deleteAddress(addressId: string) {
    this.addressBookService.deleteUserAddress(addressId);
  }
}

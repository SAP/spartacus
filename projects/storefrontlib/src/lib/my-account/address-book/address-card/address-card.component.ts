import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '@spartacus/core';
import { UserService } from '../../../user/facade/user.service';

@Component({
  selector: 'cx-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent {
  editMode: boolean;
  isDefault: boolean;

  @Input()
  userId: string;

  @Input()
  address: Address;

  @Output()
  editEvent = new EventEmitter<any>();

  constructor(private userService: UserService) {}

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
    if (this.userId) {
      this.userService.setAddressAsDefault(this.userId, addressId);
    }
  }

  deleteAddress(addressId: string) {
    if (this.userId) {
      this.userService.deleteUserAddress(this.userId, addressId);
    }
  }
}

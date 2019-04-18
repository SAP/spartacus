import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address, UserService } from '@spartacus/core';

@Component({
  selector: 'cx-address-card',
  templateUrl: './address-card.component.html',
})
export class AddressCardComponent {
  editMode: boolean;
  isDefault: boolean;

  @Input() userId: string;

  @Input() address: Address;

  @Output() editEvent = new EventEmitter<any>();

  constructor(private userService: UserService) {}

  openEditFormEvent(): void {
    this.editEvent.emit();
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  setEditMode(): void {
    this.editMode = true;
  }

  setAddressAsDefault(addressId: string): void {
    if (this.userId) {
      this.userService.setAddressAsDefault(this.userId, addressId);
    }
  }

  deleteAddress(addressId: string): void {
    if (this.userId) {
      this.userService.deleteUserAddress(this.userId, addressId);
    }
  }
}

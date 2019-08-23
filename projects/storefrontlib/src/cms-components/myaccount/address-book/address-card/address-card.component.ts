import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Address,
  CheckoutDeliveryService,
  UserAddressService,
} from '@spartacus/core';

@Component({
  selector: 'cx-address-card',
  templateUrl: './address-card.component.html',
})
export class AddressCardComponent {
  editMode: boolean;
  isDefault: boolean;

  @Input() address: Address;

  @Output() editEvent = new EventEmitter<any>();

  constructor(
    private userAddressService: UserAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryService
  ) {}

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
    this.userAddressService.setAddressAsDefault(addressId);
    this.checkoutDeliveryService.clearCheckoutDeliveryDetails();
  }

  deleteAddress(addressId: string): void {
    this.userAddressService.deleteUserAddress(addressId);
    this.checkoutDeliveryService.clearCheckoutDeliveryDetails();
  }
}

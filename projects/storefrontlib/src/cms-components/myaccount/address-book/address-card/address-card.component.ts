import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Address,
  CheckoutDeliveryService,
  FeatureConfigService,
  UserAddressService,
} from '@spartacus/core';

@Component({
  selector: 'cx-address-card',
  templateUrl: './address-card.component.html',
})
export class AddressCardComponent {
  editMode: boolean;
  isDefault: boolean;
  private isExpressCheckoutFeatureEnabled: boolean;

  @Input() address: Address;

  @Output() editEvent = new EventEmitter<any>();

  constructor(
    private userAddressService: UserAddressService,
    protected checkoutDeliveryService?: CheckoutDeliveryService,
    private featureConfigService?: FeatureConfigService
  ) {
    this.isExpressCheckoutFeatureEnabled = this.featureConfigService.isLevel(
      '1.2'
    );
  }

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
    /**
     * TODO(issue:#4309) Deprecated since 1.2.0
     */
    if (this.isExpressCheckoutFeatureEnabled) {
      this.checkoutDeliveryService.clearCheckoutDeliveryDetails();
    }
  }

  deleteAddress(addressId: string): void {
    this.userAddressService.deleteUserAddress(addressId);
    /**
     * TODO(issue:#4309) Deprecated since 1.2.0
     */
    if (this.isExpressCheckoutFeatureEnabled) {
      this.checkoutDeliveryService.clearCheckoutDeliveryDetails();
    }
  }
}

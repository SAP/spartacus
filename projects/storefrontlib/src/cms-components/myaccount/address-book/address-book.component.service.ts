import { Injectable } from '@angular/core';
import {
  Address,
  CheckoutDeliveryService,
  FeatureConfigService,
  UserAddressService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export class AddressBookComponentService {
  constructor(
    userAddressService: UserAddressService,
    checkoutDeliveryService: CheckoutDeliveryService,
    featureConfigService: FeatureConfigService
  );
  /**
   * @deprecated since version 1.2
   *  Use constructor(userAddressService: UserAddressService,
   *  checkoutDeliveryService: CheckoutDeliveryService
   *  featureConfigService: FeatureConfigService) instead
   *
   *  TODO(issue:#4309) Deprecated since 1.2.0
   */
  constructor(userAddressService: UserAddressService);
  constructor(
    private userAddressService: UserAddressService,
    protected checkoutDeliveryService?: CheckoutDeliveryService,
    private featureConfigService?: FeatureConfigService
  ) {}

  getAddresses(): Observable<Address[]> {
    return this.userAddressService.getAddresses();
  }

  getAddressesStateLoading(): Observable<boolean> {
    return this.userAddressService.getAddressesLoading();
  }

  loadAddresses() {
    this.userAddressService.loadAddresses();
  }

  addUserAddress(address: Address) {
    this.userAddressService.addUserAddress(address);
  }

  updateUserAddress(addressId: string, address: Address) {
    this.userAddressService.updateUserAddress(addressId, address);
    /**
     * TODO(issue:#4309) Deprecated since 1.2.0
     */
    if (
      this.featureConfigService &&
      this.featureConfigService.isLevel('1.2') &&
      this.checkoutDeliveryService
    ) {
      this.checkoutDeliveryService.clearCheckoutDeliveryDetails();
    }
  }
}

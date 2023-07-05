/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Address, Country } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OpfCheckoutBillingAddressFormService } from './opf-checkout-billing-address-form.service';

@Component({
  selector: 'cx-opf-checkout-billing-address-form',
  templateUrl: './opf-checkout-billing-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OpfCheckoutBillingAddressFormService],
})
export class OpfCheckoutBillingAddressFormComponent implements OnInit {
  iconTypes = ICON_TYPE;

  billingAddress$ = this.service.billingAddress$;
  isLoadingAddress$ = this.service.isLoadingAddress$;
  isSameAsDelivery$ = this.service.isSameAsDelivery$;

  isEditBillingAddress = false;
  isAddingBillingAddressInProgress = false;

  countries$: Observable<Country[]>;

  constructor(protected service: OpfCheckoutBillingAddressFormService) {}

  ngOnInit() {
    this.countries$ = this.service.getCountries();
    this.service.getAddresses();
  }

  cancelAndHideForm(): void {
    this.isEditBillingAddress = false;
    if (this.isAddingBillingAddressInProgress) {
      this.service.setIsSameAsDeliveryValue(true);
      this.isAddingBillingAddressInProgress = false;
    }
  }

  editCustomBillingAddress(): void {
    this.isEditBillingAddress = true;
  }

  toggleSameAsDeliveryAddress(event: Event): void {
    const checked = (<HTMLInputElement>event.target).checked;
    this.service.setIsSameAsDeliveryValue(checked);
    if (checked) {
      this.service.putDeliveryAddressAsPaymentAddress();
      this.isEditBillingAddress = false;
    } else {
      this.isAddingBillingAddressInProgress = true;
      this.isEditBillingAddress = true;
    }
  }

  getAddressData(billingAddress: Address | undefined | null): Address {
    return !!billingAddress?.id && !this.isAddingBillingAddressInProgress
      ? billingAddress
      : {};
  }

  onSubmitAddress(address: Address): void {
    this.isEditBillingAddress = false;
    this.isAddingBillingAddressInProgress = false;

    if (!address) {
      return;
    }

    this.service.setBillingAddress(address).subscribe();
  }
}

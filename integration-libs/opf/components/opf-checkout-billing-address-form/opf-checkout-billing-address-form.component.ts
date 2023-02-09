/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import { Address, Country, UserPaymentService } from '@spartacus/core';
import { Card, ICON_TYPE } from '@spartacus/storefront';
import { Observable, combineLatest } from 'rxjs';
import { tap, filter, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-billing-address-form',
  templateUrl: './opf-checkout-billing-address-form.component.html',
})
export class OpfCheckoutBillingAddressFormComponent implements OnInit {
  deliveryAddress$: Observable<Address | undefined>;
  countries$: Observable<Country[]>;
  sameAsDeliveryAddress = true;
  showSameAsDeliveryAddressCheckbox$: Observable<boolean>;
  userCustomBillingAddress: Address | undefined;
  editBillingAddress = false;
  iconTypes = ICON_TYPE;

  constructor(
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected userPaymentService: UserPaymentService,
    protected checkoutPaymentService: CheckoutPaymentFacade
  ) {}

  ngOnInit(): void {
    this.countries$ = this.userPaymentService.getAllBillingCountries().pipe(
      tap((countries) => {
        if (Object.keys(countries).length === 0) {
          this.userPaymentService.loadBillingCountries();
        }
      }),
      // we want to share data with the address form and prevent loading data twice
      shareReplay(1)
    );

    this.deliveryAddress$ = this.checkoutDeliveryAddressFacade
      .getDeliveryAddressState()
      .pipe(
        filter((state) => !state.loading),
        map((state) => state.data)
      );

    this.showSameAsDeliveryAddressCheckbox$ = combineLatest([
      this.countries$,
      this.deliveryAddress$,
    ]).pipe(
      map(([countries, address]) => {
        return (
          (address?.country &&
            !!countries.filter(
              (country: Country): boolean =>
                country.isocode === address.country?.isocode
            ).length) ??
          false
        );
      }),
      tap((shouldShowCheckbox) => {
        this.sameAsDeliveryAddress = shouldShowCheckbox;
      })
    );
  }

  toggleSameAsDeliveryAddress(): void {
    this.sameAsDeliveryAddress = !this.sameAsDeliveryAddress;

    if (this.sameAsDeliveryAddress) {
      this.userCustomBillingAddress = undefined;
    } else {
      this.editBillingAddress = true;
    }
  }

  getAddressCardContent(address: Address): Card {
    let region = '';
    if (address.region && address.region.isocode) {
      region = address.region.isocode + ', ';
    }

    return {
      textBold: address.firstName + ' ' + address.lastName,
      text: [
        address.line1,
        address.line2,
        address.town + ', ' + region + address.country?.isocode,
        address.postalCode,
        address.phone,
      ],
    } as Card;
  }

  verifyAddress(address: Address): void {
    if (!this.sameAsDeliveryAddress) {
      // TODO OPF: uncomment this section once there's clear vision for the approach how to pass billing address form data
      // this.checkoutPaymentService
      //   .setPaymentDetails({ billingAddress: address })
      //   .subscribe({
      //     complete: () => {
      //       console.log('success');
      //       // we don't call onSuccess here, because it can cause a spinner flickering
      //     },
      //     error: () => {},
      //   });
      this.userCustomBillingAddress = address;
      this.editBillingAddress = false;
    }
  }

  cancelAndHideForm() {
    if (this.editBillingAddress) {
      this.editBillingAddress = false;
    } else {
      this.toggleSameAsDeliveryAddress();
    }
  }

  editCustomBillingAddress() {
    this.editBillingAddress = true;
  }
}

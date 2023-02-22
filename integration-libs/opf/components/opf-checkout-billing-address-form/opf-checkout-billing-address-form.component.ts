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
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { tap, filter, map, shareReplay, take } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-billing-address-form',
  templateUrl: './opf-checkout-billing-address-form.component.html',
})
export class OpfCheckoutBillingAddressFormComponent implements OnInit {
  iconTypes = ICON_TYPE;

  deliveryAddress$: Observable<Address | undefined>;
  countries$: Observable<Country[]>;
  showSameAsDeliveryAddressCheckbox$: Observable<boolean>;

  sameAsDeliveryAddress$ = new BehaviorSubject(true);
  userCustomBillingAddress$ = new BehaviorSubject<Address | undefined>(
    undefined
  );
  editBillingAddress$ = new BehaviorSubject(false);

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
        this.sameAsDeliveryAddress$.next(shouldShowCheckbox);
      })
    );
  }

  toggleSameAsDeliveryAddress(): void {
    this.sameAsDeliveryAddress$
      .pipe(
        take(1),
        tap((isSameAsDeliveryAddress) => {
          this.sameAsDeliveryAddress$.next(!isSameAsDeliveryAddress);

          if (isSameAsDeliveryAddress) {
            this.userCustomBillingAddress$.next(undefined);
          } else {
            this.editBillingAddress$.next(true);
          }
        })
      )
      .subscribe();
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
    this.sameAsDeliveryAddress$
      .pipe(
        take(1),
        tap((isSameAsDeliveryAddress) => {
          if (!isSameAsDeliveryAddress) {
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
            this.userCustomBillingAddress$.next(address);
            this.editBillingAddress$.next(false);
          }
        })
      )
      .subscribe();
  }

  cancelAndHideForm() {
    this.editBillingAddress$
      .pipe(
        take(1),
        tap((isEditBillingAddress) => {
          if (isEditBillingAddress) {
            this.editBillingAddress$.next(false);
          } else {
            this.toggleSameAsDeliveryAddress();
          }
        })
      )
      .subscribe();
  }

  editCustomBillingAddress() {
    this.editBillingAddress$.next(true);
  }
}

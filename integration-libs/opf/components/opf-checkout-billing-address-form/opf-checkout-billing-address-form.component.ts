/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CheckoutBillingAddressFacade,
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import { Address, Country, UserPaymentService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-billing-address-form',
  templateUrl: './opf-checkout-billing-address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutBillingAddressFormComponent implements OnInit {
  iconTypes = ICON_TYPE;

  deliveryAddress$: Observable<Address | undefined>;
  countries$: Observable<Country[]>;

  protected readonly sameAsDeliveryAddressSub = new BehaviorSubject(true);
  protected readonly userCustomBillingAddressSub = new BehaviorSubject<
    Address | undefined
  >(undefined);
  protected readonly editBillingAddressSub = new BehaviorSubject(false);

  sameAsDeliveryAddress$ = this.sameAsDeliveryAddressSub.asObservable();
  userCustomBillingAddress$ = this.userCustomBillingAddressSub.asObservable();
  editBillingAddress$ = this.editBillingAddressSub.asObservable();

  constructor(
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutBillingAddressFacade: CheckoutBillingAddressFacade,
    protected userPaymentService: UserPaymentService,
    protected checkoutPaymentService: CheckoutPaymentFacade
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.getDeliveryAddresses();
  }

  toggleSameAsDeliveryAddress(): void {
    this.sameAsDeliveryAddress$
      .pipe(take(1))
      .subscribe((isSameAsDeliveryAddress) => {
        this.sameAsDeliveryAddressSub.next(!isSameAsDeliveryAddress);

        if (isSameAsDeliveryAddress) {
          this.userCustomBillingAddressSub.next(undefined);
        } else if (
          !isSameAsDeliveryAddress &&
          !!this.userCustomBillingAddressSub.value
        ) {
          this.userCustomBillingAddressSub.next(undefined);
        } else {
          this.editBillingAddressSub.next(true);
        }
      });
  }

  onSubmitAddress(address: Address): void {
    this.sameAsDeliveryAddress$
      .pipe(
        filter((isSameAsDeliveryAddress: boolean) => !isSameAsDeliveryAddress),
        switchMap(() =>
          this.checkoutBillingAddressFacade.setBillingAddress(address)
        ),
        take(1)
      )
      .subscribe(() => {
        this.userCustomBillingAddressSub.next(address);
        this.editBillingAddressSub.next(false);
      });
  }

  cancelAndHideForm() {
    this.editBillingAddress$.pipe(take(1)).subscribe((isEditBillingAddress) => {
      if (isEditBillingAddress) {
        this.editBillingAddressSub.next(false);
      } else {
        console.log('cancel and hide form');
        this.toggleSameAsDeliveryAddress();
      }
    });
  }

  editCustomBillingAddress() {
    this.editBillingAddressSub.next(true);
  }

  protected getCountries(): void {
    this.countries$ = this.userPaymentService.getAllBillingCountries().pipe(
      tap((countries) => {
        if (Object.keys(countries).length === 0) {
          this.userPaymentService.loadBillingCountries();
        }
      }),
      // we want to share data with the address form and prevent loading data twice
      shareReplay(1)
    );
  }

  protected getDeliveryAddresses(): void {
    this.deliveryAddress$ = this.checkoutDeliveryAddressFacade
      .getDeliveryAddressState()
      .pipe(
        filter((state) => !state.loading),
        tap((val) => console.log('del ad', val)),
        map((state) => state.data)
      );
  }
}

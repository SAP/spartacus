/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutDeliveryAddressComponent,
  CheckoutStepService,
} from '@spartacus/checkout/base/components';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  FeatureToggles,
  GlobalMessageService,
  TranslatePipe,
  TranslationService,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card, CardComponent, SpinnerComponent } from '@spartacus/storefront';
import { AddressFormComponent } from '@spartacus/user/profile/components';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

export interface CardWithAddress {
  card: Card;
  address: Address;
}

@Component({
  selector: 'cx-delivery-address',
  templateUrl: './checkout-delivery-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    AddressFormComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class B2BCheckoutDeliveryAddressComponent
  extends CheckoutDeliveryAddressComponent
  implements OnInit, OnDestroy
{
  protected override userAddressService = inject(UserAddressService);
  protected override checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressFacade
  );
  protected override activatedRoute = inject(ActivatedRoute);
  protected override translationService = inject(TranslationService);
  protected override activeCartFacade = inject(ActiveCartFacade);
  protected override checkoutStepService = inject(CheckoutStepService);
  protected override checkoutDeliveryModesFacade = inject(
    CheckoutDeliveryModesFacade
  );
  protected override globalMessageService = inject(GlobalMessageService);
  protected checkoutCostCenterFacade = inject(CheckoutCostCenterFacade);
  protected checkoutPaymentTypeFacade = inject(CheckoutPaymentTypeFacade);
  protected userCostCenterService = inject(UserCostCenterService);

  protected subscriptions = new Subscription();
  private b2bFeatureToggles = inject(FeatureToggles);

  protected isAccountPayment$: Observable<boolean> =
    this.checkoutPaymentTypeFacade
      .isAccountPayment()
      .pipe(distinctUntilChanged());

  protected costCenterAddresses$: Observable<Address[]> =
    this.checkoutCostCenterFacade.getCostCenterState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      distinctUntilChanged((prev, curr) => prev?.code === curr?.code),
      switchMap((costCenter) => {
        this.doneAutoSelect = false;
        return costCenter?.code
          ? this.userCostCenterService
              .getCostCenterAddresses(costCenter.code)
              .pipe(
                map((addresses) =>
                  this.b2bFeatureToggles.b2bCheckoutShippingAddressFilter
                    ? addresses.filter((a) => a.shippingAddress === true)
                    : addresses
                )
              )
          : of([]);
      })
    );

  protected creditCardAddressLoading$: Observable<boolean> =
    super.getAddressLoading();

  protected accountAddressLoading$: Observable<boolean> = combineLatest([
    this.creditCardAddressLoading$,
    this.checkoutCostCenterFacade
      .getCostCenterState()
      .pipe(map((state) => state.loading)),
  ]).pipe(
    map(
      ([creditCardAddressLoading, costCenterLoading]) =>
        creditCardAddressLoading || costCenterLoading
    ),
    distinctUntilChanged()
  );

  isAccountPayment = false;

  ngOnInit(): void {
    this.subscriptions.add(
      this.isAccountPayment$.subscribe(
        (isAccount) => (this.isAccountPayment = isAccount)
      )
    );

    super.ngOnInit();
  }

  protected loadAddresses(): void {
    if (!this.isAccountPayment) {
      super.loadAddresses();
    }
    // else: do nothing, as we don't need to load user addresses for account payment
  }

  protected getAddressLoading(): Observable<boolean> {
    return this.isAccountPayment$.pipe(
      switchMap((isAccountPayment) =>
        isAccountPayment
          ? this.accountAddressLoading$
          : this.creditCardAddressLoading$
      )
    );
  }

  protected getSupportedAddresses(): Observable<Address[]> {
    return this.isAccountPayment$.pipe(
      switchMap((isAccountPayment) =>
        isAccountPayment
          ? this.costCenterAddresses$
          : super.getSupportedAddresses()
      )
    );
  }

  protected selectDefaultAddress(
    addresses: Address[],
    selected: Address | undefined
  ): void {
    if (
      !this.doneAutoSelect &&
      addresses?.length &&
      (!selected || Object.keys(selected).length === 0)
    ) {
      if (this.isAccountPayment) {
        if (addresses.length === 1) {
          this.setAddress(addresses[0]);
        }
      } else {
        super.selectDefaultAddress(addresses, selected);
      }
      this.doneAutoSelect = true;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

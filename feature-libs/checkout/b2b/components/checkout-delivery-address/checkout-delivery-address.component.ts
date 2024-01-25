/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
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
  GlobalMessageService,
  TranslationService,
  UserAddressService,
  UserCostCenterService,
} from '@spartacus/core';
import { Card } from '@spartacus/storefront';
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
})
export class B2BCheckoutDeliveryAddressComponent
  extends CheckoutDeliveryAddressComponent
  implements OnInit, OnDestroy
{
  protected subscriptions = new Subscription();

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
          ? this.userCostCenterService.getCostCenterAddresses(costCenter.code)
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

  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected activatedRoute: ActivatedRoute,
    protected translationService: TranslationService,
    protected activeCartFacade: ActiveCartFacade,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected globalMessageService: GlobalMessageService,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected userCostCenterService: UserCostCenterService
  ) {
    super(
      userAddressService,
      checkoutDeliveryAddressFacade,
      activatedRoute,
      translationService,
      activeCartFacade,
      checkoutStepService,
      checkoutDeliveryModesFacade,
      globalMessageService
    );
  }

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

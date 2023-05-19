/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  CheckoutBillingAddressFacade,
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import { Address, Country, UserPaymentService } from '@spartacus/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class OpfCheckoutBillingAddressFormService {
  deliveryAddress$ = new BehaviorSubject<Address | undefined>(undefined);
  billingAddress$ = new BehaviorSubject<Address | undefined>(undefined);

  protected billingAddressId: string | undefined;

  protected readonly isLoadingAddressSub = new BehaviorSubject(false);
  isLoadingAddress$ = this.isLoadingAddressSub.asObservable();

  constructor(
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutBillingAddressFacade: CheckoutBillingAddressFacade,
    protected userPaymentService: UserPaymentService,
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected activeCartService: ActiveCartFacade
  ) {}

  getCountries(): Observable<Country[]> {
    return this.userPaymentService.getAllBillingCountries().pipe(
      tap((countries) => {
        if (Object.keys(countries).length === 0) {
          this.userPaymentService.loadBillingCountries();
        }
      }),
      // we want to share data with the address form and prevent loading data twice
      shareReplay(1)
    );
  }

  getAddresses(): void {
    this.isLoadingAddressSub.next(true);

    combineLatest([this.getDeliveryAddress(), this.getPaymentAddress()])
      .pipe(take(1))
      .subscribe(
        ([deliveryAddress, paymentAddress]: [
          Address | undefined,
          Address | undefined
        ]) => {
          this.deliveryAddress$.next(deliveryAddress);

          if (!paymentAddress && !!deliveryAddress) {
            this.setBillingAddress(deliveryAddress);
          }

          if (!!paymentAddress && !!deliveryAddress) {
            this.billingAddressId = paymentAddress.id;
            this.billingAddress$.next(paymentAddress);
          }

          this.isLoadingAddressSub.next(false);
        }
      );
  }

  putDeliveryAddressAsPaymentAddress(): void {
    this.deliveryAddress$
      .pipe(
        switchMap((address: Address | undefined) =>
          !!address ? this.setBillingAddress(address) : EMPTY
        ),
        take(1)
      )
      .subscribe();
  }

  setBillingAddress(address: Address): Observable<Address | undefined> {
    this.isLoadingAddressSub.next(true);

    return this.checkoutBillingAddressFacade
      .setBillingAddress(this.getAddressWithId(address))
      .pipe(
        switchMap(() => {
          this.activeCartService.reloadActiveCart();

          return this.activeCartService.isStable();
        }),
        filter((isStable) => isStable),
        switchMap(() => this.getPaymentAddress()),

        tap((billingAddress: Address | undefined) => {
          if (!!billingAddress && !!billingAddress.id) {
            this.billingAddressId = billingAddress.id;
            this.billingAddress$.next(billingAddress);

            this.isLoadingAddressSub.next(false);
          }
        }),
        take(1)
      );
  }

  resetBillingAddress(): void {
    this.billingAddress$.next(undefined);
  }

  get billingAddressValue(): Address | undefined {
    return this.billingAddress$.value;
  }

  protected getDeliveryAddress(): Observable<Address | undefined> {
    return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(
      filter((state) => !state.loading),
      map((state) => state.data)
    );
  }

  protected getPaymentAddress(): Observable<Address | undefined> {
    return this.activeCartService
      .getActive()
      .pipe(map((cart: Cart) => cart.paymentAddress));
  }

  protected getAddressWithId(address: Address): Address {
    return { ...address, id: this.billingAddressId };
  }
}

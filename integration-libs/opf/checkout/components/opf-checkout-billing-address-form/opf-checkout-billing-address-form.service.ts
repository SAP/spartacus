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
import {
  Address,
  Country,
  UserPaymentService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Injectable()
export class OpfCheckoutBillingAddressFormService {
  protected readonly billingAddressSub = new BehaviorSubject<
    Address | undefined
  >(undefined);
  protected readonly isLoadingAddressSub = new BehaviorSubject(false);
  protected readonly isSameAsDeliverySub = new BehaviorSubject(true);
  protected billingAddressId: string | undefined;

  billingAddress$ = this.billingAddressSub.asObservable();
  isLoadingAddress$ = this.isLoadingAddressSub.asObservable();
  isSameAsDelivery$ = this.isSameAsDeliverySub.asObservable();

  constructor(
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutBillingAddressFacade: CheckoutBillingAddressFacade,
    protected userPaymentService: UserPaymentService,
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected activeCartService: ActiveCartFacade,
    protected globalMessageService: GlobalMessageService
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
          if (!paymentAddress && !!deliveryAddress) {
            this.setBillingAddress(deliveryAddress);
            this.billingAddressSub.next(deliveryAddress);
          }

          if (!!paymentAddress && !!deliveryAddress) {
            this.billingAddressId = paymentAddress.id;
            this.billingAddressSub.next(paymentAddress);
            this.isSameAsDeliverySub.next(false);
          }

          this.isLoadingAddressSub.next(false);
        }
      );
  }

  putDeliveryAddressAsPaymentAddress(): void {
    this.getDeliveryAddress()
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

            this.billingAddressSub.next(billingAddress);
          }
        }),
        catchError((error) => {
          this.globalMessageService.add(
            { key: 'opf.address.errors.cannotUpdate' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          return of(error);
        }),
        finalize(() => {
          this.isLoadingAddressSub.next(false);
        }),
        take(1)
      );
  }

  resetBillingAddress(): void {
    this.billingAddressSub.next(undefined);
  }

  get billingAddressValue(): Address | undefined {
    return this.billingAddressSub.value;
  }

  get isSameAsDeliveryValue(): boolean {
    return this.isSameAsDeliverySub.value;
  }

  setIsSameAsDeliveryValue(value: boolean): void {
    this.isSameAsDeliverySub.next(value);
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

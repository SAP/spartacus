/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  CheckoutBillingAddressFacade,
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  Country,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  UserPaymentService,
} from '@spartacus/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  combineLatest,
  throwError,
} from 'rxjs';
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
import { OpfCheckoutPaymentWrapperService } from '../opf-checkout-payment-wrapper';

@Injectable()
export class OpfCheckoutBillingAddressFormService {
  protected checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressFacade
  );
  protected checkoutBillingAddressFacade = inject(CheckoutBillingAddressFacade);
  protected userPaymentService = inject(UserPaymentService);
  protected checkoutPaymentService = inject(CheckoutPaymentFacade);
  protected activeCartService = inject(ActiveCartFacade);
  protected globalMessageService = inject(GlobalMessageService);
  protected opfCheckoutPaymentWrapperService = inject(
    OpfCheckoutPaymentWrapperService
  );

  protected readonly _$billingAddressSub = new BehaviorSubject<
    Address | undefined
  >(undefined);
  protected readonly _$isLoadingAddress = new BehaviorSubject(false);
  protected readonly _$isSameAsDelivery = new BehaviorSubject(true);
  protected billingAddressId: string | undefined;

  billingAddress$ = this._$billingAddressSub.asObservable();
  isLoadingAddress$ = this._$isLoadingAddress.asObservable();
  isSameAsDelivery$ = this._$isSameAsDelivery.asObservable();

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
    this._$isLoadingAddress.next(true);

    combineLatest([this.getDeliveryAddress(), this.getPaymentAddress()])
      .pipe(take(1))
      .subscribe(
        ([deliveryAddress, paymentAddress]: [
          Address | undefined,
          Address | undefined,
        ]) => {
          if (!paymentAddress && !!deliveryAddress) {
            this.setBillingAddress(deliveryAddress);
            this._$billingAddressSub.next(deliveryAddress);
          }

          if (!!paymentAddress && !!deliveryAddress) {
            this.billingAddressId = paymentAddress.id;
            this._$billingAddressSub.next(paymentAddress);
            this._$isSameAsDelivery.next(false);
          }

          this._$isLoadingAddress.next(false);
        }
      );
  }

  setDeliveryAddressAsPaymentAddress(): void {
    this.getDeliveryAddress()
      .pipe(
        switchMap((address: Address | undefined) =>
          !!address ? this.setBillingAddress(address) : EMPTY
        ),
        take(1)
      )
      .subscribe({
        next: () => this.setIsSameAsDeliveryValue(true),
        complete: () => {},
        error: () => this.setIsSameAsDeliveryValue(false),
        // Method is responsible for placing delivery address as a payment address,
        // so if was not successful, we know for sure that checkbox 'Same as delivery' should be unchecked
      });
  }

  setBillingAddress(address: Address): Observable<Address | undefined> {
    this._$isLoadingAddress.next(true);

    return this.checkoutBillingAddressFacade
      .setBillingAddress(this.getAddressWithId(address))
      .pipe(
        switchMap(() => {
          this.activeCartService.reloadActiveCart();

          return this.activeCartService.isStable();
        }),
        filter((isStable: boolean) => isStable),
        switchMap(() => this.getPaymentAddress()),

        tap((billingAddress: Address | undefined) => {
          if (!!billingAddress && !!billingAddress.id) {
            this.billingAddressId = billingAddress.id;

            this._$billingAddressSub.next(billingAddress);
            this.opfCheckoutPaymentWrapperService.reloadPaymentMode();
          }
        }),
        catchError((error: HttpErrorModel) => {
          this.globalMessageService.add(
            { key: 'opfCheckout.errors.updateBillingAddress' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          return throwError(error);
        }),
        finalize(() => {
          this._$isLoadingAddress.next(false);
        }),
        take(1)
      );
  }

  get isSameAsDeliveryValue(): boolean {
    return this._$isSameAsDelivery.value;
  }

  setIsSameAsDeliveryValue(value: boolean): void {
    this._$isSameAsDelivery.next(value);
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
      .pipe(map((cart: Cart) => cart.sapBillingAddress));
  }

  protected getAddressWithId(address: Address): Address {
    return { ...address, id: this.billingAddressId };
  }
}

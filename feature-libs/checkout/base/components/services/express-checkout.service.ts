/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import { UserAddressService, UserPaymentService } from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';

@Injectable({
  providedIn: 'root',
})
export class ExpressCheckoutService {
  private deliveryAddressSet$: Observable<boolean>;
  private deliveryModeSet$: Observable<boolean>;
  private paymentMethodSet$: Observable<boolean>;

  constructor(
    protected userAddressService: UserAddressService,
    protected userPaymentService: UserPaymentService,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
    protected checkoutPaymentFacade: CheckoutPaymentFacade,
    protected checkoutConfigService: CheckoutConfigService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade
  ) {
    this.setDeliveryAddress();
    this.setDeliveryMode();
    this.setPaymentMethod();
  }

  protected setDeliveryAddress(): void {
    this.deliveryAddressSet$ = combineLatest([
      this.userAddressService.getAddresses(),
      this.userAddressService.getAddressesLoadedSuccess(),
    ]).pipe(
      debounceTime(0),
      tap(([, addressesLoadedSuccess]) => {
        if (!addressesLoadedSuccess) {
          this.userAddressService.loadAddresses();
        }
      }),
      filter(([, addressesLoadedSuccess]) => addressesLoadedSuccess),
      take(1),
      switchMap(([addresses]) => {
        const defaultAddress =
          addresses.find((address) => address.defaultAddress) || addresses[0];
        if (defaultAddress && Object.keys(defaultAddress).length) {
          return this.checkoutDeliveryAddressFacade
            .setDeliveryAddress(defaultAddress)
            .pipe(
              switchMap(() =>
                this.checkoutDeliveryAddressFacade.getDeliveryAddressState()
              ),
              filter((state) => !state.error && !state.loading),
              map((state) => state.data),
              map((data) => !!(data && Object.keys(data).length)),
              catchError(() => of(false))
            );
        }
        return of(false);
      }),
      distinctUntilChanged()
    );
  }

  protected setDeliveryMode(): void {
    this.deliveryModeSet$ = combineLatest([
      this.deliveryAddressSet$,
      this.checkoutDeliveryModesFacade.getSupportedDeliveryModesState(),
    ]).pipe(
      debounceTime(0),
      switchMap(([addressSet, supportedDeliveryModesState]) => {
        if (!addressSet) {
          return of(false);
        }
        return of([supportedDeliveryModesState]).pipe(
          filter(
            ([supportedDeliveryModesStateObject]) =>
              !supportedDeliveryModesStateObject.loading &&
              !!supportedDeliveryModesStateObject.data?.length
          ),
          switchMap(([deliveryModesState]) => {
            if (!deliveryModesState.data) {
              return of(false);
            }
            const preferredDeliveryMode =
              this.checkoutConfigService.getPreferredDeliveryMode(
                deliveryModesState.data
              );
            return of([preferredDeliveryMode]).pipe(
              switchMap(([deliveryMode]) => {
                if (!deliveryMode) {
                  return of(false);
                }
                return this.checkoutDeliveryModesFacade
                  .setDeliveryMode(deliveryMode)
                  .pipe(
                    switchMap(() =>
                      this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState()
                    ),
                    filter((state) => !state.error && !state.loading),
                    map((state) => state.data),
                    map((data) => !!(data && Object.keys(data).length)),
                    catchError(() => of(false))
                  );
              })
            );
          })
        );
      }),
      distinctUntilChanged()
    );
  }

  protected setPaymentMethod(): void {
    this.paymentMethodSet$ = combineLatest([
      this.deliveryModeSet$,
      this.userPaymentService.getPaymentMethods(),
      this.userPaymentService.getPaymentMethodsLoadedSuccess(),
    ]).pipe(
      debounceTime(0),
      tap(([, , paymentMethodsLoadedSuccess]) => {
        if (!paymentMethodsLoadedSuccess) {
          this.userPaymentService.loadPaymentMethods();
        }
      }),
      filter(([, , success]) => success),
      switchMap(([deliveryModeSet, payments]) => {
        if (!deliveryModeSet) {
          return of(false);
        }

        const defaultPayment =
          payments.find((address) => address.defaultPayment) || payments[0];
        if (!defaultPayment || Object.keys(defaultPayment).length === 0) {
          return of(false);
        }
        return this.checkoutPaymentFacade
          .setPaymentDetails(defaultPayment)
          .pipe(
            switchMap(() =>
              this.checkoutPaymentFacade.getPaymentDetailsState()
            ),
            filter((state) => !state.error && !state.loading),
            map((state) => state.data),
            map((data) => !!(data && Object.keys(data).length)),
            catchError(() => of(false))
          );
      }),
      distinctUntilChanged()
    );
  }

  public trySetDefaultCheckoutDetails(): Observable<boolean> {
    return this.paymentMethodSet$.pipe(
      map((paymentMethodSet) => !!paymentMethodSet)
    );
  }
}

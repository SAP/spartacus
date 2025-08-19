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
  CheckoutDeliveryModesFacade,
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
  Subject,
  combineLatest,
  of,
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
import { PickupOptionFacade } from '@spartacus/pickup-in-store/root';
import { UserAddressService } from '@spartacus/core';

@Injectable()
export class OpfCheckoutBillingAddressFormService {
  protected checkoutDeliveryAddressFacade = inject(
    CheckoutDeliveryAddressFacade
  );
  protected checkoutDeliveryModesFacade = inject(CheckoutDeliveryModesFacade);
  protected checkoutBillingAddressFacade = inject(CheckoutBillingAddressFacade);
  protected userPaymentService = inject(UserPaymentService);
  protected checkoutPaymentService = inject(CheckoutPaymentFacade);
  protected activeCartService = inject(ActiveCartFacade);
  protected globalMessageService = inject(GlobalMessageService);
  protected opfCheckoutPaymentWrapperService = inject(
    OpfCheckoutPaymentWrapperService
  );
  protected _pickupNoDefaultAddress$ = new Subject<void>();
  protected pickupOptionFacade = inject(PickupOptionFacade);
  public hasdefaultaddress = true;
  protected userAddressService = inject(UserAddressService);
  protected readonly _$billingAddressSub = new BehaviorSubject<
    Address | undefined
  >(undefined);
  protected readonly _$isLoadingAddress = new BehaviorSubject(false);
  protected readonly _$isSameAsDelivery = new BehaviorSubject(true);
  protected billingAddressId: string | undefined;
  protected hasPickupItems: Boolean;

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

  get pickupNoDefaultAddress$(): Observable<void> {
    return this._pickupNoDefaultAddress$.asObservable();
  }

  setPickupDeliveryModeForPickupItems(): void {
    this.activeCartService
      .hasPickupItems()
      .pipe(
        take(1),
        filter(Boolean),
        tap(() => (this.hasPickupItems = true)),
        switchMap(() =>
          this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(
            take(1),
            map((mode) => mode.data?.code),
            filter((currentMode) => !currentMode),
            switchMap(() =>
              this.checkoutDeliveryModesFacade.setDeliveryMode('pickup')
            )
          )
        )
      )
      .subscribe({
        next: () => console.log('Delivery mode set to pickup'),
        error: (err) => console.error('Error setting delivery mode:', err),
      });
  }

  private handleNoDefaultAddress(): void {
    this.setIsSameAsDeliveryValue(false);
    this._pickupNoDefaultAddress$.next();
  }

  getAddresses(): void {
    this._$isLoadingAddress.next(true);

    combineLatest([this.getDeliveryAddress(), this.getPaymentAddress()])
      .pipe(
        take(1),
        switchMap(
          ([deliveryAddress, paymentAddress]: [
            Address | undefined,
            Address | undefined,
          ]) => {
            if (this.hasPickupItems) {
              return this.userAddressService.getAddresses().pipe(
                take(1),
                tap((addresses) => {
                  if (addresses.length === 0) {
                    console.log('No addresses found in address book.');
                    this.handleNoDefaultAddress();
                  }
                }),
                map((addresses) =>
                  addresses.find((address) => address.defaultAddress)
                ),
                tap((defaultAddress) => {
                  if (defaultAddress) {
                    console.log('Default address found:', defaultAddress);
                    this.setBillingAddress(defaultAddress);
                    this._$billingAddressSub.next(defaultAddress);
                  } else {
                    console.log('No default address found.');
                    this.handleNoDefaultAddress();
                  }
                }),
                map(() => [deliveryAddress, paymentAddress])
              );
            }
            return of([deliveryAddress, paymentAddress]);
          }
        ),
        tap(([deliveryAddress, paymentAddress]) => {
          if (!paymentAddress && !!deliveryAddress) {
            this.setBillingAddress(deliveryAddress);
            this._$billingAddressSub.next(deliveryAddress);
          } else if (!!paymentAddress && !!deliveryAddress) {
            this.billingAddressId = paymentAddress.id;
            this._$billingAddressSub.next(paymentAddress);
            this._$isSameAsDelivery.next(false);
          }
        }),
        finalize(() => this._$isLoadingAddress.next(false))
      )
      .subscribe();
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

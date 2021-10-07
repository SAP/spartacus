import { Injectable } from '@angular/core';
import {
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/root';
import {
  FeatureConfigService,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
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
  private shippingAddressSet$: Observable<boolean>;
  private deliveryModeSet$: Observable<boolean>;
  private paymentMethodSet$: Observable<boolean>;

  constructor(
    protected userAddressService: UserAddressService,
    protected userPaymentService: UserPaymentService,
    protected checkoutDeliveryService: CheckoutDeliveryFacade,
    protected checkoutPaymentService: CheckoutPaymentFacade,
    protected checkoutConfigService: CheckoutConfigService,
    protected featureConfigService: FeatureConfigService
  ) {
    this.setShippingAddress();
    this.setDeliveryMode();
    this.setPaymentMethod();
  }

  protected setShippingAddress(): void {
    this.shippingAddressSet$ = combineLatest([
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
          return this.checkoutDeliveryService
            .setDeliveryAddress(defaultAddress)
            .pipe(
              switchMap(() => {
                return this.checkoutDeliveryService.getDeliveryAddress();
              }),
              map((data) => !!(data && Object.keys(data).length)),
              catchError(() => of(false))
            );
        }
        return of(false);
      })
    );
  }

  protected setPaymentMethod() {
    this.paymentMethodSet$ = combineLatest([
      this.userPaymentService.getPaymentMethods(),
      this.userPaymentService.getPaymentMethodsLoadedSuccess(),
    ]).pipe(
      debounceTime(0),
      tap(([, paymentMethodsLoadedSuccess]) => {
        if (!paymentMethodsLoadedSuccess) {
          this.userPaymentService.loadPaymentMethods();
        }
      }),
      filter(([, success]) => success),
      switchMap(([payments]) => {
        const defaultPayment =
          payments.find((address) => address.defaultPayment) || payments[0];
        if (!defaultPayment || Object.keys(defaultPayment).length === 0) {
          return of(false);
        }
        return this.checkoutPaymentService
          .setPaymentDetails(defaultPayment)
          .pipe(
            switchMap(() => {
              return this.checkoutPaymentService
                .getPaymentDetails()
                .pipe(map((data) => !!(data && Object.keys(data).length)));
            }),
            catchError(() => of(false))
          );
      })
    );
  }

  protected setDeliveryMode() {
    this.deliveryModeSet$ = combineLatest([
      this.shippingAddressSet$,
      this.checkoutDeliveryService.getSupportedDeliveryModesState(),
    ]).pipe(
      debounceTime(0),
      switchMap(([addressSet, supportedDeliveryModesState]) => {
        if (!addressSet) {
          return of(false);
        }
        return of([supportedDeliveryModesState]).pipe(
          filter(
            ([supportedDeliveryModesState]) =>
              !supportedDeliveryModesState.loading &&
              !!supportedDeliveryModesState.data?.length
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
                return this.checkoutDeliveryService
                  .setDeliveryMode(deliveryMode)
                  .pipe(
                    switchMap(() =>
                      this.checkoutDeliveryService.getSelectedDeliveryMode()
                    ),
                    map((deliveryMode) => !!deliveryMode)
                  );
              })
            );
          })
        );
      })
    );
  }

  public trySetDefaultCheckoutDetails(): Observable<boolean> {
    return combineLatest([this.deliveryModeSet$, this.paymentMethodSet$]).pipe(
      map(([deliveryModeSet, paymentMethodSet]) =>
        Boolean(deliveryModeSet && paymentMethodSet)
      )
    );
  }
}

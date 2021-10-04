import { Injectable } from '@angular/core';
import {
  CheckoutDeliveryFacade,
  CheckoutPaymentFacade,
  ClearCheckoutFacade,
} from '@spartacus/checkout/root';
import {
  FeatureConfigService,
  PaymentDetails,
  StateUtils,
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
import { CheckoutDetailsService } from './checkout-details.service';

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
    protected checkoutDetailsService: CheckoutDetailsService,
    protected checkoutConfigService: CheckoutConfigService,
    protected clearCheckoutService: ClearCheckoutFacade,
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
      this.checkoutDetailsService.getDeliveryAddress(),
    ]).pipe(
      debounceTime(0),
      tap(([, addressesLoadedSuccess]) => {
        if (!addressesLoadedSuccess) {
          this.userAddressService.loadAddresses();
        }
      }),
      filter(([, addressesLoadedSuccess]) => addressesLoadedSuccess),
      take(1),
      switchMap(([addresses, , deliveryAddress]) => {
        const defaultAddress =
          addresses.find((address) => address.defaultAddress) || addresses[0];
        if (deliveryAddress && Object.keys(deliveryAddress).length > 0) {
          return of(true);
        } else if (defaultAddress && Object.keys(defaultAddress).length) {
          return this.checkoutDeliveryService
            .setDeliveryAddress(defaultAddress)
            .pipe(
              switchMap(() => {
                return this.checkoutDetailsService.getDeliveryAddress();
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
      this.checkoutPaymentService.getSetPaymentDetailsResultProcess(),
    ]).pipe(
      debounceTime(0),
      tap(
        ([, paymentMethodsLoadedSuccess]: [
          PaymentDetails[],
          boolean,
          StateUtils.LoaderState<void>
        ]) => {
          if (!paymentMethodsLoadedSuccess) {
            this.userPaymentService.loadPaymentMethods();
          }
        }
      ),
      filter(
        ([, success]: [
          PaymentDetails[],
          boolean,
          StateUtils.LoaderState<void>
        ]) => success
      ),
      switchMap(
        ([payments, , setPaymentDetailsProcess]: [
          PaymentDetails[],
          boolean,
          StateUtils.LoaderState<void>
        ]) => {
          const defaultPayment =
            payments.find((address) => address.defaultPayment) || payments[0];
          if (defaultPayment && Object.keys(defaultPayment).length) {
            if (
              !(
                setPaymentDetailsProcess.success ||
                setPaymentDetailsProcess.error ||
                setPaymentDetailsProcess.loading
              )
            ) {
              this.checkoutPaymentService.setPaymentDetails(defaultPayment);
            }
            return of(setPaymentDetailsProcess).pipe(
              filter(
                (
                  setPaymentDetailsProcessState: StateUtils.LoaderState<void>
                ) => {
                  return (
                    ((setPaymentDetailsProcessState.success ||
                      setPaymentDetailsProcessState.error) &&
                      !setPaymentDetailsProcessState.loading) ??
                    false
                  );
                }
              ),
              switchMap(
                (
                  setPaymentDetailsProcessState: StateUtils.LoaderState<void>
                ) => {
                  if (setPaymentDetailsProcessState.success) {
                    return this.checkoutDetailsService.getPaymentDetails();
                  }
                  return of(false);
                }
              ),
              map((data) => Boolean(data && Object.keys(data).length))
            );
          }
          return of(false);
        }
      )
    );
  }

  protected setDeliveryMode() {
    this.deliveryModeSet$ = combineLatest([
      this.shippingAddressSet$,
      this.checkoutDeliveryService.getSupportedDeliveryModesState(),
      this.checkoutDeliveryService.getSelectedDeliveryMode(),
    ]).pipe(
      debounceTime(0),
      switchMap(
        ([addressSet, supportedDeliveryModesState, selectedDeliveryMode]) => {
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
              if (!deliveryModesState.data?.length) {
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
                  } else if (!selectedDeliveryMode) {
                    return this.checkoutDeliveryService
                      .setDeliveryMode(deliveryMode)
                      .pipe(
                        switchMap(() =>
                          this.checkoutDeliveryService.getSelectedDeliveryMode()
                        ),
                        map((deliveryMode) => !!deliveryMode)
                      );
                  } else {
                    return of(true);
                  }
                })
              );
            })
          );
        }
      )
    );
  }

  public trySetDefaultCheckoutDetails(): Observable<boolean> {
    this.clearCheckoutService.resetCheckoutProcesses();

    return combineLatest([this.deliveryModeSet$, this.paymentMethodSet$]).pipe(
      map(([deliveryModeSet, paymentMethodSet]) =>
        Boolean(deliveryModeSet && paymentMethodSet)
      )
    );
  }
}

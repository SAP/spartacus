import { Injectable } from '@angular/core';
import { combineLatest, of, asyncScheduler, Observable } from 'rxjs';
import { filter, map, switchMap, tap, debounceTime } from 'rxjs/operators';

import {
  Address,
  CheckoutDeliveryService,
  UserAddressService,
  UserPaymentService,
  PaymentDetails,
  DeliveryMode,
  CheckoutPaymentService,
} from '@spartacus/core';
import { CheckoutConfigService } from './checkout-config.service';
import { CheckoutDetailsService } from './checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class ExpressCheckoutService {
  shippingAddressSet$;
  deliveryModeSet$;
  paymentMethodSet$;

  constructor(
    protected userAddressService: UserAddressService,
    protected userPaymentService: UserPaymentService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected checkoutDetailsService: CheckoutDetailsService,
    protected checkoutConfigService: CheckoutConfigService
  ) {
    this.setShippingAddress();
    this.setDeliveryMode();
    this.setPaymentMethod();
  }

  protected setShippingAddress() {
    this.shippingAddressSet$ = combineLatest([
      this.userAddressService.getAddresses(),
      this.userAddressService.getAddressesLoadedSuccess(),
      this.checkoutDeliveryService.getSetDeliveryAddressResultSuccess(),
      this.checkoutDeliveryService.getSetDeliveryAddressResultError(),
      this.checkoutDeliveryService.getSetDeliveryAddressResultLoading(),
    ]).pipe(
      debounceTime(1, asyncScheduler),
      tap(([, success]: [Address[], boolean, boolean, boolean, boolean]) => {
        if (!success) {
          this.userAddressService.loadAddresses();
        }
      }),
      filter(
        ([, success]: [Address[], boolean, boolean, boolean, boolean]) =>
          success
      ),
      switchMap(
        ([
          addresses,
          ,
          setDeliveryAddressSuccessFlag,
          setDeliveryAddressErrorFlag,
          setDeliveryAddressInProgressFlag,
        ]: [Address[], boolean, boolean, boolean, boolean]) => {
          const defaultAddress =
            addresses.find(address => address.defaultAddress) || addresses[0];
          if (defaultAddress && Object.keys(defaultAddress).length) {
            if (
              !setDeliveryAddressSuccessFlag &&
              !setDeliveryAddressErrorFlag &&
              !setDeliveryAddressInProgressFlag
            ) {
              this.checkoutDeliveryService.setDeliveryAddress(defaultAddress);
            }
            return of([
              setDeliveryAddressSuccessFlag,
              setDeliveryAddressErrorFlag,
              setDeliveryAddressInProgressFlag,
            ]).pipe(
              filter(
                ([
                  setDeliveryAddressSuccess,
                  setDeliveryAddressError,
                  setDeliveryAddressInProgress,
                ]: [boolean, boolean, boolean]) => {
                  return (
                    (setDeliveryAddressSuccess || setDeliveryAddressError) &&
                    !setDeliveryAddressInProgress
                  );
                }
              ),
              switchMap(
                ([setDeliveryAddressSuccess]: [boolean, boolean, boolean]) => {
                  if (setDeliveryAddressSuccess) {
                    return this.checkoutDetailsService.getDeliveryAddress();
                  }
                  return of(false);
                }
              ),
              map(data => Boolean(data && Object.keys(data).length))
            );
          }
          return of(false);
        }
      )
    );
  }

  protected setPaymentMethod() {
    this.paymentMethodSet$ = combineLatest([
      this.userPaymentService.getPaymentMethods(),
      this.userPaymentService.getPaymentMethodsLoadedSuccess(),
      this.checkoutPaymentService.getSetPaymentDetailsResultSuccess(),
      this.checkoutPaymentService.getSetPaymentDetailsResultError(),
      this.checkoutPaymentService.getSetPaymentDetailsResultLoading(),
    ]).pipe(
      debounceTime(1, asyncScheduler),
      tap(
        ([, success]: [
          PaymentDetails[],
          boolean,
          boolean,
          boolean,
          boolean
        ]) => {
          if (!success) {
            this.userPaymentService.loadPaymentMethods();
          }
        }
      ),
      filter(
        ([, success]: [PaymentDetails[], boolean, boolean, boolean, boolean]) =>
          success
      ),
      switchMap(
        ([
          payments,
          ,
          setPaymentDetailsSuccessFlag,
          setPaymentDetailsErrorFlag,
          setPaymentDetailsInProgressFlag,
        ]: [PaymentDetails[], boolean, boolean, boolean, boolean]) => {
          const defaultPayment =
            payments.find(address => address.defaultPayment) || payments[0];
          if (defaultPayment && Object.keys(defaultPayment).length) {
            if (
              !setPaymentDetailsSuccessFlag &&
              !setPaymentDetailsErrorFlag &&
              !setPaymentDetailsInProgressFlag
            ) {
              this.checkoutPaymentService.setPaymentDetails(defaultPayment);
            }
            return of([
              setPaymentDetailsSuccessFlag,
              setPaymentDetailsErrorFlag,
              setPaymentDetailsInProgressFlag,
            ]).pipe(
              filter(
                ([
                  setPaymentDetailsSuccess,
                  setPaymentDetailsError,
                  setPaymentDetailsInProgress,
                ]: [boolean, boolean, boolean]) => {
                  return (
                    (setPaymentDetailsSuccess || setPaymentDetailsError) &&
                    !setPaymentDetailsInProgress
                  );
                }
              ),
              switchMap(
                ([setPaymentDetailsSuccess]: [boolean, boolean, boolean]) => {
                  if (setPaymentDetailsSuccess) {
                    return this.checkoutDetailsService.getPaymentDetails();
                  }
                  return of(false);
                }
              ),
              map(data => Boolean(data && Object.keys(data).length))
            );
          }
          return of(false);
        }
      )
    );
  }

  protected setDeliveryMode() {
    this.deliveryModeSet$ = combineLatest([
      this.checkoutDeliveryService.getSupportedDeliveryModes(),
      this.shippingAddressSet$,
      this.checkoutDeliveryService.getSetDeliveryModeResultSuccess(),
      this.checkoutDeliveryService.getSetDeliveryModeResultError(),
      this.checkoutDeliveryService.getSetDeliveryModeResultLoading(),
    ]).pipe(
      debounceTime(1, asyncScheduler),
      switchMap(
        ([
          modes,
          addressSet,
          setDeliveryModeSuccessFlag,
          setDeliveryModeErrorFlag,
          setDeliveryModeInProgressFlag,
        ]: [DeliveryMode[], boolean, boolean, boolean, boolean]) => {
          if (addressSet) {
            return of([
              modes,
              setDeliveryModeSuccessFlag,
              setDeliveryModeErrorFlag,
              setDeliveryModeInProgressFlag,
            ]).pipe(
              filter(
                ([deliveryModes]: [
                  DeliveryMode[],
                  boolean,
                  boolean,
                  boolean
                ]) => Boolean(deliveryModes.length)
              ),
              map(
                ([
                  deliveryModes,
                  setDeliveryModeSuccess,
                  setDeliveryModeError,
                  setDeliveryModeInProgress,
                ]: [DeliveryMode[], boolean, boolean, boolean]) => {
                  const preferredDeliveryMode = this.checkoutConfigService.getPreferredDeliveryMode(
                    deliveryModes
                  );
                  return [
                    preferredDeliveryMode,
                    setDeliveryModeSuccess,
                    setDeliveryModeError,
                    setDeliveryModeInProgress,
                  ];
                }
              ),
              tap(
                ([
                  preferredDeliveryMode,
                  setDeliveryModeSuccess,
                  setDeliveryModeError,
                  setDeliveryModeInProgress,
                ]: [string, boolean, boolean, boolean]) => {
                  if (
                    preferredDeliveryMode &&
                    !setDeliveryModeSuccess &&
                    !setDeliveryModeError &&
                    !setDeliveryModeInProgress
                  ) {
                    this.checkoutDeliveryService.setDeliveryMode(
                      preferredDeliveryMode
                    );
                  }
                }
              ),
              filter(
                ([
                  ,
                  setDeliveryModeSuccess,
                  setDeliveryModeError,
                  setDeliveryModeInProgress,
                ]: [string, boolean, boolean, boolean]) => {
                  return (
                    (setDeliveryModeSuccess || setDeliveryModeError) &&
                    !setDeliveryModeInProgress
                  );
                }
              ),
              switchMap(
                ([, setDeliveryModeSuccess]: [
                  string,
                  boolean,
                  boolean,
                  boolean
                ]) => {
                  if (setDeliveryModeSuccess) {
                    return this.checkoutDetailsService.getSelectedDeliveryModeCode();
                  }
                  return of(false);
                }
              ),
              map(data => Boolean(data))
            );
          } else {
            return of(false);
          }
        }
      )
    );
  }

  protected resetCheckoutProcesses() {
    this.checkoutDeliveryService.resetSetDeliveryAddressProcess();
    this.checkoutPaymentService.resetSetPaymentDetailsProcess();
    this.checkoutDeliveryService.resetSetDeliveryModeProcess();
  }

  public trySetDefaultCheckoutDetails(): Observable<boolean> {
    this.resetCheckoutProcesses();
    return combineLatest([this.deliveryModeSet$, this.paymentMethodSet$]).pipe(
      map(([deliveryModeSet, paymentMethodSet]) =>
        Boolean(deliveryModeSet && paymentMethodSet)
      )
    );
  }
}

import { Injectable } from '@angular/core';
import { combineLatest, of, asyncScheduler } from 'rxjs';
import { filter, map, switchMap, tap, debounceTime } from 'rxjs/operators';

import {
  Address,
  CheckoutDeliveryService,
  UserAddressService,
  UserPaymentService,
  PaymentDetails,
  DeliveryMode,
  CheckoutPaymentService,
  CheckoutService,
} from '@spartacus/core';
import { CheckoutConfigService } from './checkout-config.service';
import { CheckoutDetailsService } from './checkout-details.service';

@Injectable({
  providedIn: 'root',
})
export class ExpressCheckoutService {
  defaultShippingAddress$;
  shippingAddressSet$;
  deliveryModeSet$;
  paymentMethodSet$;

  constructor(
    protected userAddressService: UserAddressService,
    protected userPaymentService: UserPaymentService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected checkoutService: CheckoutService,
    protected checkoutDetailsService: CheckoutDetailsService,
    protected checkoutConfigService: CheckoutConfigService
  ) {}

  protected setShippingAddress() {
    this.checkoutDeliveryService.resetSetDeliveryAddressProcess();
    this.shippingAddressSet$ = combineLatest(
      this.userAddressService.getAddresses(),
      this.userAddressService.getAddressesLoadedSuccess(),
      this.checkoutDeliveryService.getSetDeliveryAddressResultLoading(),
      this.checkoutDeliveryService.getSetDeliveryAddressResultSuccess(),
      this.checkoutDeliveryService.getSetDeliveryAddressResultError()
    ).pipe(
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
      map(
        ([
          addresses,
          ,
          setDeliveryAddressInProgress,
          setDeliveryAddressSuccess,
          setDeliveryAddressError,
        ]: [Address[], boolean, boolean, boolean, boolean]) => [
          addresses.find(address => address.defaultAddress) || addresses[0],
          setDeliveryAddressInProgress,
          setDeliveryAddressSuccess,
          setDeliveryAddressError,
        ]
      ),
      tap(
        ([
          defaultAddress,
          setDeliveryAddressInProgress,
          setDeliveryAddressSuccess,
          setDeliveryAddressError,
        ]: [Address, boolean, boolean, boolean]) => {
          if (
            defaultAddress &&
            Object.keys(defaultAddress).length &&
            !setDeliveryAddressInProgress &&
            !setDeliveryAddressSuccess &&
            !setDeliveryAddressError
          ) {
            this.checkoutDeliveryService.setDeliveryAddress(defaultAddress);
          }
        }
      ),
      filter(
        ([
          ,
          setDeliveryAddressInProgress,
          setDeliveryAddressSuccess,
          setDeliveryAddressError,
        ]: [Address, boolean, boolean, boolean]) => {
          return (
            (setDeliveryAddressSuccess || setDeliveryAddressError) &&
            !setDeliveryAddressInProgress
          );
        }
      ),
      switchMap(
        ([, , , setDeliveryAddressError]: [
          Address,
          boolean,
          boolean,
          boolean
        ]) => {
          if (setDeliveryAddressError) {
            return of(false);
          }
          return this.checkoutDetailsService.getDeliveryAddress();
        }
      ),
      map(data => Boolean(data && Object.keys(data).length))
    );
  }

  protected setPaymentMethod() {
    this.checkoutPaymentService.resetSetPaymentDetailsProcess();
    this.paymentMethodSet$ = combineLatest(
      this.userPaymentService.getPaymentMethods(),
      this.userPaymentService.getPaymentMethodsLoadedSuccess(),
      this.checkoutPaymentService.getSetPaymentDetailsResultLoading(),
      this.checkoutPaymentService.getSetPaymentDetailsResultSuccess(),
      this.checkoutPaymentService.getSetPaymentDetailsResultError()
    ).pipe(
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
      map(
        ([
          payments,
          ,
          setPaymentDetailsInProgress,
          setPaymentDetailsSuccess,
          setPaymentDetailsError,
        ]: [PaymentDetails[], boolean, boolean, boolean, boolean]) => [
          payments.find(address => address.defaultPayment) || payments[0],
          setPaymentDetailsInProgress,
          setPaymentDetailsSuccess,
          setPaymentDetailsError,
        ]
      ),
      tap(
        ([
          defaultPayment,
          setPaymentDetailsInProgress,
          setPaymentDetailsSuccess,
          setPaymentDetailsError,
        ]: [PaymentDetails, boolean, boolean, boolean]) => {
          if (
            defaultPayment &&
            Object.keys(defaultPayment).length &&
            !setPaymentDetailsInProgress &&
            !setPaymentDetailsSuccess &&
            !setPaymentDetailsError
          ) {
            this.checkoutPaymentService.setPaymentDetails(defaultPayment);
          }
        }
      ),
      filter(
        ([
          ,
          setPaymentDetailsInProgress,
          setPaymentDetailsSuccess,
          setPaymentDetailsError,
        ]: [Address, boolean, boolean, boolean]) => {
          return (
            (setPaymentDetailsSuccess || setPaymentDetailsError) &&
            !setPaymentDetailsInProgress
          );
        }
      ),
      switchMap(
        ([, , , setPaymentDetailsError]: [
          Address,
          boolean,
          boolean,
          boolean
        ]) => {
          if (setPaymentDetailsError) {
            return of(false);
          }
          return this.checkoutDetailsService.getPaymentDetails();
        }
      ),
      map(data => Boolean(data && Object.keys(data).length))
    );
  }

  protected setDeliveryMode() {
    this.checkoutDeliveryService.resetSetDeliveryModeProcess();
    this.deliveryModeSet$ = combineLatest(
      this.checkoutDeliveryService.getSupportedDeliveryModes(),
      this.shippingAddressSet$,
      this.checkoutDeliveryService.getSetDeliveryModeResultLoading(),
      this.checkoutDeliveryService.getSetDeliveryModeResultSuccess(),
      this.checkoutDeliveryService.getSetDeliveryModeResultError()
    ).pipe(
      debounceTime(1, asyncScheduler),
      switchMap(
        ([
          modes,
          addressSet,
          setDeliveryModeInProgress,
          setDeliveryModeSuccess,
          setDeliveryModeError,
        ]: [DeliveryMode[], boolean, boolean, boolean, boolean]) => {
          if (addressSet) {
            return of([
              modes,
              setDeliveryModeInProgress,
              setDeliveryModeSuccess,
              setDeliveryModeError,
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
                  setDeliveryModeInProgressFlag,
                  setDeliveryModeSuccessFlag,
                  setDeliveryModeErrorFlag,
                ]: [DeliveryMode[], boolean, boolean, boolean]) => {
                  const preferredDeliveryMode = this.checkoutConfigService.getPreferredDeliveryMode(
                    deliveryModes
                  );
                  return [
                    preferredDeliveryMode,
                    setDeliveryModeInProgressFlag,
                    setDeliveryModeSuccessFlag,
                    setDeliveryModeErrorFlag,
                  ];
                }
              ),
              tap(
                ([
                  preferredDeliveryMode,
                  setDeliveryModeInProgressFlag,
                  setDeliveryModeSuccessFlag,
                  setDeliveryModeErrorFlag,
                ]: [string, boolean, boolean, boolean]) => {
                  if (
                    preferredDeliveryMode &&
                    !setDeliveryModeInProgressFlag &&
                    !setDeliveryModeSuccessFlag &&
                    !setDeliveryModeErrorFlag
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
                  setDeliveryModeInProgressFlag,
                  setDeliveryModeSuccessFlag,
                  setDeliveryModeErrorFlag,
                ]: [string, boolean, boolean, boolean]) => {
                  return (
                    (setDeliveryModeSuccessFlag || setDeliveryModeErrorFlag) &&
                    !setDeliveryModeInProgressFlag
                  );
                }
              ),
              switchMap(
                ([, , , setDeliveryModeErrorFlag]: [
                  string,
                  boolean,
                  boolean,
                  boolean
                ]) => {
                  if (setDeliveryModeErrorFlag) {
                    return of(false);
                  }
                  return this.checkoutDetailsService.getSelectedDeliveryModeCode();
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

  public trySetDefaultCheckoutDetails() {
    this.setShippingAddress();
    this.setDeliveryMode();
    this.setPaymentMethod();

    return combineLatest([this.deliveryModeSet$, this.paymentMethodSet$]).pipe(
      map(
        ([deliveryModeSet, paymentMethodSet]) =>
          deliveryModeSet && paymentMethodSet
      )
    );
  }
}

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
    this.checkoutService.resetSetDeliveryAddressProcess();
    this.shippingAddressSet$ = combineLatest(
      this.userAddressService.getAddresses(),
      this.userAddressService.getAddressesLoadedSuccess(),
      this.checkoutService.getSetDeliveryAddressResultLoading(),
      this.checkoutService.getSetDeliveryAddressResultSuccess()
    ).pipe(
      debounceTime(1),
      tap(res => console.log('start', res)),
      tap(([, success]: [Address[], boolean, boolean, boolean]) => {
        if (!success) {
          this.userAddressService.loadAddresses();
        }
      }),
      filter(([, success]: [Address[], boolean, boolean, boolean]) => success),
      map(
        ([
          addresses,
          ,
          setDeliveryAddressInProgress,
          setDeliveryAddressSuccess,
        ]: [Address[], boolean, boolean, boolean]) => [
          addresses.find(address => address.defaultAddress) || addresses[0],
          setDeliveryAddressInProgress,
          setDeliveryAddressSuccess,
        ]
      ),
      tap(
        ([
          defaultAddress,
          setDeliveryAddressInProgress,
          setDeliveryAddressSuccess,
        ]: [Address, boolean, boolean]) => {
          if (
            defaultAddress &&
            Object.keys(defaultAddress).length &&
            !setDeliveryAddressInProgress &&
            !setDeliveryAddressSuccess
          ) {
            this.checkoutDeliveryService.setDeliveryAddress(defaultAddress);
          }
        }
      ),
      filter(
        ([, setDeliveryAddressInProgress, setDeliveryAddressSuccess]: [
          Address,
          boolean,
          boolean
        ]) => {
          return setDeliveryAddressSuccess && !setDeliveryAddressInProgress;
        }
      ),
      switchMap(() => this.checkoutDetailsService.getDeliveryAddress()),
      map(data => Boolean(data && Object.keys(data).length)),
      tap(data => console.log('shippingAddressSet$', data))
    );
  }

  protected setPaymentMethod() {
    this.checkoutService.resetSetPaymentDetailsProcess();
    this.paymentMethodSet$ = combineLatest(
      this.userPaymentService.getPaymentMethods(),
      this.userPaymentService.getPaymentMethodsLoadedSuccess()
    ).pipe(
      tap(([, success]: [PaymentDetails[], boolean]) => {
        if (!success) {
          this.userPaymentService.loadPaymentMethods();
        }
      }),
      filter(([, success]: [PaymentDetails[], boolean]) => success),
      map(
        ([payments]: [PaymentDetails[], boolean]) =>
          payments.find(address => address.defaultPayment) || payments[0]
      ),
      tap(
        defaultPayment =>
          defaultPayment &&
          Object.keys(defaultPayment).length &&
          this.checkoutPaymentService.setPaymentDetails(defaultPayment)
      ),
      switchMap(() => this.checkoutDetailsService.getPaymentDetails()),
      map(data => Boolean(data && Object.keys(data).length)),
      tap(data => console.log('paymentMethodSet$', data))
    );
  }

  protected setDeliveryMode() {
    this.deliveryModeSet$ = combineLatest(
      this.checkoutDeliveryService.getSupportedDeliveryModes(),
      this.checkoutDeliveryService.getSelectedDeliveryModeCode(),
      this.shippingAddressSet$,
      this.checkoutService.getSetDeliveryModeResultLoading(),
      this.checkoutService.getSetDeliveryModeResultSuccess()
    ).pipe(
      debounceTime(1),
      switchMap(
        ([modes, mode, addressSet, setDeliveryModeInProgress, setDeliveryModeSuccess]: [DeliveryMode[], string, boolean, boolean, boolean]) => {
          if (addressSet) {
            return of([modes, mode, setDeliveryModeInProgress, setDeliveryModeSuccess]).pipe(
              filter(([deliveryModes]: [DeliveryMode[], string, boolean, boolean]) =>
                Boolean(deliveryModes.length)
              ),
              map(([deliveryModes, code]: [DeliveryMode[], string, boolean, boolean]) => {
                const preferredDeliveryMode = this.checkoutConfigService.getPreferredDeliveryMode(
                  deliveryModes
                );
                if (code !== preferredDeliveryMode) {
                  this.checkoutDeliveryService.setDeliveryMode(
                    preferredDeliveryMode
                  );
                } else {
                return Boolean(deliveryModes.length);
                }
              }),

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

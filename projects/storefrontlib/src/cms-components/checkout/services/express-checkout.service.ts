import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import {
  filter,
  map,
  mergeMap,
  share,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

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
    this.shippingAddressSet$ = this.userAddressService.getAddresses().pipe(
      withLatestFrom(this.userAddressService.getAddressesLoadedSuccess()),
      tap(([, success]: [Address[], boolean]) => {
        if (!success) {
          this.userAddressService.loadAddresses();
        }
      }),
      filter(([, success]: [Address[], boolean]) => success),
      map(
        ([addresses]: [Address[], boolean]) =>
          addresses.find(address => address.defaultAddress) || addresses[0]
      ),
      //   tap(data => console.log('defaultShippingAddress$', data))
      // );
      //
      // this.shippingAddressSet$ = this.defaultShippingAddress$.pipe(
      tap(
        defaultAddress =>
          defaultAddress &&
          Object.keys(defaultAddress).length &&
          this.checkoutDeliveryService.setDeliveryAddress(defaultAddress)
      ),
      switchMap(() => this.checkoutDetailsService.getDeliveryAddress()),
      map(data => Boolean(data && Object.keys(data).length)),
      tap(data => console.log('shippingAddressSet$', data))
    );
  }

  protected setPaymentMethod() {
    this.paymentMethodSet$ = this.userPaymentService.getPaymentMethods().pipe(
      withLatestFrom(this.userPaymentService.getPaymentMethodsLoadedSuccess()),
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
    this.deliveryModeSet$ = this.checkoutDeliveryService
      .getSupportedDeliveryModes()
      .pipe(
        withLatestFrom(
          this.checkoutDeliveryService.getSelectedDeliveryModeCode(),
          this.shippingAddressSet$
        ),
        switchMap(
          ([modes, mode, addressSet]: [DeliveryMode[], string, boolean]) => {
            if (addressSet) {
              return of([modes, mode]).pipe(
                filter(([deliveryModes]: [DeliveryMode[], string]) =>
                  Boolean(deliveryModes.length)
                ),
                map(([deliveryModes, code]: [DeliveryMode[], string]) => {
                  const preferredDeliveryMode = this.checkoutConfigService.getPreferredDeliveryMode(
                    deliveryModes
                  );
                  if (code !== preferredDeliveryMode) {
                    this.checkoutDeliveryService.setDeliveryMode(
                      preferredDeliveryMode
                    );
                  }
                  return Boolean(deliveryModes.length);
                })
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
      tap(console.log),
      map(
        ([deliveryModeSet, paymentMethodSet]) =>
          deliveryModeSet && paymentMethodSet
      )
    );
  }
}

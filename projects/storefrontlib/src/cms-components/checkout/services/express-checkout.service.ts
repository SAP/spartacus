import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

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
    this.defaultShippingAddress$ = this.userAddressService.getAddresses().pipe(
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
      tap(data => console.log('defaultShippingAddress$', data))
    );

    this.shippingAddressSet$ = this.defaultShippingAddress$.pipe(
      tap(
        defaultAddress =>
          defaultAddress && Object.keys(defaultAddress).length
            ? this.checkoutDeliveryService.setDeliveryAddress(defaultAddress)
            : this.checkoutDetailsService.clearCheckoutDelivery()
      ),
      switchMap(() => this.checkoutDetailsService.getDeliveryAddress()),
      tap(data => console.log('shippingAddressSet$', data)),
      map(data => Boolean(data && Object.keys(data).length))
    );
  }

  protected setPaymentMethod() {
    this.userPaymentService.loadPaymentMethods();
    this.paymentMethodSet$ = this.userPaymentService
      .getPaymentMethodsLoadedSuccess()
      .pipe(
        filter(Boolean),
        switchMap(() => this.userPaymentService.getPaymentMethods()),
        map((paymentMethods: PaymentDetails[]) => {
          const defaultPayment =
            paymentMethods.find(
              paymentMethod => paymentMethod.defaultPayment
            ) || paymentMethods[0];
          if (defaultPayment) {
            this.checkoutPaymentService.setPaymentDetails(defaultPayment);
          }
          return Boolean(defaultPayment);
        })
      );
  }

  protected setDeliveryMode() {
    this.deliveryModeSet$ = this.shippingAddressSet$.pipe(
      switchMap(addressAvailable => {
        if (addressAvailable) {
          return this.checkoutDeliveryService.getSupportedDeliveryModes().pipe(
            withLatestFrom(
              this.checkoutDeliveryService.getSelectedDeliveryModeCode()
            ),
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
      })
    );
  }

  public trySetDefaultCheckoutDetails() {
    this.setShippingAddress();
    // this.setDeliveryMode();
    // this.setPaymentMethod();
    return this.shippingAddressSet$.pipe(
      tap(console.log),
      map(Boolean)
    );
    // return combineLatest([
    //   this.shippingAddressSet$,
    //   this.deliveryModeSet$,
    //   this.paymentMethodSet$,
    // ]).pipe(
    //   tap(console.log),
    //   map(
    //     ([shippingAddressSet, deliveryModeSet, paymentMethodSet]) =>
    //       shippingAddressSet && deliveryModeSet && paymentMethodSet
    //   )
    //

  }
}

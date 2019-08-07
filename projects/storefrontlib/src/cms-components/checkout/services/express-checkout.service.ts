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
} from '@spartacus/core';
import { CheckoutConfigService } from './checkout-config.service';

@Injectable({
  providedIn: 'root',
})
export class ExpressCheckoutService {
  shippingAddress$;
  deliveryMode$;
  paymentMethod$;

  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected userPaymentService: UserPaymentService,
    protected checkoutConfigService: CheckoutConfigService
  ) {
    this.setShippingAddress();
    this.setDeliveryMode();
    this.setPaymentMethod();
  }

  protected setShippingAddress() {
    this.userAddressService.loadAddresses();
    this.shippingAddress$ = this.userAddressService
      .getAddressesLoadedSuccess()
      .pipe(
        filter(Boolean),
        switchMap(() => this.userAddressService.getAddresses()),
        map((addresses: Address[]) => {
          const defaultAddress =
            addresses.find(address => address.defaultAddress) || addresses[0];
          if (defaultAddress) {
            this.checkoutDeliveryService.setDeliveryAddress(defaultAddress);
          }
          return Boolean(defaultAddress);
        })
      );
  }

  protected setPaymentMethod() {
    this.userPaymentService.loadPaymentMethods();
    this.paymentMethod$ = this.userPaymentService
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
    this.deliveryMode$ = this.shippingAddress$.pipe(
      switchMap(addressAvailable => {
        if (addressAvailable) {
          return this.checkoutDeliveryService.getSupportedDeliveryModes().pipe(
            withLatestFrom(
              this.checkoutDeliveryService.getSelectedDeliveryModeCode()
            ),
            filter(([deliveryModes]: [DeliveryMode[], string]) =>
              Boolean(deliveryModes.length)
            ),
            tap(([deliveryModes, code]: [DeliveryMode[], string]) =>
              console.log('d,c,', deliveryModes, code)
            ),
            map(([deliveryModes, code]: [DeliveryMode[], string]) => {
              if (deliveryModes.length) {
                const preferredDeliveryMode = this.checkoutConfigService.getPreferredDeliveryMode(
                  deliveryModes
                );
                if (code !== preferredDeliveryMode) {
                  this.checkoutDeliveryService.setDeliveryMode(
                    preferredDeliveryMode
                  );
                }
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

  protected isExpressCheckoutPossible() {
    return combineLatest([
      this.shippingAddress$,
      this.deliveryMode$,
      this.paymentMethod$,
    ]).pipe(
      map(
        ([shippingAddressSet, deliveryModeSet, paymentMethodSet]) =>
          shippingAddressSet && deliveryModeSet && paymentMethodSet
      )
    );
  }
}

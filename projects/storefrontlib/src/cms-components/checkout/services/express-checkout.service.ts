import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import {
  Address,
  CheckoutDeliveryService,
  UserAddressService,
  UserPaymentService,
  PaymentDetails,
  DeliveryMode,
} from '@spartacus/core';
import { CheckoutDetailsService } from './checkout-details.service';
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
    protected userPaymentService: UserPaymentService,
    protected checkoutDetailsService: CheckoutDetailsService,
    protected checkoutConfigService: CheckoutConfigService
  ) {
    this.setShippingAddress();
    this.setDeliveryMode();
    this.setPaymentMethod();
  }

  private setShippingAddress() {
    this.shippingAddress$ = this.checkoutDetailsService
      .getDeliveryAddress()
      .pipe(
        switchMap((deliveryAddress: Address) => {
          if (deliveryAddress && Object.keys(deliveryAddress).length) {
            return of(deliveryAddress);
          } else {
            return this.userAddressService.getAddresses().pipe(
              tap(
                (addresses: Address[]) =>
                  !Boolean(addresses.length) &&
                  this.userAddressService.loadAddresses()
              ),
              filter((addresses: Address[]) => Boolean(addresses.length)),
              map((addresses: Address[]) => {
                return (
                  addresses.find(address => address.defaultAddress) ||
                  addresses[0]
                );
              })
            );
          }
        })
      );
  }

  private setPaymentMethod() {
    this.paymentMethod$ = this.checkoutDetailsService.getPaymentDetails().pipe(
      switchMap((cartPaymentMethod: PaymentDetails) => {
        if (cartPaymentMethod && Object.keys(cartPaymentMethod).length) {
          return of(cartPaymentMethod);
        } else {
          return this.userPaymentService.getPaymentMethods().pipe(
            tap(
              (paymentMethods: PaymentDetails[]) =>
                !Boolean(paymentMethods.length) &&
                this.userPaymentService.loadPaymentMethods()
            ),
            filter((paymentMethods: PaymentDetails[]) =>
              Boolean(paymentMethods.length)
            ),
            map((paymentMethods: PaymentDetails[]) => {
              return (
                paymentMethods.find(
                  paymentMethod => paymentMethod.defaultPayment
                ) || paymentMethods[0]
              );
            })
          );
        }
      })
    );
  }

  private setDeliveryMode() {
    this.deliveryMode$ = this.checkoutDetailsService
      .getSelectedDeliveryModeCode()
      .pipe(
        switchMap((code: string) => {
          if (code && code.length) {
            return of(code);
          } else {
            return this.checkoutDeliveryService
              .getSupportedDeliveryModes()
              .pipe(
                filter((deliveryModes: DeliveryMode[]) =>
                  Boolean(deliveryModes.length)
                ),
                map((deliveryModes: DeliveryMode[]) => {
                  return this.checkoutConfigService.getPreferredDeliveryMode(
                    deliveryModes
                  );
                })
              );
          }
        })
      );
  }
}

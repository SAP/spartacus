import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { filter, map, skipWhile, switchMap, tap } from 'rxjs/operators';

import {
  Address,
  CheckoutDeliveryService,
  UserAddressService,
  UserPaymentService,
  PaymentDetails,
  DeliveryMode,
  CheckoutPaymentService,
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
    protected checkoutPaymentService: CheckoutPaymentService,
    protected userPaymentService: UserPaymentService,
    protected checkoutDetailsService: CheckoutDetailsService,
    protected checkoutConfigService: CheckoutConfigService
  ) {
    this.setShippingAddress();
    this.setPaymentMethod();
    this.setDeliveryMode();
  }

  private setShippingAddress() {
    this.shippingAddress$ = this.checkoutDetailsService
      .getDeliveryAddress()
      .pipe(
        switchMap((deliveryAddress: Address) => {
          if (deliveryAddress && Object.keys(deliveryAddress).length) {
            return of(true);
          } else {
            return of(false).pipe(
              tap(() => this.userAddressService.loadAddresses()),
              switchMap(() =>
                this.userAddressService.getAddressesSuccessLoaded()
              ),
              skipWhile(success => !success),
              switchMap(() => this.userAddressService.getAddresses()),
              map((addresses: Address[]) => {
                const defaultAddress =
                  addresses.find(address => address.defaultAddress) ||
                  addresses[0];
                if (defaultAddress) {
                  this.checkoutDeliveryService.setDeliveryAddress(
                    defaultAddress
                  );
                }
                return Boolean(defaultAddress);
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
          return of(true);
        } else {
          return of(false).pipe(
            tap(() => this.userPaymentService.loadPaymentMethods()),
            switchMap(() =>
              this.userPaymentService.getPaymentMethodsLoadedSuccess()
            ),
            skipWhile(success => !success),
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

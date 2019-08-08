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
    this.userAddressService.loadAddresses();
    this.shippingAddressSet$ = this.userAddressService
      .getAddressesLoadedSuccess()
      .pipe(
        filter(Boolean),
        switchMap(() => this.userAddressService.getAddresses()),
        map(
          (addresses: Address[]) =>
            addresses.find(address => address.defaultAddress) || addresses[0]
        ),
        tap(defaultAddress =>
          defaultAddress
            ? this.checkoutDeliveryService.setDeliveryAddress(defaultAddress)
            : this.checkoutService.clearCheckoutStep(1)
        ),
        switchMap(() => this.checkoutDetailsService.getDeliveryAddress()),
        map(Boolean)
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
    this.setDeliveryMode();
    this.setPaymentMethod();

    return combineLatest([
      this.shippingAddressSet$,
      this.deliveryModeSet$,
      this.paymentMethodSet$,
    ]).pipe(
      tap(console.log),
      map(
        ([shippingAddressSet, deliveryModeSet, paymentMethodSet]) =>
          shippingAddressSet && deliveryModeSet && paymentMethodSet
      )
    );
  }
}

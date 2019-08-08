import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

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
  shippingAddressSet$;
  deliveryModeSet$;
  paymentMethodSet$;

  constructor(
    protected userAddressService: UserAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected checkoutPaymentService: CheckoutPaymentService,
    protected userPaymentService: UserPaymentService,
    protected checkoutConfigService: CheckoutConfigService
  ) {}

  protected setShippingAddress() {
    this.userAddressService.loadAddresses();
    this.shippingAddressSet$ = this.userAddressService
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

  public checkoutDetailsSet() {
    this.setShippingAddress();
    this.setDeliveryMode();
    this.setPaymentMethod();

    return combineLatest([
      this.shippingAddressSet$,
      this.deliveryModeSet$,
      this.paymentMethodSet$,
    ]).pipe(
      map(
        ([shippingAddressSet, deliveryModeSet, paymentMethodSet]) =>
          shippingAddressSet && deliveryModeSet && paymentMethodSet
      )
    );
  }
}

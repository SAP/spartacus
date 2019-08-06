import { Injectable } from '@angular/core';

import { CheckoutDetailsService } from './checkout-details.service';
import { map } from 'rxjs/operators';
import {
  Address,
  // CheckoutDeliveryService,
  // CheckoutPaymentService,
  UserAddressService,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ExpressCheckoutService {
  shippingAddress$;
  // paymentMethod$;
  // deliveryMode$;

  constructor(
    // private checkoutDeliveryService: CheckoutDeliveryService,
    private userAddressService: UserAddressService,
    // private checkoutPaymentService: CheckoutPaymentService,
    private checkoutDetailsService: CheckoutDetailsService
  ) {
    this.shippingAddress$ = this.checkoutDetailsService
      .getDeliveryAddress()
      .pipe(
        map((deliveryAddress: Address) => {
          console.log('1', deliveryAddress);
          if (deliveryAddress && Object.keys(deliveryAddress).length) {
            console.log('2', deliveryAddress);
            return deliveryAddress;
          } else {
            console.log('3', deliveryAddress);
            return this.userAddressService.getAddresses().pipe(
              map((addresses: Address[]) => {
                console.log('4', addresses);
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
}

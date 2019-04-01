import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

import {
  CheckoutService,
  Address,
  CartService,
  UserService,
  OrderEntry,
  Cart,
  DeliveryMode,
  Country,
  PaymentDetails,
} from '@spartacus/core';
import { Card } from '../../../../ui/components/card/card.component';

@Component({
  selector: 'cx-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewSubmitComponent implements OnInit {
  entries$: Observable<OrderEntry[]>;
  cart$: Observable<Cart>;
  deliveryMode$: Observable<DeliveryMode>;
  countryName$: Observable<string>;
  deliveryAddress$: Observable<Address>;
  paymentDetails$: Observable<PaymentDetails>;

  constructor(
    protected checkoutService: CheckoutService,
    protected userService: UserService,
    protected cartService: CartService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService.getEntries();
    this.deliveryAddress$ = this.checkoutService.getDeliveryAddress();
    this.paymentDetails$ = this.checkoutService.getPaymentDetails();

    this.deliveryMode$ = this.checkoutService.getSelectedDeliveryMode().pipe(
      tap((selected: DeliveryMode) => {
        if (selected === null) {
          this.checkoutService.loadSupportedDeliveryModes();
        }
      })
    );

    this.countryName$ = this.deliveryAddress$.pipe(
      switchMap((address: Address) =>
        this.userService.getCountry(address.country.isocode)
      ),
      tap((country: Country) => {
        if (country === null) {
          this.userService.loadDeliveryCountries();
        }
      }),
      map((country: Country) => country.name)
    );
  }

  getShippingAddressCard(deliveryAddress: Address, countryName: string): Card {
    if (!countryName) {
      countryName = deliveryAddress.country.isocode;
    }

    let region = '';
    if (deliveryAddress.region && deliveryAddress.region.isocode) {
      region = deliveryAddress.region.isocode + ', ';
    }

    return {
      title: 'Ship To',
      textBold: deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
      text: [
        deliveryAddress.line1,
        deliveryAddress.line2,
        deliveryAddress.town + ', ' + region + countryName,
        deliveryAddress.postalCode,
        deliveryAddress.phone,
      ],
    };
  }

  getDeliveryModeCard(deliveryMode: DeliveryMode): Card {
    if (deliveryMode) {
      return {
        title: 'Shipping Method',
        textBold: deliveryMode.name,
        text: [deliveryMode.description],
      };
    }
  }

  getPaymentMethodCard(paymentDetails: PaymentDetails): Card {
    return {
      title: 'Payment',
      textBold: paymentDetails.accountHolderName,
      text: [
        paymentDetails.cardNumber,
        'Expires: ' +
          paymentDetails.expiryMonth +
          '/' +
          paymentDetails.expiryYear,
      ],
    };
  }
}

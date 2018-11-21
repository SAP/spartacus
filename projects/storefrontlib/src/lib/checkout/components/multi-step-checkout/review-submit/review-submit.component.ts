import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from '../../../../user/facade/user.service';
import { CheckoutService } from '../../../facade/checkout.service';
import { CartService } from '../../../../cart/services/cart.service';
import { Address } from '../../../models/address-model';
import { Card } from '../../../../ui/components/card/card.component';

@Component({
  selector: 'cx-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewSubmitComponent implements OnInit {
  @Input()
  deliveryAddress: Address;
  @Input()
  shippingMethod: string;
  @Input()
  paymentDetails: any;

  entries$: Observable<any>;
  cart$: Observable<any>;
  deliveryMode$: Observable<any>;
  countryName$: Observable<any>;

  constructor(
    protected checkoutService: CheckoutService,
    protected userService: UserService,
    protected cartService: CartService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.activeCart$;
    this.entries$ = this.cartService.entries$;

    this.deliveryMode$ = this.checkoutService.selectedDeliveryMode$.pipe(
      tap(selected => {
        if (selected === null) {
          this.checkoutService.loadSupportedDeliveryModes();
        }
      })
    );

    this.countryName$ = this.userService
      .getCountry(this.deliveryAddress.country.isocode)
      .pipe(
        tap(country => {
          if (country === null) {
            this.userService.loadDeliveryCountries();
          }
        })
      );
  }

  getShippingAddressCard(countryName): Card {
    if (!countryName) {
      countryName = this.deliveryAddress.country.isocode;
    }

    let region = '';
    if (this.deliveryAddress.region && this.deliveryAddress.region.isocode) {
      region = this.deliveryAddress.region.isocode + ', ';
    }

    return {
      title: 'Ship To',
      textBold:
        this.deliveryAddress.firstName + ' ' + this.deliveryAddress.lastName,
      text: [
        this.deliveryAddress.line1,
        this.deliveryAddress.line2,
        this.deliveryAddress.town + ', ' + region + countryName,
        this.deliveryAddress.postalCode,
        this.deliveryAddress.phone
      ]
    };
  }

  getShippingMethodCard(deliveryMode): Card {
    if (deliveryMode) {
      return {
        title: 'Shipping Method',
        textBold: this.shippingMethod,
        text: [deliveryMode.description]
      };
    }
  }

  getPaymentMethodCard(): Card {
    return {
      title: 'Payment',
      textBold: this.paymentDetails.accountHolderName,
      text: [
        this.paymentDetails.cardNumber,
        'Expires: ' +
          this.paymentDetails.expiryMonth +
          '/' +
          this.paymentDetails.expiryYear
      ]
    };
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CheckoutService } from '../../services/checkout.service';
import { Card } from '../../../ui/components/card/card.component';

@Component({
  selector: 'y-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  order: any;
  cart: any;

  constructor(protected checkoutService: CheckoutService) {}

  ngOnInit() {
    this.order = this.checkoutService.orderDetails;
    this.cart = {
      totalPrice: this.order.totalPrice,
      totalDiscounts: this.order.totalDiscounts,
      totalTax: this.order.totalTax,
      totalPriceWithTax: this.order.totalPriceWithTax
    };
  }

  ngOnDestroy() {
    this.checkoutService.orderDetails = undefined;
  }

  getAddressCardContent(deliveryAddress: any): Card {
    return {
      textBold: deliveryAddress.firstName + ' ' + deliveryAddress.lastName,
      text: [
        deliveryAddress.line1,
        deliveryAddress.line2,
        `${deliveryAddress.town}, ${deliveryAddress.country.isocode}, ${
          deliveryAddress.postalCode
        }`,
        deliveryAddress.phone
      ]
    };
  }

  getShippingCardContent(deliveryMode: any): Card {
    return {
      textBold: `Shipping method`,
      text: [deliveryMode.name, deliveryMode.description]
    };
  }

  getPaymentInfoCardContent(paymentInfo: any): Card {
    return {
      textBold: paymentInfo.accountHolderName,
      text: [
        paymentInfo.cardNumber,
        `Expires in ${paymentInfo.expiryMonth} / ${paymentInfo.expiryYear}`
      ]
    };
  }

  getShippingMethodCardContent(deliveryMode: any): Card {
    return {
      textBold: deliveryMode.name,
      text: [deliveryMode.description]
    };
  }
}

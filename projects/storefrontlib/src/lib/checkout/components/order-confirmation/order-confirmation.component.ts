import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';

import { CheckoutService } from '../../facade/checkout.service';
import { Card } from '../../../ui/components/card/card.component';

@Component({
  selector: 'cx-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  order$: Observable<any>;

  constructor(protected checkoutService: CheckoutService) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }

  getAddressCardContent(deliveryAddress: any): Card {
    return {
      title: 'Ship To',
      textBold: `${deliveryAddress.firstName} ${deliveryAddress.lastName}`,
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
      title: 'Shipping Method',
      textBold: deliveryMode.name,
      text: [deliveryMode.description]
    };
  }

  getBillingAddressCardContent(billingAddress: any): Card {
    return {
      title: 'Bill To',
      textBold: `${billingAddress.firstName} ${billingAddress.lastName}`,
      text: [
        billingAddress.line1,
        billingAddress.line2,
        `${billingAddress.town}, ${billingAddress.country.isocode}, ${
          billingAddress.postalCode
        }`,
        billingAddress.phone
      ]
    };
  }

  getPaymentInfoCardContent(paymentInfo: any): Card {
    return {
      title: 'Payment',
      textBold: paymentInfo.accountHolderName,
      text: [
        paymentInfo.cardNumber,
        `Expires in ${paymentInfo.expiryMonth} / ${paymentInfo.expiryYear}`
      ]
    };
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  Order,
  CheckoutService,
  Address,
  PaymentDetails,
  DeliveryMode
} from '@spartacus/core';

import { Observable } from 'rxjs';

import { Card } from '../../../ui/components/card/card.component';

@Component({
  selector: 'cx-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  order$: Observable<Order>;

  constructor(protected checkoutService: CheckoutService) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }

  getAddressCardContent(deliveryAddress: Address): Card {
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

  getShippingCardContent(deliveryMode: DeliveryMode): Card {
    return {
      title: 'Shipping Method',
      textBold: deliveryMode.name,
      text: [deliveryMode.description]
    };
  }

  getBillingAddressCardContent(billingAddress: Address): Card {
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

  getPaymentInfoCardContent(paymentInfo: PaymentDetails): Card {
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

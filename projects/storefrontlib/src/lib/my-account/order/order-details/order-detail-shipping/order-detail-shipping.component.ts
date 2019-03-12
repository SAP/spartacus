import { Component, OnInit } from '@angular/core';
import {
  Order,
  Address,
  PaymentDetails,
  DeliveryMode,
  UserService
} from '@spartacus/core';

import { Observable } from 'rxjs';
import { Card } from '../../../../ui/components/card/card.component';

@Component({
  selector: 'cx-order-details-shipping',
  templateUrl: './order-detail-shipping.component.html',
  styleUrls: ['./order-detail-shipping.component.scss']
})
export class OrderDetailShippingComponent implements OnInit {
  constructor(protected userService: UserService) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.userService.getOrderDetails();
  }

  getAddressCardContent(address: Address): Card {
    return {
      title: 'Ship to',
      textBold: `${address.firstName} ${address.lastName}`,
      text: [
        address.line1,
        address.line2,
        `${address.town}, ${address.country.isocode}, ${address.postalCode}`,
        address.phone
      ]
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

  getPaymentCardContent(payment: PaymentDetails): Card {
    return {
      title: 'Payment',
      textBold: payment.accountHolderName,
      text: [
        payment.cardType.name,
        payment.cardNumber,
        `Expires: ${payment.expiryMonth} / ${payment.expiryYear}`
      ]
    };
  }

  getShippingMethodCardContent(shipping: DeliveryMode): Card {
    return {
      title: 'Shipping Method',
      textBold: shipping.name,
      text: [shipping.description]
    };
  }
}

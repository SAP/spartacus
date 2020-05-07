import { Component, OnInit } from '@angular/core';
import {
  Address,
  DeliveryMode,
  Order,
  PaymentDetails,
  TranslationService,
} from '@spartacus/core';
import { Observable, combineLatest } from 'rxjs';
import { Card } from '../../../../../shared/components/card/card.component';
import { OrderDetailsService } from '../order-details.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-details-shipping',
  templateUrl: './order-detail-shipping.component.html',
})
export class OrderDetailShippingComponent implements OnInit {
  constructor(
    private orderDetailsService: OrderDetailsService,
    private translation: TranslationService
  ) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }

  getAddressCardContent(address: Address): Observable<Card> {
    return combineLatest([
      this.translation.translate('addressCard.shipTo'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: `${address.firstName} ${address.lastName}`,
          text: [
            address.line1,
            address.line2,
            `${address.town}, ${address.country.isocode}, ${address.postalCode}`,
            address.phone,
          ],
        };
      })
    );
  }

  getBillingAddressCardContent(billingAddress: Address): Observable<Card> {
    return combineLatest([
      this.translation.translate('addressCard.billTo'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: `${billingAddress.firstName} ${billingAddress.lastName}`,
          text: [
            billingAddress.line1,
            billingAddress.line2,
            `${billingAddress.town}, ${billingAddress.country.isocode}, ${billingAddress.postalCode}`,
            billingAddress.phone,
          ],
        };
      })
    );
  }

  getPaymentCardContent(payment: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentForm.payment'),
      this.translation.translate('paymentCard.expires', {
        month: payment.expiryMonth,
        year: payment.expiryYear,
      }),
    ]).pipe(
      map(([textTitle, textExpires]) => {
        return {
          title: textTitle,
          textBold: payment.accountHolderName,
          text: [payment.cardType.name, payment.cardNumber, textExpires],
        };
      })
    );
  }

  getShippingMethodCardContent(shipping: DeliveryMode): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutShipping.shippingMethod'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: shipping.name,
          text: [shipping.description],
        };
      })
    );
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import {
  Order,
  CheckoutService,
  Address,
  PaymentDetails,
  DeliveryMode,
  TranslationService,
} from '@spartacus/core';

import { Observable, combineLatest } from 'rxjs';

import { Card } from '../../../ui/components/card/card.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  order$: Observable<Order>;

  constructor(
    protected checkoutService: CheckoutService,
    private translation: TranslationService
  ) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }

  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }

  getAddressCardContent(deliveryAddress: Address): Observable<Card> {
    return combineLatest([
      this.translation.translate('addressCard.shipTo'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: `${deliveryAddress.firstName} ${deliveryAddress.lastName}`,
          text: [
            deliveryAddress.line1,
            deliveryAddress.line2,
            `${deliveryAddress.town}, ${deliveryAddress.country.isocode}, ${
              deliveryAddress.postalCode
            }`,
            deliveryAddress.phone,
          ],
        };
      })
    );
  }

  getDeliveryModeCardContent(deliveryMode: DeliveryMode): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutShipping.shippingMethod'),
    ]).pipe(
      map(([textTitle]) => {
        return {
          title: textTitle,
          textBold: deliveryMode.name,
          text: [deliveryMode.description],
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
            `${billingAddress.town}, ${billingAddress.country.isocode}, ${
              billingAddress.postalCode
            }`,
            billingAddress.phone,
          ],
        };
      })
    );
  }

  getPaymentInfoCardContent(payment: PaymentDetails): Observable<Card> {
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
}

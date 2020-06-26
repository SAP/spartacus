import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Address,
  DeliveryMode,
  Order,
  PaymentDetails,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from '../../../../../shared/components/card/card.component';

@Component({
  selector: 'cx-order-shipping',
  templateUrl: './order-shipping.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderShippingComponent {
  @Input()
  order: Order;

  constructor(protected translation: TranslationService) {}

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

  getAccountPaymentCardContent(order: Order): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentForm.payment'),
      this.translation.translate('orderDetails.payByAccount'),
      this.translation.translate('orderDetails.purchaseOrderId'),
      this.translation.translate('orderDetails.costCenter'),
      this.translation.translate('orderDetails.unit'),
    ]).pipe(
      map(
        ([
          textTitle,
          textPayByAccount,
          textPurchaseOrderId,
          textCostCenter,
          textUnit,
        ]) => {
          return {
            title: textTitle,
            textBold: textPayByAccount,
            text: [
              `${textPurchaseOrderId}: ${order.purchaseOrderNumber}`,
              `${textCostCenter}: ${order.costCenter.name}`,
              `${textUnit}: ${order.costCenter.unit.name}`,
            ],
          };
        }
      )
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

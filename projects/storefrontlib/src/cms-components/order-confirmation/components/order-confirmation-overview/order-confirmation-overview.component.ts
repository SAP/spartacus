import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Address,
  CheckoutService,
  DeliveryMode,
  Order,
  PaymentDetails,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Card } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'cx-order-confirmation-overview',
  templateUrl: './order-confirmation-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationOverviewComponent implements OnInit, OnDestroy {
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
    return this.translation.translate('addressCard.shipTo').pipe(
      filter(() => Boolean(deliveryAddress)),
      map((textTitle) => ({
        title: textTitle,
        textBold: `${deliveryAddress.firstName} ${deliveryAddress.lastName}`,
        text: [
          deliveryAddress.line1,
          deliveryAddress.line2,
          `${deliveryAddress.town}, ${deliveryAddress.country.isocode}, ${deliveryAddress.postalCode}`,
          deliveryAddress.phone,
        ],
      }))
    );
  }

  getDeliveryModeCardContent(deliveryMode: DeliveryMode): Observable<Card> {
    return this.translation.translate('checkoutShipping.shippingMethod').pipe(
      filter(() => Boolean(deliveryMode)),
      map((textTitle) => ({
        title: textTitle,
        textBold: deliveryMode.name,
        text: [deliveryMode.description],
      }))
    );
  }

  getBillingAddressCardContent(billingAddress: Address): Observable<Card> {
    return this.translation.translate('addressCard.billTo').pipe(
      filter(() => Boolean(billingAddress)),
      map((textTitle) => ({
        title: textTitle,
        textBold: `${billingAddress.firstName} ${billingAddress.lastName}`,
        text: [
          billingAddress.line1,
          billingAddress.line2,
          `${billingAddress.town}, ${billingAddress.country.isocode}, ${billingAddress.postalCode}`,
          billingAddress.phone,
        ],
      }))
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

  getPaymentInfoCardContent(payment: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentForm.payment'),
      this.translation.translate('paymentCard.expires', {
        month: Boolean(payment) ? payment.expiryMonth : '',
        year: Boolean(payment) ? payment.expiryYear : '',
      }),
    ]).pipe(
      filter(() => Boolean(payment)),
      map(([textTitle, textExpires]) => ({
        title: textTitle,
        textBold: payment.accountHolderName,
        text: [payment.cardNumber, textExpires],
      }))
    );
  }
}

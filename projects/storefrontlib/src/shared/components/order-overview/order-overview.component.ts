import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Address,
  CostCenter,
  DeliveryMode,
  PaymentDetails,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Card } from '../card/card.component';

@Component({
  selector: 'cx-order-overview',
  templateUrl: './order-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderOverviewComponent {
  order: any;

  @Input('order')
  set setOrder(order: any) {
    this.order = order;
  }

  constructor(protected translation: TranslationService) {}

  getReplenishmentCodeCardContent(orderCode: string): Observable<Card> {
    return this.translation
      .translate('checkoutOrderConfirmation.replenishmentNumber')
      .pipe(
        filter(() => Boolean(orderCode)),
        map((textTitle) => ({
          title: textTitle,
          text: [orderCode],
        }))
      );
  }

  getReplenishmentActiveCardContent(active: boolean): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutOrderConfirmation.status'),
      this.translation.translate('checkoutOrderConfirmation.active'),
      this.translation.translate('checkoutOrderConfirmation.cancelled'),
    ]).pipe(
      map(([textTitle, textActive, textCancelled]) => ({
        title: textTitle,
        text: [active ? textActive : textCancelled],
      }))
    );
  }

  getReplenishmentStartOnCardContent(isoDate: string): Observable<Card> {
    return this.translation.translate('checkoutReview.startOn').pipe(
      filter(() => Boolean(isoDate)),
      map((textTitle) => {
        const date = this.getDate(new Date(isoDate));

        return {
          title: textTitle,
          text: [date],
        };
      })
    );
  }

  getReplenishmentFrequencyCardContent(frequency: string): Observable<Card> {
    return this.translation
      .translate('checkoutOrderConfirmation.frequency')
      .pipe(
        filter(() => Boolean(frequency)),
        map((textTitle) => ({
          title: textTitle,
          text: [frequency],
        }))
      );
  }

  getReplenishmentNextDateCardContent(isoDate: string): Observable<Card> {
    return this.translation
      .translate('checkoutOrderConfirmation.nextOrderDate')
      .pipe(
        filter(() => Boolean(isoDate)),
        map((textTitle) => {
          const date = this.getDate(new Date(isoDate));

          return {
            title: textTitle,
            text: [date],
          };
        })
      );
  }

  getOrderCodeCardContent(orderCode: string): Observable<Card> {
    return this.translation
      .translate('checkoutOrderConfirmation.orderNumber')
      .pipe(
        filter(() => Boolean(orderCode)),
        map((textTitle) => ({
          title: textTitle,
          text: [orderCode],
        }))
      );
  }

  getOrderCurrentDateCardContent(isoDate?: string): Observable<Card> {
    return this.translation
      .translate('checkoutOrderConfirmation.placedOn')
      .pipe(
        map((textTitle) => {
          let date: string;

          if (Boolean(isoDate)) {
            date = this.getDate(new Date(isoDate));
          } else {
            date = this.getDate(new Date());
          }

          return {
            title: textTitle,
            text: [date],
          };
        })
      );
  }

  getOrderStatusCardContent(status: string): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutOrderConfirmation.status'),
      this.translation.translate('orderDetails.statusDisplay', {
        context: status,
      }),
    ]).pipe(
      map(([textTitle, textStatus]) => ({
        title: textTitle,
        text: [textStatus],
      }))
    );
  }

  getPurchaseOrderNumber(poNumber: string): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutReview.poNumber'),
      this.translation.translate('checkoutPO.noPoNumber'),
    ]).pipe(
      map(([textTitle, noneTextTitle]) => ({
        title: textTitle,
        text: [poNumber ? poNumber : noneTextTitle],
      }))
    );
  }

  getMethodOfPaymentCardContent(
    hasPaymentInfo: PaymentDetails
  ): Observable<Card> {
    return combineLatest([
      this.translation.translate('checkoutProgress.methodOfPayment'),
      this.translation.translate('paymentTypes.paymentType_ACCOUNT'),
      this.translation.translate('paymentTypes.paymentType_CARD'),
    ]).pipe(
      map(([textTitle, textAccount, textCard]) => ({
        title: textTitle,
        text: [Boolean(hasPaymentInfo) ? textCard : textAccount],
      }))
    );
  }

  getCostCenterCardContent(costCenter: CostCenter): Observable<Card> {
    return this.translation.translate('checkoutPO.costCenter').pipe(
      filter(() => Boolean(costCenter)),
      map((textTitle) => ({
        title: textTitle,
        textBold: costCenter?.name,
        text: ['(' + costCenter?.unit?.name + ')'],
      }))
    );
  }

  getAddressCardContent(deliveryAddress: Address): Observable<Card> {
    return this.translation.translate('addressCard.shipTo').pipe(
      filter(() => Boolean(deliveryAddress)),
      map((textTitle) => ({
        title: textTitle,
        textBold: `${deliveryAddress.firstName} ${deliveryAddress.lastName}`,
        text: [deliveryAddress.formattedAddress, deliveryAddress.country.name],
      }))
    );
  }

  getDeliveryModeCardContent(deliveryMode: DeliveryMode): Observable<Card> {
    return this.translation.translate('checkoutShipping.shippingMethod').pipe(
      filter(() => Boolean(deliveryMode)),
      map((textTitle) => ({
        title: textTitle,
        textBold: deliveryMode.name,
        text: [
          deliveryMode.description,
          deliveryMode.deliveryCost?.formattedValue
            ? deliveryMode.deliveryCost?.formattedValue
            : '',
        ],
      }))
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

  getBillingAddressCardContent(billingAddress: Address): Observable<Card> {
    return this.translation.translate('paymentForm.billingAddress').pipe(
      filter(() => Boolean(billingAddress)),
      map((textTitle) => ({
        title: textTitle,
        textBold: `${billingAddress.firstName} ${billingAddress.lastName}`,
        text: [billingAddress.formattedAddress, billingAddress.country.name],
      }))
    );
  }

  private getDate(givenDate: Date): string {
    const date = givenDate.toDateString().split(' ');

    const month = date[1];
    const day = date[2];
    const year = date[3];

    return month + ' ' + day + ' ' + year;
  }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { DeliveryMode, PaymentDetails } from '@spartacus/cart/base/root';
import {
  Address,
  CmsOrderDetailOverviewComponent,
  CostCenter,
  FeatureConfigService,
  TranslationService,
} from '@spartacus/core';
import { Card, CmsComponentData } from '@spartacus/storefront';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-overview',
  templateUrl: './order-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderOverviewComponent {
  order$: Observable<any> = this.orderDetailsService.getOrderDetails().pipe(
    map((order) => {
      // const o = { ...order };
      if (order?.paymentInfo && !order.paymentInfo?.billingAddress) {
        const b = {
          title: 'My Addr',
          formattedAddress: 'my formatted addr',
          firstName: 'my first name',
          lastName: 'my lastaneme',
        };
        return {
          ...order,
          paymentInfo: { ...order.paymentInfo, billingAddress: b },
        };
      }
      return { ...order };
    })
  );

  isOrderLoading$: Observable<boolean> =
    typeof this.orderDetailsService.isOrderDetailsLoading === 'function'
      ? this.orderDetailsService.isOrderDetailsLoading()
      : of(false);

  simple$: Observable<boolean | undefined> = this.component.data$.pipe(
    map((data) => data.simple)
  );

  constructor(
    translation: TranslationService,
    orderDetailsService: OrderDetailsService,
    component: CmsComponentData<CmsOrderDetailOverviewComponent>,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    featureConfig?: FeatureConfigService
  );

  /**
   * @deprecated since 6.3
   */
  constructor(
    translation: TranslationService,
    orderDetailsService: OrderDetailsService,
    component: CmsComponentData<CmsOrderDetailOverviewComponent>
  );

  constructor(
    protected translation: TranslationService,
    protected orderDetailsService: OrderDetailsService,
    protected component: CmsComponentData<CmsOrderDetailOverviewComponent>,
    // TODO:(CXSPA-3330) for next major release remove feature level
    @Optional() protected featureConfig?: FeatureConfigService
  ) {}

  getReplenishmentCodeCardContent(orderCode: string): Observable<Card> {
    return this.translation.translate('orderDetails.replenishmentId').pipe(
      filter(() => Boolean(orderCode)),
      map((textTitle) => ({
        title: textTitle,
        text: [orderCode],
      }))
    );
  }

  getReplenishmentActiveCardContent(active: boolean): Observable<Card> {
    return combineLatest([
      this.translation.translate('orderDetails.status'),
      this.translation.translate('orderDetails.active'),
      this.translation.translate('orderDetails.cancelled'),
    ]).pipe(
      map(([textTitle, textActive, textCancelled]) => ({
        title: textTitle,
        text: [active ? textActive : textCancelled],
      }))
    );
  }

  getReplenishmentStartOnCardContent(isoDate: string | null): Observable<Card> {
    return this.translation.translate('orderDetails.startOn').pipe(
      filter(() => Boolean(isoDate)),
      map((textTitle) => {
        return {
          title: textTitle,
          text: [isoDate],
        } as Card;
      })
    );
  }

  getReplenishmentFrequencyCardContent(frequency: string): Observable<Card> {
    return this.translation.translate('orderDetails.frequency').pipe(
      filter(() => Boolean(frequency)),
      map((textTitle) => ({
        title: textTitle,
        text: [frequency],
      }))
    );
  }

  getReplenishmentNextDateCardContent(
    isoDate: string | null
  ): Observable<Card> {
    return this.translation.translate('orderDetails.nextOrderDate').pipe(
      filter(() => Boolean(isoDate)),
      map((textTitle) => {
        return {
          title: textTitle,
          text: [isoDate],
        } as Card;
      })
    );
  }

  getOrderCodeCardContent(orderCode: string): Observable<Card> {
    return this.translation.translate('orderDetails.orderNumber').pipe(
      filter(() => Boolean(orderCode)),
      map((textTitle) => ({
        title: textTitle,
        text: [orderCode],
      }))
    );
  }

  getOrderCurrentDateCardContent(isoDate: string | null): Observable<Card> {
    return this.translation.translate('orderDetails.placedOn').pipe(
      filter(() => Boolean(isoDate)),
      map((textTitle) => {
        return {
          title: textTitle,
          text: [isoDate],
        } as Card;
      })
    );
  }

  getOrderStatusCardContent(status: string): Observable<Card> {
    return combineLatest([
      this.translation.translate('orderDetails.status'),
      this.translation.translate('orderDetails.statusDisplay_' + status),
    ]).pipe(
      map(([textTitle, textStatus]) => ({
        title: textTitle,
        text: [textStatus],
      }))
    );
  }

  getPurchaseOrderNumber(poNumber: string): Observable<Card> {
    return combineLatest([
      this.translation.translate('orderDetails.purchaseOrderNumber'),
      this.translation.translate('orderDetails.emptyPurchaseOrderId'),
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
      this.translation.translate('orderDetails.methodOfPayment'),
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
    return this.translation.translate('orderDetails.costCenter').pipe(
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
      map((textTitle) => {
        const formattedAddress = this.normalizeFormattedAddress(
          deliveryAddress.formattedAddress ?? ''
        );

        return {
          title: textTitle,
          textBold: `${deliveryAddress.firstName} ${deliveryAddress.lastName}`,
          text: [formattedAddress, deliveryAddress.country?.name],
        } as Card;
      })
    );
  }

  getDeliveryModeCardContent(deliveryMode: DeliveryMode): Observable<Card> {
    return this.translation.translate('orderDetails.shippingMethod').pipe(
      filter(() => Boolean(deliveryMode)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            textBold: deliveryMode.name,
            text: [
              deliveryMode.description,
              deliveryMode.deliveryCost?.formattedValue
                ? deliveryMode.deliveryCost?.formattedValue
                : '',
            ],
          } as Card)
      )
    );
  }

  getPaymentInfoCardContent(payment: PaymentDetails): Observable<Card | null> {
    if (
      this.featureConfig?.isLevel('6.3') &&
      !this.isPaymentInfoCardFull(payment)
    ) {
      return of(null);
    }
    return combineLatest([
      this.translation.translate('paymentForm.payment'),
      this.translation.translate('paymentCard.expires', {
        month: Boolean(payment) ? payment.expiryMonth : '',
        year: Boolean(payment) ? payment.expiryYear : '',
      }),
    ]).pipe(
      filter(() => Boolean(payment)),
      map(
        ([textTitle, textExpires]) =>
          ({
            title: textTitle,
            textBold: payment.accountHolderName,
            text: [payment.cardNumber, textExpires],
          } as Card)
      )
    );
  }

  isPaymentInfoCardFull(payment: PaymentDetails): boolean {
    return (
      !!payment?.cardNumber && !!payment?.expiryMonth && !!payment?.expiryYear
    );
  }

  getBillingAddressCardContent(billingAddress: Address): Observable<Card> {
    return this.translation.translate('paymentForm.billingAddress').pipe(
      filter(() => Boolean(billingAddress)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            textBold: `${billingAddress.firstName} ${billingAddress.lastName}`,
            text: [
              billingAddress.formattedAddress,
              billingAddress.country?.name,
            ],
          } as Card)
      )
    );
  }

  private normalizeFormattedAddress(formattedAddress: string): string {
    const addresses = formattedAddress
      .split(',')
      .map((address) => address.trim());

    return addresses.filter(Boolean).join(', ');
  }
}

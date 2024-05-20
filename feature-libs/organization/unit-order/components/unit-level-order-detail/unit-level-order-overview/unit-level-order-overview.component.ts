/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import {
  Address,
  B2BUser,
  CostCenter,
  PaymentDetails,
  TranslationService,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Card } from '@spartacus/storefront';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UnitLevelOrderDetailService } from '../unit-level-order-detail.service';

@Component({
  selector: 'cx-unit-level-order-overview',
  templateUrl: './unit-level-order-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitLevelOrderOverviewComponent implements OnInit {
  constructor(
    protected translation: TranslationService,
    protected unitLevelOrderDetailsService: UnitLevelOrderDetailService
  ) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.unitLevelOrderDetailsService.getOrderDetails();
  }

  getOrderCodeCardContent(orderCode: string | undefined): Observable<Card> {
    return this.translation.translate('orderDetails.orderNumber').pipe(
      filter(() => Boolean(orderCode)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            text: [orderCode],
          } as Card)
      )
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

  getOrderStatusCardContent(status: string | undefined): Observable<Card> {
    return combineLatest([
      this.translation.translate('orderDetails.status'),
      status
        ? this.translation.translate('orderDetails.statusDisplay_' + status)
        : of(''),
    ]).pipe(
      filter(() => Boolean(status)),
      map(
        ([textTitle, textStatus]) =>
          ({
            title: textTitle,
            text: [textStatus],
          } as Card)
      )
    );
  }

  getPurchaseOrderNumber(poNumber: string | undefined): Observable<Card> {
    return combineLatest([
      this.translation.translate('orderDetails.purchaseOrderNumber'),
      this.translation.translate('orderDetails.emptyPurchaseOrderId'),
    ]).pipe(
      filter(() => Boolean(poNumber)),
      map(([textTitle, noneTextTitle]) => ({
        title: textTitle,
        text: [poNumber ? poNumber : noneTextTitle],
      }))
    );
  }

  getMethodOfPaymentCardContent(
    hasPaymentInfo: PaymentDetails | undefined
  ): Observable<Card> {
    return combineLatest([
      this.translation.translate('orderDetails.methodOfPayment'),
      this.translation.translate('paymentTypes.paymentType_ACCOUNT'),
      this.translation.translate('paymentTypes.paymentType_CARD'),
    ]).pipe(
      filter(() => Boolean(hasPaymentInfo)),
      map(([textTitle, textAccount, textCard]) => ({
        title: textTitle,
        text: [Boolean(hasPaymentInfo) ? textCard : textAccount],
      }))
    );
  }

  getCostCenterCardContent(
    costCenter: CostCenter | undefined
  ): Observable<Card> {
    return this.translation.translate('orderDetails.costCenter').pipe(
      filter(() => Boolean(costCenter)),
      map((textTitle) => ({
        title: textTitle,
        textBold: costCenter?.name,
        text: [`(${costCenter?.unit?.name})`],
      }))
    );
  }

  getAddressCardContent(
    deliveryAddress: Address | undefined
  ): Observable<Card> {
    return this.translation.translate('addressCard.shipTo').pipe(
      filter(() => Boolean(deliveryAddress)),
      map((textTitle) => {
        const formattedAddress = this.normalizeFormattedAddress(
          deliveryAddress?.formattedAddress ?? ''
        );

        return {
          title: textTitle,
          textBold: `${deliveryAddress?.firstName} ${deliveryAddress?.lastName}`,
          text: [formattedAddress, deliveryAddress?.country?.name],
        } as Card;
      })
    );
  }

  getDeliveryModeCardContent(
    deliveryMode: DeliveryMode | undefined
  ): Observable<Card> {
    return this.translation.translate('orderDetails.shippingMethod').pipe(
      filter(() => Boolean(deliveryMode)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            textBold: deliveryMode?.name,
            text: [
              deliveryMode?.description,
              deliveryMode?.deliveryCost?.formattedValue
                ? deliveryMode.deliveryCost?.formattedValue
                : '',
            ],
          } as Card)
      )
    );
  }

  getPaymentInfoCardContent(
    payment: PaymentDetails | undefined
  ): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentForm.payment'),
      this.translation.translate('paymentCard.expires', {
        month: payment ? payment.expiryMonth : '',
        year: payment ? payment.expiryYear : '',
      }),
    ]).pipe(
      filter(() => Boolean(payment)),
      map(
        ([textTitle, textExpires]) =>
          ({
            title: textTitle,
            textBold: payment?.accountHolderName,
            text: [payment?.cardNumber, textExpires],
          } as Card)
      )
    );
  }

  getBillingAddressCardContent(
    billingAddress: Address | undefined
  ): Observable<Card> {
    return this.translation.translate('paymentForm.billingAddress').pipe(
      filter(() => Boolean(billingAddress)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            textBold: `${billingAddress?.firstName} ${billingAddress?.lastName}`,
            text: [
              billingAddress?.formattedAddress,
              billingAddress?.country?.name,
            ],
          } as Card)
      )
    );
  }

  getBuyerNameCardContent(customer: B2BUser | undefined): Observable<Card> {
    return this.translation.translate('unitLevelOrderDetails.buyer').pipe(
      filter(() => Boolean(customer)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            text: [customer?.name, `(${customer?.email})`],
          } as Card)
      )
    );
  }

  getUnitNameCardContent(orgUnit: string | undefined): Observable<Card> {
    return this.translation.translate('orderDetails.unit').pipe(
      filter(() => Boolean(orgUnit)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            text: [orgUnit],
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { OpfResourceLoaderService } from '@spartacus/opf/base/root';

@Component({
  selector: 'cx-opf-google-pay',
  templateUrl: './google-pay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfGooglePayComponent implements OnInit {
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);

  protected readonly GOOGLE_PAY_JS_URL =
    'https://pay.google.com/gp/p/js/pay.js';

  protected googleApiClient: google.payments.api.PaymentsClient;

  @ViewChild('googlePayButtonContainer') googlePayButtonContainer: ElementRef;

  onPaymentButtonClick(): void {
    const paymentDataRequest: google.payments.api.PaymentDataRequest = {
      allowedPaymentMethods: [
        {
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: [
              'AMEX',
              'DISCOVER',
              'INTERAC',
              'JCB',
              'MASTERCARD',
              'VISA',
            ],
          },
          tokenizationSpecification: {
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId',
            },
            type: 'PAYMENT_GATEWAY',
          },
          type: 'CARD',
        },
      ],
      apiVersion: 2,
      apiVersionMinor: 0,
      callbackIntents: ['PAYMENT_AUTHORIZATION'],
      // @ts-ignore
      merchantInfo: {
        // merchantId: 'exampleGatewayMerchantId',
        merchantName: 'Example Merchant',
      },
      transactionInfo: {
        countryCode: 'US',
        currencyCode: 'USD',
        displayItems: [
          {
            label: 'Subtotal',
            price: '11.00',
            type: 'SUBTOTAL',
          },
          {
            label: 'Tax',
            price: '1.00',
            type: 'TAX',
          },
        ],
        totalPrice: '12.00',
        totalPriceLabel: 'Total',
        totalPriceStatus: 'FINAL',
      },
    };

    console.log(paymentDataRequest);
    this.googleApiClient = new google.payments.api.PaymentsClient({
      environment: 'TEST',
      merchantInfo: {
        merchantName: 'Example Merchant',
        merchantId: '12345678901234567890',
      },
      paymentDataCallbacks: {
        onPaymentAuthorized: () => {
          return new Promise(function (resolve) {
            resolve({ transactionState: 'SUCCESS' });
          });
        },
      },
    });

    this.googleApiClient.loadPaymentData(paymentDataRequest);
  }

  ngOnInit(): void {
    this.opfResourceLoaderService
      .loadProviderResources([{ url: this.GOOGLE_PAY_JS_URL }])
      .then(() => {
        this.googleApiClient = new google.payments.api.PaymentsClient({
          environment: 'TEST',
        });

        this.googlePayButtonContainer.nativeElement.appendChild(
          this.googleApiClient.createButton({
            onClick: this.onPaymentButtonClick,
          })
        );
      });
  }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElementRef, Injectable, inject } from '@angular/core';
import { OpfResourceLoaderService } from '@spartacus/opf/base/root';
import {
  CurrentProductService,
  ItemCounterService,
} from '@spartacus/storefront';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfGooglePayService {
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected itemCounterService = inject(ItemCounterService);
  protected currentProductService = inject(CurrentProductService);

  protected readonly GOOGLE_PAY_JS_URL =
    'https://pay.google.com/gp/p/js/pay.js';

  protected googlePaymentClient: google.payments.api.PaymentsClient;

  protected googlePaymentClientOptions: google.payments.api.PaymentOptions = {
    environment: 'TEST',
    paymentDataCallbacks: this.handlePaymentCallbacks(),
  };

  loadProviderResources(): Promise<void> {
    return this.opfResourceLoaderService.loadProviderResources([
      { url: this.GOOGLE_PAY_JS_URL },
    ]);
  }

  initClient(): void {
    this.googlePaymentClient = new google.payments.api.PaymentsClient(
      this.googlePaymentClientOptions
    );
  }

  getClient(): google.payments.api.PaymentsClient {
    return this.googlePaymentClient;
  }

  initTransaction(): void {
    this.currentProductService
      ?.getProduct()
      .pipe(take(1))
      .subscribe((product) => {
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
            // merchantId: 'spartacusStorefront',
            merchantName: 'Spartacus Storefront',
          },
          transactionInfo: {
            currencyCode: product?.price?.currencyIso || '',
            totalPrice: this.estimateTotalPrice(product?.price?.value || 1),
            totalPriceStatus: 'ESTIMATED',
          },
        };

        this.googlePaymentClient.loadPaymentData(paymentDataRequest);
      });
  }

  renderPaymentButton(container: ElementRef): void {
    container.nativeElement.appendChild(
      this.getClient().createButton({
        onClick: () => this.initTransaction(),
        buttonType: 'checkout',
        buttonSizeMode: 'fill',
      })
    );
  }

  handlePaymentCallbacks(): google.payments.api.PaymentDataCallbacks {
    return {
      onPaymentAuthorized: () => {
        return new Promise((resolve) => {
          resolve({ transactionState: 'SUCCESS' });
        });
      },
    };
  }

  protected estimateTotalPrice(productPrice: number): string {
    return (this.itemCounterService.getCounter() * productPrice).toString();
  }
}

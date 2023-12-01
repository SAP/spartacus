/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElementRef, Injectable, inject } from '@angular/core';
import { Product } from '@spartacus/core';
import {
  OpfPaymentFacade,
  OpfResourceLoaderService,
  PaymentMethod,
} from '@spartacus/opf/base/root';
import {
  CurrentProductService,
  ItemCounterService,
} from '@spartacus/storefront';

import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CartHandlerService } from '../cart-handler.service';

@Injectable({
  providedIn: 'root',
})
export class OpfGooglePayService {
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected itemCounterService = inject(ItemCounterService);
  protected currentProductService = inject(CurrentProductService);
  protected cartHandlerService = inject(CartHandlerService);
  protected opfPaymentFacade = inject(OpfPaymentFacade);

  protected readonly GOOGLE_PAY_JS_URL =
    'https://pay.google.com/gp/p/js/pay.js';

  protected googlePaymentClient: google.payments.api.PaymentsClient;

  protected googlePaymentClientOptions: google.payments.api.PaymentOptions = {
    environment: 'TEST',
    paymentDataCallbacks: this.handlePaymentCallbacks(),
  };

  protected googlePaymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    callbackIntents: [
      'SHIPPING_ADDRESS',
      'SHIPPING_OPTION',
      'PAYMENT_AUTHORIZATION',
    ],
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
            gateway: 'adyen',
            gatewayMerchantId: 'SAPCOM_STAGE_GATEWAY',
          },
          type: 'PAYMENT_GATEWAY',
        },
        type: 'CARD',
      },
    ],
    // @ts-ignore
    merchantInfo: {
      // merchantId: 'spartacusStorefront',
      merchantName: 'Spartacus Storefront',
    },
    shippingOptionRequired: true,
    shippingAddressRequired: true,
    // @ts-ignore
    shippingAddressParameters: {
      phoneNumberRequired: false,
    },
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

  isReadyToPay(
    request: google.payments.api.IsReadyToPayRequest
  ): Promise<google.payments.api.IsReadyToPayResponse> {
    return this.googlePaymentClient.isReadyToPay(request);
  }

  updateTransactionInfo(transactionInfo: google.payments.api.TransactionInfo) {
    this.googlePaymentRequest.transactionInfo = transactionInfo;
  }

  getShippingOptionParameters(): Observable<
    google.payments.api.ShippingOptionParameters | undefined
  > {
    return this.cartHandlerService.getSupportedDeliveryModes().pipe(
      take(1),
      map((modes) => {
        return {
          defaultSelectedOptionId: modes[0]?.code,
          shippingOptions: modes?.map((mode) => ({
            id: mode?.code,
            label: mode?.name,
            description: mode?.description,
          })),
        } as google.payments.api.ShippingOptionParameters;
      })
    );
  }

  getNewTransactionInfo(
    cart: Cart
  ): google.payments.api.TransactionInfo | undefined {
    return {
      totalPrice: (cart?.totalPriceWithTax?.value || 0).toString(),
      currencyCode: cart?.totalPriceWithTax?.currencyIso?.toString(),
      totalPriceStatus: 'FINAL',
    };
  }

  setDeliveryAddress(
    address: google.payments.api.IntermediateAddress | undefined
  ): Observable<string> {
    return this.cartHandlerService.setDeliveryAddress({
      firstName: 'Test',
      lastName: 'Test',
      country: {
        isocode: address?.countryCode,
      },
      town: address?.locality,
      district: address?.administrativeArea,
      postalCode: address?.postalCode,
      line1: 'Test',
    });
  }

  setDeliveryMode(mode: string): Observable<DeliveryMode | undefined> {
    return mode !== 'shipping_option_unselected'
      ? this.cartHandlerService.setDeliveryMode(mode)
      : of(undefined);
  }

  initTransaction(): void {
    this.currentProductService
      .getProduct()
      .pipe(
        take(1),
        switchMap((product: Product | null) => {
          return this.cartHandlerService.deleteCurrentCart().pipe(
            switchMap(() => {
              return this.cartHandlerService.addProductToCart(
                product?.code || '',
                this.itemCounterService.getCounter()
              );
            }),
            tap(() => {
              this.updateTransactionInfo({
                totalPrice: this.estimateTotalPrice(product?.price?.value),
                currencyCode: product?.price?.currencyIso,
                totalPriceStatus: 'ESTIMATED',
              });
            })
          );
        })
      )
      .subscribe(() => {
        this.googlePaymentClient.loadPaymentData(this.googlePaymentRequest);
      });
  }

  renderPaymentButton(container: ElementRef): void {
    container.nativeElement.appendChild(
      this.getClient().createButton({
        onClick: () => this.initTransaction(),
        buttonSizeMode: 'fill',
      })
    );
  }

  handlePaymentCallbacks(): google.payments.api.PaymentDataCallbacks {
    let self = this;
    return {
      onPaymentAuthorized: (paymentDataResponse) => {
        console.log(paymentDataResponse);
        return new Promise((resolve) => {
          self.cartHandlerService.getCurrentCartId().subscribe((cartId) => {
            console.log(
              paymentDataResponse.paymentMethodData.tokenizationData.token
            );
            self.opfPaymentFacade
              .submitPayment({
                additionalData: [],
                paymentSessionId: '',
                cartId,
                callbackArray: [() => {}, () => {}, () => {}],

                paymentMethod: PaymentMethod.GOOGLE_PAY,
                encryptedToken: btoa(
                  paymentDataResponse.paymentMethodData.tokenizationData.token
                ),
              })
              .subscribe(
                (result) => {
                  console.log(result);
                  resolve({ transactionState: 'SUCCESS' });
                },
                (error) => {
                  console.log(error);
                  resolve({ transactionState: 'SUCCESS' });
                },
                () => {
                  resolve({ transactionState: 'SUCCESS' });
                  // 'onCompleted' callback.
                  // No errors, route to new page here
                }
              );
          });
        });
      },

      onPaymentDataChanged: (intermediatePaymentData) => {
        console.log(intermediatePaymentData.callbackTrigger);

        let self = this;
        return new Promise(function (resolve) {
          let paymentDataRequestUpdate: google.payments.api.PaymentDataRequestUpdate =
            {};

          self
            .setDeliveryAddress(intermediatePaymentData.shippingAddress)
            .pipe(switchMap(() => self.getShippingOptionParameters()))
            .subscribe((shippingOptions) => {
              self
                .setDeliveryMode(
                  self.verifyShippingOption(
                    intermediatePaymentData.shippingOptionData?.id
                  ) ||
                    shippingOptions?.defaultSelectedOptionId ||
                    ''
                )
                .subscribe(() => {
                  paymentDataRequestUpdate.newShippingOptionParameters =
                    shippingOptions;
                  self.cartHandlerService.getCurrentCart().subscribe((cart) => {
                    console.log(cart);
                    self.cartHandlerService
                      .getSelectedDeliveryMode()
                      .subscribe((mode) => {
                        if (
                          paymentDataRequestUpdate?.newShippingOptionParameters
                            ?.defaultSelectedOptionId
                        ) {
                          paymentDataRequestUpdate.newShippingOptionParameters.defaultSelectedOptionId =
                            mode?.code;
                        }
                        paymentDataRequestUpdate.newTransactionInfo =
                          self.getNewTransactionInfo(cart);
                        resolve(paymentDataRequestUpdate);
                      });
                  });
                });
            });
        });
      },
    };
  }

  protected estimateTotalPrice(productPrice: number = 0): string {
    return (this.itemCounterService.getCounter() * productPrice).toString();
  }

  protected verifyShippingOption(mode: string | undefined): string | undefined {
    if (mode === 'shipping_option_unselected') {
      return undefined;
    }

    return mode;
  }
}

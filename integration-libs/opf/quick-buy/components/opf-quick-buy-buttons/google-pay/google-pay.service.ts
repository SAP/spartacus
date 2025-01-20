/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="@types/googlepay" />
import { ElementRef, Injectable, inject } from '@angular/core';
import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';

import {
  OpfActiveConfiguration,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import {
  OPF_GOOGLE_PAY_PROVIDER_NAME,
  OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
  OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME,
  OpfQuickBuyConfig,
  OpfQuickBuyDeliveryType,
  OpfQuickBuyGooglePayProvider,
  OpfQuickBuyLocation,
  OpfQuickBuyProviderType,
  QuickBuyTransactionDetails,
} from '@spartacus/opf/quick-buy/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, forkJoin, lastValueFrom, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { OpfQuickBuyButtonsService } from '../opf-quick-buy-buttons.service';

@Injectable({
  providedIn: 'root',
})
export class OpfGooglePayService {
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected currentProductService = inject(CurrentProductService);
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected opfQuickBuyTransactionService = inject(
    OpfQuickBuyTransactionService
  );
  protected opfQuickBuyButtonsService = inject(OpfQuickBuyButtonsService);
  protected opfQuickBuyConfig = inject(OpfQuickBuyConfig);

  private googlePaymentClient: google.payments.api.PaymentsClient;

  private googlePaymentClientOptions: google.payments.api.PaymentOptions = {
    environment: 'TEST',
  };

  private initialGooglePaymentRequest: google.payments.api.PaymentDataRequest =
    {
      /**
       * TODO: Move this part into configuration layer.
       */
      apiVersion: 2,
      apiVersionMinor: 0,
      callbackIntents: [
        'PAYMENT_AUTHORIZATION',
        'SHIPPING_ADDRESS',
        'SHIPPING_OPTION',
      ],

      // @ts-ignore
      merchantInfo: {
        // merchantId: 'spartacusStorefront',
        merchantName: OPF_QUICK_BUY_DEFAULT_MERCHANT_NAME,
      },
      shippingOptionRequired: true,
      shippingAddressRequired: true,
      // @ts-ignore
      shippingAddressParameters: {
        phoneNumberRequired: false,
      },
      emailRequired: true,
    };

  protected readonly defaultGooglePayCardParameters: any = {
    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    allowedCardNetworks: [
      'AMEX',
      'DISCOVER',
      'INTERAC',
      'JCB',
      'MASTERCARD',
      'VISA',
    ],
    billingAddressRequired: true,
    billingAddressParameters: {
      format: 'FULL',
    },
  };

  private initialTransactionInfo: google.payments.api.TransactionInfo = {
    totalPrice: '0.00',
    totalPriceStatus: 'ESTIMATED',
    currencyCode: 'USD',
  };

  protected initialTransactionDetails: QuickBuyTransactionDetails = {
    context: OpfQuickBuyLocation.PRODUCT,
    product: undefined,
    cart: undefined,
    quantity: 0,
    deliveryInfo: {
      type: OpfQuickBuyDeliveryType.SHIPPING,
      pickupDetails: undefined,
    },
    addressIds: [],
    total: {
      label: '',
      amount: '',
      currency: '',
    },
  };

  private googlePaymentRequest = this.initialGooglePaymentRequest;

  protected transactionDetails = this.initialTransactionDetails;

  protected updateGooglePaymentClient(): void {
    this.googlePaymentClient = new google.payments.api.PaymentsClient(
      this.googlePaymentClientOptions
    );
  }

  protected setGooglePaymentRequestConfig(
    deliveryType: OpfQuickBuyDeliveryType,
    merchantName: string
  ) {
    if (deliveryType === OpfQuickBuyDeliveryType.PICKUP) {
      this.googlePaymentClientOptions = {
        ...this.googlePaymentClientOptions,
        paymentDataCallbacks: {
          onPaymentAuthorized:
            this.handlePaymentCallbacks().onPaymentAuthorized,
        },
      };
      this.googlePaymentRequest = {
        ...this.initialGooglePaymentRequest,
        shippingAddressRequired: false,
        shippingOptionRequired: false,
        callbackIntents: ['PAYMENT_AUTHORIZATION'],
      };
    } else {
      this.googlePaymentClientOptions = {
        ...this.googlePaymentClientOptions,
        paymentDataCallbacks: this.handlePaymentCallbacks(),
      };
      this.googlePaymentRequest = this.initialGooglePaymentRequest;
    }
    this.googlePaymentRequest.merchantInfo.merchantName = merchantName;
    this.updateGooglePaymentClient();
  }

  loadResources(): Promise<void> {
    const opfGooglePayConfig: OpfQuickBuyGooglePayProvider | undefined =
      this.opfQuickBuyConfig?.providers?.[OPF_GOOGLE_PAY_PROVIDER_NAME];

    if (!opfGooglePayConfig?.resourceUrl?.length) {
      return Promise.reject('Config not found');
    }
    return this.opfResourceLoaderService.loadResources([
      {
        url: opfGooglePayConfig.resourceUrl,
      },
    ]);
  }

  initClient(activeConfiguration: OpfActiveConfiguration): void {
    this.setAllowedPaymentMethodsConfig(activeConfiguration);
    this.updateGooglePaymentClient();
  }

  private getClient(): google.payments.api.PaymentsClient {
    return this.googlePaymentClient;
  }

  isReadyToPay() {
    return this.googlePaymentClient.isReadyToPay(
      this.googlePaymentRequest
    ) as any;
  }

  private updateTransactionInfo(
    transactionInfo: google.payments.api.TransactionInfo
  ) {
    this.googlePaymentRequest.transactionInfo = transactionInfo;
  }

  private getShippingOptionParameters(): Observable<
    google.payments.api.ShippingOptionParameters | undefined
  > {
    return this.opfQuickBuyTransactionService.getSupportedDeliveryModes().pipe(
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

  private getNewTransactionInfo(
    cart: Cart
  ): google.payments.api.TransactionInfo | undefined {
    let transactionInfo: google.payments.api.TransactionInfo | undefined;
    const priceInfo = cart?.totalPriceWithTax;
    if (priceInfo && priceInfo.value && priceInfo.currencyIso) {
      transactionInfo = {
        totalPrice: priceInfo.value.toString(),
        currencyCode: priceInfo.currencyIso.toString(),
        totalPriceStatus: 'FINAL',
      };
    }

    return transactionInfo;
  }

  private setDeliveryAddress(
    address: google.payments.api.Address | undefined
  ): Observable<string> {
    const deliveryAddress = this.convertAddress(address);

    if (
      this.transactionDetails?.deliveryInfo?.type ===
      OpfQuickBuyDeliveryType.SHIPPING
    ) {
      return this.opfQuickBuyTransactionService
        .setDeliveryAddress(deliveryAddress)
        .pipe(
          tap((addressId) => {
            this.associateAddressId(addressId);
          })
        );
    } else {
      return of(OpfQuickBuyDeliveryType.PICKUP);
    }
  }

  private setBillingAddress(
    address: google.payments.api.Address | undefined
  ): Observable<boolean> {
    return this.opfQuickBuyTransactionService.setBillingAddress(
      this.convertAddress(address)
    );
  }

  setDeliveryMode(
    mode?: string,
    type?: OpfQuickBuyDeliveryType
  ): Observable<DeliveryMode | undefined> {
    if (type === OpfQuickBuyDeliveryType.PICKUP) {
      mode = OpfQuickBuyDeliveryType.PICKUP.toLocaleLowerCase();
    }

    if (!mode && type === OpfQuickBuyDeliveryType.SHIPPING) {
      return of(undefined);
    }

    return mode && this.verifyShippingOption(mode)
      ? this.opfQuickBuyTransactionService.setDeliveryMode(mode)
      : of(undefined);
  }

  private convertAddress(
    address: google.payments.api.Address | undefined
  ): Address {
    let convertedAddress: Address = {
      firstName: OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
      lastName: OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
      country: {
        isocode: address?.countryCode,
      },
      town: address?.locality,
      district: address?.administrativeArea,
      postalCode: address?.postalCode,
      line1: address?.address1 || OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
      line2: `${address?.address2} ${address?.address3}`,
    };

    if (address?.name) {
      convertedAddress = {
        ...convertedAddress,
        ...this.getFirstAndLastName(address?.name),
      };
    }
    return convertedAddress;
  }

  handleActiveCartTransaction(): Observable<Cart> {
    this.transactionDetails.context = OpfQuickBuyLocation.CART;

    return this.opfQuickBuyTransactionService.handleCartGuestUser().pipe(
      switchMap(() => {
        return forkJoin({
          deliveryInfo:
            this.opfQuickBuyTransactionService.getTransactionDeliveryInfo(),
          merchantName: this.opfQuickBuyTransactionService.getMerchantName(),
        }).pipe(
          switchMap(({ deliveryInfo, merchantName }) => {
            this.transactionDetails.deliveryInfo = deliveryInfo;
            this.setGooglePaymentRequestConfig(deliveryInfo.type, merchantName);

            return this.setDeliveryMode(undefined, deliveryInfo.type).pipe(
              switchMap(() =>
                this.opfQuickBuyTransactionService.getCurrentCart().pipe(
                  take(1),
                  tap((cart: Cart) => {
                    this.transactionDetails.cart = cart;
                    this.updateTransactionInfo({
                      totalPrice: `${cart.totalPrice?.value}`,
                      currencyCode:
                        cart.totalPrice?.currencyIso ||
                        this.initialTransactionInfo.currencyCode,
                      totalPriceStatus:
                        this.initialTransactionInfo.totalPriceStatus,
                    });
                  })
                )
              )
            );
          })
        );
      })
    );
  }

  initTransaction(): void {
    this.transactionDetails = {
      ...this.initialTransactionDetails,
      addressIds: [],
    };

    this.opfQuickBuyTransactionService
      .getTransactionLocationContext()
      .pipe(
        switchMap((context: OpfQuickBuyLocation) => {
          this.transactionDetails.context = context;

          return this.handleActiveCartTransaction();
        })
      )
      .subscribe(() => {
        this.googlePaymentClient
          .loadPaymentData(this.googlePaymentRequest)
          .catch((err: any) => {
            // If err.statusCode === 'CANCELED' it means that customer closed popup
            if (err.statusCode === 'CANCELED') {
              this.deleteAssociatedAddresses();
            }
          });
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

  private handlePaymentCallbacks(): google.payments.api.PaymentDataCallbacks {
    return {
      onPaymentAuthorized: (paymentDataResponse: any) => {
        return lastValueFrom(
          this.setDeliveryAddress(paymentDataResponse.shippingAddress).pipe(
            switchMap(() =>
              this.setBillingAddress(
                paymentDataResponse.paymentMethodData.info?.billingAddress
              )
            ),
            switchMap(() => {
              return paymentDataResponse?.email
                ? this.opfQuickBuyTransactionService.updateCartGuestUserEmail(
                    paymentDataResponse.email
                  )
                : of(true);
            }),
            switchMap(() => {
              const encryptedToken = btoa(
                paymentDataResponse.paymentMethodData.tokenizationData.token
              );

              return this.opfPaymentFacade.submitPayment({
                additionalData: [],
                paymentSessionId: '',
                callbacks: {
                  onSuccess: () => {},
                  onPending: () => {},
                  onFailure: () => {},
                },
                paymentMethod: OpfQuickBuyProviderType.GOOGLE_PAY as any,
                encryptedToken,
              });
            }),
            catchError(() => {
              return of(false);
            })
          )
        ).then((isSuccess) => {
          this.deleteAssociatedAddresses();
          return { transactionState: isSuccess ? 'SUCCESS' : 'ERROR' };
        });
      },

      onPaymentDataChanged: (intermediatePaymentData: any) => {
        return lastValueFrom(
          this.setDeliveryAddress(intermediatePaymentData.shippingAddress).pipe(
            switchMap(() => this.getShippingOptionParameters()),
            switchMap((shippingOptions) => {
              const selectedMode =
                this.verifyShippingOption(
                  intermediatePaymentData.shippingOptionData?.id
                ) ?? shippingOptions?.defaultSelectedOptionId;

              return this.setDeliveryMode(selectedMode).pipe(
                switchMap(() =>
                  forkJoin([
                    this.opfQuickBuyTransactionService.getCurrentCart(),
                    this.opfQuickBuyTransactionService.getSelectedDeliveryMode(),
                  ])
                ),
                switchMap(([cart, mode]) => {
                  const paymentDataRequestUpdate: google.payments.api.PaymentDataRequestUpdate =
                    {
                      newShippingOptionParameters: shippingOptions,
                      newTransactionInfo: this.getNewTransactionInfo(cart),
                    };

                  if (
                    paymentDataRequestUpdate.newShippingOptionParameters
                      ?.defaultSelectedOptionId
                  ) {
                    paymentDataRequestUpdate.newShippingOptionParameters.defaultSelectedOptionId =
                      mode?.code;
                  }

                  return of(paymentDataRequestUpdate);
                })
              );
            })
          )
        );
      },
    };
  }

  protected verifyShippingOption(mode: string | undefined): string | undefined {
    return mode === 'shipping_option_unselected' ? undefined : mode;
  }

  protected associateAddressId(addressId: string): void {
    if (!this.isAddressIdAssociated(addressId)) {
      this.transactionDetails.addressIds.push(addressId);
    }
  }

  protected isAddressIdAssociated(addressId: string): boolean {
    return this.transactionDetails.addressIds.includes(addressId);
  }

  protected resetAssociatedAddresses(): void {
    this.transactionDetails.addressIds = [];
  }

  protected deleteAssociatedAddresses(): void {
    if (this.transactionDetails.addressIds?.length) {
      this.opfQuickBuyTransactionService.deleteUserAddresses(
        this.transactionDetails.addressIds
      );
      this.resetAssociatedAddresses();
    }
  }

  protected getFirstAndLastName(name: string) {
    const firstName = name?.split(' ')[0];
    const lastName = name?.substring(firstName?.length) || firstName;

    return {
      firstName,
      lastName,
    };
  }

  protected setAllowedPaymentMethodsConfig(
    activeConfiguration: OpfActiveConfiguration
  ): void {
    const googlePayConfig =
      this.opfQuickBuyButtonsService.getQuickBuyProviderConfig(
        OpfQuickBuyProviderType.GOOGLE_PAY,
        activeConfiguration
      );

    this.googlePaymentRequest.allowedPaymentMethods = [
      {
        parameters: {
          ...this.defaultGooglePayCardParameters,
        },
        tokenizationSpecification: {
          parameters: {
            gateway: String(googlePayConfig?.googlePayGateway),
            gatewayMerchantId: String(activeConfiguration.merchantId),
          },
          type: activeConfiguration.providerType as any,
        },
        type: 'CARD',
      },
    ];
  }
}

/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="@types/googlepay" />
import { ElementRef, Injectable, inject } from '@angular/core';
import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import { Address, Product } from '@spartacus/core';
import { OpfCartHandlerService } from '@spartacus/opf/base/core';
import {
  ADDRESS_FIELD_PLACEHOLDER,
  ActiveConfiguration,
  OpfPaymentFacade,
  OpfProviderType,
  OpfQuickBuyDeliveryType,
  OpfQuickBuyLocation,
  OpfResourceLoaderService,
  PaymentMethod,
  QuickBuyTransactionDetails,
  defaultMerchantName,
} from '@spartacus/opf/base/root';
import {
  CurrentProductService,
  ItemCounterService,
} from '@spartacus/storefront';
import { Observable, forkJoin, lastValueFrom, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { OpfQuickBuyService } from '../opf-quick-buy.service';

@Injectable({
  providedIn: 'root',
})
export class OpfGooglePayService {
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected itemCounterService = inject(ItemCounterService);
  protected currentProductService = inject(CurrentProductService);
  protected opfCartHandlerService = inject(OpfCartHandlerService);
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected opfQuickBuyService = inject(OpfQuickBuyService);

  protected readonly GOOGLE_PAY_JS_URL =
    'https://pay.google.com/gp/p/js/pay.js';

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
        merchantName: defaultMerchantName,
      },
      shippingOptionRequired: true,
      shippingAddressRequired: true,
      // @ts-ignore
      shippingAddressParameters: {
        phoneNumberRequired: false,
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

  loadProviderResources(): Promise<void> {
    return this.opfResourceLoaderService.loadProviderResources([
      { url: this.GOOGLE_PAY_JS_URL },
    ]);
  }

  initClient(activeConfiguration: ActiveConfiguration): void {
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
    return this.opfCartHandlerService.getSupportedDeliveryModes().pipe(
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
      return this.opfCartHandlerService
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
    return this.opfCartHandlerService.setBillingAddress(
      this.convertAddress(address)
    );
  }

  setDeliveryMode(
    mode?: string,
    type?: OpfQuickBuyDeliveryType
  ): Observable<DeliveryMode | undefined> {
    console.log('setting mode');
    if (type === OpfQuickBuyDeliveryType.PICKUP) {
      mode = OpfQuickBuyDeliveryType.PICKUP.toLocaleLowerCase();
    }

    if (!mode && type === OpfQuickBuyDeliveryType.SHIPPING) {
      return of(undefined);
    }

    return mode && this.verifyShippingOption(mode)
      ? this.opfCartHandlerService.setDeliveryMode(mode)
      : of(undefined);
  }

  private convertAddress(
    address: google.payments.api.Address | undefined
  ): Address {
    let convertedAddress: Address = {
      firstName: ADDRESS_FIELD_PLACEHOLDER,
      lastName: ADDRESS_FIELD_PLACEHOLDER,
      country: {
        isocode: address?.countryCode,
      },
      town: address?.locality,
      district: address?.administrativeArea,
      postalCode: address?.postalCode,
      line1: address?.address1 || ADDRESS_FIELD_PLACEHOLDER,
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

  handleSingleProductTransaction(): Observable<Product | boolean | null> {
    this.transactionDetails.context = OpfQuickBuyLocation.PRODUCT;
    return forkJoin({
      deliveryInfo: this.opfQuickBuyService.getQuickBuyDeliveryInfo(
        this.transactionDetails.context as OpfQuickBuyLocation
      ),
      merchantName: this.opfQuickBuyService.getMerchantName(),
    }).pipe(
      switchMap(({ deliveryInfo, merchantName }) => {
        this.transactionDetails.deliveryInfo = deliveryInfo;
        this.setGooglePaymentRequestConfig(deliveryInfo.type, merchantName);
        return this.currentProductService.getProduct().pipe(
          take(1),
          switchMap((product: Product | null) => {
            const count = this.itemCounterService.getCounter();
            this.transactionDetails.product = product as Product;
            this.transactionDetails.quantity = count;
            return this.opfCartHandlerService
              .addProductToCart(
                product?.code || '',
                count,
                this.transactionDetails.deliveryInfo?.pickupDetails?.name
              )
              .pipe(
                tap(() => {
                  this.setDeliveryMode(
                    undefined,
                    this.transactionDetails.deliveryInfo?.type
                  );
                  this.updateTransactionInfo({
                    totalPrice: this.estimateTotalPrice(product?.price?.value),
                    currencyCode:
                      product?.price?.currencyIso ||
                      this.initialTransactionInfo.currencyCode,
                    totalPriceStatus:
                      this.initialTransactionInfo.totalPriceStatus,
                  });
                })
              );
          })
        );
      })
    );
  }

  handleActiveCartTransaction(): Observable<Cart> {
    this.opfCartHandlerService.updateState(undefined);
    this.transactionDetails.context = OpfQuickBuyLocation.CART;

    return forkJoin({
      deliveryInfo: this.opfQuickBuyService.getQuickBuyDeliveryInfo(
        this.transactionDetails.context as OpfQuickBuyLocation
      ),
      merchantName: this.opfQuickBuyService.getMerchantName(),
    }).pipe(
      switchMap(({ deliveryInfo, merchantName }) => {
        this.transactionDetails.deliveryInfo = deliveryInfo;
        this.setGooglePaymentRequestConfig(deliveryInfo.type, merchantName);

        return this.setDeliveryMode(undefined, deliveryInfo.type).pipe(
          switchMap(() =>
            this.opfCartHandlerService.getCurrentCart().pipe(
              take(1),
              tap((cart: Cart) => {
                console.log('transacton for cart id: ' + cart.code);
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
  }

  initTransaction(): void {
    this.transactionDetails = {
      ...this.initialTransactionDetails,
      addressIds: [],
    };

    this.opfQuickBuyService
      .getQuickBuyLocationContext()
      .pipe(
        switchMap((context: OpfQuickBuyLocation) => {
          this.transactionDetails.context = context;
          if (context === OpfQuickBuyLocation.PRODUCT) {
            return this.handleSingleProductTransaction();
          }

          return this.handleActiveCartTransaction();
        })
      )
      .subscribe(() => {
        this.googlePaymentClient
          .loadPaymentData(this.googlePaymentRequest)
          .catch((err) => {
            // If err.statusCode === 'CANCELED' it means that customer closed popup
            if (err.statusCode === 'CANCELED') {
              this.loadInitialCartAndCleanAddresses();
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

  protected loadInitialCartAndCleanAddresses(orderSuccess = false): void {
    this.opfCartHandlerService
      .loadCartAfterSingleProductTransaction(
        this.transactionDetails,
        orderSuccess
      )
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.deleteAssociatedAddresses();
        },
      });
  }

  private handlePaymentCallbacks(): google.payments.api.PaymentDataCallbacks {
    return {
      onPaymentAuthorized: (paymentDataResponse) => {
        console.log('onPaymentAuthorized', paymentDataResponse);
        return lastValueFrom(
          this.opfCartHandlerService.getCurrentCartId().pipe(
            switchMap((cartId) => {
              console.log('current cartId: ' + cartId);
              return this.setDeliveryAddress(
                paymentDataResponse.shippingAddress
              ).pipe(
                switchMap(() =>
                  this.setBillingAddress(
                    paymentDataResponse.paymentMethodData.info?.billingAddress
                  )
                ),
                switchMap(() => {
                  const encryptedToken = btoa(
                    paymentDataResponse.paymentMethodData.tokenizationData.token
                  );

                  return this.opfPaymentFacade.submitPayment({
                    additionalData: [],
                    paymentSessionId: '',
                    callbackArray: [() => {}, () => {}, () => {}],
                    paymentMethod: PaymentMethod.GOOGLE_PAY,
                    encryptedToken,
                    cartId,
                  });
                })
              );
            }),
            catchError(() => {
              return of(false);
            })
          )
        ).then((isSuccess) => {
          this.loadInitialCartAndCleanAddresses(isSuccess);
          return { transactionState: isSuccess ? 'SUCCESS' : 'ERROR' };
        });
      },

      onPaymentDataChanged: (intermediatePaymentData) => {
        console.log('onPaymentDataChanged', intermediatePaymentData);
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
                    this.opfCartHandlerService.getCurrentCart(),
                    this.opfCartHandlerService.getSelectedDeliveryMode(),
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

  protected estimateTotalPrice(productPrice: number = 0): string {
    return (this.itemCounterService.getCounter() * productPrice).toString();
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
      this.opfCartHandlerService.deleteUserAddresses(
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
    activeConfiguration: ActiveConfiguration
  ): void {
    const googlePayConfig = this.opfQuickBuyService.getQuickBuyProviderConfig(
      OpfProviderType.GOOGLE_PAY,
      activeConfiguration
    );

    this.googlePaymentRequest.allowedPaymentMethods = [
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
          billingAddressRequired: true,
          billingAddressParameters: {
            format: 'FULL',
          },
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

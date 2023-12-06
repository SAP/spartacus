/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElementRef, Injectable, inject } from '@angular/core';
import { Address, Product } from '@spartacus/core';
import {
  ActiveConfiguration,
  OpfPaymentFacade,
  OpfResourceLoaderService,
  PaymentMethod,
} from '@spartacus/opf/base/root';
import {
  CurrentProductService,
  ItemCounterService,
} from '@spartacus/storefront';

import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import { OpfCartHandlerService } from '@spartacus/opf/base/core';
import { Observable, forkJoin, of } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfGooglePayService {
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected itemCounterService = inject(ItemCounterService);
  protected currentProductService = inject(CurrentProductService);
  protected opfCartHandlerService = inject(OpfCartHandlerService);
  protected opfPaymentFacade = inject(OpfPaymentFacade);

  protected readonly GOOGLE_PAY_JS_URL =
    'https://pay.google.com/gp/p/js/pay.js';

  protected associatedShippingAddressIds: string[] = [];

  protected googlePaymentClient: google.payments.api.PaymentsClient;

  protected googlePaymentClientOptions: google.payments.api.PaymentOptions = {
    environment: 'TEST',
    paymentDataCallbacks: this.handlePaymentCallbacks(),
  };

  protected googlePaymentRequest: google.payments.api.PaymentDataRequest = {
    /**
     * TODO: Move this part into configuration layer.
     */
    apiVersion: 2,
    apiVersionMinor: 0,
    callbackIntents: [
      'SHIPPING_ADDRESS',
      'SHIPPING_OPTION',
      'PAYMENT_AUTHORIZATION',
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

  protected initialTransactionInfo: google.payments.api.TransactionInfo = {
    totalPrice: '0.00',
    totalPriceStatus: 'ESTIMATED',
    currencyCode: 'USD',
  };

  loadProviderResources(): Promise<void> {
    return this.opfResourceLoaderService.loadProviderResources([
      { url: this.GOOGLE_PAY_JS_URL },
    ]);
  }

  initClient(activeConfiguration: ActiveConfiguration): void {
    this.setAllowedPaymentMethodsConfig(activeConfiguration);
    this.googlePaymentClient = new google.payments.api.PaymentsClient(
      this.googlePaymentClientOptions
    );
  }

  getClient(): google.payments.api.PaymentsClient {
    return this.googlePaymentClient;
  }

  isReadyToPay(): Promise<google.payments.api.IsReadyToPayResponse> {
    return this.googlePaymentClient.isReadyToPay(this.googlePaymentRequest);
  }

  updateTransactionInfo(transactionInfo: google.payments.api.TransactionInfo) {
    this.googlePaymentRequest.transactionInfo = transactionInfo;
  }

  getShippingOptionParameters(): Observable<
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

  getNewTransactionInfo(
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

  setDeliveryAddress(
    address: google.payments.api.Address | undefined
  ): Observable<string> {
    const ADDRESS_FIELD_PLACEHOLDER = '[FIELD_NOT_SET]';

    let deliveryAddress: Address = {
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
      deliveryAddress = {
        ...deliveryAddress,
        ...this.getFirstAndLastName(address?.name),
      };
    }

    return this.opfCartHandlerService.setDeliveryAddress(deliveryAddress).pipe(
      tap((addressId) => {
        this.associateAddressId(addressId);
      })
    );
  }

  setDeliveryMode(
    mode: string | undefined
  ): Observable<DeliveryMode | undefined> {
    return mode && this.verifyShippingOption(mode)
      ? this.opfCartHandlerService.setDeliveryMode(mode)
      : of(undefined);
  }

  initTransaction(): void {
    this.currentProductService
      .getProduct()
      .pipe(
        take(1),
        switchMap((product: Product | null) => {
          return this.opfCartHandlerService.deleteCurrentCart().pipe(
            switchMap(() => {
              return this.opfCartHandlerService.addProductToCart(
                product?.code || '',
                this.itemCounterService.getCounter()
              );
            }),
            tap(() => {
              this.updateTransactionInfo({
                totalPrice: this.estimateTotalPrice(product?.price?.value),
                currencyCode:
                  product?.price?.currencyIso ||
                  this.initialTransactionInfo.currencyCode,
                totalPriceStatus: this.initialTransactionInfo.totalPriceStatus,
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
    return {
      onPaymentAuthorized: (paymentDataResponse) => {
        return this.opfCartHandlerService
          .getCurrentCartId()
          .pipe(
            switchMap((cartId) =>
              this.setDeliveryAddress(paymentDataResponse.shippingAddress).pipe(
                switchMap(() => {
                  const encryptedToken = btoa(
                    paymentDataResponse.paymentMethodData.tokenizationData.token
                  );
                  return forkJoin({
                    submitPayment: this.opfPaymentFacade.submitPayment({
                      additionalData: [],
                      paymentSessionId: '',
                      cartId,
                      callbackArray: [() => {}, () => {}, () => {}],
                      paymentMethod: PaymentMethod.GOOGLE_PAY,
                      encryptedToken,
                    }),
                  });
                })
              )
            ),
            catchError(() => of({ transactionState: 'ERROR' })),
            finalize(() => this.deleteAssociatedAddresses())
          )
          .toPromise()
          .then((result) => {
            const isSuccess = result;
            return { transactionState: isSuccess ? 'SUCCESS' : 'ERROR' };
          });
      },

      onPaymentDataChanged: (intermediatePaymentData) => {
        return this.setDeliveryAddress(intermediatePaymentData.shippingAddress)
          .pipe(
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
          .toPromise();
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
      this.associatedShippingAddressIds.push(addressId);
    }
  }

  protected isAddressIdAssociated(addressId: string): boolean {
    return this.associatedShippingAddressIds.includes(addressId);
  }

  protected resetAssociatedAddresses(): void {
    this.associatedShippingAddressIds = [];
  }

  protected deleteAssociatedAddresses(): void {
    if (this.associatedShippingAddressIds) {
      this.opfCartHandlerService.deleteUserAddresses(
        this.associatedShippingAddressIds
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
        },
        tokenizationSpecification: {
          parameters: {
            gateway: String(activeConfiguration.displayName),
            gatewayMerchantId: String(activeConfiguration.merchantId),
          },
          type: activeConfiguration.providerType as any,
        },
        type: 'CARD',
      },
    ];
  }
}

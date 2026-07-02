/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="@types/googlepay" />
import { ElementRef, Injectable, inject } from '@angular/core';
import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import { Address, TranslationService } from '@spartacus/core';

import {
  OpfActiveConfiguration,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { OpfPaymentFacade } from '@spartacus/opf/payment/root';
import { OpfQuickBuyTransactionService } from '@spartacus/opf/quick-buy/core';
import {
  OPF_GOOGLE_PAY_PROVIDER_NAME,
  OPF_QUICK_BUY_ADDRESS_FIELD_PLACEHOLDER,
  OpfQuickBuyConfig,
  OpfQuickBuyDeliveryInfo,
  OpfQuickBuyDeliveryType,
  OpfQuickBuyGooglePayProvider,
  OpfQuickBuyLocation,
  OpfQuickBuyProviderType,
  QuickBuyTransactionDetails,
} from '@spartacus/opf/quick-buy/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, combineLatest, forkJoin, lastValueFrom, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { OpfQuickBuyButtonsService } from '../opf-quick-buy-buttons.service';

const OPF_QUICK_BUY_GOOGLE_PAY_EMPTY_PAYMENT_CALLBACKS = {
  onSuccess: (): void => undefined,
  onPending: (): void => undefined,
  onFailure: (): void => undefined,
};

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
  protected translationService = inject(TranslationService);

  private googlePaymentClient: google.payments.api.PaymentsClient;

  // default config guarantees providers.googlePay is always present
  protected get googlePayProviderConfig(): OpfQuickBuyGooglePayProvider {
    return this.opfQuickBuyConfig.providers
      ?.googlePay as OpfQuickBuyGooglePayProvider;
  }

  private googlePaymentClientOptions: google.payments.api.PaymentOptions = {
    environment: this.googlePayProviderConfig.environment,
  };

  private initialGooglePaymentRequest = this.googlePayProviderConfig
    .paymentRequest as google.payments.api.PaymentDataRequest;

  protected readonly defaultGooglePayCardParameters: any =
    this.googlePayProviderConfig.cardParameters;

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

  initClient(
    activeConfiguration: OpfActiveConfiguration | OpfActiveConfiguration[]
  ): void {
    const activeConfigurations = Array.isArray(activeConfiguration)
      ? activeConfiguration
      : [activeConfiguration];
    const googlePayGateway =
      this.opfQuickBuyButtonsService.getActiveConfigurationForProvider(
        OpfQuickBuyProviderType.GOOGLE_PAY,
        activeConfigurations
      );
    if (googlePayGateway) {
      this.setAllowedPaymentMethodsConfig(googlePayGateway);
    }
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
  ): Observable<google.payments.api.TransactionInfo | undefined> {
    const priceInfo = cart?.totalPriceWithTax;
    if (!(priceInfo && priceInfo.value && priceInfo.currencyIso)) {
      return of(undefined);
    }
    const totalPrice = priceInfo.value;
    const currencyCode = priceInfo.currencyIso;

    return combineLatest([
      this.buildDisplayItems(cart),
      this.translationService.translate('orderCost.total'),
    ]).pipe(
      take(1),
      map(
        ([displayItems, totalLabel]) =>
        ({
          totalPrice: totalPrice.toString(),
          currencyCode: currencyCode.toString(),
          totalPriceStatus: 'FINAL',
          // `totalPriceLabel` is required by Google Pay whenever
          // `displayItems` are provided.
          ...(displayItems.length
            ? { displayItems, totalPriceLabel: totalLabel }
            : {}),
        } as google.payments.api.TransactionInfo)
      )
    );
  }

  private buildDisplayItems(
    cart: Cart
  ): Observable<google.payments.api.DisplayItem[]> {
    const promotionLabel = cart.appliedOrderPromotions
      ?.map((promotion) => promotion.description)
      .filter((description): description is string => !!description)
      .join(', ');

    return combineLatest([
      this.translationService.translate('orderCost.subtotal'),
      this.translationService.translate('orderCost.salesTax'),
      this.translationService.translate('orderCost.shipping'),
      promotionLabel
        ? of(promotionLabel)
        : this.translationService.translate('orderCost.discount'),
    ]).pipe(
      take(1),
      map(([subtotalLabel, taxLabel, deliveryLabel, savingsLabel]) => {
        const displayItems: google.payments.api.DisplayItem[] = [];

        if (cart.subTotal?.value != null) {
          displayItems.push({
            label: subtotalLabel,
            type: 'SUBTOTAL',
            price: cart.subTotal.value.toString(),
          });
        }

        if (cart.totalTax?.value) {
          displayItems.push({
            label: taxLabel,
            type: 'TAX',
            price: cart.totalTax.value.toString(),
          });
        }

        if (cart.deliveryCost?.value) {
          displayItems.push({
            label: deliveryLabel,
            type: 'SHIPPING_OPTION',
            price: cart.deliveryCost.value.toString(),
          });
        }

        if (cart.totalDiscounts?.value) {
          displayItems.push({
            label: savingsLabel,
            type: 'DISCOUNT',
            price: (-cart.totalDiscounts.value).toString(),
          });
        }

        return displayItems;
      })
    );
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
    return this.opfQuickBuyTransactionService.prepareTransactionCart().pipe(
      switchMap(() => this.loadActiveCartTransactionContext())
    );
  }

  protected loadActiveCartTransactionContext(): Observable<Cart> {
    return forkJoin({
      deliveryInfo:
        this.opfQuickBuyTransactionService.getTransactionDeliveryInfo(),
      merchantName: this.opfQuickBuyTransactionService.getMerchantName(),
    }).pipe(
      switchMap(({ deliveryInfo, merchantName }) =>
        this.configureActiveCartTransaction(deliveryInfo, merchantName)
      )
    );
  }

  protected configureActiveCartTransaction(
    deliveryInfo: OpfQuickBuyDeliveryInfo,
    merchantName: string
  ): Observable<Cart> {
    this.transactionDetails.deliveryInfo = deliveryInfo;
    this.setGooglePaymentRequestConfig(deliveryInfo.type, merchantName);

    return this.setDeliveryMode(undefined, deliveryInfo.type).pipe(
      switchMap(() =>
        this.opfQuickBuyTransactionService
          .getCurrentCart()
          .pipe(
            take(1),
            switchMap((cart) => this.updateActiveCartTransactionInfo(cart))
          )
      )
    );
  }

  protected updateActiveCartTransactionInfo(cart: Cart): Observable<Cart> {
    this.transactionDetails.cart = cart;

    return combineLatest([
      this.buildDisplayItems(cart),
      this.translationService.translate('orderCost.total'),
    ]).pipe(
      take(1),
      map(([displayItems, totalLabel]) => {
        this.updateTransactionInfo({
          totalPrice: `${cart.totalPrice?.value}`,
          currencyCode:
            cart.totalPrice?.currencyIso ||
            this.initialTransactionInfo.currencyCode,
          totalPriceStatus: this.initialTransactionInfo.totalPriceStatus,
          ...(displayItems.length
            ? { displayItems, totalPriceLabel: totalLabel }
            : {}),
        });
        return cart;
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
      onPaymentAuthorized: (paymentDataResponse: any) =>
        lastValueFrom(
          this.authorizeGooglePayPayment(paymentDataResponse)
        ).then((isSuccess) => {
          this.deleteAssociatedAddresses();
          return { transactionState: isSuccess ? 'SUCCESS' : 'ERROR' };
        }),

      onPaymentDataChanged: (intermediatePaymentData: any) =>
        lastValueFrom(
          this.handleIntermediatePaymentDataChange(intermediatePaymentData)
        ),
    };
  }

  protected authorizeGooglePayPayment(
    paymentDataResponse: any
  ): Observable<boolean> {
    return this.setDeliveryAddress(paymentDataResponse.shippingAddress).pipe(
      switchMap(() =>
        this.setBillingAddress(
          paymentDataResponse.paymentMethodData.info?.billingAddress
        )
      ),
      switchMap(() =>
        this.updateGuestUserEmailIfProvided(paymentDataResponse?.email)
      ),
      switchMap(() =>
        this.submitAuthorizedGooglePayPayment(paymentDataResponse)
      ),
      catchError(() => of(false))
    );
  }

  protected updateGuestUserEmailIfProvided(
    email?: string
  ): Observable<boolean> {
    return email
      ? this.opfQuickBuyTransactionService.updateCartGuestUserEmail(email)
      : of(true);
  }

  protected submitAuthorizedGooglePayPayment(
    paymentDataResponse: any
  ): Observable<boolean> {
    const encryptedToken = btoa(
      paymentDataResponse.paymentMethodData.tokenizationData.token
    );

    return this.opfQuickBuyTransactionService.getCurrentCartId().pipe(
      switchMap((cartId) =>
        this.opfPaymentFacade.submitPayment({
          additionalData: [],
          paymentSessionId: '',
          callbacks: OPF_QUICK_BUY_GOOGLE_PAY_EMPTY_PAYMENT_CALLBACKS,
          paymentMethod: OpfQuickBuyProviderType.GOOGLE_PAY as any,
          encryptedToken,
          cartId,
        })
      )
    );
  }

  private handleIntermediatePaymentDataChange(
    intermediatePaymentData: any
  ): Observable<google.payments.api.PaymentDataRequestUpdate> {
    return this.setDeliveryAddress(intermediatePaymentData.shippingAddress).pipe(
      switchMap(() => this.getShippingOptionParameters()),
      switchMap((shippingOptions) =>
        this.updatePaymentDataForShippingChange(
          intermediatePaymentData,
          shippingOptions
        )
      )
    );
  }

  private updatePaymentDataForShippingChange(
    intermediatePaymentData: any,
    shippingOptions: google.payments.api.ShippingOptionParameters | undefined
  ): Observable<google.payments.api.PaymentDataRequestUpdate> {
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
      switchMap(([cart, mode]) =>
        this.mapCartToPaymentDataRequestUpdate(shippingOptions, cart, mode)
      )
    );
  }

  private mapCartToPaymentDataRequestUpdate(
    shippingOptions: google.payments.api.ShippingOptionParameters | undefined,
    cart: Cart,
    mode: DeliveryMode | undefined
  ): Observable<google.payments.api.PaymentDataRequestUpdate> {
    return this.getNewTransactionInfo(cart).pipe(
      map((newTransactionInfo) =>
        this.buildPaymentDataRequestUpdate(
          shippingOptions,
          newTransactionInfo,
          mode
        )
      )
    );
  }

  private buildPaymentDataRequestUpdate(
    shippingOptions: google.payments.api.ShippingOptionParameters | undefined,
    newTransactionInfo: google.payments.api.TransactionInfo | undefined,
    mode: DeliveryMode | undefined
  ): google.payments.api.PaymentDataRequestUpdate {
    const paymentDataRequestUpdate: google.payments.api.PaymentDataRequestUpdate =
    {
      newShippingOptionParameters: shippingOptions,
      newTransactionInfo,
    };

    if (
      paymentDataRequestUpdate.newShippingOptionParameters
        ?.defaultSelectedOptionId
    ) {
      paymentDataRequestUpdate.newShippingOptionParameters.defaultSelectedOptionId =
        mode?.code;
    }

    return paymentDataRequestUpdate;
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
        [activeConfiguration]
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

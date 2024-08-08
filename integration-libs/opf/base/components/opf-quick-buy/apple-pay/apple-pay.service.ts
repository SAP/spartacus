/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="@types/applepayjs" />
import { Injectable, inject } from '@angular/core';
import { Address, Product, WindowRef } from '@spartacus/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import {
  OpfCartHandlerService,
  OpfPickupInStoreHandlerService,
} from '@spartacus/opf/base/core';
import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
  ApplePayShippingType,
  ApplePayTransactionInput,
  OpfPaymentFacade,
  OpfQuickBuyDeliveryType,
  OpfQuickBuyLocation,
  PaymentMethod,
  QuickBuyTransactionDetails,
  defaultMerchantName,
} from '@spartacus/opf/base/root';

import { Cart, DeliveryMode } from '@spartacus/cart/base/root';
import { OpfQuickBuyService } from '../opf-quick-buy.service';
import { ApplePaySessionFactory } from './apple-pay-session/apple-pay-session.factory';
import { ApplePayObservableFactory } from './observable/apple-pay-observable.factory';

@Injectable({
  providedIn: 'root',
})
export class ApplePayService {
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected applePaySession = inject(ApplePaySessionFactory);
  protected applePayObservable = inject(ApplePayObservableFactory);
  protected winRef = inject(WindowRef);
  protected cartHandlerService = inject(OpfCartHandlerService);
  protected opfQuickBuyService = inject(OpfQuickBuyService);
  protected opfPickupInStoreHandlerService = inject(
    OpfPickupInStoreHandlerService
  );
  protected paymentInProgress = false;

  protected initialTransactionDetails: QuickBuyTransactionDetails = {
    context: OpfQuickBuyLocation.PRODUCT,
    product: undefined,
    cart: undefined,
    quantity: 0,
    addressIds: [],
    total: {
      label: defaultMerchantName,
      amount: '',
      currency: '',
    },
    deliveryInfo: {
      type: OpfQuickBuyDeliveryType.SHIPPING,
      pickupDetails: undefined,
    },
  };

  protected transactionDetails = this.initialTransactionDetails;

  protected initTransactionDetails(
    transactionInput: ApplePayTransactionInput
  ): QuickBuyTransactionDetails {
    this.transactionDetails = {
      ...this.initialTransactionDetails,
      addressIds: [],
    };

    if (transactionInput?.cart) {
      this.transactionDetails = {
        ...this.transactionDetails,
        context: OpfQuickBuyLocation.CART,
        cart: transactionInput.cart,
        total: {
          amount: `${transactionInput.cart.totalPrice?.value}`,
          label: `${transactionInput.cart.code}`,
          currency: transactionInput.cart?.totalPrice?.currencyIso as string,
        },
      };
    }

    if (transactionInput?.product && transactionInput?.quantity) {
      const productPrice = transactionInput.product.price?.value as number;
      const totalPrice = productPrice * transactionInput.quantity;

      this.transactionDetails = {
        ...this.transactionDetails,
        context: OpfQuickBuyLocation.PRODUCT,
        product: transactionInput.product,
        quantity: transactionInput.quantity,
        total: {
          amount: totalPrice.toString(),
          label: `${transactionInput.product?.name as string}${
            transactionInput.quantity > 1
              ? ` x ${transactionInput.quantity}`
              : ''
          }`,
          currency: transactionInput.product?.price?.currencyIso as string,
        },
      };
    }

    return this.transactionDetails;
  }

  start(transactionInput: ApplePayTransactionInput): any {
    if (this.paymentInProgress) {
      return throwError(() => new Error('Apple Pay is already in progress'));
    }
    this.paymentInProgress = true;

    return this.setApplePayRequestConfig(transactionInput).pipe(
      switchMap((request: ApplePayJS.ApplePayPaymentRequest) => {
        return this.applePayObservable.initApplePayEventsHandler({
          request,
          validateMerchant: (event) => this.handleValidation(event),
          shippingContactSelected: (event) =>
            this.handleShippingContactSelected(event),
          paymentMethodSelected: (event) =>
            this.handlePaymentMethodSelected(event),
          shippingMethodSelected: (event) =>
            this.handleShippingMethodSelected(event),
          paymentAuthorized: (event) => this.handlePaymentAuthorized(event),
        });
      }),
      take(1),
      finalize(() => {
        this.paymentInProgress = false;
      })
    );
  }

  private handleValidation(
    event: ApplePayJS.ApplePayValidateMerchantEvent
  ): Observable<ApplePaySessionVerificationResponse> {
    if (this.transactionDetails?.product && this.transactionDetails?.quantity) {
      return this.handleSingleProductTransaction(
        this.transactionDetails.product,
        this.transactionDetails.quantity
      ).pipe(switchMap(() => this.validateOpfAppleSession(event)));
    }
    return this.validateOpfAppleSession(event);
  }

  protected setApplePayRequestConfig(
    transactionInput: ApplePayTransactionInput
  ): Observable<ApplePayJS.ApplePayPaymentRequest> {
    this.transactionDetails = this.initTransactionDetails(transactionInput);
    const countryCode = transactionInput?.countryCode || '';
    const initialRequest: ApplePayJS.ApplePayPaymentRequest = {
      currencyCode: this.transactionDetails.total.currency,
      total: {
        amount: this.transactionDetails.total.amount,
        label: this.transactionDetails.total.label,
      },
      shippingMethods: [],
      merchantCapabilities: ['supports3DS'],
      supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
      requiredShippingContactFields: ['email', 'name', 'postalAddress'],
      requiredBillingContactFields: ['email', 'name', 'postalAddress'],
      countryCode,
    };

    return forkJoin({
      deliveryInfo: this.opfQuickBuyService.getQuickBuyDeliveryInfo(
        this.transactionDetails.context as OpfQuickBuyLocation
      ),
      merchantName: this.opfQuickBuyService.getMerchantName(),
    }).pipe(
      switchMap(({ deliveryInfo, merchantName }) => {
        this.transactionDetails.total.label = merchantName;
        initialRequest.total.label = merchantName;
        this.transactionDetails.deliveryInfo = deliveryInfo;
        if (deliveryInfo.type === OpfQuickBuyDeliveryType.PICKUP) {
          // Don't display shipping contact form on payment sheet
          initialRequest.requiredShippingContactFields = [];
          initialRequest.shippingType = ApplePayShippingType.STORE_PICKUP;

          return this.transactionDetails.context === OpfQuickBuyLocation.PRODUCT
            ? this.opfPickupInStoreHandlerService.getSingleProductDeliveryInfo()
            : of(undefined);
        }
        return of(undefined);
      }),
      map((opfQuickBuyDeliveryInfo) => {
        if (!opfQuickBuyDeliveryInfo) {
          return initialRequest;
        }
        this.transactionDetails.deliveryInfo = opfQuickBuyDeliveryInfo;
        return initialRequest;
      })
    );
  }

  protected handleSingleProductTransaction(
    product: Product,
    quantity: number
  ): Observable<boolean> {
    if (product.code) {
      return this.cartHandlerService.addProductToCart(
        product.code,
        quantity,
        this.transactionDetails.deliveryInfo?.pickupDetails?.name
      );
    }
    return throwError(() => new Error('Product code unknown'));
  }

  private validateOpfAppleSession(
    event: ApplePayJS.ApplePayValidateMerchantEvent
  ): Observable<ApplePaySessionVerificationResponse> {
    return this.cartHandlerService.getCurrentCartId().pipe(
      switchMap((cartId: string) => {
        const verificationRequest: ApplePaySessionVerificationRequest = {
          validationUrl: event.validationURL,
          initiative: 'web',
          initiativeContext: (this.winRef?.nativeWindow as Window).location
            ?.hostname,
          cartId,
        };
        return this.verifyApplePaySession(verificationRequest);
      })
    );
  }

  private convertAppleToOpfAddress(
    addr: ApplePayJS.ApplePayPaymentContact,
    partial = false
  ): Address {
    const ADDRESS_FIELD_PLACEHOLDER = '[FIELD_NOT_SET]';
    return {
      firstName: partial ? ADDRESS_FIELD_PLACEHOLDER : addr?.givenName,
      lastName: partial ? ADDRESS_FIELD_PLACEHOLDER : addr?.familyName,
      line1: partial ? ADDRESS_FIELD_PLACEHOLDER : addr?.addressLines?.[0],
      line2: addr?.addressLines?.[1],
      email: addr?.emailAddress,
      town: addr?.locality,
      district: addr?.administrativeArea,
      postalCode: addr?.postalCode,
      phone: addr?.phoneNumber,
      country: {
        isocode: addr?.countryCode,
        name: addr?.country,
      },
      defaultAddress: false,
    };
  }

  private handleShippingContactSelected(
    _event: ApplePayJS.ApplePayShippingContactSelectedEvent
  ): Observable<any> {
    const partialAddress: Address = this.convertAppleToOpfAddress(
      _event.shippingContact,
      true
    );

    const result: ApplePayJS.ApplePayShippingContactUpdate =
      this.updateApplePayForm({ ...this.transactionDetails.total });

    return this.cartHandlerService.setDeliveryAddress(partialAddress).pipe(
      tap((addrId: string) => {
        this.recordDeliveryAddress(addrId);
      }),
      switchMap(() => this.cartHandlerService.getSupportedDeliveryModes()),
      take(1),
      map((modes: DeliveryMode[]) => {
        if (!modes.length) {
          return of({
            ...result,
            errors: [
              this.updateApplePayFormWithError(
                'No shipment methods available for this delivery address'
              ),
            ],
          });
        }
        const newShippingMethods = modes.map((mode) => {
          return {
            identifier: mode.code as string,
            label: mode.name as string,
            amount: (mode.deliveryCost?.value as number).toFixed(2),
            detail: mode.description ?? (mode.name as string),
          };
        });
        result.newShippingMethods = newShippingMethods;
        return result;
      }),
      switchMap(() => {
        return this.cartHandlerService.getCurrentCartTotalPrice();
      }),
      switchMap((price: number | undefined) => {
        if (!price) {
          return throwError(() => new Error('Total Price not available'));
        }
        this.transactionDetails.total.amount = price.toString();
        result.newTotal.amount = price.toString();
        return of(result);
      })
    );
  }

  private handlePaymentMethodSelected(
    _event: ApplePayJS.ApplePayPaymentMethodSelectedEvent
  ): Observable<any> {
    const result: ApplePayJS.ApplePayPaymentMethodUpdate =
      this.updateApplePayForm({ ...this.transactionDetails.total });
    return of(result);
  }

  private handleShippingMethodSelected(
    _event: ApplePayJS.ApplePayShippingMethodSelectedEvent
  ): Observable<any> {
    const result: ApplePayJS.ApplePayShippingContactUpdate =
      this.updateApplePayForm({ ...this.transactionDetails.total });

    return this.cartHandlerService
      .setDeliveryMode(_event.shippingMethod.identifier)
      .pipe(
        switchMap(() => this.cartHandlerService.getCurrentCart()),
        take(1),
        switchMap((cart: Cart) => {
          if (!cart?.totalPrice?.value) {
            return throwError(() => new Error('Total Price not available'));
          }
          result.newTotal.amount = cart.totalPrice.value.toString();
          this.transactionDetails.total.amount =
            cart.totalPrice.value.toString();
          return of(result);
        })
      );
  }

  private handlePaymentAuthorized(
    event: ApplePayJS.ApplePayPaymentAuthorizedEvent
  ): Observable<ApplePayJS.ApplePayPaymentAuthorizationResult> {
    const result: ApplePayJS.ApplePayPaymentAuthorizationResult = {
      status: this.applePaySession.statusSuccess,
    };
    let orderSuccess: boolean;
    return this.placeOrderAfterPayment(event.payment).pipe(
      map(() => {
        return orderSuccess
          ? result
          : { ...result, status: this.applePaySession.statusFailure };
      }),
      catchError((error) => {
        return of({
          ...result,
          status: this.applePaySession.statusFailure,
          errors: [
            this.updateApplePayFormWithError(error?.message ?? 'Payment error'),
          ],
        } as ApplePayJS.ApplePayPaymentAuthorizationResult);
      })
    );
  }

  private verifyApplePaySession(
    request: ApplePaySessionVerificationRequest
  ): Observable<ApplePaySessionVerificationResponse> {
    return this.opfPaymentFacade.getApplePayWebSession(request);
  }

  protected recordDeliveryAddress(addrId: string): void {
    if (!this.transactionDetails.addressIds?.includes(addrId)) {
      this.transactionDetails.addressIds?.push(addrId);
    }
  }

  private placeOrderAfterPayment(
    applePayPayment: ApplePayJS.ApplePayPayment
  ): Observable<boolean> {
    if (!applePayPayment) {
      return of(false);
    }
    const { shippingContact, billingContact } = applePayPayment;
    if (!billingContact) {
      throw new Error('Error: empty billingContact');
    }
    if (
      this.transactionDetails.deliveryInfo?.type ===
        OpfQuickBuyDeliveryType.SHIPPING &&
      !shippingContact
    ) {
      throw new Error('Error: empty shippingContact');
    }

    const deliveryTypeHandlingObservable: Observable<boolean> =
      this.transactionDetails.deliveryInfo?.type ===
      OpfQuickBuyDeliveryType.PICKUP
        ? this.cartHandlerService
            .setDeliveryMode(OpfQuickBuyDeliveryType.PICKUP.toLocaleLowerCase())
            .pipe(
              switchMap(() => {
                return this.cartHandlerService.setBillingAddress(
                  this.convertAppleToOpfAddress(billingContact)
                );
              })
            )
        : this.cartHandlerService
            .setDeliveryAddress(
              this.convertAppleToOpfAddress(
                shippingContact as ApplePayJS.ApplePayPaymentContact
              )
            )
            .pipe(
              tap((addrId: string) => {
                this.recordDeliveryAddress(addrId);
              }),
              switchMap(() => {
                return this.cartHandlerService.setBillingAddress(
                  this.convertAppleToOpfAddress(billingContact)
                );
              })
            );

    return deliveryTypeHandlingObservable.pipe(
      switchMap(() => this.cartHandlerService.getCurrentCartId()),
      switchMap((cartId: string) => {
        const encryptedToken = btoa(
          JSON.stringify(applePayPayment.token.paymentData)
        );

        return this.opfPaymentFacade.submitPayment({
          additionalData: [],
          paymentSessionId: '',
          callbackArray: [() => {}, () => {}, () => {}],
          paymentMethod: PaymentMethod.APPLE_PAY,
          encryptedToken,
          cartId,
        });
      })
    );
  }

  protected updateApplePayForm(total: { amount: string; label: string }) {
    return {
      newTotal: {
        amount: total.amount,
        label: total.label,
      },
    };
  }

  protected updateApplePayFormWithError(
    message: string,
    code = 'unknown'
  ): { code: string; message: string } {
    return {
      code,
      message,
    };
  }
}

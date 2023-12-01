/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Address, Product, WindowRef } from '@spartacus/core';
import { Observable, of, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OpfCartHandlerService } from '@spartacus/opf/base/core';
import {
  ActiveConfiguration,
  LocalCart,
  OpfOtpFacade,
  OpfPaymentFacade,
  PaymentMethod,
} from '@spartacus/opf/base/root';

import { ApplePaySessionFactory } from './apple-pay-session/apple-pay-session.factory';
import { ApplePayObservableFactory } from './observable/apple-pay-observable.factory';

export interface ApplePaySessionVerificationRequest {
  cartId: string;
  validationUrl: string;
  initiative: 'web';
  initiativeContext: string;
}

export interface ApplePaySessionVerificationResponse {
  epochTimestamp: number;
  expiresAt: number;
  merchantSessionIdentifier: string;
  nonce: string;
  merchantIdentifier: string;
  domainName: string;
  displayName: string;
  signature: string;
}

@Injectable()
export class ApplePayService {
  protected applePaySession = inject(ApplePaySessionFactory);
  protected applePayObservable = inject(ApplePayObservableFactory);
  protected winRef = inject(WindowRef);
  protected http = inject(HttpClient);
  protected opfOtpFacade = inject(OpfOtpFacade);
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected cartHandlerService = inject(OpfCartHandlerService);

  inProgress = false;

  protected localCart: LocalCart = {
    quantity: 0,
    product: undefined,
    addressIds: [],
    isPdp: true,
    total: {
      label: '',
      amount: '',
    },
  };

  isApplePaySupported$(merchantIdentifier: string): Observable<boolean> {
    return this.applePaySession.canMakePayments() &&
      this.applePaySession.supportsVersion(3)
      ? this.applePaySession.canMakePaymentsWithActiveCard(merchantIdentifier)
      : of(false);
  }

  protected initLocalCart(product: Product, quantity: number): LocalCart {
    return {
      quantity,
      product,
      addressIds: [],
      isPdp: true,
      total: {
        amount: '' + (product.price?.value as number) * quantity,
        label:
          quantity > 1
            ? `${product?.name as string} x ${quantity as number}`
            : `${product?.name as string}`,
      },
    };
  }

  start(
    product: Product,
    quantity: number,
    activeConfiguration: ActiveConfiguration
  ): Observable<ApplePayJS.ApplePayPaymentAuthorizationResult> {
    if (this.inProgress) {
      return throwError(new Error('Apple Pay is already in progress'));
    }
    this.inProgress = true;
    this.localCart = this.initLocalCart(product, quantity);

    const initialRequest: ApplePayJS.ApplePayPaymentRequest = {
      countryCode: activeConfiguration?.acquirerCountryCode ?? 'US',
      currencyCode: product?.price?.currencyIso as string,
      total: {
        amount: this.localCart.total.amount,
        label: this.localCart.total.label,
      },
      shippingMethods: [],
      merchantCapabilities: ['supports3DS'],
      supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
      requiredShippingContactFields: ['email', 'name', 'postalAddress'],
      requiredBillingContactFields: ['email', 'name', 'postalAddress'],
    };

    console.log('Starting ApplePay payment with request', initialRequest);

    return this.applePayObservable
      .make({
        request: initialRequest,
        validateMerchant: (event) =>
          this.handleValidation(event, this.localCart),
        shippingContactSelected: (event) =>
          this.handleShippingContactSelected(event),
        paymentMethodSelected: (event) =>
          this.handlePaymentMethodSelected(event),
        shippingMethodSelected: (event) =>
          this.handleShippingMethodSelected(event),
        paymentAuthorized: (event) => this.handlePaymentAuthorized(event),
      })
      .pipe(
        catchError((error) => {
          return this.cartHandlerService.deleteCurrentCart().pipe(
            tap((success) => console.log('delete cart:', success)),
            switchMap(() => throwError(error))
          );
        }),
        finalize(() => {
          console.log('finalize');
          this.cartHandlerService.deleteUserAddresses(
            this.localCart.addressIds
          );
          this.inProgress = false;
        })
      );
  }

  protected handleValidation(
    event: ApplePayJS.ApplePayValidateMerchantEvent,
    cart: LocalCart
  ): Observable<any> {
    return this.addProductToCart(
      cart?.product as Product,
      cart.quantity as number
    ).pipe(switchMap(() => this.validateOpfAppleSession(event)));
  }

  private addProductToCart(product: Product, quantity: number) {
    console.log('addProductToCart');
    if (product.code) {
      return this.cartHandlerService.deleteCurrentCart().pipe(
        switchMap(() => {
          return this.cartHandlerService.addProductToCart(
            product.code as string,
            quantity
          );
        })
      );
    }
    return throwError('product has no ID');
  }

  private validateOpfAppleSession(
    event: ApplePayJS.ApplePayValidateMerchantEvent,
    cartId = ''
  ) {
    return this.cartHandlerService.getCartandUser().pipe(
      switchMap(([activeCartId, userId, _]: [string, string, boolean]) => {
        cartId = activeCartId ?? 'current';
        return this.opfOtpFacade.generateOtpKey(userId, cartId);
      }),
      filter((response) => Boolean(response?.accessCode)),
      take(1),
      concatMap(({ accessCode: otpKey }) => {
        const verificationRequest: ApplePaySessionVerificationRequest = {
          cartId,
          validationUrl: event.validationURL,
          initiative: 'web',
          initiativeContext: (this.winRef?.nativeWindow as any).location
            ?.hostname,
        };
        console.log(
          'Veryfing ApplyPay session with request',
          verificationRequest
        );

        return this.verifyApplePaySession(verificationRequest, otpKey);
      })
    );
  }

  protected convertAppleToOpfAddress(
    addr: ApplePayJS.ApplePayPaymentContact,
    partial?: boolean
  ) {
    const opfAddr = {
      firstName: partial ? 'xxxx' : addr?.givenName,
      lastName: partial ? 'xxxx' : addr?.familyName,
      line1: partial ? 'xxxx' : addr?.addressLines?.[0],
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
    } as Address;
    console.log('opfAddr', opfAddr);
    return opfAddr;
  }

  protected handleShippingContactSelected(
    _event: ApplePayJS.ApplePayShippingContactSelectedEvent
  ): Observable<any> {
    console.log('handleShippingContactSelected', _event);

    const partialAddress: Address = this.convertAppleToOpfAddress(
      _event.shippingContact,
      true
    );

    const result: ApplePayJS.ApplePayShippingContactUpdate = {
      newTotal: {
        amount: this.localCart.total.amount,
        label: this.localCart.total.label,
      },
      newLineItems: [
        {
          amount: this.localCart.total.amount,
          label: this.localCart.total.label,
        },
      ],
    };

    return this.cartHandlerService.setDeliveryAddress(partialAddress).pipe(
      tap((addrId) => {
        this.recordDeliveryAddress(addrId);
      }),
      switchMap(() => this.cartHandlerService.getSupportedDeliveryModes()),
      take(1),
      map((modes) => {
        if (!modes.length) {
          return of(result);
        }
        console.log('modes', modes);
        const newShippingMethods = modes.map((mode) => {
          return {
            identifier: mode.code as string,
            label: mode.name as string,
            amount: (mode.deliveryCost?.value as number).toFixed(2),
            detail: '',
          };
        });
        result.newShippingMethods = newShippingMethods;
        return result;
      }),
      switchMap(() => {
        return this.cartHandlerService.getCurrentCartTotalPrice();
      }),
      switchMap((price) => {
        console.log('newTotalPrice', price);
        if (price) {
          this.localCart.total.amount = '' + price;
          result.newTotal.amount = '' + price;
        }
        return of(result);
      })
    );
  }

  protected handlePaymentMethodSelected(
    _event: ApplePayJS.ApplePayPaymentMethodSelectedEvent
  ): Observable<any> {
    console.log('handlePaymentMethodSelected');
    const result: ApplePayJS.ApplePayPaymentMethodUpdate = {
      newTotal: {
        amount: this.localCart.total.amount,
        label: this.localCart.total.label,
      },
      newLineItems: [
        {
          amount: this.localCart.total.amount,
          label: this.localCart.total.label,
        },
      ],
    };
    return of(result);
  }

  protected handleShippingMethodSelected(
    _event: ApplePayJS.ApplePayShippingMethodSelectedEvent
  ): Observable<any> {
    console.log('handleShippingAddressSelected');

    const result: ApplePayJS.ApplePayShippingContactUpdate = {
      newTotal: {
        amount: this.localCart.total.amount,
        label: this.localCart.total.label,
      },
      newLineItems: [
        {
          amount: this.localCart.total.amount,
          label: this.localCart.total.label,
        },
      ],
    };

    return this.cartHandlerService
      .setDeliveryMode(_event.shippingMethod.identifier)
      .pipe(
        switchMap((selectedMode) => {
          console.log('new delivery mode set', selectedMode);
          return this.cartHandlerService.getCurrentCart();
        }),
        take(1),
        switchMap((cart) => {
          console.log('cart', cart);
          result.newTotal.amount = '' + cart.totalPrice?.value;
          return of(result);
        })
      );
  }

  protected handlePaymentAuthorized(
    event: ApplePayJS.ApplePayPaymentAuthorizedEvent
  ): Observable<ApplePayJS.ApplePayPaymentAuthorizationResult> {
    console.log('Product', this.localCart?.product);
    console.log('handlePaymentAuthorized', event);

    const result: ApplePayJS.ApplePayPaymentAuthorizationResult = {
      status: this.applePaySession.STATUS_SUCCESS,
    };

    return this.placeOrderAfterPayment(event.payment).pipe(
      map((success) => {
        return success
          ? result
          : { ...result, status: this.applePaySession.STATUS_FAILURE };
      }),
      catchError((error) => {
        return of({
          ...result,
          status: this.applePaySession.STATUS_FAILURE,
          errors: [
            {
              code: 'unknown',
              message: error?.message ?? 'payment error',
            },
          ],
        } as ApplePayJS.ApplePayPaymentAuthorizationResult);
      })
    );
  }

  fetchDeliveryModes() {
    return this.cartHandlerService.checkStableCart().pipe(
      switchMap(() => {
        return this.cartHandlerService.getSupportedDeliveryModes();
      }),
      take(1),
      switchMap((modes) => {
        console.log('modes', modes);
        const result = modes.map((mode) => {
          const applePayMethod: ApplePayJS.ApplePayShippingMethod = {
            identifier: mode.code as string,
            label: mode.name as string,
            amount: (mode.deliveryCost?.value as number).toFixed(2),
            detail: '',
          };
          return applePayMethod;
        });
        return of(result);
      })
    );
  }

  verifyApplePaySession(
    request: ApplePaySessionVerificationRequest,
    otpKey: string
  ): Observable<ApplePaySessionVerificationResponse> {
    return this.http.post<ApplePaySessionVerificationResponse>(
      `https://opf-iss-d0.api.commerce.stage.context.cloud.sap/commerce-cloud-adapter/storefront/electronics-spa/payments/apple-pay-web-sessions`,
      request,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Content-Language': 'en-US',
          'sap-commerce-cloud-public-key':
            'ab4RhYGZ+w5B0SALMPOPlepWk/kmDQjTy2FU5hrQoFg=',
          'sap-commerce-cloud-access-code': otpKey,
        }),
      }
    );
  }

  protected recordDeliveryAddress(addrId: string) {
    if (!this.localCart.addressIds?.includes(addrId)) {
      this.localCart.addressIds?.push(addrId);
    }
    console.log('localCart.addresses', this.localCart.addressIds);
  }

  protected placeOrderAfterPayment(
    applePayPayment: ApplePayJS.ApplePayPayment
  ): Observable<boolean> {
    if (!applePayPayment) {
      return of(false);
    }
    const { shippingContact, billingContact } = applePayPayment;
    console.log('billingContact', billingContact);
    if (!shippingContact || !billingContact) {
      throw 'Contact empty';
    }

    return this.cartHandlerService
      .setDeliveryAddress(this.convertAppleToOpfAddress(shippingContact))
      .pipe(
        tap((addrId) => {
          this.recordDeliveryAddress(addrId);
        }),
        switchMap(() => {
          return this.cartHandlerService.setBillingAddress(
            this.convertAppleToOpfAddress(billingContact)
          );
        }),
        switchMap(() => this.cartHandlerService.getCurrentCartId()),
        switchMap((cartId) => {
          const encryptedToken = btoa(
            JSON.stringify(applePayPayment.token.paymentData)
          );

          return this.opfPaymentFacade.submitPayment({
            additionalData: [],
            paymentSessionId: '',
            cartId,
            callbackArray: [() => {}, () => {}, () => {}],

            paymentMethod: PaymentMethod.APPLE_PAY,
            encryptedToken,
          });
        })
      );
  }
}

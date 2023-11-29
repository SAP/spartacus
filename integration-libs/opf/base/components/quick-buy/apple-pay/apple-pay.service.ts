/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable } from '@angular/core';
import { Address, Product } from '@spartacus/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  finalize,
  map,
  switchMap,
  take,
} from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WINDOW_TOKEN } from '@spartacus/opf/base/core';
import {
  LocalCart,
  OpfOtpFacade,
  OpfPaymentFacade,
  PaymentMethod,
} from '@spartacus/opf/base/root';
import { CartHandlerService } from '../cart-handler.service';
import { ApplePaySessionFactory } from './apple-pay-session/apple-pay-session.factory';
import { ApplePayAuthorizationResult } from './observable/apple-pay-observable-config.interface';
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

const merchantIdentifier = 'merchant.com.adyen.upscale.test';

@Injectable()
export class ApplePayService {
  availableChange: Observable<boolean>;
  configuredChange: Observable<boolean>;

  inProgress = false;

  // protected configState = new ApplePayConfigState();

  // protected product: Product;
  protected localCart: LocalCart = {
    quantity: 0,
    product: undefined,
    addresses: [],
    isPsp: true,
    total: {
      label: '',
      amount: '',
    },
  };

  isApplePayAvailable$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // get available(): boolean {
  //   return this.configState.available;
  // }

  // get configured(): boolean {
  //   return this.configState.configured;
  // }

  constructor(
    protected applePaySession: ApplePaySessionFactory,
    protected applePayObservable: ApplePayObservableFactory,
    @Inject(WINDOW_TOKEN) private window: Window,
    protected http: HttpClient,
    protected opfOtpFacade: OpfOtpFacade,
    protected opfPaymentFacade: OpfPaymentFacade,
    protected cartHandlerService: CartHandlerService
  ) {
    //  this.configState.applePayAvailable(applePayAvailable);
    // if (applePayAvailable) {
    //   applePaySession
    //     .canMakePaymentsWithActiveCard(merchantIdentifier)
    //     .subscribe(
    //       (canMakePayments) => {
    //         console.log('CanMakePayments', canMakePayments);
    //         // this.configState.canMakePaymentsWithActiveCard(canMakePayments);
    //       },
    //       (error) => {
    //         console.log('CanMakePayments error', error);
    //         //  this.configState.canMakePaymentsWithActiveCard(false);
    //       }
    //     );
    // }
  }

  isApplePaySupported$(): Observable<boolean> {
    return this.applePaySession.canMakePayments() &&
      this.applePaySession.supportsVersion(3)
      ? this.applePaySession.canMakePaymentsWithActiveCard(merchantIdentifier)
      : of(false);
  }

  start(product: Product, quantity: number): Observable<boolean> {
    this.localCart.quantity = quantity;
    this.localCart.product = product;
    this.localCart.addresses = [];
    this.localCart.isPsp = true;
    this.localCart.total.amount =
      '' + (product.price?.value as number) * quantity;
    this.localCart.total.label = `${product?.name as string} x ${
      quantity as number
    }`;

    console.log(' this.localCart.product', this.localCart?.product);

    if (this.inProgress) {
      return throwError(new Error('Apple Pay is already in progress'));
    }

    this.inProgress = true;

    const request: ApplePayJS.ApplePayPaymentRequest = {
      countryCode: 'US',
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

    console.log('Starting ApplePay payment with request', request);

    return this.applePayObservable
      .make({
        request,
        validateMerchant: (event) =>
          this.handleValidation(event, this.localCart),
        shippingContactSelected: (event) =>
          this.handleShippingContactSelected(event),
        paymentMethodSelected: (event) =>
          this.handlePaymentMethodSelected(event),
        shippingMethodSelected: (event) =>
          this.handleShippingMethodSelected(event),
        paymentAuthorized: (event) => this.handlePaymentAuthorized(event),
        paymentCanceled: () => this.handlePaymentCanceled(),
      })
      .pipe(
        switchMap((payment, _) => this.placeOrderAfterPayment(payment)),
        catchError((error) => {
          return this.cartHandlerService
            .deleteCurrentCart()
            .pipe(switchMap(() => throwError(error)));
          // this.cartHandlerService.deleteCurrentCart().subscribe((success) => {
          //   console.log('deleteCurrentCart', success);
          // });
          // return throwError(error);
        }),
        finalize(() => {
          console.log('finalize');
          this.inProgress = false;
        })
      );
  }

  protected handlePaymentCanceled(): Observable<boolean> {
    // this.removeProductFromCart();
    console.log('handlePaymentCanceled');
    return this.cartHandlerService.deleteCurrentCart();
    // .subscribe((success) => {
    //   console.log('handlePaymentCanceled deleteCurrentCart', success);
    // });
    //  this.inProgress = false;
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
      return this.cartHandlerService.addProductToCart(product.code, quantity);
    }
    return throwError('product has no ID');

    // if (this.product.code) {
    //   this.activeCartFacade.addEntry(this.product.code as string, 1);
    // }
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
          initiativeContext: this.window.location?.hostname,
        };
        console.log(
          'Veryfing ApplyPay session with request',
          verificationRequest
        );

        return this.verifyApplePaySession(verificationRequest, otpKey);
      })
    );
  }

  protected handleShippingContactSelected(
    _event: ApplePayJS.ApplePayShippingContactSelectedEvent
  ): Observable<any> {
    console.log('handleShippingContactSelected', _event);

    const address: Address = {
      email: _event.shippingContact.emailAddress,
      firstName: 'xxxx',
      lastName: 'xxxx',
      line1: !!_event.shippingContact?.addressLines?.length
        ? _event.shippingContact.addressLines[0]
        : 'xxxx',
      town: _event.shippingContact.locality,
      postalCode: _event.shippingContact.postalCode,
      country: {
        isocode: _event.shippingContact.countryCode,
        name: _event.shippingContact.country,
      },
      defaultAddress: false,
      shippingAddress: false,
      phone: _event.shippingContact.phoneNumber,
      visibleInAddressBook: false,
    };
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

    return this.cartHandlerService.setDeliveryAddress(address).pipe(
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
    console.log('ApplePay payment method update', result);
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

    // return of(result);

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
  ): Observable<ApplePayAuthorizationResult> {
    console.log('Product', this.localCart?.product);
    console.log('handlePaymentAuthorized', event);
    const payment = event.payment;

    const result: ApplePayJS.ApplePayPaymentAuthorizationResult = {
      status: this.applePaySession.STATUS_SUCCESS,
    };

    this.inProgress = false;

    return of({
      authResult: result,
      payment: payment,
    });
  }

  fetchDeliveryModes() {
    // this.activeCartFacade.addEmail('flolete@letlet.com');

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
          // 'Authorization': opfConfig.opf.paymentServiceBearerToken,
          'Content-Language': 'en-US',
          'sap-commerce-cloud-public-key':
            'ab4RhYGZ+w5B0SALMPOPlepWk/kmDQjTy2FU5hrQoFg=',
          'sap-commerce-cloud-access-code': otpKey,
        }),
      }
    );
    // .pipe(wrapErrorsAsErrorSchema());
  }

  protected placeOrderAfterPayment(
    applePayPayment: ApplePayJS.ApplePayPayment
  ): Observable<boolean> {
    if (!applePayPayment) {
      return of(false);
    }
    const { shippingContact, billingContact } = applePayPayment;
    console.log('billingContact', billingContact);
    const shippingAddress: Address = {
      id: '',
      firstName: shippingContact?.givenName,
      lastName: shippingContact?.familyName,
      line1: shippingContact?.addressLines?.[0],
      line2: shippingContact?.addressLines?.[1],
      email: shippingContact?.emailAddress,
      town: shippingContact?.locality,
      district: shippingContact?.administrativeArea,
      postalCode: shippingContact?.postalCode,
      phone: shippingContact?.phoneNumber,
      country: {
        isocode: shippingContact?.countryCode,
        name: shippingContact?.country,
      },
      defaultAddress: false,
    };
    const billingAddress: Address = {
      firstName: billingContact?.givenName,
      lastName: billingContact?.familyName,
      line1: billingContact?.addressLines?.[0],
      line2: billingContact?.addressLines?.[1],
      email: billingContact?.emailAddress,
      town: billingContact?.locality,
      district: billingContact?.administrativeArea,
      postalCode: billingContact?.postalCode,
      phone: billingContact?.phoneNumber,
      country: {
        isocode: billingContact?.countryCode,
        name: billingContact?.country,
      },
      defaultAddress: true,
    };
    return this.cartHandlerService
      .updateCurrentCartDeliveryAddress(shippingAddress)
      .pipe(
        switchMap(() => {
          return this.cartHandlerService.setBillingAddress(billingAddress);
        }),
        switchMap(() => this.cartHandlerService.getCurrentCartId()),
        switchMap((cartId) => {
          const encryptedToken = btoa(
            JSON.stringify(applePayPayment.token.paymentData)
          );
          // return of(true);
          return this.opfPaymentFacade.submitPayment({
            additionalData: [],
            paymentSessionId: '',
            cartId,
            callbackArray: [() => {}, () => {}, () => {}],

            paymentMethod: PaymentMethod.APPLE_PAY,
            encryptedToken: encryptedToken,
          });
        })
      );
  }
}

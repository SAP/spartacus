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
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { OpfCartHandlerService } from '@spartacus/opf/base/core';
import {
  ApplePaySessionVerificationRequest,
  ApplePaySessionVerificationResponse,
  LocalCart,
  OpfPaymentFacade,
  PaymentMethod,
} from '@spartacus/opf/base/root';

import { ApplePaySessionFactory } from './apple-pay-session/apple-pay-session.factory';
import { ApplePayObservableFactory } from './observable/apple-pay-observable.factory';

@Injectable()
export class ApplePayService {
  protected applePaySession = inject(ApplePaySessionFactory);
  protected applePayObservable = inject(ApplePayObservableFactory);
  protected winRef = inject(WindowRef);
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected cartHandlerService = inject(OpfCartHandlerService);

  protected paymentInProgress = false;
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
    acquirerCountryCode?: string
  ): Observable<ApplePayJS.ApplePayPaymentAuthorizationResult> {
    if (this.paymentInProgress) {
      return throwError('Error: Apple Pay is already in progress');
    }
    this.paymentInProgress = true;
    this.localCart = this.initLocalCart(product, quantity);
    const initialRequest: ApplePayJS.ApplePayPaymentRequest = {
      countryCode: acquirerCountryCode ?? 'US',
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

    return this.applePayObservable
      .initApplePayEventsHandler({
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
          return this.cartHandlerService
            .deleteCurrentCart()
            .pipe(switchMap(() => throwError(error)));
        }),
        finalize(() => {
          this.cartHandlerService.deleteUserAddresses([
            ...this.localCart.addressIds,
          ]);
          this.paymentInProgress = false;
        })
      );
  }

  protected handleValidation(
    event: ApplePayJS.ApplePayValidateMerchantEvent,
    localCart: LocalCart
  ): Observable<any> {
    if (!localCart?.product || !localCart?.quantity) {
      return throwError('Error: empty product or quantity');
    }
    return this.addProductToCart(
      localCart.product as Product,
      localCart.quantity as number
    ).pipe(switchMap(() => this.validateOpfAppleSession(event)));
  }

  protected addProductToCart(product: Product, quantity: number) {
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
    return throwError('Error: product has no ID');
  }

  protected validateOpfAppleSession(
    event: ApplePayJS.ApplePayValidateMerchantEvent,
    cartId = ''
  ) {
    return this.cartHandlerService.getCurrentCartId().pipe(
      switchMap((activeCartId) => {
        cartId = activeCartId ?? 'current';
        const verificationRequest: ApplePaySessionVerificationRequest = {
          cartId,
          validationUrl: event.validationURL,
          initiative: 'web',
          initiativeContext: (this.winRef?.nativeWindow as any).location
            ?.hostname,
        };
        return this.verifyApplePaySession(verificationRequest);
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
    return opfAddr;
  }

  protected handleShippingContactSelected(
    _event: ApplePayJS.ApplePayShippingContactSelectedEvent
  ): Observable<any> {
    const partialAddress: Address = this.convertAppleToOpfAddress(
      _event.shippingContact,
      true
    );

    const result: ApplePayJS.ApplePayShippingContactUpdate =
      this.updateApplePayForm({ ...this.localCart.total });

    return this.cartHandlerService.setDeliveryAddress(partialAddress).pipe(
      tap((addrId) => {
        this.recordDeliveryAddress(addrId);
      }),
      switchMap(() => this.cartHandlerService.getSupportedDeliveryModes()),
      take(1),
      map((modes) => {
        if (!modes.length) {
          return of({
            ...result,
            errors: [
              this.updateApplePayFormWithError('No shipment methods available'),
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
      switchMap((price) => {
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
    const result: ApplePayJS.ApplePayPaymentMethodUpdate =
      this.updateApplePayForm({ ...this.localCart.total });
    return of(result);
  }

  protected handleShippingMethodSelected(
    _event: ApplePayJS.ApplePayShippingMethodSelectedEvent
  ): Observable<any> {
    const result: ApplePayJS.ApplePayShippingContactUpdate =
      this.updateApplePayForm({ ...this.localCart.total });

    return this.cartHandlerService
      .setDeliveryMode(_event.shippingMethod.identifier)
      .pipe(
        switchMap(() => this.cartHandlerService.getCurrentCart()),
        take(1),
        switchMap((cart) => {
          result.newTotal.amount = '' + cart.totalPrice?.value;
          return of(result);
        })
      );
  }

  protected handlePaymentAuthorized(
    event: ApplePayJS.ApplePayPaymentAuthorizedEvent
  ): Observable<ApplePayJS.ApplePayPaymentAuthorizationResult> {
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
            this.updateApplePayFormWithError(error?.message ?? 'Payment error'),
          ],
        } as ApplePayJS.ApplePayPaymentAuthorizationResult);
      })
    );
  }

  verifyApplePaySession(
    request: ApplePaySessionVerificationRequest
  ): Observable<ApplePaySessionVerificationResponse> {
    return this.opfPaymentFacade.getApplePayWebSession(request);
  }

  protected recordDeliveryAddress(addrId: string): void {
    if (!this.localCart.addressIds?.includes(addrId)) {
      this.localCart.addressIds?.push(addrId);
    }
  }

  protected placeOrderAfterPayment(
    applePayPayment: ApplePayJS.ApplePayPayment
  ): Observable<boolean> {
    if (!applePayPayment) {
      return of(false);
    }
    const { shippingContact, billingContact } = applePayPayment;
    if (!shippingContact || !billingContact) {
      throw 'Empty Contact';
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

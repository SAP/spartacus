import { Inject, Injectable } from '@angular/core';
import { Address, Product, UserIdService } from '@spartacus/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  of,
  throwError,
} from 'rxjs';
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
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutDeliveryModesFacade,
} from '@spartacus/checkout/base/root';
import { WINDOW_TOKEN } from '@spartacus/opf/base/core';
import { OpfOtpFacade } from '@spartacus/opf/base/root';
import { ApplePaySessionFactory } from './apple-pay-session/apple-pay-session.factory';
import { ApplePayAuthorizationResult } from './observable/apple-pay-observable-config.interface';
import { ApplePayObservableFactory } from './observable/apple-pay-observable.factory';
import { ApplePayConfigState } from './utils/apple-pay-config-state.model';

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

  protected configState = new ApplePayConfigState();

  protected product: Product;

  get available(): boolean {
    return this.configState.available;
  }

  get configured(): boolean {
    return this.configState.configured;
  }

  protected canMakePaymentSubject: BehaviorSubject<string> =
    new BehaviorSubject('not init');

  canMakePayment$ = this.canMakePaymentSubject.asObservable();

  constructor(
    protected applePaySession: ApplePaySessionFactory,
    protected applePayObservable: ApplePayObservableFactory,
    @Inject(WINDOW_TOKEN) private window: Window,
    protected http: HttpClient,
    protected opfOtpFacade: OpfOtpFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade
  ) {
    this.availableChange = this.configState.availableChange;
    this.configuredChange = this.configState.configuredChange;

    if (!applePaySession.canMake) {
      this.canMakePaymentSubject.next('no applePay API');
      return;
    }

    let applePayAvailable: boolean;
    try {
      applePayAvailable =
        applePaySession.canMakePayments() && applePaySession.supportsVersion(3);
    } catch (err) {
      applePayAvailable = false;
    }
    if (!applePaySession.canMakePayments()) {
      this.canMakePaymentSubject.next('fail on canMakePayments ');
      return;
    }
    if (
      !applePaySession.supportsVersion(3) &&
      applePaySession.canMakePayments()
    ) {
      this.canMakePaymentSubject.next('fail on supportsVersion 3');
      return;
    }

    this.configState.applePayAvailable(applePayAvailable);

    if (applePayAvailable) {
      applePaySession
        .canMakePaymentsWithActiveCard(merchantIdentifier)
        .subscribe(
          (canMakePayments) => {
            console.log('CanMakePayments', canMakePayments);
            this.canMakePaymentSubject.next(
              canMakePayments
                ? 'success'
                : 'fail on canMakePaymentsWithActiveCard'
            );
            this.configState.canMakePaymentsWithActiveCard(canMakePayments);
          },
          (error) => {
            this.canMakePaymentSubject.next(
              'error on canMakePaymentsWithActiveCard'
            );
            console.log('CanMakePayments error', error);
            this.configState.canMakePaymentsWithActiveCard(false);
          }
        );
    }
  }

  start(
    product: Product
  ): Observable<{ product: Product; payment: ApplePayJS.ApplePayPayment }> {
    if (this.inProgress) {
      return throwError(new Error('Apple Pay is already in progress'));
    }

    this.product = product;

    this.inProgress = true;

    const request: ApplePayJS.ApplePayPaymentRequest = {
      countryCode: 'US',
      currencyCode: product?.price?.currencyIso as string,
      total: {
        amount: `${product?.price?.value}`,
        label: product?.name as string,
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
        validateMerchant: (event) => this.handleValidation(event),
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
        map((payment) => {
          this.inProgress = false;
          return { payment: payment, product: product };
        }),
        finalize(() => {
          this.removeProductFromCart();
          this.inProgress = false;
        })
      );
  }

  protected handlePaymentCanceled(): void {
    this.removeProductFromCart();
    this.inProgress = false;
  }

  protected handleValidation(
    event: ApplePayJS.ApplePayValidateMerchantEvent
  ): Observable<any> {
    this.addProductToCart();

    return this.validateOpfAppleSession(event);
  }

  private addProductToCart() {
    console.log('addProductToCart');
    if (this.product.code) {
      this.activeCartFacade.addEntry(this.product.code as string, 1);
    }
  }

  private validateOpfAppleSession(
    event: ApplePayJS.ApplePayValidateMerchantEvent,
    cartId = ''
  ) {
    return combineLatest([
      this.activeCartFacade.getActiveCartId(),
      this.userIdService.getUserId(),
      this.activeCartFacade.isStable(),
    ]).pipe(
      filter(
        ([_, userId, isStable]: [string, string, boolean]) =>
          !!userId && isStable
      ),
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

  removeProductFromCart() {
    console.log('removeProductFromCart');
    if (this.product.code) {
      this.activeCartFacade
        .getLastEntry(this.product.code)
        .pipe(take(1))
        .subscribe((entry) => {
          if (entry) {
            this.activeCartFacade.removeEntry(entry);
          }
        });
    }
  }

  protected handleShippingContactSelected(
    _event: ApplePayJS.ApplePayShippingContactSelectedEvent
  ): Observable<any> {
    console.log('handleShippingContactSelected', _event);
    const result: ApplePayJS.ApplePayShippingContactUpdate = {
      newTotal: {
        amount: `${this.product?.price?.value}`,
        label: this.product.name as string,
      },
      newLineItems: [
        {
          amount: `${this.product?.price?.value}`,
          label: this.product.name as string,
        },
      ],
    };
    // return of(result);
    // return this.fetchDeliveryModes().pipe(
    //   take(1),
    //   switchMap((newShippingMethods) => {
    //     if (!newShippingMethods.length) {
    //       return of(result);
    //     }
    //     result.newShippingMethods = newShippingMethods;
    //     return of(result);
    //   })
    // );
    return this.setDeliveryaddress(_event.shippingContact).pipe(
      switchMap(() => this.fetchDeliveryModes()),
      switchMap((newShippingMethods) => {
        if (!newShippingMethods.length) {
          return of(result);
        }
        result.newShippingMethods = newShippingMethods;
        return of(result);
      }),
      take(1),
      switchMap((success) => {
        console.log('setDeliveryaddress set', success);
        return this.activeCartFacade.getActive();
      }),
      switchMap((cart) => {
        console.log('setDeliveryaddress cart', cart);
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
        amount: `${this.product?.price?.value}`,
        label: this.product.name as string,
      },
      newLineItems: [
        {
          amount: `${this.product?.price?.value}`,
          label: this.product.name as string,
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
        amount: `${this.product?.price?.value}`,
        label: this.product.name as string,
      },
      newLineItems: [
        {
          amount: `${this.product?.price?.value}`,
          label: this.product.name as string,
        },
      ],
    };

    // return of(result);

    return this.checkoutDeliveryModesFacade
      .setDeliveryMode(_event.shippingMethod.identifier)
      .pipe(
        switchMap(() =>
          this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState()
        ),
        filter((state) => !state.error && !state.loading),
        map((state) => state.data),
        map((data) => !!(data && Object.keys(data).length)),
        switchMap((success) => {
          console.log('new delivery mode set', success);
          return this.activeCartFacade.getActive();
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
    console.log('Product', this.product);
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

    return this.activeCartFacade.isStable().pipe(
      filter((isStable) => !!isStable),
      switchMap(() => this.activeCartFacade.isGuestCart()),
      switchMap((isGuest) => {
        console.log('isGuest', isGuest);
        return this.checkoutDeliveryModesFacade.getSupportedDeliveryModes();
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

  setDeliveryaddress(contact: ApplePayJS.ApplePayPaymentContact) {
    console.log('setDeliveryaddress contact', contact);
    // this.userAddressService.addUserAddress(address)
    // combineLatest([
    //          this.userAddressService.getAddresses(),
    //          this.userAddressService.getAddressesLoadedSuccess(),
    //        ]).pipe(
    //         switchMap(addr,)
    //        )
    const _address: Address = {
      email: contact.emailAddress,
      firstName: 'xxxx',
      lastName: 'xxxx',
      line1: !!contact?.addressLines?.length ? contact.addressLines[0] : 'xxxx',
      town: contact.locality,
      postalCode: contact.postalCode,
      country: {
        isocode: contact.countryCode,
        name: contact.country,
      },
      defaultAddress: true,
      shippingAddress: true,
      phone: contact.phoneNumber,
      visibleInAddressBook: false,
    };
    return this.checkoutDeliveryAddressFacade
      .createAndSetAddress(_address)
      .pipe(
        catchError((error) => {
          console.log('catch error', error);
          return throwError(error);
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
}

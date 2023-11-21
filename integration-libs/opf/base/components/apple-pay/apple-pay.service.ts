import { Inject, Injectable } from '@angular/core';
import { Product, UserIdService } from '@spartacus/core';
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
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ActiveCartFacade,
  Cart,
  MultiCartFacade,
  ProductData,
} from '@spartacus/cart/base/root';
import { WINDOW_TOKEN } from '@spartacus/opf/base/core';
import { OpfOtpFacade } from '@spartacus/opf/base/root';
import { CurrentProductService } from '@spartacus/storefront';
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

  private configState = new ApplePayConfigState();

  private product: Product;
  cartId = '';

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
    private applePaySession: ApplePaySessionFactory,
    private applePayObservable: ApplePayObservableFactory,
    @Inject(WINDOW_TOKEN) private window: Window,
    private http: HttpClient,
    protected opfOtpFacade: OpfOtpFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected currentProductService: CurrentProductService,

    protected multiCartService: MultiCartFacade
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

  start(product: Product): Observable<{
    product: Product;
    payment: ApplePayJS.ApplePayPayment;
    cartId: string;
  }> {
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
      requiredShippingContactFields: [
        'email',
        'name',
        'phone',
        'postalAddress',
      ],
      requiredBillingContactFields: ['email', 'name', 'phone', 'postalAddress'],
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
        tap(() => {
          console.log('complete tap');
          // check payment
          // route to order confirmation
          // next
        }),
        map((payment) => ({
          payment: payment,
          product: product,
          cartId: this.cartId,
        })),
        catchError((err) => {
          console.log('in catch error');
          // this.removeProductFromCart();
          this.inProgress = false;
          throw err;
        })
      );
  }

  private handlePaymentCanceled(): void {
    this.inProgress = false;
  }

  protected createCart(productData: ProductData): Observable<string> {
    console.log('createCart');
    let _userId = '';
    return this.userIdService.takeUserId().pipe(
      switchMap((userId: string) => {
        console.log('userId', userId);
        _userId = userId;
        return this.multiCartService
          .createCart({
            userId,
            extraData: { active: false },
          })
          .pipe(
            map((cart: Cart) => {
              console.log('cart created', cart);
              return _userId === 'current'
                ? (cart.code as string)
                : (cart.guid as string);
            }),
            tap((cartId: string) => {
              console.log('addEntry on ', cartId);
              return this.multiCartService.addEntry(
                userId,
                cartId,
                productData.productCode,
                productData.quantity
              );
            })
          );
      })
    );
  }

  private addProductToCart() {
    console.log('addProductToCart');
    // if (this.product.code) {
    //   this.activeCartFacade
    //     .getLastEntry(this.product.code)
    //     .subscribe((entry) => {
    //       if (entry) {
    //         this.activeCartFacade.addEntry(
    //           this.product.code as string,
    //           entry.quantity as number
    //         );
    //       }
    //     });
    // }
    const producData = {
      productCode: this.product?.code as string,
      quantity: 1,
    };
    return this.createCart(producData);
    // .subscribe((value) => {
    //   console.log('createCart subscribe', value);
    // });
    // this.activeCartFacade.addEntry(this.product?.code as string, 1);
    // return this.currentProductService.getProduct().pipe(
    //   take(1),
    //   tap((product) => {
    //     console.log('addEntry');
    //     this.activeCartFacade.addEntry(this.product?.code as string, 1);
    //   })
    // );
  }

  removeProductFromCart() {
    console.log('removeProductFromCart');
    // if (this.product.code) {
    //   this.activeCartFacade
    //     .getLastEntry(this.product.code)
    //     .subscribe((entry) => {
    //       if (entry) {
    //         this.activeCartFacade.removeEntry(entry);
    //       }
    //     });
    // }
  }

  private validateOpfAppleSession(
    event: ApplePayJS.ApplePayValidateMerchantEvent,
    cartId = ''
  ) {
    return combineLatest([
      this.userIdService.getUserId(),
      this.multiCartService.isStable(cartId),
    ]).pipe(
      filter(([userId, isStable]: [string, boolean]) => !!userId && isStable),
      switchMap(([userId, _]: [string, boolean]) => {
        // cartId = activeCartId ?? 'current';
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

  private handleValidation(
    event: ApplePayJS.ApplePayValidateMerchantEvent
  ): Observable<any> {
    // let cartId = '';
    console.log('handleValidation');
    // this.addProductToCart();
    // return this.addProductToCart$().pipe(
    //   concatMap(() => {
    return this.addProductToCart().pipe(
      take(1),
      switchMap((cartId) => {
        this.cartId = cartId;
        return this.validateOpfAppleSession(event, cartId);
      })
    );
    //  })
    //);
    // return combineLatest([
    //   this.userIdService.getUserId(),
    //   this.activeCartFacade.getActiveCartId(),
    // ]).pipe(
    //   filter(([userId, _]: [string, string]) => !!userId),
    //   switchMap(([userId, activeCartId]: [string, string]) => {
    //     cartId = activeCartId ?? 'current';
    //     return this.opfOtpFacade.generateOtpKey(userId, activeCartId);
    //   }),
    //   filter((response) => Boolean(response?.accessCode)),
    //   take(1),
    //   concatMap(({ accessCode: otpKey }) => {
    //     cartId;
    //     const verificationRequest: ApplePaySessionVerificationRequest = {
    //       cartId,
    //       validationUrl: event.validationURL,
    //       initiative: 'web',
    //       initiativeContext: this.window.location?.hostname,
    //     };
    //     console.log(
    //       'Veryfing ApplyPay session with request',
    //       verificationRequest
    //     );

    //     return this.verifyApplePaySession(verificationRequest, otpKey);
    //   })
    // );
    // return this.verifyApplePaySession(verificationRequest);
  }

  private handleShippingContactSelected(
    _event: ApplePayJS.ApplePayShippingContactSelectedEvent
  ): Observable<any> {
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
      newShippingMethods: [
        // TODO ?
      ],
    };
    console.log('ApplePay shipping contact update', result);
    return of(result);
  }

  private handlePaymentMethodSelected(
    _event: ApplePayJS.ApplePayPaymentMethodSelectedEvent
  ): Observable<any> {
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

  private handleShippingMethodSelected(
    _event: ApplePayJS.ApplePayShippingMethodSelectedEvent
  ): Observable<any> {
    const result: ApplePayJS.ApplePayShippingMethodUpdate = {
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
    console.log('ApplePay shipping method update', result);
    return of(result);
  }

  private handlePaymentAuthorized(
    event: ApplePayJS.ApplePayPaymentAuthorizedEvent
  ): Observable<ApplePayAuthorizationResult> {
    console.log('Product', this.product);
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

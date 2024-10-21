/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  DEFAULT_AUTHORIZATION_ERROR_RETRIES_COUNT,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  HttpResponseStatus,
  RoutingService,
  UserIdService,
  backOff,
  isAuthorizationError,
} from '@spartacus/core';

import {
  OpfMetadataStoreService,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { OPF_PAYMENT_AND_REVIEW_SEMANTIC_ROUTE } from '@spartacus/opf/checkout/root';
import {
  OpfPaymentFacade,
  OpfRenderPaymentMethodEvent,
  PaymentPattern,
  PaymentSessionData,
} from '@spartacus/opf/payment/root';
import { OrderFacade } from '@spartacus/order/root';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  of,
  throwError,
} from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class OpfCheckoutPaymentWrapperService {
  protected lastPaymentOptionId?: number;

  protected activeCartId?: string;

  protected renderPaymentMethodEvent$ =
    new BehaviorSubject<OpfRenderPaymentMethodEvent>({
      isLoading: false,
      isError: false,
    });

  constructor(
    protected opfPaymentFacade: OpfPaymentFacade,
    protected opfResourceLoaderService: OpfResourceLoaderService,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected orderFacade: OrderFacade,
    protected opfMetadataStoreService: OpfMetadataStoreService,
    protected cartAccessCodeFacade: CartAccessCodeFacade
  ) {}

  protected executeScriptFromHtml(html: string): void {
    /**
     * Verify first if customer is still on the payment and review page.
     * Then execute script extracted from HTML to render payment provider gateway.
     */
    this.routingService
      .getRouterState()
      .pipe(
        take(1),
        filter(
          (route) =>
            route.state.semanticRoute === OPF_PAYMENT_AND_REVIEW_SEMANTIC_ROUTE
        )
      )
      .subscribe(() => {
        setTimeout(() => {
          this.opfResourceLoaderService.executeScriptFromHtml(html);
        });
      });
  }

  getRenderPaymentMethodEvent(): Observable<OpfRenderPaymentMethodEvent> {
    return this.renderPaymentMethodEvent$.asObservable();
  }

  initiatePayment(
    paymentOptionId: number
  ): Observable<PaymentSessionData | Error> {
    this.lastPaymentOptionId = paymentOptionId;
    this.renderPaymentMethodEvent$.next({
      isLoading: true,
      isError: false,
    });
    this.opfResourceLoaderService.clearAllProviderResources();

    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartService.getActiveCartId(),
    ]).pipe(
      tap(() =>
        this.opfMetadataStoreService.updateOpfMetadata({
          isPaymentInProgress: true,
        })
      ),
      switchMap(([userId, cartId]: [string, string]) => {
        this.activeCartId = cartId;
        return this.cartAccessCodeFacade.getCartAccessCode(userId, cartId);
      }),
      filter((response) => Boolean(response?.accessCode)),
      map(({ accessCode: otpKey }) =>
        this.setPaymentInitiationConfig(otpKey, paymentOptionId)
      ),
      switchMap((params) => this.opfPaymentFacade.initiatePayment(params)),
      tap((paymentOptionConfig: PaymentSessionData | Error) => {
        if (!(paymentOptionConfig instanceof Error)) {
          this.storePaymentSessionId(paymentOptionConfig);
          this.renderPaymentGateway(paymentOptionConfig);
        }
      }),
      catchError((err) => this.handlePaymentInitiationError(err)),
      backOff({
        /**
         * We should retry this sequence only if the error is an authorization error.
         * It means that `accessCode` (OTP signature) is not valid or expired and we need to refresh it.
         */
        shouldRetry: isAuthorizationError,
        maxTries: DEFAULT_AUTHORIZATION_ERROR_RETRIES_COUNT,
      }),
      take(1)
    );
  }

  protected storePaymentSessionId(paymentOptionConfig: PaymentSessionData) {
    const paymentSessionId =
      paymentOptionConfig.pattern === PaymentPattern.FULL_PAGE &&
      paymentOptionConfig.paymentSessionId
        ? paymentOptionConfig.paymentSessionId
        : undefined;
    this.opfMetadataStoreService.updateOpfMetadata({ paymentSessionId });
  }

  reloadPaymentMode(): void {
    if (this.lastPaymentOptionId) {
      this.initiatePayment(this.lastPaymentOptionId).subscribe();
    }
  }

  renderPaymentGateway(config: PaymentSessionData) {
    if (config?.destination) {
      this.renderPaymentMethodEvent$.next({
        isLoading: false,
        isError: false,
        renderType: config?.pattern,
        data: config?.destination.url,
        destination: config?.destination,
      });
    }

    if (
      config?.dynamicScript &&
      config?.pattern === PaymentPattern.HOSTED_FIELDS
    ) {
      const html = config?.dynamicScript?.html;

      this.opfResourceLoaderService
        .loadProviderResources(
          config.dynamicScript.jsUrls,
          config.dynamicScript.cssUrls
        )
        .then(() => {
          this.renderPaymentMethodEvent$.next({
            isLoading: false,
            isError: false,
            renderType: config?.pattern,
            data: html,
          });

          if (html) {
            this.executeScriptFromHtml(html);
          }
        });
    }
  }

  protected handlePaymentInitiationError(
    err: HttpErrorModel
  ): Observable<Error> {
    if (isAuthorizationError(err)) {
      return throwError(() => err);
    }

    return Number(err.status) === HttpResponseStatus.CONFLICT
      ? this.handlePaymentAlreadyDoneError()
      : this.handleGeneralPaymentError();
  }

  protected handlePaymentAlreadyDoneError(): Observable<Error> {
    return this.orderFacade.placePaymentAuthorizedOrder(true).pipe(
      catchError(() => {
        this.onPlaceOrderError();

        // If place order will fail after two attempts, we wan't to stop stream and show error message
        return of();
      }),
      switchMap(() => {
        this.onPlaceOrderSuccess();

        return throwError('Payment already done');
      })
    );
  }

  protected onPlaceOrderSuccess(): void {
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }

  protected onPlaceOrderError(): void {
    this.renderPaymentMethodEvent$.next({
      ...this.renderPaymentMethodEvent$.value,
      isError: true,
    });

    this.showErrorMessage('opfCheckout.errors.unknown');
    this.routingService.go({ cxRoute: OPF_PAYMENT_AND_REVIEW_SEMANTIC_ROUTE });
  }

  protected handleGeneralPaymentError(): Observable<Error> {
    this.renderPaymentMethodEvent$.next({
      ...this.renderPaymentMethodEvent$.value,
      isError: true,
    });

    this.showErrorMessage('opfPayment.errors.proceedPayment');

    return throwError('Payment failed');
  }

  protected showErrorMessage(errorMessage: string): void {
    this.globalMessageService.add(
      {
        key: errorMessage,
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  protected setPaymentInitiationConfig(
    otpKey: string,
    paymentOptionId: number
  ) {
    return {
      otpKey,
      config: {
        configurationId: String(paymentOptionId),
        cartId: this.activeCartId,
        resultURL: this.routingService.getFullUrl({
          cxRoute: 'paymentVerificationResult',
        }),
        cancelURL: this.routingService.getFullUrl({
          cxRoute: 'paymentVerificationCancel',
        }),
      },
    };
  }
}

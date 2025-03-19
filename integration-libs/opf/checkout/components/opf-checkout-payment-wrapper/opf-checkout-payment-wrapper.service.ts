/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
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
  WindowRef,
  backOff,
  isAuthorizationError,
} from '@spartacus/core';

import {
  OpfMetadataStoreService,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { OPF_PAYMENT_AND_REVIEW_SEMANTIC_ROUTE } from '@spartacus/opf/checkout/root';
import { getBrowserInfo } from '@spartacus/opf/payment/core';
import {
  OpfPaymentBrowserInfo,
  OpfPaymentFacade,
  OpfPaymentRenderMethodEvent,
  OpfPaymentRenderPattern,
  OpfPaymentSessionData,
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
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected userIdService = inject(UserIdService);
  protected activeCartService = inject(ActiveCartFacade);
  protected routingService = inject(RoutingService);
  protected globalMessageService = inject(GlobalMessageService);
  protected orderFacade = inject(OrderFacade);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected cartAccessCodeFacade = inject(CartAccessCodeFacade);
  protected winRef = inject(WindowRef);

  protected lastPaymentOptionId?: number;

  protected renderPaymentMethodEvent$ =
    new BehaviorSubject<OpfPaymentRenderMethodEvent>({
      isLoading: false,
      isError: false,
    });

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

  getRenderPaymentMethodEvent(): Observable<OpfPaymentRenderMethodEvent> {
    return this.renderPaymentMethodEvent$.asObservable();
  }

  initiatePayment(
    paymentOptionId: number
  ): Observable<OpfPaymentSessionData | Error> {
    this.lastPaymentOptionId = paymentOptionId;
    this.renderPaymentMethodEvent$.next({
      isLoading: true,
      isError: false,
    });
    this.opfResourceLoaderService.clearAllResources();

    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartService.getActiveCartId(),
    ]).pipe(
      tap(() =>
        this.opfMetadataStoreService.updateOpfMetadata({
          isPaymentInProgress: true,
        })
      ),
      switchMap(([userId, cartId]: [string, string]) =>
        this.cartAccessCodeFacade.getCartAccessCode(userId, cartId).pipe(
          filter((response) => Boolean(response?.accessCode)),
          map(({ accessCode: otpKey }) =>
            this.getPaymentInitiationConfig(
              cartId,
              otpKey,
              paymentOptionId,
              getBrowserInfo(this.winRef?.nativeWindow)
            )
          )
        )
      ),
      switchMap((params) => this.opfPaymentFacade.initiatePayment(params)),
      tap((paymentOptionConfig: OpfPaymentSessionData | Error) => {
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

  protected storePaymentSessionId(paymentOptionConfig: OpfPaymentSessionData) {
    const paymentSessionId =
      paymentOptionConfig.pattern === OpfPaymentRenderPattern.FULL_PAGE &&
      paymentOptionConfig.paymentSessionId
        ? paymentOptionConfig.paymentSessionId
        : undefined;
    this.opfMetadataStoreService.updateOpfMetadata({
      opfPaymentSessionId: paymentSessionId,
    });
  }

  reloadPaymentMode(): void {
    if (this.lastPaymentOptionId) {
      this.initiatePayment(this.lastPaymentOptionId).subscribe();
    }
  }

  /**
   * Render payment option covering the three patterns: IFRAME, FULL_PAGE, HOSTED_FIELDS.
   * Context to explain this method logic:
   * All three patterns can contains `dynamicScript` value.
   * IFRAME and FULL_PAGE patterns can also have `destination` value.
   * if `dynamicScript` and `destination` are present in same config, dynamicScript takes precendence.
   * @param config
   * @returns : none, OpfPaymentRenderMethodEvent gets emitted
   */
  renderPaymentGateway(config: OpfPaymentSessionData) {
    if (config?.dynamicScript) {
      const html = config?.dynamicScript?.html;

      this.opfResourceLoaderService
        .loadResources(
          config.dynamicScript.jsUrls,
          config.dynamicScript.cssUrls
        )
        .then(() => {
          this.renderPaymentMethodEvent$.next({
            isLoading: false,
            isError: false,
            renderType: config?.pattern,
            html,
          });

          if (html) {
            this.executeScriptFromHtml(html);
          }
        })
        .catch(() => {
          this.handleGeneralPaymentError().pipe(take(1)).subscribe();
        });
      return;
    }
    if (config?.destination) {
      this.renderPaymentMethodEvent$.next({
        isLoading: false,
        isError: false,
        renderType: config?.pattern,
        destination: config?.destination,
      });
      return;
    }
    this.handleGeneralPaymentError().pipe(take(1)).subscribe();
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

        return throwError(() => 'Payment already done');
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

  protected getPaymentInitiationConfig(
    cartId: string,
    otpKey: string,
    paymentOptionId: number,
    browserInfo?: OpfPaymentBrowserInfo
  ) {
    return {
      otpKey,
      config: {
        cartId,
        browserInfo,
        configurationId: String(paymentOptionId),
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

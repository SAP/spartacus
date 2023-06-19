/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartService } from '@spartacus/cart/base/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  HttpResponseStatus,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { OpfOrderFacade, OpfService } from '@spartacus/opf/base/root';
import { OpfResourceLoaderService } from '@spartacus/opf/checkout/core';
import {
  OpfCheckoutFacade,
  OpfOtpFacade,
  OpfPaymentMethodType,
  OpfRenderPaymentMethodEvent,
  PaymentSessionData,
} from '@spartacus/opf/checkout/root';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
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
    protected opfCheckoutService: OpfCheckoutFacade,
    protected opfOtpService: OpfOtpFacade,
    protected opfResourceLoaderService: OpfResourceLoaderService,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected opfOrderFacade: OpfOrderFacade,
    protected opfService: OpfService,
    protected winRef: WindowRef
  ) {}

  protected readonly CHECKOUT_REVIEW_SEMANTIC_ROUTE = 'checkoutReviewOrder';

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
            route.state.semanticRoute === this.CHECKOUT_REVIEW_SEMANTIC_ROUTE
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

    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartService.getActiveCartId(),
    ]).pipe(
      tap(() =>
        this.opfService.updateOpfMetadataState({
          paymentProcessingState: true,
        })
      ),
      switchMap(([userId, cartId]: [string, string]) => {
        this.activeCartId = cartId;
        return this.opfOtpService.generateOtpKey(userId, cartId);
      }),
      filter((response) => Boolean(response?.value)),
      map(({ value: otpKey }) =>
        this.setPaymentInitiationConfig(otpKey, paymentOptionId)
      ),
      switchMap((params) => this.opfCheckoutService.initiatePayment(params)),
      tap((paymentOptionConfig: PaymentSessionData | Error) => {
        if (!(paymentOptionConfig instanceof Error)) {
          this.renderPaymentGateway(paymentOptionConfig);
        }
      }),
      catchError((err: HttpErrorModel) =>
        this.handlePaymentInitiationError(err)
      ),
      take(1)
    );
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
        renderType: OpfPaymentMethodType.DESTINATION,
        data: config?.destination.url,
      });
    }

    if (config?.dynamicScript) {
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
            renderType: OpfPaymentMethodType.DYNAMIC_SCRIPT,
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
    return Number(err.status) === HttpResponseStatus.CONFLICT
      ? this.handlePaymentAlreadyDoneError()
      : this.handleGeneralPaymentError();
  }

  protected handlePaymentAlreadyDoneError(): Observable<Error> {
    return this.opfOrderFacade.placeOpfOrder(true).pipe(
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

    this.showErrorMessage('opf.checkout.errors.unknown');
    this.routingService.go({ cxRoute: 'checkoutReviewOrder' });
  }

  protected handleGeneralPaymentError(): Observable<Error> {
    this.renderPaymentMethodEvent$.next({
      ...this.renderPaymentMethodEvent$.value,
      isError: true,
    });

    this.showErrorMessage('opf.checkout.errors.proceedPayment');

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

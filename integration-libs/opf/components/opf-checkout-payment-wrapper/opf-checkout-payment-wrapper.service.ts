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
} from '@spartacus/core';
import { OpfResourceLoaderService } from '@spartacus/opf/core';
import {
  OpfCheckoutFacade,
  OpfOrderFacade,
  OpfOtpFacade,
  OpfPaymentMethodType,
  OpfRenderPaymentMethodEvent,
  PaymentSessionData,
} from '@spartacus/opf/root';
import { OpfPaymentVerificationService } from 'integration-libs/opf/root/components/opf-payment-verification';

import { BehaviorSubject, combineLatest, EMPTY, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class OpfCheckoutPaymentWrapperService {
  constructor(
    protected opfCheckoutService: OpfCheckoutFacade,
    protected opfOtpService: OpfOtpFacade,
    protected opfResourceLoaderService: OpfResourceLoaderService,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected opfOrderFacade: OpfOrderFacade,
    protected paymentService: OpfPaymentVerificationService
  ) {}

  protected activeCartId: string;

  protected renderPaymentMethodEvent$ =
    new BehaviorSubject<OpfRenderPaymentMethodEvent>({
      isLoading: false,
      isError: false,
    });

  getRenderPaymentMethodEvent(): Observable<OpfRenderPaymentMethodEvent> {
    return this.renderPaymentMethodEvent$.asObservable();
  }

  initiatePayment(
    paymentOptionId: number
  ): Observable<PaymentSessionData | boolean> {
    this.renderPaymentMethodEvent$.next({
      isLoading: true,
      isError: false,
    });

    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartService.getActiveCartId(),
    ]).pipe(
      switchMap(([userId, cartId]) => {
        this.activeCartId = cartId;
        return this.opfOtpService.generateOtpKey(userId, cartId);
      }),
      filter((response) => Boolean(response?.value)),
      map(({ value: otpKey }) =>
        this.setPaymentInitiationConfig(otpKey, paymentOptionId)
      ),
      switchMap((params) => this.opfCheckoutService.initiatePayment(params)),
      catchError((err: HttpErrorModel) =>
        this.handlePaymentInitiationError(err)
      )
    );
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
          setTimeout(() => {
            this.opfResourceLoaderService.executeScriptFromHtml(html);
          });
        });
    }
  }

  protected handlePaymentInitiationError(
    err: HttpErrorModel
  ): Observable<boolean> {
    return Number(err.status) === HttpResponseStatus.CONFLICT
      ? this.handlePaymentAlreadyDoneError()
      : this.handleGeneralPaymentError();
  }

  protected handlePaymentAlreadyDoneError(): Observable<boolean> {
    return this.opfOrderFacade.placeOpfOrder(true).pipe(
      catchError(() => {
        this.onPlaceOrderError();

        return EMPTY;
      }),
      switchMap(() => {
        this.onPlaceOrderSuccess();

        return of(false);
      })
    );
  }

  protected onPlaceOrderSuccess(): void {
    this.paymentService.goToPage('orderConfirmation');
  }

  protected onPlaceOrderError(): void {
    this.renderPaymentMethodEvent$.next({
      ...this.renderPaymentMethodEvent$.value,
      isError: true,
    });

    this.showErrorMessage('opf.checkout.errors.unknown');
    this.paymentService.goToPage('checkoutReviewOrder');
  }

  protected handleGeneralPaymentError(): Observable<boolean> {
    this.renderPaymentMethodEvent$.next({
      ...this.renderPaymentMethodEvent$.value,
      isError: true,
    });

    this.showErrorMessage('opf.checkout.errors.proceedPayment');

    return of(false);
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

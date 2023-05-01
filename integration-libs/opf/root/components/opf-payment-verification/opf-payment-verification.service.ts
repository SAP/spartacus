/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  RoutingService,
} from '@spartacus/core';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OpfCheckoutFacade, OpfOrderFacade } from '../../facade';
import {
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
  OpfPaymenVerificationUrlInput,
  OpfResponseMapElement,
} from '../../model';

@Injectable({
  providedIn: 'root',
})
export class OpfPaymentVerificationService {
  constructor(
    protected opfOrderFacade: OpfOrderFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected opfCheckoutService: OpfCheckoutFacade
  ) {}

  defaultError: HttpErrorModel = {
    statusText: 'VERIFICATION_ERROR',
    message: 'opf.checkout.errors.proceedPayment',
  };

  getOpfResponseMap(params: Params): OpfResponseMapElement[] {
    if (!params) {
      return [];
    }
    return Object.entries(params).map((pair) => {
      return { key: pair[0], value: pair[1] as string };
    });
  }

  findInOpfResponseMap(
    key: string,
    list: OpfResponseMapElement[]
  ): string | undefined {
    return list.find((pair) => pair.key === key)?.value ?? undefined;
  }
  goToPage(cxRoute: string) {
    return this.routingService.go({ cxRoute });
  }

  verifyResultUrl(route: ActivatedRoute): Observable<{
    paymentSessionId: string;
    responseMap: OpfResponseMapElement[];
  }> {
    return route?.routeConfig?.data?.cxRoute === 'paymentVerificationResult'
      ? route.queryParams.pipe(
          switchMap((params: Params) => {
            if (!params) {
              return throwError(this.defaultError);
            }

            const responseMap: OpfResponseMapElement[] =
              this.getOpfResponseMap(params);

            const paymentSessionId = this.findInOpfResponseMap(
              OpfPaymenVerificationUrlInput.PAYMENT_SESSION_ID,
              responseMap
            );
            if (!paymentSessionId) {
              return throwError(this.defaultError);
            }
            return of({
              paymentSessionId,
              responseMap,
            });
          })
        )
      : throwError({
          ...this.defaultError,
          message: 'opf.checkout.errors.cancelPayment',
        });
  }

  placeOrder() {
    return this.opfOrderFacade.placeOpfOrder(true);
  }

  verifyPayment(
    paymentSessionId: string,
    responseMap: OpfResponseMapElement[]
  ): Observable<boolean> {
    return this.opfCheckoutService
      .verifyPayment(paymentSessionId, {
        responseMap: [...responseMap],
      })
      .pipe(
        switchMap((response: OpfPaymentVerificationResponse) =>
          this.isPaymentSuccessful(response)
        )
      );
  }

  isPaymentSuccessful(response: OpfPaymentVerificationResponse) {
    if (
      response.result === OpfPaymentVerificationResult.AUTHORIZED ||
      response.result === OpfPaymentVerificationResult.DELAYED
    ) {
      return of(true);
    } else if (response.result === OpfPaymentVerificationResult.CANCELLED) {
      return throwError({
        ...this.defaultError,
        message: 'opf.checkout.errors.cancelPayment',
      });
    } else {
      return throwError(this.defaultError);
    }
  }

  displayError(error: HttpErrorModel | undefined) {
    console.log('displayError', error);
    this.globalMessageService.add(
      {
        key: error?.message ?? 'opf.checkout.errors.proceedPayment',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
}

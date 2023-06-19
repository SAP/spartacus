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
import { Order } from '@spartacus/order/root';
import { Observable, of, throwError } from 'rxjs';
import { concatMap, filter, take } from 'rxjs/operators';
import { OpfOrderFacade, OpfPaymentFacade } from '../../facade';
import {
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
  OpfPaymenVerificationUrlInput,
  OpfResponseMapElement,
} from '../../model';
import { OpfPaymentMetadata } from '../../model/opf.model';
import { OpfService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class OpfPaymentVerificationService {
  constructor(
    protected opfOrderFacade: OpfOrderFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected opfCheckoutService: OpfPaymentFacade,
    protected opfService: OpfService
  ) {}

  defaultError: HttpErrorModel = {
    statusText: 'Payment Verification Error',
    message: 'opf.payment.errors.proceedPayment',
    status: -1,
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
  goToPage(cxRoute: string): void {
    this.routingService.go({ cxRoute });
  }

  verifyResultUrl(route: ActivatedRoute): Observable<{
    paymentSessionId: string;
    responseMap: OpfResponseMapElement[];
  }> {
    return route?.routeConfig?.data?.cxRoute === 'paymentVerificationResult'
      ? route.queryParams.pipe(
          concatMap((params: Params) => {
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
          message: 'opf.payment.errors.cancelPayment',
        });
  }

  placeOrder(): Observable<Order> {
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
        concatMap((response: OpfPaymentVerificationResponse) =>
          this.isPaymentSuccessful(response)
        )
      );
  }

  isPaymentSuccessful(
    response: OpfPaymentVerificationResponse
  ): Observable<boolean> {
    if (
      response.result === OpfPaymentVerificationResult.AUTHORIZED ||
      response.result === OpfPaymentVerificationResult.DELAYED
    ) {
      return of(true);
    } else if (response.result === OpfPaymentVerificationResult.CANCELLED) {
      return throwError({
        ...this.defaultError,
        message: 'opf.payment.errors.cancelPayment',
      });
    } else {
      return throwError(this.defaultError);
    }
  }

  displayError(error: HttpErrorModel | undefined): void {
    this.globalMessageService.add(
      {
        key:
          error?.message && error?.status === -1
            ? error.message
            : 'opf.payment.errors.proceedPayment',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  checkIfProcessingCartIdExist(): void {
    this.opfService
      .getOpfMetadataState()
      .pipe(
        take(1),
        filter(
          (opfPaymentMetadata: OpfPaymentMetadata) =>
            opfPaymentMetadata.paymentProcessingState === false
        )
      )
      .subscribe(() => {
        this.goToPage('cart');

        this.globalMessageService.add(
          {
            key: 'httpHandlers.cartNotFound',
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }
}

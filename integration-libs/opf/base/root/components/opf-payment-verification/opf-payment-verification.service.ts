/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  RoutingService,
} from '@spartacus/core';

import { Order } from '@spartacus/order/root';
import { Observable, from, of, throwError } from 'rxjs';
import { concatMap, filter, take } from 'rxjs/operators';
import {
  OpfGlobalFunctionsFacade,
  OpfOrderFacade,
  OpfPaymentFacade,
} from '../../facade';
import {
  OpfPaymenVerificationUrlInput,
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
  OpfResponseMapElement,
} from '../../model';
import {
  AfterRedirectDynamicScript,
  OpfPaymentMetadata,
} from '../../model/opf.model';
import { OpfService } from '../../services';
import { OpfResourceLoaderService } from '../../services/opf-resource-loader.service';

@Injectable({
  providedIn: 'root',
})
export class OpfPaymentVerificationService {
  constructor(
    protected opfOrderFacade: OpfOrderFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected opfCheckoutService: OpfPaymentFacade,
    protected opfService: OpfService,
    protected opfResourceLoaderService: OpfResourceLoaderService,
    protected globalFunctionsService: OpfGlobalFunctionsFacade
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
    afterRedirectScriptFlag: string | undefined;
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
              afterRedirectScriptFlag: this.findInOpfResponseMap(
                'afterRedirectScriptFlag',
                responseMap
              ),
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
            opfPaymentMetadata.isPaymentInProgress === false
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

  protected executeScriptFromHtml(html: string): void {
    this.opfResourceLoaderService.executeScriptFromHtml(html);
  }

  runHostedFieldsPattern(
    paymentSessionId: string,
    vcr: ViewContainerRef
  ): Observable<boolean> {
    this.globalFunctionsService.registerGlobalFunctions(paymentSessionId, vcr);

    return this.opfCheckoutService.afterRedirectScripts(paymentSessionId).pipe(
      concatMap((response) => {
        if (!response?.afterRedirectScript) {
          return throwError(this.defaultError);
        }
        return from(
          this.renderAfterRedirectScripts(response.afterRedirectScript)
        );
      })
    );
  }

  renderAfterRedirectScripts(script: AfterRedirectDynamicScript) {
    console.log('flo3', script);

    const html = script?.html;

    return new Promise((resolve: (value: boolean) => void) => {
      this.opfResourceLoaderService
        .loadProviderResources(script.jsUrls, script.cssUrls)
        .then(() => {
          if (html) {
            this.executeScriptFromHtml(html);
            resolve(true);
          }
        })
        .catch((error) => {
          console.log(error);
          resolve(false);
        });
    });
  }
}

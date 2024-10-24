/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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

import {
  OpfDynamicScript,
  OpfMetadataModel,
  OpfMetadataStoreService,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import {
  GlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
} from '@spartacus/opf/global-functions/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable, from, of, throwError } from 'rxjs';
import { concatMap, filter, map, take, tap } from 'rxjs/operators';
import { OpfPaymentFacade } from '../../facade';
import {
  KeyValuePair,
  OpfPage,
  OpfPaymenVerificationUrlInput,
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
} from '../../model';

@Injectable({
  providedIn: 'root',
})
export class OpfPaymentVerificationService {
  constructor(
    protected orderFacade: OrderFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected opfPaymentFacade: OpfPaymentFacade,
    protected opfMetadataStoreService: OpfMetadataStoreService,
    protected opfResourceLoaderService: OpfResourceLoaderService,
    protected globalFunctionsService: OpfGlobalFunctionsFacade
  ) {}

  defaultError: HttpErrorModel = {
    statusText: 'Payment Verification Error',
    message: 'opfPayment.errors.proceedPayment',
    status: -1,
  };

  protected getParamsMap(params: Params): Array<KeyValuePair> {
    return params
      ? Object.entries(params).map((pair) => {
          return { key: pair[0], value: pair[1] as string };
        })
      : [];
  }

  protected findInParamsMap(
    key: string,
    list: Array<KeyValuePair>
  ): string | undefined {
    return list.find((pair) => pair.key === key)?.value ?? undefined;
  }
  goToPage(cxRoute: string): void {
    this.routingService.go({ cxRoute });
  }

  verifyResultUrl(route: ActivatedRoute): Observable<{
    paymentSessionId: string;
    paramsMap: Array<KeyValuePair>;
    afterRedirectScriptFlag: string | undefined;
  }> {
    let paramsMap: Array<KeyValuePair>;
    return route?.routeConfig?.data?.cxRoute === OpfPage.RESULT_PAGE
      ? route.queryParams.pipe(
          concatMap((params: Params) => {
            paramsMap = this.getParamsMap(params);
            return this.getPaymentSessionId(paramsMap);
          }),
          concatMap((paymentSessionId: string | undefined) => {
            if (!paymentSessionId) {
              return throwError(this.defaultError);
            }
            return of({
              paymentSessionId,
              paramsMap,
              afterRedirectScriptFlag: this.findInParamsMap(
                'afterRedirectScriptFlag',
                paramsMap
              ),
            });
          })
        )
      : throwError({
          ...this.defaultError,
          message: 'opfPayment.errors.cancelPayment',
        });
  }

  protected getPaymentSessionId(
    paramMap: Array<KeyValuePair>
  ): Observable<string | undefined> {
    if (paramMap?.length) {
      const paymentSessionId = this.findInParamsMap(
        OpfPaymenVerificationUrlInput.PAYMENT_SESSION_ID,
        paramMap
      );
      return paymentSessionId
        ? of(paymentSessionId)
        : this.getPaymentSessionIdFromStorage();
    }
    return this.getPaymentSessionIdFromStorage();
  }

  protected getPaymentSessionIdFromStorage(): Observable<string | undefined> {
    return this.opfMetadataStoreService.getOpfMetadataState().pipe(
      take(1),
      map((opfMetaData) => opfMetaData?.paymentSessionId)
    );
  }

  protected placeOrder(): Observable<Order> {
    return this.orderFacade.placePaymentAuthorizedOrder(true);
  }

  protected verifyPayment(
    paymentSessionId: string,
    responseMap: Array<KeyValuePair>
  ): Observable<boolean> {
    return this.opfPaymentFacade
      .verifyPayment(paymentSessionId, {
        responseMap: [...responseMap],
      })
      .pipe(
        concatMap((response: OpfPaymentVerificationResponse) =>
          this.isPaymentSuccessful(response)
        )
      );
  }

  protected isPaymentSuccessful(
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
        message: 'opfPayment.errors.cancelPayment',
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
            : 'opfPayment.errors.proceedPayment',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  checkIfProcessingCartIdExist(): void {
    this.opfMetadataStoreService
      .getOpfMetadataState()
      .pipe(
        take(1),
        filter((state: OpfMetadataModel) => state.isPaymentInProgress === false)
      )
      .subscribe(() => {
        this.goToPage(OpfPage.CART_PAGE);

        this.globalMessageService.add(
          {
            key: 'httpHandlers.cartNotFound',
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  runHostedPagePattern(paymentSessionId: string, paramsMap: KeyValuePair[]) {
    return this.verifyPayment(paymentSessionId, paramsMap).pipe(
      concatMap(() => {
        return this.placeOrder();
      }),
      map((order) => !!order),
      tap((success: boolean) => {
        if (success) {
          this.goToPage(OpfPage.CONFIRMATION_PAGE);
        }
      })
    );
  }

  runHostedFieldsPattern(
    domain: GlobalFunctionsDomain,
    paymentSessionId: string,
    vcr: ViewContainerRef,
    paramsMap: Array<KeyValuePair>
  ): Observable<boolean> {
    this.globalFunctionsService.registerGlobalFunctions({
      domain,
      paymentSessionId,
      vcr,
      paramsMap,
    });

    return this.opfPaymentFacade.afterRedirectScripts(paymentSessionId).pipe(
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

  protected renderAfterRedirectScripts(
    script: OpfDynamicScript
  ): Promise<boolean> {
    const html = script?.html;

    return new Promise((resolve: (value: boolean) => void) => {
      this.opfResourceLoaderService
        .loadProviderResources(script.jsUrls, script.cssUrls)
        .then(() => {
          if (html) {
            this.opfResourceLoaderService.executeScriptFromHtml(html);
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  removeResourcesAndGlobalFunctions(): void {
    this.globalFunctionsService.removeGlobalFunctions(
      GlobalFunctionsDomain.REDIRECT
    );
    this.opfResourceLoaderService.clearAllProviderResources();
  }
}

/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, ViewContainerRef, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  RoutingService,
} from '@spartacus/core';

import {
  OpfDynamicScript,
  OpfKeyValueMap,
  OpfMetadataModel,
  OpfMetadataStoreService,
  OpfPage,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import {
  OpfGlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
} from '@spartacus/opf/global-functions/root';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable, from, of, throwError } from 'rxjs';
import { concatMap, filter, map, take, tap } from 'rxjs/operators';
import { OpfPaymentFacade } from '../../facade';
import {
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
  OpfPaymentVerificationUrlInput,
} from '../../model';

@Injectable({
  providedIn: 'root',
})
export class OpfPaymentVerificationService {
  protected orderFacade = inject(OrderFacade);
  protected routingService = inject(RoutingService);
  protected globalMessageService = inject(GlobalMessageService);
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected globalFunctionsService = inject(OpfGlobalFunctionsFacade);

  opfDefaultPaymentError: HttpErrorModel = {
    statusText: 'Payment Verification Error',
    message: 'opfPayment.errors.proceedPayment',
    status: -1,
  };

  protected getParamsMap(params: Params): Array<OpfKeyValueMap> {
    return params
      ? Object.entries(params).map((pair) => {
          return { key: pair[0], value: pair[1] as string };
        })
      : [];
  }

  protected findInParamsMap(
    key: string,
    list: Array<OpfKeyValueMap>
  ): string | undefined {
    return list.find((pair) => pair.key === key)?.value ?? undefined;
  }
  goToPage(cxRoute: string): void {
    this.routingService.go({ cxRoute });
  }

  verifyResultUrl(route: ActivatedRoute): Observable<{
    paymentSessionId: string;
    paramsMap: Array<OpfKeyValueMap>;
    afterRedirectScriptFlag: string | undefined;
  }> {
    let paramsMap: Array<OpfKeyValueMap>;
    return route?.routeConfig?.data?.cxRoute === OpfPage.RESULT_PAGE
      ? route.queryParams.pipe(
          concatMap((params: Params) => {
            paramsMap = this.getParamsMap(params);
            return this.getPaymentSessionId(paramsMap);
          }),
          concatMap((paymentSessionId: string | undefined) => {
            if (!paymentSessionId) {
              return throwError(() => this.opfDefaultPaymentError);
            }
            return of({
              paymentSessionId,
              paramsMap: paramsMap.filter(
                (param) =>
                  param.key !==
                  OpfPaymentVerificationUrlInput.OPF_PAYMENT_SESSION_ID
              ),
              afterRedirectScriptFlag: this.findInParamsMap(
                OpfPaymentVerificationUrlInput.OPF_AFTER_REDIRECT_FLAG,
                paramsMap
              ),
            });
          })
        )
      : throwError(() => ({
          ...this.opfDefaultPaymentError,
          message: 'opfPayment.errors.cancelPayment',
        }));
  }

  protected getPaymentSessionId(
    paramMap: Array<OpfKeyValueMap>
  ): Observable<string | undefined> {
    if (paramMap?.length) {
      const paymentSessionId = this.findInParamsMap(
        OpfPaymentVerificationUrlInput.OPF_PAYMENT_SESSION_ID,
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
      map((opfMetaData) => opfMetaData?.opfPaymentSessionId)
    );
  }

  protected placeOrder(): Observable<Order> {
    return this.orderFacade.placePaymentAuthorizedOrder(true);
  }

  protected verifyPayment(
    paymentSessionId: string,
    responseMap: Array<OpfKeyValueMap>
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
      return throwError(() => ({
        ...this.opfDefaultPaymentError,
        message: 'opfPayment.errors.cancelPayment',
      }));
    } else {
      return throwError(() => this.opfDefaultPaymentError);
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

  runHostedPagePattern(paymentSessionId: string, paramsMap: OpfKeyValueMap[]) {
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
    paymentSessionId: string,
    vcr: ViewContainerRef,
    paramsMap: Array<OpfKeyValueMap>
  ): Observable<boolean> {
    this.globalFunctionsService.registerGlobalFunctions({
      domain: OpfGlobalFunctionsDomain.REDIRECT,
      paymentSessionId,
      vcr,
      paramsMap,
    });

    return this.opfPaymentFacade.getAfterRedirectScripts(paymentSessionId).pipe(
      concatMap((response) => {
        if (!response?.afterRedirectScript) {
          return throwError(this.opfDefaultPaymentError);
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
        .loadResources(script.jsUrls, script.cssUrls)
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
    this.globalFunctionsService.unregisterGlobalFunctions(
      OpfGlobalFunctionsDomain.REDIRECT
    );
    this.opfResourceLoaderService.clearAllResources();
  }
}

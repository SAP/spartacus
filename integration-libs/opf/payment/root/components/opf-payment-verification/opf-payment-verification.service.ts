/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, ViewContainerRef, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  RoutingConfigService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';

import {
  OpfDynamicScript,
  OpfHtmlContentMode,
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
import {
  concatMap,
  filter,
  finalize,
  map,
  take,
  tap,
} from 'rxjs/operators';
import { OpfPaymentFacade } from '../../facade';
import {
  OpfPaymentVerificationResponse,
  OpfPaymentVerificationResult,
  OpfPaymentVerificationUrlInput,
} from '../../model';
const OPF_PAYMENT_VERIFICATION_QUERY_SEARCH_KEY =
  'opfPaymentVerificationQuerySearch';

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
  protected winRef = inject(WindowRef);
  protected routingConfigService = inject(RoutingConfigService);

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

  /**
   * Stores the redirect query string before OAuth bootstrap mutates `location.search`.
   */
  captureRedirectQueryString(): void {
    if (!this.winRef.isBrowser()) {
      return;
    }

    const pathname = this.winRef.location.pathname ?? '';
    const isRedirectUrl = [OpfPage.RESULT_PAGE, OpfPage.CANCEL_PAGE].some(
      (routeName) =>
        (this.routingConfigService.getRouteConfig(routeName)?.paths ?? []).some(
          (path) => pathname.endsWith(path.startsWith('/') ? path : `/${path}`)
        )
    );

    if (!isRedirectUrl) {
      return;
    }

    const search = this.winRef.location.search ?? '';
    if (search) {
      this.winRef.sessionStorage?.setItem(
        OPF_PAYMENT_VERIFICATION_QUERY_SEARCH_KEY,
        search
      );
    }
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
    is3DSRedirect?: boolean;
  }> {
    let paramsMap: Array<OpfKeyValueMap>;
    const is3DSRedirect = this.check3DSRedirectState();

    const redirectQueryParams$ = this.winRef.isBrowser()
      ? of(this.getParamsMap(this.getRedirectQueryParams()))
      : route.queryParams.pipe(map((params) => this.getParamsMap(params)));

    return route?.routeConfig?.data?.cxRoute === OpfPage.RESULT_PAGE
      ? redirectQueryParams$.pipe(
          concatMap((parsedParamsMap: Array<OpfKeyValueMap>) => {
            paramsMap = parsedParamsMap;

            if (is3DSRedirect) {
              const storedState = this.get3DSRedirectState();
              if (storedState?.paymentSessionId) {
                return of(storedState.paymentSessionId);
              }
            }

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
                OpfPaymentVerificationUrlInput.OPF_AFTER_REDIRECT_SCRIPT_FLAG,
                paramsMap
              ),
              is3DSRedirect,
            });
          })
        )
      : throwError(() => ({
          ...this.opfDefaultPaymentError,
          message: 'opfPayment.errors.cancelPayment',
        }));
  }

  protected getRedirectQueryParams(): Params {
    const captured = this.winRef.sessionStorage?.getItem(
      OPF_PAYMENT_VERIFICATION_QUERY_SEARCH_KEY
    );

    if (captured) {
      this.winRef.sessionStorage?.removeItem(
        OPF_PAYMENT_VERIFICATION_QUERY_SEARCH_KEY
      );
    }

    const search = captured ?? this.winRef.location.search ?? '';
    if (!search) {
      return {};
    }

    const query = search.startsWith('?') ? search.slice(1) : search;
    const params: Params = {};

    new URLSearchParams(query).forEach((value, key) => {
      params[key] = value;
    });

    return params;
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
        .loadResources(script.jsUrls, script.cssUrls, undefined, script)
        .then(() => {
          if (html && script?.htmlContentMode !== OpfHtmlContentMode.SEPARATE) {
            this.opfResourceLoaderService.executeScriptFromHtml(html);
            resolve(true);
          } else if (html) {
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

  protected check3DSRedirectState(): boolean {
    const metadata = this.opfMetadataStoreService.opfMetadataState?.value;
    return metadata?.is3DSRedirect === true;
  }

  protected get3DSRedirectState(): {
    paymentSessionId: string;
    returnPath: string;
  } | null {
    const metadata = this.opfMetadataStoreService.opfMetadataState?.value;
    if (!metadata?.is3DSRedirect || !metadata?.opfPaymentSessionId) {
      return null;
    }

    return {
      paymentSessionId: metadata.opfPaymentSessionId,
      returnPath: metadata.opf3DSRedirectReturnPath ?? '',
    };
  }

  protected clear3DSRedirectState(): void {
    this.opfMetadataStoreService.updateOpfMetadata({
      is3DSRedirect: false,
      opf3DSRedirectReturnPath: undefined,
    });
  }

  run3DSRedirectPattern(
    paymentSessionId: string,
    paramsMap: Array<OpfKeyValueMap>,
    vcr: ViewContainerRef
  ): Observable<boolean> {
    const storedState = this.get3DSRedirectState();

    this.globalFunctionsService.registerGlobalFunctions({
      domain: OpfGlobalFunctionsDomain.CHECKOUT,
      paymentSessionId,
      vcr,
    });

    return this.opfPaymentFacade
      .submitCompletePayment({
        paymentSessionId,
        additionalData: paramsMap,
        callbacks: {
          onSuccess: () => {},
          onPending: () => {},
          onFailure: () => {},
        },
        returnPath: storedState?.returnPath,
      })
      .pipe(
        finalize(() => {
          this.clear3DSRedirectState();
        })
      );
  }
}

export function captureOpfPaymentVerificationQueryFactory(): () => void {
  const service = inject(OpfPaymentVerificationService);
  return () => service.captureRedirectQueryString();
}

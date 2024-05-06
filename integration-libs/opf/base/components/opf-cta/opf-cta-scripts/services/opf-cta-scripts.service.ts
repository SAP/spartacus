/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  CmsService,
  Product,
  RoutingService,
  WindowRef,
  isNotNullable,
} from '@spartacus/core';
import { Order, OrderFacade, OrderHistoryFacade } from '@spartacus/order/root';
import { Observable, from, of, throwError } from 'rxjs';
import {
  concatMap,
  filter,
  finalize,
  map,
  reduce,
  switchMap,
  take,
} from 'rxjs/operators';

import { OrderEntry } from '@spartacus/cart/base/root';
import {
  CtaScriptsLocation,
  CtaScriptsRequest,
  CtaScriptsResponse,
  GlobalFunctionsDomain,
  OpfDynamicScript,
  OpfPaymentFacade,
  OpfResourceLoaderService,
  PageSemanticRoute,
} from '@spartacus/opf/base/root';
import {
  CurrentProductService,
  ItemCounterService,
} from '@spartacus/storefront';
import { OpfGlobalFunctionsFacade } from '../../../../root/facade';
import { OpfScriptIdentifierService } from './opf-cta-scripts-identifier.service';

@Injectable()
export class OpfCtaScriptsService {
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected orderDetailsService = inject(OrderFacade);
  protected orderHistoryService = inject(OrderHistoryFacade);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected cmsService = inject(CmsService);
  protected currentProductService = inject(CurrentProductService);
  protected itemCounterService = inject(ItemCounterService);
  protected opfScriptIdentifierService = inject(OpfScriptIdentifierService);
  protected routingService = inject(RoutingService);
  protected globalFunctionsService = inject(OpfGlobalFunctionsFacade);
  protected winRef = inject(WindowRef);

  getCtaHtmlsList(): Observable<string[]> {
    return this.fillCtaScriptRequest().pipe(
      switchMap((ctaScriptsRequest) => this.fetchCtaScripts(ctaScriptsRequest)),
      switchMap((scriptslist) => this.runCtaScripts(scriptslist)),
      finalize(() => {
        this.clearResources();
      })
    );
  }

  registerGlobalFns(): void {
    this.globalFunctionsService.registerGlobalFunctions({
      domain: GlobalFunctionsDomain.GLOBAL,
      paymentSessionId: '',
    });
  }

  removeGlobalFns(): void {
    this.globalFunctionsService.removeGlobalFunctions(
      GlobalFunctionsDomain.GLOBAL
    );
  }

  protected clearResources() {
    this.opfResourceLoaderService.clearAllProviderResources();
  }

  protected fetchCtaScripts(
    ctaScriptsRequest: CtaScriptsRequest
  ): Observable<OpfDynamicScript[]> {
    return this.opfPaymentFacade.getCtaScripts(ctaScriptsRequest).pipe(
      concatMap((ctaScriptsResponse: CtaScriptsResponse) => {
        if (!ctaScriptsResponse?.value?.length) {
          return throwError('Invalid CTA Scripts Response');
        }
        const dynamicScripts = ctaScriptsResponse.value.map(
          (ctaScript) => ctaScript.dynamicScript
        );
        return of(dynamicScripts);
      }),
      take(1)
    );
  }

  protected fillCtaScriptRequest() {
    let paymentAccountIds: number[];

    return this.getPaymentAccountIds().pipe(
      concatMap((accIds) => {
        paymentAccountIds = accIds;
        return this.getScriptLocation();
      }),
      concatMap((scriptsLocation: CtaScriptsLocation | undefined) => {
        return this.fillRequestForTargetPage(
          scriptsLocation,
          paymentAccountIds
        );
      })
    );
  }

  protected fillRequestForTargetPage(
    scriptsLocation: CtaScriptsLocation | undefined,
    paymentAccountIds: number[]
  ): Observable<CtaScriptsRequest> {
    if (!scriptsLocation) {
      return throwError('Invalid Script Location');
    }
    const toBeImplementedException = () => throwError('to be implemented');
    const locationToFunctionMap: Record<
      CtaScriptsLocation,
      () => Observable<CtaScriptsRequest>
    > = {
      [CtaScriptsLocation.PDP_QUICK_BUY]: toBeImplementedException,
      [CtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE]: () =>
        this.fillCtaRequestforPagesWithOrder(scriptsLocation),
      [CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE]: () =>
        this.fillCtaRequestforPagesWithOrder(scriptsLocation),
      [CtaScriptsLocation.CART_MESSAGING]: toBeImplementedException,
      [CtaScriptsLocation.CART_QUICK_BUY]: toBeImplementedException,
      [CtaScriptsLocation.CHECKOUT_QUICK_BUY]: toBeImplementedException,
      [CtaScriptsLocation.PDP_MESSAGING]: () =>
        this.fillCtaRequestForPDP(scriptsLocation, paymentAccountIds),
    };

    const selectedFunction = locationToFunctionMap[scriptsLocation];

    return selectedFunction
      ? selectedFunction()
      : throwError('Invalid Script Location');
  }

  protected fillCtaRequestforPagesWithOrder(
    scriptLocation: CtaScriptsLocation
  ): Observable<CtaScriptsRequest> {
    return this.getOrderDetails(scriptLocation).pipe(
      map((order) => {
        const ctaScriptsRequest: CtaScriptsRequest = {
          cartId: '00299267',
          ctaProductItems: this.getProductItems(order as Order),
          scriptLocations: [scriptLocation],
        };

        return ctaScriptsRequest;
      })
    );
  }

  protected fillCtaRequestForPDP(
    scriptLocation: CtaScriptsLocation,
    _paymentAccountIds: number[]
  ) {
    return this.currentProductService.getProduct().pipe(
      filter(isNotNullable),
      map((product: Product) => {
        return {
          additionalData: [
            {
              key: 'locale',
              value: 'en-GB',
            },
            {
              key: 'scriptIdentifier',
              value: this.opfScriptIdentifierService.newScriptIdentifier,
            },
          ],
          orderId: undefined,
          ctaProductItems: [
            {
              productId: product?.code,
              quantity: this.itemCounterService.getCounter(),
            },
          ],
          paymentAccountIds: [59],
          scriptLocations: [scriptLocation],
        } as CtaScriptsRequest;
      })
    );
  }

  protected runCtaScripts(scripts: OpfDynamicScript[]) {
    return from(scripts).pipe(
      concatMap((script) => from(this.loadAndRunScript(script))),
      reduce((loadedList: string[], script) => {
        if (script?.html) {
          loadedList.push(script.html);
        }
        return loadedList;
      }, []),
      map((list) => {
        if (!list.length) {
          return [];
        }
        return this.removeScriptTags(list);
      })
    );
  }

  protected getScriptLocation(): Observable<CtaScriptsLocation | undefined> {
    const semanticRouteLocationMap: Record<
      PageSemanticRoute,
      CtaScriptsLocation
    > = {
      [PageSemanticRoute.ORDER_PAGE]:
        CtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE,
      [PageSemanticRoute.ORDER_CONFIRMATION_PAGE]:
        CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE,
      [PageSemanticRoute.PDP_PAGE]: CtaScriptsLocation.PDP_MESSAGING,
      [PageSemanticRoute.CART_PAGE]: CtaScriptsLocation.CART_QUICK_BUY,
    };

    return this.routingService.getRouterState().pipe(
      take(1),
      map((route) =>
        route?.state?.semanticRoute
          ? semanticRouteLocationMap[
              route.state.semanticRoute as PageSemanticRoute
            ]
          : undefined
      )
    );
  }

  protected getOrderDetails(scriptsLocation: CtaScriptsLocation) {
    const order$ =
      scriptsLocation === CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE
        ? this.orderDetailsService.getOrderDetails()
        : this.orderHistoryService.getOrderDetails();
    return order$.pipe(
      filter((order) => !!order?.entries)
    ) as Observable<Order>;
  }

  protected getPaymentAccountIds() {
    return this.opfPaymentFacade.getActiveConfigurationsState().pipe(
      filter(
        (state) => !state.loading && !state.error && Boolean(state.data?.length)
      ),
      map((state) => state.data?.map((val) => val.id) as number[])
    );
  }

  protected getProductItems(
    order: Order
  ): { productId: string; quantity: number }[] | [] {
    return (order.entries as OrderEntry[])
      .filter((item) => {
        return !!item?.product?.code && !!item?.quantity;
      })
      .map((item) => {
        return {
          productId: item.product?.code as string,
          quantity: item.quantity as number,
        };
      });
  }

  protected loadAndRunScript(
    script: OpfDynamicScript
  ): Promise<OpfDynamicScript | undefined> {
    const html = script?.html;

    return new Promise(
      (resolve: (value: OpfDynamicScript | undefined) => void) => {
        this.opfResourceLoaderService
          .loadProviderResources(script.jsUrls, script.cssUrls)
          .then(() => {
            if (html) {
              this.opfResourceLoaderService.executeScriptFromHtml(html);
              resolve(script);
            } else {
              resolve(undefined);
            }
          })
          .catch(() => {
            resolve(undefined);
          });
      }
    );
  }

  protected removeScriptTags(htmls: string[]) {
    return htmls.map((html) => {
      const element = new DOMParser().parseFromString(html, 'text/html');
      Array.from(element.getElementsByTagName('script')).forEach((script) => {
        html = html.replace(script.outerHTML, '');
      });
      return html;
    });
  }
}

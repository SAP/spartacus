/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CmsService, Product, isNotNullable } from '@spartacus/core';
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
  tap,
} from 'rxjs/operators';

import { OrderEntry } from '@spartacus/cart/base/root';
import {
  CmsPageLocation,
  CtaScriptsLocation,
  CtaScriptsRequest,
  CtaScriptsResponse,
  OpfDynamicScript,
  OpfPaymentFacade,
  OpfPaymentProviderType,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import { CurrentProductService } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class OpfCtaScriptsService {
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected orderDetailsService = inject(OrderFacade);
  protected orderHistoryService = inject(OrderHistoryFacade);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected cmsService = inject(CmsService);
  protected currentProductService = inject(CurrentProductService);

  showApplePayButton = false;

  getCtaHtmlslList(): Observable<string[]> {
    return this.fillCtaScriptRequest().pipe(
      switchMap((ctaScriptsRequest) => this.fetchCtaScripts(ctaScriptsRequest)),
      switchMap((scriptslist) => this.runCtaScripts(scriptslist)),
      finalize(() => {
        this.clearResources();
      })
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
      [CtaScriptsLocation.PDP_QUICK_BUY]: () =>
        this.fillCtaRequestforPDP(scriptsLocation, paymentAccountIds),
      [CtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE]: () =>
        this.fillCtaRequestforPagesWithOrder(
          scriptsLocation,
          paymentAccountIds
        ),
      [CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE]: () =>
        this.fillCtaRequestforPagesWithOrder(
          scriptsLocation,
          paymentAccountIds
        ),
      [CtaScriptsLocation.CART_MESSAGING]: toBeImplementedException,
      [CtaScriptsLocation.CART_QUICK_BUY]: toBeImplementedException,
      [CtaScriptsLocation.CHECKOUT_QUICK_BUY]: toBeImplementedException,
      [CtaScriptsLocation.PDP_MESSAGING]: toBeImplementedException,
    };

    const selectedFunction = locationToFunctionMap[scriptsLocation];

    return selectedFunction
      ? selectedFunction()
      : throwError('Invalid Script Location');
  }

  protected fillCtaRequestforPagesWithOrder(
    scriptLocation: CtaScriptsLocation,
    paymentAccountIds: number[]
  ): Observable<CtaScriptsRequest> {
    return this.getOrderDetails(scriptLocation).pipe(
      map((order) => {
        const ctaScriptsRequest: CtaScriptsRequest = {
          orderId: order?.code,
          ctaProductItems: this.getProductItems(order as Order),
          paymentAccountIds: paymentAccountIds,
          scriptLocations: [scriptLocation],
        };

        return ctaScriptsRequest;
      })
    );
  }

  protected fillCtaRequestforPDP(
    scriptLocation: CtaScriptsLocation,
    paymentAccountIds: number[]
  ) {
    return this.currentProductService.getProduct().pipe(
      filter(isNotNullable),
      map((product: Product) => {
        return {
          orderId: undefined,
          ctaProductItems: [{ productId: product?.code, quantity: 1 }],
          paymentAccountIds: paymentAccountIds,
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
        return this.removeScriptTags(list);
      })
    );
  }

  protected getScriptLocation(): Observable<CtaScriptsLocation | undefined> {
    const cmsToCtaLocationMap: Record<CmsPageLocation, CtaScriptsLocation> = {
      [CmsPageLocation.ORDER_PAGE]:
        CtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE,
      [CmsPageLocation.ORDER_CONFIRMATION_PAGE]:
        CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE,
      [CmsPageLocation.PDP_PAGE]: CtaScriptsLocation.PDP_QUICK_BUY,
      [CmsPageLocation.CART_PAGE]: CtaScriptsLocation.CART_QUICK_BUY,
    };
    return this.cmsService.getCurrentPage().pipe(
      take(1),
      map((page) =>
        page.pageId
          ? cmsToCtaLocationMap[page.pageId as CmsPageLocation]
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
      tap((state) => {
        let paymentGatewayConfig = state.data?.find(
          (config) =>
            config.providerType === OpfPaymentProviderType.PAYMENT_GATEWAY
        );
        if (paymentGatewayConfig?.digitalWalletQuickBuy) {
          let applePayConfig = paymentGatewayConfig?.digitalWalletQuickBuy.find(
            (otb) => otb.provider === 'APPLE_PAY'
          );
          this.showApplePayButton = applePayConfig?.enabled as boolean;
        }
      }),
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

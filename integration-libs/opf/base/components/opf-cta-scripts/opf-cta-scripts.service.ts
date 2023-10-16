import { Injectable, inject } from '@angular/core';
import { CmsService, Product, isNotNullable } from '@spartacus/core';
import { Order, OrderFacade, OrderHistoryFacade } from '@spartacus/order/root';
import { Observable, from, of, throwError } from 'rxjs';
import {
  concatMap,
  filter,
  finalize,
  last,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import {
  CmsPageLocation,
  CtaScriptsLocation,
  CtaScriptsRequest,
  CtaScriptsResponse,
  OpfDynamicScript,
  OpfPaymentFacade,
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

  getCtaHtmlslList(): Observable<string[]> {
    return this.fillCtaScriptRequest().pipe(
      switchMap((ctaScriptsRequest) =>
        this.fetchCtaScriptsList(ctaScriptsRequest)
      ),
      switchMap((scriptslist) => this.runCtaScriptsList(scriptslist)),
      finalize(() => {
        this.clearResources();
      })
    );
  }

  protected clearResources() {
    this.opfResourceLoaderService.clearAllProviderResources();
  }

  protected fetchCtaScriptsList(
    ctaScriptsRequest: CtaScriptsRequest
  ): Observable<OpfDynamicScript[]> {
    return this.opfPaymentFacade.getCtaScripts(ctaScriptsRequest).pipe(
      concatMap((ctaScriptsResponse: CtaScriptsResponse) => {
        if (!ctaScriptsResponse?.value?.length) {
          return throwError({ error: 'Unvalid CTA Scripts Response' });
        }
        return of(
          ctaScriptsResponse.value.map((ctaScript) => ctaScript.dynamicScript)
        );
      }),
      take(1)
    );
  }

  protected fillCtaScriptRequest() {
    let paymentAccountIds: number[];

    return this.getPaymentAccountIds().pipe(
      concatMap((paymentAccountIds) => {
        paymentAccountIds = paymentAccountIds;
        return this.getScriptLocation();
      }),
      concatMap((scriptsLocation: CtaScriptsLocation) => {
        return this.fillRequestForTargetPage(
          scriptsLocation,
          paymentAccountIds
        );
      })
    );
  }

  protected fillRequestForTargetPage(
    scriptsLocation: CtaScriptsLocation,
    paymentAccountIds: number[]
  ): Observable<CtaScriptsRequest> {
    if (scriptsLocation == CtaScriptsLocation.PDP_QUICK_BUY) {
      return this.fillCtaRequestforPDP(scriptsLocation, paymentAccountIds);
    } else if (
      scriptsLocation == CtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE ||
      scriptsLocation == CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE
    ) {
      return this.fillCtaRequestforPagesWithOrder(
        scriptsLocation,
        paymentAccountIds
      );
    } else {
      return throwError('Invalid Script Location');
    }
  }

  protected fillCtaRequestforPagesWithOrder(
    scriptLocation: CtaScriptsLocation,
    paymentAccountIds: number[]
  ): Observable<CtaScriptsRequest> {
    return this.getOrderDetails(scriptLocation).pipe(
      map((order) => {
        const ctaScriptsRequest: CtaScriptsRequest = {
          orderId: order?.code,
          ctaProductItems: this.getProductItems(order),
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

  protected runCtaScriptsList(scripts: OpfDynamicScript[]) {
    let loadedCtaHtmls: string[];
    return of(scripts).pipe(
      tap(() => {
        loadedCtaHtmls = [];
      }),
      concatMap((scripts) => {
        return from(scripts);
      }),
      concatMap((script) => from(this.loadAndRunScript(script))),
      tap((script) => {
        if (script?.html) {
          loadedCtaHtmls.push(script.html);
        }
      }),
      last(),
      map(() => {
        return loadedCtaHtmls;
      })
    );
  }

  protected getScriptLocation(): Observable<CtaScriptsLocation> {
    return this.cmsService.getCurrentPage().pipe(
      take(1),
      concatMap((page) => {
        switch (page.pageId) {
          case CmsPageLocation.ORDER_PAGE:
            return of(CtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE);
          case CmsPageLocation.ORDER_CONFIRMATION_PAGE:
            return of(CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE);
          case CmsPageLocation.PDP_PAGE:
            return of(CtaScriptsLocation.PDP_QUICK_BUY);
          default:
            return throwError({ error: 'Page not valid' });
        }
      })
    );
  }

  protected getOrderDetails(scriptsLocation: CtaScriptsLocation) {
    const order$ =
      scriptsLocation == CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE
        ? this.orderDetailsService.getOrderDetails()
        : this.orderHistoryService.getOrderDetails();
    return order$.pipe(
      filter((order) => !!order?.entries),
      concatMap((order) => {
        if (!order) {
          return throwError({ error: 'Order obj not found' });
        }
        if (!order?.entries) {
          return throwError({ error: 'Order entries not found' });
        }
        return of(order);
      })
    );
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
    return !!order.entries
      ? order.entries
          ?.filter((item) => {
            return !!item?.product?.code && !!item?.quantity;
          })
          .map((item) => {
            return {
              productId: item.product?.code as string,
              quantity: item.quantity as number,
            };
          })
      : [];
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
}

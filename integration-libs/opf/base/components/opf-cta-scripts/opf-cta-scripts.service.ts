import { Injectable, inject } from '@angular/core';
import { CmsService } from '@spartacus/core';
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

@Injectable({
  providedIn: 'root',
})
export class OpfCtaScriptsService {
  protected opfPaymentFacade = inject(OpfPaymentFacade);
  protected orderDetailsService = inject(OrderFacade);
  protected orderHistoryService = inject(OrderHistoryFacade);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected cmsService = inject(CmsService);

  protected mock = {
    value: [
      {
        paymentAccountId: 1,
        dynamicScript: {
          html: "<h2>CTA Html snippet #1</h2><script>alert('CTA Script #1 is running')</script>",
          cssUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.1/adyen.css',
              sri: '',
            },
          ],
          jsUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.1/adyen.js',
              sri: '',
            },
          ],
        },
      },
      {
        paymentAccountId: 2,
        dynamicScript: {
          html: "<h2>CTA Html snippet #2</h2><script>alert('CTA Script #2 is running')</script>",
          cssUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.2/adyen.css',
              sri: '',
            },
          ],
          jsUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.2/adyen.js',
              sri: '',
            },
          ],
        },
      },
      {
        paymentAccountId: 3,
        dynamicScript: {
          html: "<h2>CTA Html snippet #3</h2><script>alert('CTA Script #3 is running')</script>",
          cssUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.3/adyen.css',
              sri: '',
            },
          ],
          jsUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.3/adyen.js',
              sri: '',
            },
          ],
        },
      },
      {
        paymentAccountId: 4,
        dynamicScript: {
          html: "<h2>CTA Html snippet #4</h2><script>alert('CTA Script #4 is running')</script>",
          cssUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.x/adyen.css',
              sri: '',
            },
          ],
          jsUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.0/adyen.js',
              sri: '',
            },
          ],
        },
      },
      {
        paymentAccountId: 5,
        dynamicScript: {
          html: "<h2>CTA Html snippet #5</h2><script>alert('CTA Script #5 is running')</script>",
          cssUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.1.x/adyen.css',
              sri: '',
            },
          ],
          jsUrls: [
            {
              url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.1.0/adyen.js',
              sri: '',
            },
          ],
        },
      },
    ],
  };

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

  protected fetchCtaScriptsList(ctaScriptsRequest: CtaScriptsRequest) {
    return this.opfPaymentFacade.getCtaScripts(ctaScriptsRequest).pipe(
      map((ctaScriptsResponse: CtaScriptsResponse) => {
        console.log('ctaScriptsResponse', ctaScriptsResponse);
        // mock for test purpose until PSP ready
        const list = this.mock.value.map(
          (ctaScript) => ctaScript.dynamicScript
        );
        return list;
      }),
      take(1)
    );
  }

  protected fillCtaScriptRequest() {
    let paymentAccountIds: number[];
    let scriptLocation: CtaScriptsLocation;
    return this.getPaymentAccountIds().pipe(
      concatMap((paymentAccountIds) => {
        paymentAccountIds = paymentAccountIds;
        return this.getScriptLocation();
      }),
      concatMap((scriptsLocation) => {
        scriptLocation = scriptsLocation;
        return this.getOrderDetails(scriptsLocation);
      }),
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
        console.log('in tap', script);
        if (script?.html) {
          loadedCtaHtmls.push(script.html);
        }
      }),
      last(),
      map(() => {
        console.log('in last');
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

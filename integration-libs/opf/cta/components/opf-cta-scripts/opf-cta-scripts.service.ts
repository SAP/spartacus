/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  CmsService,
  CurrencyService,
  EventService,
  LanguageService,
  Product,
  WindowRef,
  isNotNullable,
} from '@spartacus/core';
import { Order, OrderFacade, OrderHistoryFacade } from '@spartacus/order/root';
import {
  Observable,
  Subscription,
  combineLatest,
  from,
  merge,
  of,
  throwError,
} from 'rxjs';
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

import {
  ActiveCartFacade,
  CartAddEntrySuccessEvent,
  CartRemoveEntrySuccessEvent,
  CartUpdateEntrySuccessEvent,
  OrderEntry,
} from '@spartacus/cart/base/root';
import {
  OpfBaseFacade,
  OpfDynamicScript,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import {
  CmsPageLocation,
  CtaOnsiteMessageLocations,
  CtaProductItem,
  CtaScriptsLocation,
  CtaScriptsRequest,
  CtaScriptsResponse,
  OpfCtaFacade,
} from '@spartacus/opf/cta/root';

import {
  GlobalFunctionsDomain,
  OpfGlobalFunctionsFacade,
} from '@spartacus/opf/global-functions/root';
import { CurrentProductService } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class OpfCtaScriptsService {
  protected opfBaseFacade = inject(OpfBaseFacade);
  protected opfCtaFacade = inject(OpfCtaFacade);
  protected orderDetailsService = inject(OrderFacade);
  protected orderHistoryService = inject(OrderHistoryFacade);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected cmsService = inject(CmsService);
  protected currentProductService = inject(CurrentProductService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected currencyService = inject(CurrencyService);
  protected languageService = inject(LanguageService);
  protected globalFunctionsFacade = inject(OpfGlobalFunctionsFacade);
  protected winRef = inject(WindowRef);
  protected eventService = inject(EventService);
  protected subList: Array<Subscription> = [];
  isInQuickBuy = false;
  isOnsiteMessagingInit = false;
  protected scriptIdentifiers: Array<string> = [];

  getCtaHtmlslList(): Observable<string[]> {
    let isOnsiteMessageLocation = false;
    return this.fillCtaScriptRequest().pipe(
      switchMap((ctaScriptsRequest) => {
        isOnsiteMessageLocation =
          !!ctaScriptsRequest?.scriptLocations?.length &&
          !!ctaScriptsRequest?.scriptLocations.map((location) =>
            CtaOnsiteMessageLocations.includes(location)
          );

        return this.fetchCtaScripts(ctaScriptsRequest);
      }),
      tap((scripts) => {
        if (
          scripts.length &&
          !this.isOnsiteMessagingInit &&
          isOnsiteMessageLocation
        ) {
          this.initiateOnsiteMessagingEvents();
        }
        console.log('flo1', scripts);
      }),
      switchMap((scriptslist) => this.runCtaScripts(scriptslist)),
      tap((val) => console.log('flo2', val)),
      finalize(() => {
        this.clearResources();
        this.isOnsiteMessagingInit && this.stopOnsiteMessagingEvents();
      })
    );
  }

  protected clearResources() {
    console.log('clearResources');
    //  this.opfResourceLoaderService.clearAllProviderResources();
  }

  protected fetchCtaScripts(
    ctaScriptsRequest: CtaScriptsRequest
  ): Observable<OpfDynamicScript[]> {
    return of([
      {
        jsUrls: [
          { url: 'https://eu-library.playground.klarnaservices.com/lib.js' },
        ],
        html: `<klarna-placement
    id='klarna-onsite-message-123'
    data-key="credit-promotion-badge"
    data-locale=<#if "en-DEde-DEda-DKen-DKen-FIfi-FIsv-FIen-GBen-NOno-NOen-SEsv-SEen-NLnl-NLde-ATen-AT"?contains(input.additionalData.locale)>"en"<#else>"en-GB"</#if>
    data-purchase-amount="0"
    ></klarna-placement>
    <script>
    (function(){
      console.log('Onsite: klarna onsite messaging test');
        var scriptIdentifier = '123';
        var totalAmount = 0;
        var messageInstance = window.document.getElementById('klarna-onsite-message-'+scriptIdentifier);
       console.log('flo messageInstance',messageInstance);
        function refreshMessageContent() {
         console.log('Onsite: refreshMessageContent with',totalAmount * 100);
            if (messageInstance) {
                messageInstance.setAttribute('data-purchase-amount', totalAmount * 100);
                window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
                window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
            }
        }

        function handleProductTotalAmountChanged(event) {
            if (event && event.detail && event.detail.productInfo && event.detail.productInfo.length > 0
                && event.detail.scriptIdentifiers && event.detail.scriptIdentifiers.includes(scriptIdentifier)) {
                totalAmount = event.detail.productInfo
                    .map(product => product.price.sellingPrice * product.quantity)
                    .reduce((accumulator, currentValue) => accumulator + currentValue);
                refreshMessageContent();
            }
        }

        function handleCartChanged(event) {
         console.log('Onsite: handleCartChanged1');
            if (event && event.detail && event.detail.cart) {
              console.log('Onsite: handleCartChanged2',event.detail.cart);
                totalAmount = event.detail.cart.total || event.detail.cart.subTotal || event.detail.cart.sellingSubTotal;
                refreshMessageContent();
            }
        }

        if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('productTotalAmountChanged',handleProductTotalAmountChanged,false);
            window.addEventListener('cartChanged',handleCartChanged,false);
        } else {
            window.attachEvent('productTotalAmountChanged',handleProductTotalAmountChanged);
            window.attachEvent('cartChanged',handleCartChanged);
        }
        //Upscale.payments.global.scriptReady(scriptIdentifier);
        window.Opf.payments.global.scriptReady(scriptIdentifier);
    })();
    </script>`,
      },
    ]);
    return this.opfCtaFacade.getCtaScripts(ctaScriptsRequest).pipe(
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

  cartChangedListener(): void {
    const sub = merge(
      this.eventService.get(CartUpdateEntrySuccessEvent),
      this.eventService.get(CartAddEntrySuccessEvent),
      this.eventService.get(CartRemoveEntrySuccessEvent)
    ).subscribe({
      next: (
        cartEvent:
          | CartUpdateEntrySuccessEvent
          | CartAddEntrySuccessEvent
          | CartRemoveEntrySuccessEvent
      ) => {
        console.log('CartSuccessEvent', cartEvent);
        this.dispatchEvents(this.scriptIdentifiers);
      },
      error: (error) => {
        console.log('CartSuccessEvent error:', error);
      },
      complete: () => {
        console.log('CartSuccessEvent completed:');
      },
    });
    this.subList.push(sub);
  }

  protected fillCtaScriptRequest(): Observable<CtaScriptsRequest> {
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
        this.fillCtaRequestforPagesWithOrder(scriptsLocation),
      [CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE]: () =>
        this.fillCtaRequestforPagesWithOrder(scriptsLocation),
      [CtaScriptsLocation.CART_MESSAGING]: () =>
        this.fillCtaRequestforCartPage(scriptsLocation, paymentAccountIds),
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
    scriptLocation: CtaScriptsLocation
  ): Observable<CtaScriptsRequest> {
    return this.getOrderDetails(scriptLocation).pipe(
      map((order) => {
        if (!order?.paymentInfo?.id) {
          throw new Error('OrderPaymentInfoId missing');
        }
        const ctaScriptsRequest: CtaScriptsRequest = {
          cartId: order?.paymentInfo?.id,
          ctaProductItems: this.getProductItems(order as Order),
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
          ctaProductItems: [{ productId: product?.code, quantity: 1 }],
          paymentAccountIds: paymentAccountIds,
          scriptLocations: [scriptLocation],
        } as CtaScriptsRequest;
      })
    );
  }

  protected fillCtaRequestforCartPage(
    scriptLocation: CtaScriptsLocation,
    paymentAccountIds: number[]
  ) {
    return combineLatest([
      this.activeCartFacade.takeActive(),
      this.languageService.getActive(),
      this.currencyService.getActive(),
    ]).pipe(
      take(1),
      map(([cart, language, currency]) => {
        return {
          paymentAccountIds: paymentAccountIds,
          scriptLocations: [scriptLocation],
          ctaProductItems: cart.entries?.map((entry) => {
            return {
              productId: entry.product?.code,
              quantity: entry.quantity,
            } as CtaProductItem;
          }),
          additionalData: [
            {
              key: 'locale',
              value: language,
            },
            {
              key: 'currency',
              value: currency,
            },
            {
              key: 'scriptIdentifier',
              value: this.getNewScriptIdentifier(),
            },
          ],
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
        return list;
      })
    );
  }

  protected getScriptLocation(): Observable<CtaScriptsLocation | undefined> {
    // TO DO: add PDP_QUICK_BUY and CART_QUICK_BUY, need to detect if running QB cms
    // best solution is to pass a flag into cta cms in QB template
    const cmsToCtaLocationMap: Record<CmsPageLocation, CtaScriptsLocation> = {
      [CmsPageLocation.ORDER_PAGE]:
        CtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE,
      [CmsPageLocation.ORDER_CONFIRMATION_PAGE]:
        CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE,
      [CmsPageLocation.PDP_PAGE]: this.isInQuickBuy
        ? CtaScriptsLocation.PDP_QUICK_BUY
        : CtaScriptsLocation.PDP_MESSAGING,
      [CmsPageLocation.CART_PAGE]: this.isInQuickBuy
        ? CtaScriptsLocation.CART_QUICK_BUY
        : CtaScriptsLocation.CART_MESSAGING,
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
    return this.opfBaseFacade.getActiveConfigurationsState().pipe(
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
              // this.opfResourceLoaderService.executeScriptFromHtml(html);
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

  protected initiateOnsiteMessagingEvents() {
    this.registerScriptEvent();
    this.listenScriptReadyEvent();
    this.cartChangedListener();
    this.isOnsiteMessagingInit = true;
  }

  protected stopOnsiteMessagingEvents() {
    this.subList.forEach((sub) => sub.unsubscribe());
    this.subList = [];
    this.isOnsiteMessagingInit = false;
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

  protected getNewScriptIdentifier(): string {
    this.scriptIdentifiers.push(String(this.scriptIdentifiers.length + 1));
    return String(
      this.scriptIdentifiers[this.scriptIdentifiers.length - 1]
    ).padStart(4, '0');
  }

  protected registerScriptEvent() {
    this.globalFunctionsFacade.registerGlobalFunctions({
      paymentSessionId: '',
      domain: GlobalFunctionsDomain.GLOBAL,
    });
  }

  protected listenScriptReadyEvent() {
    console.log('listenScriptEvent1');
    const sub = this.opfCtaFacade.listenScriptReadyEvent().subscribe({
      next: (id) => {
        console.log('listenScriptReadyEvent next', id);
        this.dispatchEvents([id]);
      },
      error: (error) => {
        console.log('listenScriptReadyEvent error', error);
      },
      complete: () => {
        console.log('listenScriptReadyEvent completed:');
      },
    });
    this.subList.push(sub);
  }

  protected dispatchEvents(scriptIdentifiers: Array<string>): void {
    this.activeCartFacade
      .takeActive()
      .pipe(
        take(1),
        map((cart) => {
          console.log('flo cart', cart);
          return { total: cart.totalPrice?.value };
        }),
        tap((cartTotalPrice) => {
          const window = this.winRef.nativeWindow as any;
          const dispatchEvent = window?.dispatchEvent;

          console.log('dispatchEvents1');
          if (dispatchEvent) {
            console.log('dispatchEvents2');
            dispatchEvent(
              new CustomEvent('cartChanged', {
                detail: { cart: cartTotalPrice, scriptIdentifiers },
              })
            );
          }
        })
      )
      .subscribe({
        complete: () => {
          console.log('dispatchEvents sub completed:');
        },
      });
  }
}

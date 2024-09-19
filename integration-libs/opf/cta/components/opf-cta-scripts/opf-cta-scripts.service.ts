/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CmsService, EventService, WindowRef } from '@spartacus/core';
import { Observable, Subscription, of, throwError } from 'rxjs';
import { concatMap, filter, finalize, map, take, tap } from 'rxjs/operators';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  OpfBaseFacade,
  OpfDynamicScript,
  OpfResourceLoaderService,
} from '@spartacus/opf/base/root';
import {
  CmsPageLocation,
  CtaScriptsLocation,
  CtaScriptsRequest,
  CtaScriptsResponse,
  CtaOnsiteMessageLocations as DynamicCtaLocations,
  OpfCtaFacade,
} from '@spartacus/opf/cta/root';

import {
  OpfDynamicCtaService,
  OpfStaticCtaService,
} from '@spartacus/opf/cta/core';
import { CurrentProductService } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class OpfCtaScriptsService {
  protected opfBaseFacade = inject(OpfBaseFacade);
  protected opfCtaFacade = inject(OpfCtaFacade);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected cmsService = inject(CmsService);
  protected currentProductService = inject(CurrentProductService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected opfDynamicCtaService = inject(OpfDynamicCtaService);
  protected opfStaticCtaService = inject(OpfStaticCtaService);
  protected winRef = inject(WindowRef);
  protected eventService = inject(EventService);
  protected subList: Array<Subscription> = [];

  CtaOnsiteMessageLocations: Array<CtaScriptsLocation> = [
    CtaScriptsLocation.CART_MESSAGING,
    CtaScriptsLocation.PDP_MESSAGING,
  ];

  getCtaHtmlslList(): Observable<OpfDynamicScript[]> {
    console.log('getCtaHtmlslList1');
    let isDynamicCtaLocation = false;
    return this.fillCtaScriptRequest().pipe(
      concatMap((ctaScriptsRequest) => {
        isDynamicCtaLocation =
          !!ctaScriptsRequest?.scriptLocations?.length &&
          !!ctaScriptsRequest?.scriptLocations.map((location) =>
            DynamicCtaLocations.includes(location)
          );

        return this.fetchCtaScripts(ctaScriptsRequest);
      }),
      tap((scripts) => {
        if (scripts.length && isDynamicCtaLocation) {
          this.opfDynamicCtaService.initiateEvents();
        }
      }),
      // concatMap((scriptslist) => this.runCtaScripts(scriptslist)),
      finalize(() => {
        console.log('finalize');
        this.clearResources();
        isDynamicCtaLocation && this.opfDynamicCtaService.stopEvents();
      })
    );
  }

  protected clearResources() {
    console.log('clearResources');
    this.opfResourceLoaderService.clearAllProviderResources();
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
        id='klarna-onsite-message-${this.opfDynamicCtaService.scriptIdentifiers.length}'
        data-key="credit-promotion-badge"
       >
        </klarna-placement>
        <script>
        (function(){
          console.log('klarna: klarna onsite messaging test');
            var scriptIdentifier = '${this.opfDynamicCtaService.scriptIdentifiers.length}';
               console.log('flo identifier',scriptIdentifier);
                 var totalAmount = 0;
          var messageInstance = window.document.getElementById('klarna-onsite-message-'+scriptIdentifier);
         console.log('flo messageInstance',messageInstance);
          function refreshMessageContent() {
           console.log('Onsite: refreshMessageContent with',totalAmount * 100);
              if (messageInstance) {
                  // messageInstance.innerText('data-purchase-amount', totalAmount * 100);
                  messageInstance.innerText = 'Klarna CTA #' + scriptIdentifier + ' - total:'+totalAmount +' USD';
                  window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
                  window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
              }
          }

          function handleProductTotalAmountChanged(event) {
          console.log("klarna handleProductTotalAmountChanged",event.detail.productInfo);
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
      {
        jsUrls: [
          { url: 'https://cdn.snigelweb.com/adengine/w3schools.com/loader.js' },
        ],
        html: `<h2>Second CTA Element Test<h2>
        <script> console.log("second script")</script>`,
      },
      {
        html: `<klarna-placement
        id='ali-onsite-message-${this.opfDynamicCtaService.scriptIdentifiers.length}'
        data-key="credit-promotion-badge"
       >
        </klarna-placement>
        <script>
        (function(){
          console.log('AliExpress: AliExpress onsite messaging test');
            var scriptIdentifier = '${this.opfDynamicCtaService.scriptIdentifiers.length}';
               console.log('flo identifier',scriptIdentifier);
                 var totalAmount = 0;
          var messageInstance = window.document.getElementById('ali-onsite-message-'+scriptIdentifier);
         console.log('flo messageInstance',messageInstance);
          function refreshMessageContent() {
           console.log('AliExpress: refreshMessageContent with',totalAmount * 100);
              if (messageInstance) {
                  // messageInstance.innerText('data-purchase-amount', totalAmount * 100);
                  messageInstance.innerText = 'AliExpress CTA #' + scriptIdentifier + ' - total:'+totalAmount +' USD';
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
           console.log('AliExpress: handleCartChanged1');
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
          return throwError(() => 'Invalid CTA Scripts Response');
        }
        const dynamicScripts = ctaScriptsResponse.value.map(
          (ctaScript) => ctaScript.dynamicScript
        );
        return of(dynamicScripts);
      }),
      take(1)
    );
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
      return throwError(() => 'Invalid Script Location');
    }
    const toBeImplementedException = () =>
      throwError(() => 'to be implemented');
    const locationToFunctionMap: Record<
      CtaScriptsLocation,
      () => Observable<CtaScriptsRequest>
    > = {
      [CtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE]: () =>
        this.opfStaticCtaService.fillCtaRequestforPagesWithOrder(
          scriptsLocation
        ),
      [CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE]: () =>
        this.opfStaticCtaService.fillCtaRequestforPagesWithOrder(
          scriptsLocation
        ),
      [CtaScriptsLocation.CART_MESSAGING]: () =>
        this.opfDynamicCtaService.fillCtaRequestforCartPage(
          scriptsLocation,
          paymentAccountIds
        ),
      [CtaScriptsLocation.PDP_MESSAGING]: () =>
        this.opfDynamicCtaService.fillCtaRequestforProductPage(
          scriptsLocation,
          paymentAccountIds
        ),
      [CtaScriptsLocation.CART_QUICK_BUY]: toBeImplementedException,
      [CtaScriptsLocation.CHECKOUT_QUICK_BUY]: toBeImplementedException,
      [CtaScriptsLocation.PDP_QUICK_BUY]: toBeImplementedException,
    };

    const selectedFunction = locationToFunctionMap[scriptsLocation];

    return selectedFunction
      ? selectedFunction()
      : throwError(() => 'Invalid Script Location');
  }

  // protected fillCtaRequestforPagesWithOrder(
  //   scriptLocation: CtaScriptsLocation
  // ): Observable<CtaScriptsRequest> {
  //   return this.getOrderDetails(scriptLocation).pipe(
  //     map((order) => {
  //       if (!order?.paymentInfo?.id) {
  //         throw new Error('OrderPaymentInfoId missing');
  //       }
  //       const ctaScriptsRequest: CtaScriptsRequest = {
  //         cartId: order?.paymentInfo?.id,
  //         ctaProductItems: this.getProductItems(order as Order),
  //         scriptLocations: [scriptLocation],
  //       };

  //       return ctaScriptsRequest;
  //     })
  //   );
  // }

  protected getScriptLocation(): Observable<CtaScriptsLocation | undefined> {
    const cmsToCtaLocationMap: Record<CmsPageLocation, CtaScriptsLocation> = {
      [CmsPageLocation.ORDER_PAGE]:
        CtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE,
      [CmsPageLocation.ORDER_CONFIRMATION_PAGE]:
        CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE,
      [CmsPageLocation.PDP_PAGE]: CtaScriptsLocation.PDP_MESSAGING,
      [CmsPageLocation.CART_PAGE]: CtaScriptsLocation.CART_MESSAGING,
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

  // protected getOrderDetails(scriptsLocation: CtaScriptsLocation) {
  //   const order$ =
  //     scriptsLocation === CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE
  //       ? this.orderDetailsService.getOrderDetails()
  //       : this.orderHistoryService.getOrderDetails();
  //   return order$.pipe(
  //     filter((order) => !!order?.entries)
  //   ) as Observable<Order>;
  // }

  protected getPaymentAccountIds() {
    return this.opfBaseFacade.getActiveConfigurationsState().pipe(
      filter(
        (state) => !state.loading && !state.error && Boolean(state.data?.length)
      ),
      map((state) => state.data?.map((val) => val.id) as number[])
    );
  }

  // protected getProductItems(
  //   order: Order
  // ): { productId: string; quantity: number }[] | [] {
  //   return (order.entries as OrderEntry[])
  //     .filter((item) => {
  //       return !!item?.product?.code && !!item?.quantity;
  //     })
  //     .map((item) => {
  //       return {
  //         productId: item.product?.code as string,
  //         quantity: item.quantity as number,
  //       };
  //     });
  // }
}

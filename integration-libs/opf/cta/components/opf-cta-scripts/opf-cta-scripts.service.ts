/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { Observable, Subscription, of, throwError } from 'rxjs';
import { concatMap, filter, finalize, map, take, tap } from 'rxjs/operators';

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
  DynamicCtaLocations,
  OpfCtaFacade,
} from '@spartacus/opf/cta/root';

import {
  OpfDynamicCtaService,
  OpfStaticCtaService,
} from '@spartacus/opf/cta/core';

@Injectable({
  providedIn: 'root',
})
export class OpfCtaScriptsService {
  protected opfBaseFacade = inject(OpfBaseFacade);
  protected opfCtaFacade = inject(OpfCtaFacade);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected cmsService = inject(CmsService);
  protected opfDynamicCtaService = inject(OpfDynamicCtaService);
  protected opfStaticCtaService = inject(OpfStaticCtaService);

  protected subList: Array<Subscription> = [];

  removeScriptTags(html: string) {
    const element = new DOMParser().parseFromString(html, 'text/html');
    Array.from(element.getElementsByTagName('script')).forEach((script) => {
      html = html.replace(script.outerHTML, '');
    });
    return html;
  }

  loadAndRunScript(
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

  getCtaHtmlslList(): Observable<OpfDynamicScript[]> {
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
      finalize(() => {
        this.opfResourceLoaderService.clearAllProviderResources();
        isDynamicCtaLocation && this.opfDynamicCtaService.stopEvents();
      })
    );
  }

  protected fetchCtaScripts(
    ctaScriptsRequest: CtaScriptsRequest
  ): Observable<OpfDynamicScript[]> {
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

  protected getPaymentAccountIds() {
    return this.opfBaseFacade.getActiveConfigurationsState().pipe(
      filter(
        (state) => !state.loading && !state.error && Boolean(state.data?.length)
      ),
      map((state) => state.data?.map((val) => val.id) as number[])
    );
  }
}

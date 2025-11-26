/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  OpfCtaCmsPageLocation,
  OpfCtaDynamicLocations,
  OpfCtaFacade,
  OpfCtaScriptsLocation,
  OpfCtaScriptsRequest,
  OpfCtaScriptsResponse,
} from '@spartacus/opf/cta/root';

import {
  OpfDynamicCtaService,
  OpfStaticCtaService,
} from '@spartacus/opf/cta/core';

@Injectable()
export class OpfCtaScriptsService {
  protected opfBaseFacade = inject(OpfBaseFacade);
  protected opfCtaFacade = inject(OpfCtaFacade);
  protected opfResourceLoaderService = inject(OpfResourceLoaderService);
  protected cmsService = inject(CmsService);
  protected opfDynamicCtaService = inject(OpfDynamicCtaService);
  protected opfStaticCtaService = inject(OpfStaticCtaService);

  protected subList: Array<Subscription> = [];

  loadAndRunScript(
    script: OpfDynamicScript
  ): Promise<OpfDynamicScript | undefined> {
    const html = script?.html;

    return new Promise(
      (resolve: (value: OpfDynamicScript | undefined) => void) => {
        this.opfResourceLoaderService
          .loadResources(script.jsUrls, script.cssUrls)
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

  getCtaHtmlList(): Observable<OpfDynamicScript[]> {
    let isDynamicCtaLocation = false;
    return this.fillCtaScriptRequest().pipe(
      concatMap((opfCtaScriptsRequest) => {
        isDynamicCtaLocation =
          !!opfCtaScriptsRequest?.scriptLocations?.length &&
          !!opfCtaScriptsRequest?.scriptLocations.find((location) =>
            OpfCtaDynamicLocations.includes(location)
          );
        isDynamicCtaLocation &&
          this.opfDynamicCtaService.registerScriptReadyEvent();
        return this.fetchCtaScripts(opfCtaScriptsRequest);
      }),
      tap((scriptsResponse) => {
        isDynamicCtaLocation &&
          !!scriptsResponse.length &&
          this.opfDynamicCtaService.initiateEvents();
      }),
      finalize(() => {
        this.opfResourceLoaderService.clearAllResources();
        isDynamicCtaLocation && this.opfDynamicCtaService.stopEvents();
      })
    );
  }

  protected fetchCtaScripts(
    opfCtaScriptsRequest: OpfCtaScriptsRequest
  ): Observable<OpfDynamicScript[]> {
    return this.opfCtaFacade.getCtaScripts(opfCtaScriptsRequest).pipe(
      concatMap((opfCtaScriptsResponse: OpfCtaScriptsResponse) => {
        if (!opfCtaScriptsResponse?.value?.length) {
          return throwError(() => 'Invalid CTA Scripts Response');
        }
        const dynamicScripts = opfCtaScriptsResponse.value.map(
          (ctaScript) => ctaScript.dynamicScript
        );
        return of(dynamicScripts);
      }),
      take(1)
    );
  }

  protected fillCtaScriptRequest(): Observable<OpfCtaScriptsRequest> {
    let paymentAccountIds: number[];

    return this.getPaymentAccountIds().pipe(
      concatMap((accIds) => {
        paymentAccountIds = accIds;
        return this.getScriptLocation();
      }),
      concatMap((scriptsLocation: OpfCtaScriptsLocation | undefined) => {
        return this.fillRequestForTargetPage(
          scriptsLocation,
          paymentAccountIds
        );
      })
    );
  }

  protected fillRequestForTargetPage(
    scriptsLocation: OpfCtaScriptsLocation | undefined,
    paymentAccountIds: number[]
  ): Observable<OpfCtaScriptsRequest> {
    if (!scriptsLocation) {
      return throwError(() => 'Invalid Script Location');
    }
    const locationToFunctionMap: Record<
      OpfCtaScriptsLocation,
      () => Observable<OpfCtaScriptsRequest>
    > = {
      [OpfCtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE]: () =>
        this.opfStaticCtaService.fillCtaRequestforPagesWithOrder(
          scriptsLocation
        ),
      [OpfCtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE]: () =>
        this.opfStaticCtaService.fillCtaRequestforPagesWithOrder(
          scriptsLocation
        ),
      [OpfCtaScriptsLocation.CART_MESSAGING]: () =>
        this.opfDynamicCtaService.fillCtaRequestforCartPage(
          scriptsLocation,
          paymentAccountIds
        ),
      [OpfCtaScriptsLocation.PDP_MESSAGING]: () =>
        this.opfDynamicCtaService.fillCtaRequestforProductPage(
          scriptsLocation,
          paymentAccountIds
        ),
    };
    const selectedFunction = locationToFunctionMap[scriptsLocation];
    return selectedFunction();
  }

  protected getScriptLocation(): Observable<OpfCtaScriptsLocation | undefined> {
    const cmsToCtaLocationMap: Record<
      OpfCtaCmsPageLocation,
      OpfCtaScriptsLocation
    > = {
      [OpfCtaCmsPageLocation.ORDER_PAGE]:
        OpfCtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE,
      [OpfCtaCmsPageLocation.ORDER_CONFIRMATION_PAGE]:
        OpfCtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE,
      [OpfCtaCmsPageLocation.PDP_PAGE]: OpfCtaScriptsLocation.PDP_MESSAGING,
      [OpfCtaCmsPageLocation.CART_PAGE]: OpfCtaScriptsLocation.CART_MESSAGING,
    };
    return this.cmsService.getCurrentPage().pipe(
      take(1),
      map((page) =>
        page.pageId
          ? cmsToCtaLocationMap[page.pageId as OpfCtaCmsPageLocation]
          : undefined
      )
    );
  }

  protected getPaymentAccountIds() {
    return this.opfBaseFacade.getActiveConfigurationsState().pipe(
      filter(
        (state) =>
          !state.loading && !state.error && Boolean(state.data?.value?.length)
      ),
      map((state) => state.data?.value?.map((val) => val.id) as number[])
    );
  }
}

/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  PageType,
  ProductSearchService,
  RoutingService,
  ProductSearchPage,
} from '@spartacus/core';
import { FacetService, FacetList } from '@spartacus/storefront';
import { combineLatest, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import {
  ProfileTagEventService,
  ProfileTagLifecycleService,
} from '../../profiletag';
import { MerchandisingUserContext } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingUserContextService {
  constructor(
    private routingService: RoutingService,
    private productSearchService: ProductSearchService,
    private profileTagEventService: ProfileTagEventService,
    private profileTagLifecycleService: ProfileTagLifecycleService,
    private facetService: FacetService
  ) {}

  getUserContext(): Observable<MerchandisingUserContext> {
    return combineLatest([
      this.getConsentReferenceContext(),
      this.getPageContext(),
      this.getSearchContext(),
    ]).pipe(
      map(([consentContext, pageContext, searchContext]) => {
        const result = {
          ...consentContext,
          ...pageContext,
        };

        if (!pageContext.products) {
          result['facets'] = searchContext.facets;
          result['searchPhrase'] = searchContext.searchPhrase;
        }

        return result;
      }),
      distinctUntilChanged(
        (prev, curr) =>
          prev.facets === curr.facets &&
          prev.searchPhrase === curr.searchPhrase &&
          prev.consentReference === curr.consentReference &&
          prev.category === curr.category &&
          prev.products === curr.products
      )
    );
  }

  private getConsentReferenceContext(): Observable<MerchandisingUserContext> {
    return this.profileTagLifecycleService.consentChanged().pipe(
      switchMap((changed) => {
        if (changed.data.granted) {
          return this.profileTagEventService
            .getConsentReference()
            .pipe(map((consentReference) => ({ consentReference })));
        } else {
          this.profileTagEventService.handleConsentWithdrawn();
          return of({ consentReference: '' });
        }
      })
    );
  }

  private getPageContext(): Observable<MerchandisingUserContext> {
    return this.routingService.getPageContext().pipe(
      map((pageContext) => {
        const result = {} as MerchandisingUserContext;

        if (pageContext.type === PageType.PRODUCT_PAGE) {
          result.products = [pageContext.id];
        } else if (pageContext.type === PageType.CATEGORY_PAGE) {
          result.category = pageContext.id;
        }
        return result;
      })
    );
  }

  private getSearchContext(): Observable<MerchandisingUserContext> {
    return combineLatest([
      this.productSearchService
        .getResults()
        .pipe(startWith({} as ProductSearchPage)),
      this.facetService.facetList$.pipe(startWith({} as FacetList)),
    ]).pipe(
      map(([searchResult, facetList]) => {
        const facets = facetList?.activeFacets
          ?.map((facet) => `${facet.facetCode}:${facet.facetValueCode}`)
          .join(':');

        return {
          facets: facets || undefined,
          searchPhrase: searchResult.freeTextSearch || undefined,
        } as MerchandisingUserContext;
      }),
      distinctUntilChanged(
        (prev, curr) =>
          prev.facets === curr.facets && prev.searchPhrase === curr.searchPhrase
      )
    );
  }
}

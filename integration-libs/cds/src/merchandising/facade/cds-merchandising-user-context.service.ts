import { Injectable } from '@angular/core';
import {
  Breadcrumb,
  ConverterService,
  PageContext,
  PageType,
  ProductSearchService,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, merge, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  MERCHANDISING_FACET_NORMALIZER,
  MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER,
} from '../connectors/strategy/converters';
import { MerchandisingUserContext } from '../model/merchandising-user-context.model';
import { ProfileTagEventService } from './../../profiletag/services/profiletag-event.service';
import { ProfileTagLifecycleService } from '../../profiletag/services';
import { ConsentChangedPushEvent } from '../../profiletag/model';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingUserContextService {
  constructor(
    private routingService: RoutingService,
    private productSearchService: ProductSearchService,
    private converterService: ConverterService,
    private profileTagEventService: ProfileTagEventService,
    private profileTagLifecycleService: ProfileTagLifecycleService
  ) {}

  getUserContext(): Observable<MerchandisingUserContext> {
    return combineLatest([
      this.getConsentReferenceContext(),
      merge(
        this.getCategoryAndFacetContext(),
        this.getProductNavigationContext()
      ).pipe(startWith({})),
    ]).pipe(
      map(([consentReferenceContext, userContext]) => ({
        ...consentReferenceContext,
        ...userContext,
      }))
    );
  }

  private getCategoryAndFacetContext(): Observable<MerchandisingUserContext> {
    return combineLatest([
      this.getCategoryNavigationContext(),
      this.getFacetsContext(),
    ]).pipe(
      map(([categoryContext, facetsContext]) => ({
        ...categoryContext,
        ...facetsContext,
      }))
    );
  }

  private getConsentReferenceContext(): Observable<MerchandisingUserContext> {
    return this.profileTagLifecycleService.consentChanged().pipe(
      switchMap((changed: ConsentChangedPushEvent) => {
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

  private getFacetsContext(): Observable<MerchandisingUserContext> {
    return this.searchResultChangeEvent().pipe(
      withLatestFrom(this.routingService.getPageContext()),
      filter(([_facets, pageContext]) => this.isFacetPage(pageContext)),
      map(([facets, pageContext]) =>
        facets.filter((facet) =>
          this.filterFacetByCurrentPage(facet, pageContext)
        )
      ),
      this.converterService.pipeable(MERCHANDISING_FACET_NORMALIZER),
      this.converterService.pipeable(
        MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER
      ),
      distinctUntilChanged(),
      map((facets) => ({
        facets,
      }))
    );
  }

  private searchResultChangeEvent(): Observable<Breadcrumb[]> {
    return this.productSearchService.getResults().pipe(
      map((searchResults) =>
        searchResults.breadcrumbs ? searchResults.breadcrumbs : []
      ),
      filter((facets) => !!facets)
    );
  }

  private isFacetPage(pageContext: PageContext): boolean {
    return (
      pageContext.type === PageType.CATEGORY_PAGE || pageContext.id === 'search'
    );
  }

  private getProductNavigationContext(): Observable<MerchandisingUserContext> {
    return this.routingService.getPageContext().pipe(
      filter((pageContext) => pageContext.type === PageType.PRODUCT_PAGE),
      map((context) => context.id),
      distinctUntilChanged(),
      map((productId) => ({
        products: [productId],
      }))
    );
  }

  private getCategoryNavigationContext(): Observable<MerchandisingUserContext> {
    return this.routingService.getPageContext().pipe(
      map((context) =>
        context.type === PageType.CATEGORY_PAGE ? context.id : undefined
      ),
      distinctUntilChanged(),
      map((category) => ({ category }))
    );
  }

  private filterFacetByCurrentPage(
    facet: Breadcrumb,
    currentPageContext: PageContext
  ): boolean {
    if (currentPageContext.type !== PageType.CATEGORY_PAGE) {
      return false;
    }
    return facet.facetValueCode !== currentPageContext.id;
  }
}

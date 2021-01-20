import { Injectable } from '@angular/core';
import {
  Breadcrumb,
  createFrom,
  EventService,
  ProductSearchService,
  ProductService,
} from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, pairwise, skip, switchMap, take } from 'rxjs/operators';
import { PageEvent } from '../page/page.events';
import {
  CategoryPageResultsEvent,
  FacetChangedEvent,
  FacetValueToggledState,
  ProductDetailsPageEvent,
  SearchPageResultsEvent,
} from './product-page.events';

@Injectable({
  providedIn: 'root',
})
export class ProductPageEventBuilder {
  constructor(
    protected eventService: EventService,
    protected productService: ProductService,
    protected productSearchService: ProductSearchService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(
      SearchPageResultsEvent,
      this.buildSearchPageResultsEvent()
    );
    this.eventService.register(
      ProductDetailsPageEvent,
      this.buildProductDetailsPageEvent()
    );
    this.eventService.register(
      CategoryPageResultsEvent,
      this.buildCategoryResultsPageEvent()
    );
    this.eventService.register(
      FacetChangedEvent,
      this.buildFacetChangedEvent()
    );
  }

  protected buildProductDetailsPageEvent(): Observable<
    ProductDetailsPageEvent
  > {
    return this.eventService.get(PageEvent).pipe(
      filter((pageEvent) => pageEvent.semanticRoute === 'product'),
      switchMap((pageEvent) =>
        this.productService.get(pageEvent.context.id).pipe(
          filter((product) => Boolean(product)),
          take(1),
          map((product) =>
            createFrom(ProductDetailsPageEvent, {
              ...pageEvent,
              categories: product.categories,
              code: product.code,
              name: product.name,
              price: product.price,
            })
          )
        )
      )
    );
  }

  protected buildCategoryResultsPageEvent(): Observable<
    CategoryPageResultsEvent
  > {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1)
    );

    return this.eventService.get(PageEvent).pipe(
      switchMap((pageEvent) => {
        if (pageEvent?.semanticRoute !== 'category') {
          return EMPTY;
        }

        return searchResults$.pipe(
          map((searchResults) => ({
            ...pageEvent,
            ...{
              categoryCode: pageEvent?.context?.id,
              numberOfResults: searchResults?.pagination?.totalResults,
              categoryName: searchResults.breadcrumbs?.[0].facetValueName,
            },
          })),
          map((categoryPage) =>
            createFrom(CategoryPageResultsEvent, categoryPage)
          )
        );
      })
    );
  }

  protected buildSearchPageResultsEvent(): Observable<SearchPageResultsEvent> {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1)
    );

    return this.eventService.get(PageEvent).pipe(
      switchMap((pageEvent) => {
        if (pageEvent?.semanticRoute !== 'search') {
          return EMPTY;
        }

        return searchResults$.pipe(
          map((searchResults) => ({
            ...pageEvent,
            ...{
              searchTerm: searchResults?.freeTextSearch,
              numberOfResults: searchResults?.pagination?.totalResults,
            },
          })),
          map((searchPage) => createFrom(SearchPageResultsEvent, searchPage))
        );
      })
    );
  }

  protected buildFacetChangedEvent(): Observable<FacetChangedEvent> {
    return this.eventService.get(PageEvent).pipe(
      switchMap((pageEvent) => {
        if (
          pageEvent?.semanticRoute !== 'search' &&
          pageEvent?.semanticRoute !== 'category' &&
          pageEvent?.semanticRoute !== 'brand'
        ) {
          return EMPTY;
        }

        return this.productSearchService.getResults().pipe(
          pairwise(),
          map(([prev, curr]) => {
            // remove the root ('allCategories') from category
            let activeFacets = curr.breadcrumbs;
            if (
              pageEvent.semanticRoute === 'category' ||
              pageEvent.semanticRoute === 'brand'
            ) {
              activeFacets = curr.breadcrumbs.slice(1);
            }

            if (prev && Object.keys(prev).length !== 0) {
              const isCategory =
                curr.breadcrumbs[0]?.facetCode === 'allCategories' &&
                prev.breadcrumbs[0].facetCode ===
                  curr.breadcrumbs[0].facetCode &&
                prev.breadcrumbs[0].facetValueCode ===
                  curr.breadcrumbs[0].facetValueCode;

              const isSearch =
                prev.freeTextSearch !== '' &&
                prev.freeTextSearch === curr.freeTextSearch;

              if (isCategory || isSearch) {
                let toggledState = FacetValueToggledState.TOGGLED_ON;
                let toggled = this.getToggledBreadcrumb(
                  curr.breadcrumbs,
                  prev.breadcrumbs
                );
                if (!toggled) {
                  toggled = this.getToggledBreadcrumb(
                    prev.breadcrumbs,
                    curr.breadcrumbs
                  );
                  toggledState = FacetValueToggledState.TOGGLED_OFF;
                }

                if (toggled) {
                  const facet = curr.facets?.find(
                    (f) => f.name === toggled.facetName
                  );
                  return createFrom(FacetChangedEvent, {
                    ...pageEvent,
                    appliedFacets: activeFacets,
                    toggledFacet: {
                      facet,
                      state: {
                        value: facet.values.find(
                          (v) => v.name === toggled.facetValueName
                        ),
                        toggled: toggledState,
                      },
                    },
                  });
                }
              }
            }

            return createFrom(FacetChangedEvent, {
              ...pageEvent,
              appliedFacets: activeFacets,
            });
          })
        );
      })
    );
  }

  private getToggledBreadcrumb(
    bc1: Breadcrumb[],
    bc2: Breadcrumb[]
  ): Breadcrumb {
    if (bc1.length - bc2.length === 1) {
      return bc1.find(
        (x) =>
          !bc2.find(
            (y) =>
              y.facetCode === x.facetCode &&
              y.facetValueCode === x.facetValueCode
          )
      );
    }
  }
}

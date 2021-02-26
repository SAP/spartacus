import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import {
  Breadcrumb,
  ProductSearchPage,
} from '../../model/product-search.model';
import { createFrom } from '../../util/create-from';
import { ProductSearchService } from '../facade/product-search.service';
import { FacetChangedEvent } from './product.events';

@Injectable({
  providedIn: 'root',
})
export class ProductEventBuilder {
  constructor(
    protected eventService: EventService,
    protected productSearchService: ProductSearchService
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(
      FacetChangedEvent,
      this.buildFacetChangedEvent()
    );
  }

  /**
   * To get the changed facet, we need to compare the product search results
   * got before and after toggling the facet value. These 2 product searches must
   * have the same search queries except one different solr filter term. That means
   * these 2 searches must have the same 'freeTextSearch'; and if they are category
   * searches, they must have the same root (in the same category or brand).
   */
  protected buildFacetChangedEvent(): Observable<FacetChangedEvent> {
    return this.productSearchService.getResults().pipe(
      pairwise(),
      filter(([prev, curr]) => this.compareSearchResults(prev, curr)),
      map(([prev, curr]) => {
        const toggled =
          this.getToggledBreadcrumb(curr.breadcrumbs, prev.breadcrumbs) ||
          this.getToggledBreadcrumb(prev.breadcrumbs, curr.breadcrumbs);
        if (toggled) {
          return createFrom(FacetChangedEvent, {
            code: toggled.facetCode,
            name: toggled.facetName,
            valueCode: toggled.facetValueCode,
            valueName: toggled.facetValueName,
            selected: curr.breadcrumbs.length > prev.breadcrumbs.length,
          });
        }
      })
    );
  }

  /**
   * The 2 product searches (before and after facet changed) must have the same
   * search queries; and if they are category searches, they also must have the
   * same root (in the same category or brand).
   */
  private compareSearchResults(
    prev: ProductSearchPage,
    curr: ProductSearchPage
  ): boolean {
    if (prev && Object.keys(prev).length !== 0) {
      // for text searches, they must have the same freeTextSearch
      const sameFreeTextSearch =
        prev.freeTextSearch !== '' &&
        prev.freeTextSearch === curr.freeTextSearch;

      // for category searches, they must have the same root
      const sameCategoryRoot =
        curr.breadcrumbs[0]?.facetCode === 'allCategories' &&
        prev.breadcrumbs[0]?.facetCode === curr.breadcrumbs[0]?.facetCode &&
        // same category or brand
        prev.breadcrumbs[0].facetValueCode ===
          curr.breadcrumbs[0].facetValueCode;

      return sameFreeTextSearch || sameCategoryRoot;
    }
  }

  /**
   * Get the toggled breadcrumb. The 2 breadcrumb lists got from the 2 search results
   * only can have one different solr filter term.
   */
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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';
import { EventService } from '../../event/event.service';
import { Breadcrumb } from '../../model/product-search.model';
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

  protected buildFacetChangedEvent(): Observable<FacetChangedEvent> {
    return this.productSearchService.getResults().pipe(
      pairwise(),
      filter(([prev, curr]) => {
        if (prev && Object.keys(prev).length !== 0) {
          const isCategory =
            curr.breadcrumbs[0]?.facetCode === 'allCategories' &&
            prev.breadcrumbs[0]?.facetCode === curr.breadcrumbs[0]?.facetCode &&
            prev.breadcrumbs[0].facetValueCode ===
              curr.breadcrumbs[0].facetValueCode;

          const isSearch =
            prev.freeTextSearch !== '' &&
            prev.freeTextSearch === curr.freeTextSearch;

          return isCategory || isSearch;
        }
      }),
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

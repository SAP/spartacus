import { Injectable } from '@angular/core';
import { ProductSearchService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatBotFacetService {
  facets$ = this.productSearchService.getResults();
  selected$ = new BehaviorSubject([]);

  constructor(protected productSearchService: ProductSearchService) {}

  getFacetOptions(facet) {
    return facet?.values;
  }

  addFacet(facet) {
    this.selected$.next([...this.selected$.value, facet]);
    this.searchFacets();
  }

  removeFacet(value) {
    this.selected$.next(
      this.selected$.value.filter((facet) => facet === value)
    );
    this.searchFacets();
  }

  searchFacets() {
    console.log(this.selected$.value);
    // this.productSearchService.search(
    //   decodeURIComponent(facet.query.query.value)
    // );
  }
}

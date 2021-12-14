import { Injectable } from '@angular/core';
import { ProductSearchService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ChatBotFacetService {
  facets$ = this.productSearchService.getResults();

  constructor(protected productSearchService: ProductSearchService) {}

  getFacetOptions(facet) {
    return facet?.values;
  }

  addFacet(facet) {
    console.log(facet);
    this.productSearchService.search(decodeURIComponent(facet.query.query.value));
  }
}

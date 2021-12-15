import { Injectable } from '@angular/core';
import { ProductSearchService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { ChatBotCategoryService } from './chat-bot-category.service';

@Injectable({
  providedIn: 'root',
})
export class ChatBotFacetService {
  facets$ = this.productSearchService.getResults();
  selected$ = new BehaviorSubject([]);

  constructor(
    protected productSearchService: ProductSearchService,
    protected chatbotCategoryService: ChatBotCategoryService
  ) {}

  getFacetOptions(facet) {
    // Return facets as options that have not yet been selected
    return facet?.values.filter(
      (facet) =>
        !this.selected$.value.map((value) => value.name).includes(facet.name)
    );
  }

  addFacet(facet) {
    this.selected$.next([...this.selected$.value, facet]);
    this.searchFacets();
  }

  protected buildQueryFromSelectedFacets(): string {
    const selectedFacets = this.selected$.value;

    // Set start of query with first facet
    let query: string = selectedFacets[0]?.query.query.value;

    for (let i = 1; i < selectedFacets.length; i++) {
      const facetQuerySplit = selectedFacets[i].query.query.value.split(':');
      query +=
        ':' +
        facetQuerySplit[facetQuerySplit.length - 2] +
        ':' +
        facetQuerySplit[facetQuerySplit.length - 1];
    }

    return query;
  }

  removeFacet(value) {
    this.selected$.next(
      this.selected$.value.filter((facet) => facet.name !== value.name)
    );
    this.searchFacets();
  }

  searchFacets() {
    if (this.selected$.value.length)
      this.productSearchService.search(
        decodeURIComponent(this.buildQueryFromSelectedFacets())
      );
    else {
      this.chatbotCategoryService.search();
    }
  }
}

import { Injectable } from '@angular/core';
import { ProductSearchService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { ChatBotCategoryService } from './chat-bot-category.service';

@Injectable({
  providedIn: 'root',
})
export class ChatBotFacetService {
  /**
   * Facets received from the product service.
   */
  facets$ = this.productSearchService.getResults();
  
  /**
   * Any selected facet is kept here.
   */
  selected$ = new BehaviorSubject([]);

  constructor(
    protected productSearchService: ProductSearchService,
    protected chatbotCategoryService: ChatBotCategoryService
  ) {}

  /**
   *  Return facets that have not yet been selected.
   */
  getFacetOptions(facet) {
    return facet?.values.filter(
      (facet) =>
        !this.selected$.value.map((value) => value.name).includes(facet.name)
    );
  }

  /**
   * Select a facet and perform a product search.
   */
  addFacet(facet) {
    this.selected$.next([...this.selected$.value, facet]);
    this.searchFacets();
  }

  /**
   * Remove selected facet and perform product search.
   */
  removeFacet(value) {
    this.selected$.next(
      this.selected$.value.filter((facet) => facet.name !== value.name)
    );
    this.searchFacets();
  }

  /**
   * Empties selected facets array.
   */
  clearFacets() {
    this.selected$.next([]);
  }

  /**
   * Builds a query string from the selected facets that can be used to
   * perform a product search.
   */
  protected buildQueryFromSelectedFacets(): string {
    const selectedFacets = this.selected$.value;

    // Set start of query with first facet
    let query: string = selectedFacets[0]?.query.query.value;

    // Adds remaining query pieces if any
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

  /**
   * Build query from selected facets and perform product search.
   * Uses category search function if there are no facets selected.
   */
  protected searchFacets() {
    if (this.selected$.value.length)
      this.productSearchService.search(
        decodeURIComponent(this.buildQueryFromSelectedFacets())
      );
    else {
      this.chatbotCategoryService.search();
    }
  }
}

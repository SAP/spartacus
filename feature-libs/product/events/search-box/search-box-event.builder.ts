import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import {
  createFrom,
  EventService,
  ProductActions,
  ProductSearchService,
  ProductService,
  SearchboxService,
} from '@spartacus/core';
import { PageEvent } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import {
  filter,
  map,
  skip,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import {
  SearchBoxProductSelectedEvent,
  SearchBoxSuggestionResultsEvent,
  SearchBoxSuggestionSelectedEvent,
} from './search-box.events';

@Injectable({
  providedIn: 'root',
})
export class SearchBoxEventBuilder {
  constructor(
    protected eventService: EventService,
    protected productService: ProductService,
    protected productSearchService: ProductSearchService,
    protected searchBoxService: SearchboxService,
    protected actionsSubject: ActionsSubject // TODO_LP: Rm later
  ) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(
      SearchBoxSuggestionResultsEvent,
      this.buildSuggestionResultsEvent()
    );
    this.eventService.register(
      SearchBoxSuggestionSelectedEvent,
      this.buildSuggestionSelectedSearchPageEvent()
    );
    this.eventService.register(
      SearchBoxProductSelectedEvent,
      this.buildProductSelectedEvent()
    );
  }

  /**
   * Returns a stream listening to suggestions results and actions that returns ProductSearchSuggestionResultsEvent
   */
  protected buildSuggestionResultsEvent(): Observable<
    SearchBoxSuggestionResultsEvent
  > {
    return this.searchBoxService.getSuggestionResults().pipe(
      withLatestFrom(this.getAction(ProductActions.GET_PRODUCT_SUGGESTIONS)),
      map(([suggestions, searchAction]) =>
        createFrom(SearchBoxSuggestionResultsEvent, {
          searchQuery: searchAction?.payload?.term,
          searchSuggestions: suggestions,
        })
      )
    );
  }

  /**
   * Returns a stream that will fire an event when a search suggestion is selected, which results in the user navigating to the search results page
   */
  protected buildSuggestionSelectedSearchPageEvent(): Observable<
    SearchBoxSuggestionSelectedEvent
  > {
    const searchResults$ = this.productSearchService.getResults().pipe(
      // skipping the initial value, and preventing emission of the previous search state
      skip(1),
      switchMap((searchResults) => {
        return of(searchResults).pipe(
          withLatestFrom(this.searchBoxService.getSuggestionResults())
        );
      }),
      filter(
        ([searchResults, suggestions]) =>
          Boolean(searchResults?.freeTextSearch) &&
          suggestions?.filter(
            (suggestion) => suggestion.value === searchResults?.freeTextSearch
          ).length > 0
      )
    );

    const freeTextSearch$ = this.getAction(
      ProductActions.GET_PRODUCT_SUGGESTIONS
    );

    return this.eventService.get(PageEvent).pipe(
      withLatestFrom(freeTextSearch$),
      switchMap(([pageEvent, suggestionAction]) => {
        if (pageEvent?.semanticRoute !== 'search') {
          return EMPTY;
        }

        return searchResults$.pipe(
          map(([searchResults, suggestions]) =>
            createFrom(SearchBoxSuggestionSelectedEvent, {
              freeText: suggestionAction.payload?.term,
              selectedSuggestion: searchResults.freeTextSearch,
              searchSuggestions: suggestions,
            })
          )
        );
      })
    );
  }

  /**
   * Returns a stream that will fire an event when a product suggestion is selected, which results in the user navigating to the product details page
   */
  protected buildProductSelectedEvent(): Observable<
    SearchBoxProductSelectedEvent
  > {
    const searchResults$ = this.searchBoxService.getResults();

    return this.eventService.get(PageEvent).pipe(
      filter((pageEvent) => pageEvent.semanticRoute === 'product'),
      switchMap((pageEvent) => {
        return this.productService.get(pageEvent.context.id).pipe(
          filter((product) => Boolean(product)),
          take(1),
          switchMap((product) => {
            return of(product).pipe(withLatestFrom(searchResults$));
          }),
          filter(
            ([product, searchResults]) =>
              searchResults.products?.filter(
                (suggestionProduct) => suggestionProduct.code === product.code
              ).length > 0
          ),
          map(([product, searchResults]) =>
            createFrom(SearchBoxProductSelectedEvent, {
              freeText: searchResults.freeTextSearch,
              selectedCode: product.code,
            })
          )
        );
      })
    );
  }

  // TODO_LP: move to core
  protected getAction(
    actionType: string | string[]
  ): Observable<{ type: string; payload?: any }> {
    return this.actionsSubject.pipe(ofType(...[].concat(actionType)));
  }
}

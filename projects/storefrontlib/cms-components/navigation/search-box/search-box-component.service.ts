/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  EventService,
  isNotUndefined,
  ProductSearchPage,
  RoutingService,
  SearchboxService,
  TranslationService,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  SearchBoxProductSelectedEvent,
  SearchBoxSuggestionSelectedEvent,
} from './search-box.events';
import { SearchBoxConfig, SearchResults } from './search-box.model';

const HAS_SEARCH_RESULT_CLASS = 'has-searchbox-results';

@Injectable({
  providedIn: 'root',
})
export class SearchBoxComponentService {
  chosenWord = new ReplaySubject<string>();
  sharedEvent = new ReplaySubject<KeyboardEvent>();

  constructor(
    public searchService: SearchboxService,
    protected routingService: RoutingService,
    protected translationService: TranslationService,
    protected winRef: WindowRef,
    protected eventService: EventService
  ) {}

  /**
   * Executes the search for products and suggestions,
   * unless the configuration is setup to not search for
   * products or suggestions.
   */
  search(query: string, config: SearchBoxConfig): void {
    if (!query || query === '') {
      this.clearResults();
      return;
    }

    if (
      config.minCharactersBeforeRequest &&
      query.length < config.minCharactersBeforeRequest
    ) {
      return;
    }

    if (config.displayProducts) {
      this.searchService.search(query, {
        pageSize: config.maxProducts,
      });
    }

    if (config.displaySuggestions) {
      this.searchService.searchSuggestions(query, {
        pageSize: config.maxSuggestions,
      });
    }
  }

  /**
   * Returns an observable with the SearchResults. When there's any
   * result, the body tag will get a classname, so that specific style
   * rules can be applied.
   */
  getResults(config: SearchBoxConfig): Observable<SearchResults> {
    return combineLatest([
      this.getProductResults(config),
      this.getProductSuggestions(config),
      this.getSearchMessage(config),
    ]).pipe(
      map(([productResults, suggestions, message]) => {
        return {
          products: productResults ? productResults.products : undefined,
          suggestions,
          message,
        };
      }),
      tap((results) =>
        this.toggleBodyClass(HAS_SEARCH_RESULT_CLASS, this.hasResults(results))
      )
    );
  }

  /**
   * Clears the searchbox results, so that old values are
   * no longer emited upon next search.
   */
  clearResults() {
    this.searchService.clearResults();
    this.toggleBodyClass(HAS_SEARCH_RESULT_CLASS, false);
  }

  hasBodyClass(className: string): boolean {
    return this.winRef.document.body.classList.contains(className);
  }

  toggleBodyClass(className: string, add?: boolean) {
    if (add === undefined) {
      this.winRef.document.body.classList.toggle(className);
    } else {
      add
        ? this.winRef.document.body.classList.add(className)
        : this.winRef.document.body.classList.remove(className);
    }
  }

  /**
   * Dispatches a searchbox event for product selected
   *
   * @param eventData data for the "SearchBoxProductSelectedEvent"
   */
  dispatchProductSelectedEvent(eventData: SearchBoxProductSelectedEvent): void {
    this.eventService.dispatch<SearchBoxProductSelectedEvent>(
      {
        freeText: eventData.freeText,
        productCode: eventData.productCode,
      },
      SearchBoxProductSelectedEvent
    );
  }

  /**
   * Dispatches a searchbox event for suggestion selected
   *
   * @param eventData data for the "SearchBoxSuggestionSelectedEvent"
   */
  dispatchSuggestionSelectedEvent(
    eventData: SearchBoxSuggestionSelectedEvent
  ): void {
    this.eventService.dispatch<SearchBoxSuggestionSelectedEvent>(
      {
        freeText: eventData.freeText,
        selectedSuggestion: eventData.selectedSuggestion,
        searchSuggestions: eventData.searchSuggestions,
      },
      SearchBoxSuggestionSelectedEvent
    );
  }

  /**
   * For search results model, it returns true when:
   * * there is any product OR
   * * the is any search suggestion OR
   * * there is a message.
   *
   * Otherwise it returns false.
   */
  protected hasResults(results: SearchResults): boolean {
    return (
      (!!results.products && results.products.length > 0) ||
      (!!results.suggestions && results.suggestions.length > 0) ||
      !!results.message ||
      !!results.recentSearches
    );
  }

  /**
   * Emits product search results in case when the config property `displayProducts` is true.
   * Otherwise it emits an empty object.
   */
  protected getProductResults(
    config: SearchBoxConfig
  ): Observable<ProductSearchPage> {
    if (config.displayProducts) {
      return this.searchService.getResults();
    } else {
      return of({});
    }
  }

  /**
   * Loads suggestions from the backend. In case there's no suggestion
   * available, we try to get an exact match suggestion.
   */
  protected getProductSuggestions(
    config: SearchBoxConfig
  ): Observable<string[]> {
    if (!config.displaySuggestions) {
      return of([]);
    } else {
      return this.searchService.getSuggestionResults().pipe(
        map((res) =>
          res.map((suggestion) => suggestion.value).filter(isNotUndefined)
        ),
        switchMap((suggestions) => {
          if (suggestions.length === 0) {
            return this.getExactSuggestion(config).pipe(
              map((match) => (match ? [match] : []))
            );
          } else {
            return of(suggestions);
          }
        })
      );
    }
  }

  /**
   * Whenever there is at least 1 product, we simulate
   * a suggestion to provide easy access to the search result page
   */
  protected getExactSuggestion(
    config: SearchBoxConfig
  ): Observable<string | undefined> {
    return this.getProductResults(config).pipe(
      switchMap((productResult) => {
        return productResult.products && productResult.products.length > 0
          ? this.fetchTranslation('searchBox.help.exactMatch', {
              term: productResult.freeTextSearch,
            })
          : of(undefined);
      })
    );
  }

  /**
   * Emits a 'no match' message, in case the product search results and search suggestions are empty.
   * Otherwise it emits null.
   */
  protected getSearchMessage(
    config: SearchBoxConfig
  ): Observable<string | undefined> {
    return combineLatest([
      this.getProductResults(config),
      this.getProductSuggestions(config),
    ]).pipe(
      switchMap(([productResult, suggestions]) => {
        if (
          productResult &&
          productResult.products &&
          productResult.products.length === 0 &&
          suggestions &&
          suggestions.length === 0
        ) {
          return this.fetchTranslation('searchBox.help.noMatch');
        } else {
          return of(undefined);
        }
      })
    );
  }

  /**
   * Navigates to the search result page with a given query
   */
  launchSearchPage(query: string): void {
    this.routingService.go({
      cxRoute: 'search',
      params: { query },
    });
  }

  private fetchTranslation(
    translationKey: string,
    options?: any
  ): Observable<string> {
    return this.translationService.translate(translationKey, options);
  }

  changeSelectedWord(selectedWord: string) {
    this.chosenWord.next(selectedWord);
  }

  shareEvent($event: KeyboardEvent) {
    this.sharedEvent.next($event);
  }
}

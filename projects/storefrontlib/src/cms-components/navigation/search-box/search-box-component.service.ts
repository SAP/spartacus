import { Injectable } from '@angular/core';
import {
  ProductSearchPage,
  RoutingService,
  SearchboxService,
  TranslationService,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SearchBoxConfig, SearchResults } from './search-box.model';

const DEFAULT_SEARCHBOCH_CONFIG: SearchBoxConfig = {
  minCharactersBeforeRequest: 1,
  maxProducts: 5,
  displaySuggestions: true,
  maxSuggestions: 5,
  displayProducts: true,
};

const HAS_SEARCH_RESULT_CLASS = 'has-searchbox-results';

@Injectable({
  providedIn: 'root',
})
export class SearchBoxComponentService {
  config$: Observable<any>;

  constructor(
    public searchService: SearchboxService,
    protected routingService: RoutingService,
    protected translationService: TranslationService,
    protected winRef: WindowRef
  ) {}

  /**
   * Executes the search for products and suggestions,
   * unless the configuration is setup to not search for
   * products or suggestions.
   */
  search(
    query: string,
    config: SearchBoxConfig = DEFAULT_SEARCHBOCH_CONFIG
  ): void {
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
  getResults(): Observable<SearchResults> {
    return combineLatest(
      this.productResults$,
      this.productSuggestions$,
      this.searchMessage$
    ).pipe(
      map(([productResults, suggestions, message]) => {
        return {
          products: productResults ? productResults.products : null,
          suggestions,
          message,
        };
      }),
      tap(results =>
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

  private hasResults(results: SearchResults): boolean {
    return (
      (!!results.products && results.products.length > 0) ||
      (!!results.suggestions && results.suggestions.length > 0) ||
      !!results.message
    );
  }

  private get productResults$(): Observable<ProductSearchPage> {
    return this.searchService.getResults();
  }

  private get productSuggestions$(): Observable<string[]> {
    return this.searchService
      .getSuggestionResults()
      .pipe(map(res => res.map(suggestion => suggestion.value)));
  }

  private get searchMessage$(): Observable<string> {
    return combineLatest(this.productResults$, this.productSuggestions$).pipe(
      switchMap(([productResult, suggestions]) => {
        if (!productResult || !productResult.products || !suggestions) {
          return of(null);
        } else if (
          suggestions.length === 0 &&
          productResult.products.length === 0
        ) {
          return this.fetchTranslation('searchBox.help.noMatch');
        } else if (
          suggestions.length === 0 &&
          productResult.products.length > 0
        ) {
          return this.fetchTranslation('searchBox.help.exactMatch', {
            term: productResult.freeTextSearch,
          });
        } else {
          return of(null);
        }
      })
    );
  }

  /**
   * Navigates to the search result page with a given query
   */
  public launchSearchPage(query: string): void {
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
}

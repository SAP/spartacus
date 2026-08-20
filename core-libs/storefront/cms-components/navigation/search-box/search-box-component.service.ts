/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  ProductActions,
} from '@spartacus/core';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of,
  ReplaySubject,
} from 'rxjs';
import { map, switchMap, tap, filter, take } from 'rxjs/operators';
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
  searchCompleted = new BehaviorSubject<boolean>(false);
  private readonly _currentQuery$ = new BehaviorSubject<string>('');
  readonly currentQuery$: Observable<string> = this._currentQuery$.asObservable();

  private readonly _isAiModeActive$ = new BehaviorSubject<boolean>(false);
  readonly isAiModeActive$: Observable<boolean> = this._isAiModeActive$.asObservable();

  private readonly _lastSearchWasAi$ = new BehaviorSubject<boolean>(false);
  readonly lastSearchWasAi$: Observable<boolean> = this._lastSearchWasAi$.asObservable();

  private readonly _lastAiQuery$ = new BehaviorSubject<string>('');
  private readonly _restoredAiQuery$ = new BehaviorSubject<string>('');
  // aiSearchTrigger$ fires only on explicit user search (ENTER) — used by backend to start stream
  readonly aiSearchTrigger$: Observable<string> = this._lastAiQuery$.asObservable();
  // lastAiQuery$ merges both explicit and restored queries — used by criteria/badges components
  readonly lastAiQuery$: Observable<string> = merge(this._lastAiQuery$, this._restoredAiQuery$);

  protected enableRecentSearches: boolean = false;
  protected enableTrendingSearches: boolean = false;
  private currentQueryLength: number = 0;
  private hasKeywordRedirect: boolean = false;
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
    this.hasKeywordRedirect = false;
    this.currentQueryLength = query ? query.length : 0;
    this.searchCompleted.next(false);
    this._currentQuery$.next(query ?? '');

    if (
      !this.enableRecentSearches &&
      !this.enableTrendingSearches &&
      (!query || query === '')
    ) {
      this.clearResults();
      return;
    }
    if (
      config.minCharactersBeforeRequest &&
      query.length < config.minCharactersBeforeRequest
    ) {
      return;
    }

    let productsComplete = !config.displayProducts;
    let suggestionsComplete = !config.displaySuggestions;

    if (config.displayProducts) {
      this.searchService
        .searchWithCompletion(query, {
          pageSize: config.maxProducts,
        })
        .subscribe((result: any) => {
          if (
            result?.type === ProductActions.SEARCH_PRODUCTS_SUCCESS &&
            result?.payload?.keywordRedirectUrl
          ) {
            this.hasKeywordRedirect = true;
          }
          productsComplete = true;
          this.checkSearchCompletion(productsComplete, suggestionsComplete);
        });
    }

    if (config.displaySuggestions) {
      this.searchService
        .searchSuggestionsWithCompletion(query, {
          pageSize: config.maxSuggestions,
        })
        .subscribe((result: any) => {
          if (
            result?.type === ProductActions.GET_PRODUCT_SUGGESTIONS_SUCCESS &&
            result?.payload?.keywordRedirectUrl
          ) {
            this.hasKeywordRedirect = true;
          }
          suggestionsComplete = true;
          this.checkSearchCompletion(productsComplete, suggestionsComplete);
        });
    }
  }

  /**
   * Check if search operations are complete based on actual completion flags
   */
  private checkSearchCompletion(
    productsComplete: boolean,
    suggestionsComplete: boolean
  ): void {
    if (
      productsComplete &&
      suggestionsComplete &&
      this.currentQueryLength > 0
    ) {
      this.searchCompleted.next(true);
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
    this._currentQuery$.next('');

    // Reset search completion state
    this.hasKeywordRedirect = false;
    this.currentQueryLength = 0;
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
   * after waiting for all search operations to complete
   */
  launchSearchPage(query: string): void {
    // Reset the completed state before starting new search
    this.searchCompleted
      .pipe(
        filter((complete) => complete), // Only proceed when true
        take(1) // Take only the first completion
      )
      .subscribe(() => {
        if (!this.hasKeywordRedirect) {
          this.routingService.go({
            cxRoute: 'search',
            params: { query },
          });
        }
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

  setTrendingSearches(enabled: boolean = false) {
    this.enableTrendingSearches = enabled;
  }

  setRecentSearches(enabled: boolean = false) {
    this.enableRecentSearches = enabled;
  }

  setAiMode(active: boolean): void {
    this._isAiModeActive$.next(active);
    this.persistAiModePreference(active);
  }

  /**
   * Persists the user's search-mode toggle choice (regular vs AI) so it is
   * restored on the next visit. Uses localStorage because this is a lasting UI
   * preference, unlike the per-search AI context which lives in sessionStorage.
   */
  private persistAiModePreference(active: boolean): void {
    try {
      this.winRef.localStorage?.setItem(
        'cx_ai_mode_preference',
        active ? '1' : '0'
      );
    } catch {
      // localStorage may be unavailable (SSR, private mode, quota); ignore.
    }
  }

  getAiModePreference(): boolean {
    try {
      return this.winRef.localStorage?.getItem('cx_ai_mode_preference') === '1';
    } catch {
      // localStorage may be unavailable (SSR, private mode); default to regular.
      return false;
    }
  }

  markAiSearchLaunched(isAiMode: boolean): void {
    this._lastSearchWasAi$.next(isAiMode);
    if (!isAiMode) {
      this.clearAiContext();
    }
  }

  setAiQuery(query: string): void {
    this._lastAiQuery$.next(query);
    this.persistAiContext(query);
  }

  private persistAiContext(query: string): void {
    try {
      const storage = this.winRef.sessionStorage;
      if (storage) {
        storage.setItem('cx_ai_context', JSON.stringify({ query, ts: Date.now() }));
      }
    } catch {}
  }

  restoreAiContextFromStorage(): void {
    try {
      const storage = this.winRef.sessionStorage;
      const raw = storage?.getItem('cx_ai_context');
      if (!raw) return;
      const { query, ts } = JSON.parse(raw) as { query: string; ts: number };
      if (Date.now() - ts > 30 * 60 * 1000) {
        storage?.removeItem('cx_ai_context');
        return;
      }
      const navEntries = this.winRef.nativeWindow?.performance?.getEntriesByType?.('navigation') as PerformanceNavigationTiming[] | undefined;
      if (navEntries?.[0]?.type === 'reload') {
        storage?.removeItem('cx_ai_context');
        return;
      }
      this._lastSearchWasAi$.next(true);
      this._restoredAiQuery$.next(query);
    } catch {}
  }

  private clearAiContext(): void {
    this._lastAiQuery$.next('');
    try {
      this.winRef.sessionStorage?.removeItem('cx_ai_context');
    } catch {}
  }
}

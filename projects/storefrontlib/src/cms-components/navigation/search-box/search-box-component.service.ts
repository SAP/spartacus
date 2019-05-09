import { Injectable } from '@angular/core';
import {
  ProductSearchService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { SearchBoxConfig, SearchResults } from './search-box.model';

const DEFAULT_SEARCHBOCH_CONFIG: SearchBoxConfig = {
  minCharactersBeforeRequest: 1,
  maxProducts: 2,
  displaySuggestions: true,
  maxSuggestions: 3,
  displayProducts: true,
};

@Injectable({
  providedIn: 'root',
})
export class SearchBoxComponentService {
  config$: Observable<any>;

  constructor(
    public searchService: ProductSearchService,
    protected routingService: RoutingService,
    protected translationService: TranslationService
  ) {}

  public getSearchResults(
    text$: Observable<string>,
    config$?: Observable<any>
  ): Observable<SearchResults> {
    return combineLatest(
      text$.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
      config$ ? config$ : of(DEFAULT_SEARCHBOCH_CONFIG)
    ).pipe(
      switchMap(([term, config]) => {
        if (!term) {
          return of({});
        } else if (term.length >= config.minCharactersBeforeRequest) {
          return this.fetchSearchResults(term, config);
        } else {
          return this.fetchMessage('searchBox.help.insufficientChars');
        }
      })
    );
  }

  /**
   * Navigates to the search result page with a given query
   */
  public launchSearchPage(query: string): void {
    this.routingService.go({
      route: 'search',
      params: { query },
    });
  }

  private fetchSearchResults(
    text: string,
    config: SearchBoxConfig
  ): Observable<SearchResults> {
    this.executeSearch(text, config);

    const suggestions = this.searchService
      .getSearchSuggestions()
      .pipe(map(res => res.map(suggestion => suggestion.value)));

    const products = this.searchService
      .getAuxSearchResults()
      .pipe(map(res => res.products || []));

    return combineLatest(suggestions, products).pipe(
      switchMap(([s, p]) => {
        if (s.length === 0 && p.length === 0) {
          return this.fetchMessage('searchBox.help.noMatch');
        } else {
          return of({
            suggestions: s,
            products: p,
          });
        }
      })
    );
  }

  private fetchMessage(translationKey: string): Observable<any> {
    return this.translationService.translate(translationKey).pipe(
      map(msg => {
        return {
          message: msg,
        };
      })
    );
  }

  private executeSearch(search: string, config: SearchBoxConfig): void {
    if (config.displayProducts) {
      this.searchService.searchAuxiliary(search, {
        pageSize: config.maxProducts,
      });
    }

    if (config.displaySuggestions) {
      this.searchService.getSuggestions(search, {
        pageSize: config.maxSuggestions,
      });
    }
  }
}

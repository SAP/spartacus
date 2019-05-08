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
  switchMap,
} from 'rxjs/operators';

export interface SearchBoxConfig {
  maxProducts: number;
  displaySuggestions: boolean;
  maxSuggestions: number;
  minCharactersBeforeRequest: number;
  displayProducts: boolean;
}

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
  config$: Observable<any>; // = of(DEFAULT_SEARCHBOCH_CONFIG);

  queryParam$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params.query));

  constructor(
    public searchService: ProductSearchService,
    protected routingService: RoutingService,
    protected translationService: TranslationService
  ) {}

  typeahead = (
    text$: Observable<string>,
    config$?: Observable<any>
  ): Observable<any> =>
    combineLatest(
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
      config$ ? config$ : of(DEFAULT_SEARCHBOCH_CONFIG)
    ).pipe(
      switchMap(([term, config]) => {
        if (!term) {
          return of({});
        } else if (term.length >= config.minCharactersBeforeRequest) {
          return this.fetch(term, config);
        } else {
          return this.translationService
            .translate('searchBox.help.insufficientChars')
            .pipe(
              map(msg => {
                return {
                  message: msg,
                };
              })
            );
        }
      })
    );

  private fetch(text: string, config: SearchBoxConfig): Observable<any> {
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
          return this.translationService
            .translate('searchBox.help.noMatch')
            .pipe(
              map(msg => {
                return {
                  message: msg,
                };
              })
            );
        } else {
          return of({
            suggestions: s,
            products: p,
          });
        }
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

  public launchSearchPage(query: string): void {
    this.routingService.go({
      route: 'search',
      params: { query },
    });
  }
}

import { Injectable } from '@angular/core';
import {
  Product,
  RoutingService,
  SearchboxService,
  TranslationService,
  WindowRef,
} from '@spartacus/core';
import { Observable, of, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SearchBoxConfig, SearchResults } from './search-box.model';

const DEFAULT_SEARCHBOCH_CONFIG: SearchBoxConfig = {
  minCharactersBeforeRequest: 1,
  maxProducts: 5,
  displaySuggestions: true,
  maxSuggestions: 5,
  displayProducts: true,
};

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
    if (config.displayProducts) {
      this.searchService.search(query, {
        pageSize: config.maxProducts,
      });
    }

    if (config.displaySuggestions) {
      this.searchService.getSuggestionResults(query, {
        pageSize: config.maxSuggestions,
      });
    }
  }

  getResults(): Observable<SearchResults> {
    return zip(
      this.productResults$,
      this.productSuggestions$,
      this.searchMessage$
    ).pipe(
      // tap(results => console.log('results', results)),
      map(([products, suggestions, message]) => {
        return { products, suggestions, message };
      }),
      tap(results =>
        console.log(
          (!!results.products && results.products.length > 0) ||
            (!!results.suggestions && results.suggestions.length > 0) ||
            !!results.message
        )
      ),
      tap(results =>
        this.toggleClass(
          'has-results',
          (!!results.products && results.products.length > 0) ||
            (!!results.suggestions && results.suggestions.length > 0) ||
            !!results.message
        )
      )
    );
  }

  // getResults(
  // ): Observable<any> {
  //   return combineLatest(
  //     text.pipe(
  //       tap(t => this.toggleResultPanel(t)),
  //       debounceTime(300)
  //     ),
  //     config ? config : of(DEFAULT_SEARCHBOCH_CONFIG)
  //   ).pipe(
  //     // tap(([term, c, p, s]) => this.executeSearch(term, c)),
  //     // switchMap(() => zip()),
  //     // switchMap(([products, suggestions]) => {
  //     //   return this.fetchMessage(products, suggestions).pipe(
  //     //     map(message => {
  //     //       return {
  //     //         products,
  //     //         suggestions,
  //     //         message,
  //     //       };
  //     //     })
  //     //   );
  //     // }),

  //     tap(r => console.log('results???', r)),
  //     tap(results =>
  //       this.toggleClass(
  //         'has-results',
  //         !!results.products || !!results.suggestions || !results.message
  //       )
  //     )
  //   );
  // }

  // results(): Observable<SearchResults> {
  //   return combineLatest(
  //     this.productResults$,
  //     this.productSuggestions$).pipe(map());
  // }

  /**
   * Clears the searchbox results, so that old values are
   * no longer emited upon next search.
   */
  clearResults() {
    this.searchService.clearResults();
  }

  private get productResults$(): Observable<Product[]> {
    return this.searchService.getResults().pipe(map(res => res.products));
  }

  private get productSuggestions$(): Observable<string[]> {
    return this.searchService
      .searchSuggestions()
      .pipe(map(res => res.map(suggestion => suggestion.value)));
  }

  private get searchMessage$(): Observable<string> {
    return zip(this.productResults$, this.productSuggestions$).pipe(
      switchMap(([products, suggestions]) => {
        if (!products || !suggestions) {
          return of(null);
        } else if (suggestions.length === 0 && products.length === 0) {
          return this.fetchTranslation('searchBox.help.noMatch');
        } else if (suggestions.length === 0 && products.length > 0) {
          return this.fetchTranslation('searchBox.help.exactMatch', {
            term: 'TODO',
          });
        } else {
          return of(null);
        }
      })
    );
  }

  // private fetchMessage(
  //   products: Product[],
  //   suggestions: string[]
  // ): Observable<string> {
  //   if (!products || !suggestions) {
  //     return of(null);
  //   } else if (suggestions.length === 0 && products.length === 0) {
  //     return this.fetchTranslation('searchBox.help.noMatch');
  //   } else if (suggestions.length === 0 && products.length > 0) {
  //     return this.fetchTranslation('searchBox.help.exactMatch', {
  //       term: 'TODO',
  //     });
  //   } else {
  //     return of(null);
  //   }
  // }

  /**
   * hide the has-result class when there's no text
   * this is important to avoid flickering of the result panel
   */
  private toggleResultPanel(text: string): void {
    if (!text) {
      // this.toggleClass('has-results', false);
    }
  }

  toggleClass(className: string, add?: boolean) {
    // console.log('toggleClass', className, add);
    if (add === undefined) {
      this.winRef.document.body.classList.toggle(className);
    } else {
      add
        ? this.winRef.document.body.classList.add(className)
        : this.winRef.document.body.classList.remove(className);
    }
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

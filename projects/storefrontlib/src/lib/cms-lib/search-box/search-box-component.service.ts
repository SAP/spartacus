import { Injectable, Optional } from '@angular/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { ProductSearchService } from '@spartacus/core';
import { combineLatest, merge, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { RoutingService, CmsSearchBoxComponent } from '@spartacus/core';

interface SearchBoxConfig {
  maxProducts: number;
  displaySuggestions: boolean;
  maxSuggestions: number;
  minCharactersBeforeRequest: number;
  displayProducts: boolean;
}

@Injectable()
export class SearchBoxComponentService {
  defaultConfig: SearchBoxConfig = {
    maxProducts: 2,
    displaySuggestions: true,
    maxSuggestions: 5,
    minCharactersBeforeRequest: 3,
    displayProducts: false
  };

  config$: Observable<SearchBoxConfig> = of(this.defaultConfig);

  queryParam$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params.query));

  constructor(
    @Optional()
    protected componentData: CmsComponentData<CmsSearchBoxComponent>,
    public searchService: ProductSearchService,
    protected routingService: RoutingService
  ) {
    if (componentData) {
      this.config$ = merge(
        this.config$,
        this.componentData.data$.pipe(
          map(config => ({ ...this.defaultConfig, ...config }))
        )
      );
    }
  }

  typeahead = (text$: Observable<string>) =>
    combineLatest(
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.config$
    ).pipe(
      switchMap(([term, config]) => {
        if (term.length >= config.minCharactersBeforeRequest) {
          return this.fetch(term, config);
        } else {
          return of([]);
        }
      })
    );

  public launchSearchPage(query: string) {
    this.routingService.go(['/search', query]);
  }

  private fetch(text: string, config: SearchBoxConfig): Observable<any[]> {
    this.executeSearch(text, config);

    const suggestions = this.searchService
      .getSearchSuggestions()
      .pipe(map(res => res.map(suggestion => suggestion.value)));

    const products = this.searchService
      .getAuxSearchResults()
      .pipe(map(res => res.products || []));
    return combineLatest(suggestions, products).pipe(
      map(([a, b]) => [...a, ...b])
    );
  }

  private executeSearch(search: string, config: SearchBoxConfig) {
    if (config.displayProducts) {
      this.searchService.searchAuxiliary(search, {
        pageSize: config.maxProducts
      });
    }

    if (config.displaySuggestions) {
      this.searchService.getSuggestions(search, {
        pageSize: config.maxSuggestions
      });
    }
  }
}

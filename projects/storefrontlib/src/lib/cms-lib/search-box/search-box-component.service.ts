import { Injectable, Optional } from '@angular/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { ProductSearchService } from '../../product/services/product-search.service';
import { combineLatest, merge, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';

interface SearchBoxConfig {
  maxProducts: number;
  displaySuggestions: boolean;
  maxSuggestions: number;
  minCharactersBeforeRequest: number;
}

@Injectable()
export class SearchBoxComponentService {
  defaultConfig: SearchBoxConfig = {
    maxProducts: 5,
    displaySuggestions: true,
    maxSuggestions: 5,
    minCharactersBeforeRequest: 3
  };

  config$: Observable<SearchBoxConfig> = of(this.defaultConfig);

  constructor(
    @Optional() protected componentData: CmsComponentData,
    protected searchService: ProductSearchService,
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

  search = (text$: Observable<string>) =>
    combineLatest(
      text$.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.config$
    ).pipe(
      switchMap(([term, config]) => {
        if (term.length >= config.minCharactersBeforeRequest) {
          return this.fetch(term, config).pipe(
            map(res => res.map(suggestion => suggestion.value))
          );
        } else {
          return of([]);
        }
      })
    );

  public launchSearchPage(query: string) {
    this.routingService.go('/search', query);
  }

  private fetch(text: string, config: SearchBoxConfig): Observable<any[]> {
    this.executeSearch(text, config);

    return this.searchService.searchSuggestions$;
  }

  // Uncomment for product search
  // private productSearch(): Observable<any> {
  //   return this.store.select(fromProductStore.getSearchResults);
  // }

  private executeSearch(search: string, config: SearchBoxConfig) {
    // Uncomment for product search
    // if (this.shouldSearchProducts()) {
    //   const searchConfig = new SearchConfig();
    //   searchConfig.pageSize = this.maxProduct;
    //   this.store.dispatch(
    //     new fromProductStore.SearchProducts({
    //       queryText: search,
    //       searchConfig: searchConfig
    //     })
    //   );
    // }

    if (config.displaySuggestions) {
      this.searchService.getSuggestions(search, {
        pageSize: config.maxSuggestions
      });
    }
  }

  // Uncomment for product search
  // private shouldSearchProducts(): Boolean {
  //   return this.component && this.component.displayProducts;
  // }
}

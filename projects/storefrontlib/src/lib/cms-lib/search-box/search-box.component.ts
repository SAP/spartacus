import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import * as fromProductStore from '../../product/store';
import * as fromRouting from '../../routing/store';
import { debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from '../../cms/store';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { ProductSearchService } from '../../product/services/product-search.service';


interface SearchBoxConfig {
  maxProducts: number;
  displaySuggestions: boolean;
  maxSuggestions: number;
  minCharactersBeforeRequest: number;
}

@Component({
  selector: 'y-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBoxComponent {
  searchBoxControl: FormControl = new FormControl();

  defaultConfig: SearchBoxConfig = {
    maxProducts: 5,
    displaySuggestions: true,
    maxSuggestions: 5,
    minCharactersBeforeRequest: 3
  };

  config$: Observable<SearchBoxConfig> = merge(
    of(this.defaultConfig),
    this.componentData.data$.pipe(map(config => ({ ...this.defaultConfig, ...config })))
  );

  isMobileSearchVisible: boolean;

  constructor(
    protected componentData: CmsComponentData,
    protected store: Store<fromStore.CmsState>,
    protected searchService: ProductSearchService
  ) { }

  search = (text$: Observable<string>) => {
    return combineLatest(
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
  };

  public submitSearch(): void {
    this.launchSearchPage(this.searchBoxControl.value);
  }

  public onKey(event: any) {
    if (event.key === 'Enter') {
      this.launchSearchPage(this.searchBoxControl.value);
    }
  }

  public launchSearchPage(query: string) {
    this.store.dispatch(
      new fromRouting.Go({
        path: ['/search', query]
      })
    );
  }

  private fetch(text: string, config: SearchBoxConfig): Observable<any[]> {
    this.executeSearch(text, config);

    return this.store.select(fromProductStore.getProductSuggestions);
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

  public toggleMobileSearchInput(): void {
    this.isMobileSearchVisible = !this.isMobileSearchVisible;
  }
}

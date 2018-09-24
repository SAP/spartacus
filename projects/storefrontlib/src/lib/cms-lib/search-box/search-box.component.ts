import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import * as fromProductStore from '../../product/store';
import * as fromRouting from '../../routing/store';
import { SearchConfig } from '../../product/search-config';
import { debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from '../../cms/store';

@Component({
  selector: 'y-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent extends AbstractCmsComponent implements OnInit {
  searchBoxControl: FormControl = new FormControl();

  maxProduct: number;
  maxSuggestions: number;
  minCharactersBeforeRequest: number;

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>,
  ) {
    super(cd);
  }

  public search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length >= this.minCharactersBeforeRequest) {
          return this.fetch(term).pipe(
            map(res => res.map(suggestion => suggestion.value))
          );
        } else {
          return of([]);
        }
      })
    );
  };

  ngOnInit() {
    this.configSearch();
  }

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

  private fetch(text: string): Observable<any[]> {
    this.executeSearch(text);

    return this.store.select(fromProductStore.getProductSuggestions);
  }

  // Uncomment for product search
  // private productSearch(): Observable<any> {
  //   return this.store.select(fromProductStore.getSearchResults);
  // }

  private executeSearch(search: string) {
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

    if (this.shouldSearchSuggestions()) {
      const searchConfig = new SearchConfig();
      searchConfig.pageSize = this.maxSuggestions;
      this.store.dispatch(
        new fromProductStore.GetProductSuggestions({
          term: search,
          searchConfig: searchConfig
        })
      );
    }
  }

  private shouldSearchSuggestions(): Boolean {
    return this.component && this.component.displaySuggestions;
  }

  // Uncomment for product search
  // private shouldSearchProducts(): Boolean {
  //   return this.component && this.component.displayProducts;
  // }

  private configSearch() {
    this.maxProduct = this.component.maxProducts || 5;
    this.maxSuggestions = this.component.maxSuggestions || 5;
    this.minCharactersBeforeRequest =
      this.component.minCharactersBeforeRequest || 3;
  }
}

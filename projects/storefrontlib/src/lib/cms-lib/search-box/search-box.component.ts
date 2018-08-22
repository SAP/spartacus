import {
  Component,
  HostListener,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import * as fromProductStore from '../../product/store';
import * as fromRouting from '../../routing/store';
import { SearchConfig } from '../../product/search-config';

@Component({
  selector: 'y-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent extends AbstractCmsComponent {
  static componentName = 'SearchBoxComponent';

  searchBoxControl: FormControl = new FormControl();

  searchResults$: Observable<any[]>;
  suggestionResults$: Observable<any[]>;

  maxProduct: number;
  maxSuggestions: number;
  minCharactersBeforeRequest: number;

  clickedInside = false;
  subscription: Subscription;

  @HostListener('click')
  clickInside() {
    this.clickedInside = true;
  }

  @HostListener('document:click')
  clickout() {
    // Reset the search box if the user clicks outside the search box
    if (!this.clickedInside && this.searchBoxControl.dirty) {
      this.searchBoxControl.reset();
      this.store.dispatch(new fromProductStore.CleanProductSearchState());
    }
    this.clickedInside = false;
  }

  protected fetchData() {
    if (this.component) {
      this.configSearch();

      if (this.component.displayProducts) {
        this.searchResults$ = this.store.select(
          fromProductStore.getSearchResults
        );
      }

      if (this.component.displaySuggestions) {
        this.suggestionResults$ = this.store.select(
          fromProductStore.getProductSuggestions
        );
      }

      this.setupSearch();
      super.fetchData();
    }
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      this.launchSearchPage(this.searchBoxControl.value);
    }
  }

  onFocus() {
    this.searchBoxControl.reset();
    this.store.dispatch(new fromProductStore.CleanProductSearchState());
  }

  launchSearchPage(query: string) {
    // TODO: make the URL configurable
    this.store.dispatch(
      new fromRouting.Go({
        path: ['/search', query]
      })
    );

    this.searchBoxControl.reset();
  }

  protected setupSearch() {
    this.subscription = this.searchBoxControl.valueChanges.subscribe(value => {
      if (this.shouldSearchProducts()) {
        const searchConfig = new SearchConfig();
        searchConfig.pageSize = this.maxProduct;
        this.store.dispatch(
          new fromProductStore.SearchProducts({
            queryText: value,
            searchConfig: searchConfig
          })
        );
      }

      if (this.shouldSearchSuggestions()) {
        const searchConfig = new SearchConfig();
        searchConfig.pageSize = this.maxSuggestions;
        this.store.dispatch(
          new fromProductStore.GetProductSuggestions({
            term: value,
            searchConfig: searchConfig
          })
        );
      }
    });
  }

  private shouldSearchSuggestions() {
    return (
      this.component &&
      this.component.displaySuggestions &&
      this.meetsLength(this.searchBoxControl.value)
    );
  }
  private shouldSearchProducts() {
    return (
      this.component &&
      this.component.displayProducts &&
      this.meetsLength(this.searchBoxControl.value)
    );
  }

  private configSearch() {
    this.maxProduct = this.component.maxProducts || 5;
    this.maxSuggestions = this.component.maxSuggestions || 5;
    this.minCharactersBeforeRequest =
      this.component.minCharactersBeforeRequest || 3;
  }

  private meetsLength(value: string): boolean {
    return (
      this.minCharactersBeforeRequest &&
      value !== null &&
      value.length >= this.minCharactersBeforeRequest
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
}

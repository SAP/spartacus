import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

import { AbstractCmsComponent } from '../../newcms/components/abstract-cms-component';
import * as fromProductStore from '../../product/store';
import { SearchConfig } from '../../product/search-config';

@Component({
  selector: 'y-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent extends AbstractCmsComponent {
  searchBoxControl: FormControl = new FormControl();

  searchResults$: Observable<any[]>;
  suggestionResults$: Observable<any[]>;

  maxProduct: number;
  maxSuggestions: number;
  minCharactersBeforeRequest: number;

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

  launchSearchPage(query: string) {
    // TODO: make the URL configurable
    // this.router.navigate(['/search', query]);
    // this.searchBoxControl.reset();
  }

  protected setupSearch() {
    this.searchBoxControl.valueChanges.subscribe(value => {
      if (this.shouldSearchProducts()) {
        this.store.dispatch(
          new fromProductStore.SearchProducts({
            queryText: value,
            searchConfig: new SearchConfig(this.maxProduct)
          })
        );
      }

      if (this.shouldSearchSuggestions()) {
        this.store.dispatch(
          new fromProductStore.GetProductSuggestions({
            term: value,
            searchConfig: new SearchConfig(this.maxSuggestions)
          })
        );
      }
    });

    this.searchResults$.subscribe(data => console.log(data));
  }

  private shouldSearchSuggestions() {
    return (
      this.component.displaySuggestions &&
      this.meetsLength(this.searchBoxControl.value)
    );
  }
  private shouldSearchProducts() {
    return (
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
      this.component.minCharactersBeforeRequest &&
      value.length >= this.component.minCharactersBeforeRequest
    );
  }
}

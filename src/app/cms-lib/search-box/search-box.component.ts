import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

import { AbstractProductComponent } from '../../cms/abstract-product-component';

@Component({
  selector: 'y-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent extends AbstractProductComponent {

    searchBoxControl = new FormControl();

    searchResults: BehaviorSubject<any[]>;
    suggestionResults: BehaviorSubject<any[]>;

    pageSize;
    maxNumberOfProducts;
    minCharactersBeforeRequest;

    // overriden hook that is called when the model is available
    protected fetchData() {
        this.configure(this.model);
        this.setupSearch();
    }

    onKey(event: any) {
        if (event.key === 'Enter') {
            this.launchSearchPage(this.searchBoxControl.value);
        }
    }

    launchSearchPage(query: string) {
        // TODO: make the URL configurable
        this.router.navigate(['/search', query]);
        // this.searchBoxControl.reset();
    }

    protected setupSearch() {

        if (this.model.displayProducts) {
            this.searchResults = new BehaviorSubject<any>([]);
            this.searchResults.next([]);
        }
        if (this.model.displaySuggestions) {
            this.suggestionResults = new BehaviorSubject<any>([]);
            this.suggestionResults.next([]);
        }
        const searchConfig = this.productSearch.createConfig();
        // observe changes in input
        this.searchBoxControl.valueChanges.subscribe((value) => {
            if (this.shouldSearchProducts()) {
                this.productSearch.searchProducts(value, searchConfig, this.searchResults);
                // this.productLoader.incrementalSearchProducts(this.searchResults, value, this.pageSize);
            }
            if (this.shouldSearchSuggestions()) {
                this.productSearch.searchSuggestions(value, searchConfig, this.suggestionResults);
            }
        });
    }

    private shouldSearchSuggestions() {
        return this.model.displaySuggestions && this.meetsLength(this.searchBoxControl.value);
    }
    private shouldSearchProducts() {
        return this.model.displayProducts && this.meetsLength(this.searchBoxControl.value);
    }
    
    private configure(model) {
        this.maxNumberOfProducts = model.maxProducts;
        this.pageSize = this.model.maxProducts || 5;
        this.minCharactersBeforeRequest = this.model.minCharactersBeforeRequest || 0;
    }

    private meetsLength(value: string): boolean {
        return true;
        // return this.model.minCharactersBeforeRequest && value.length >= this.model.minCharactersBeforeRequest;
    }

}

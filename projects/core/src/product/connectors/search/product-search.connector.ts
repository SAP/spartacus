import { Injectable } from '@angular/core';
import { ProductSearchAdapter } from './product-search.adapter';
import { SearchConfig } from '../../model/search-config';
import { Observable } from 'rxjs';
import { Suggestion, UIProductSearchPage } from '../../../model/product-search.model';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchConnector {
  constructor(protected adapter: ProductSearchAdapter) {}

  search(
    query: string,
    searchConfig?: SearchConfig
  ): Observable<UIProductSearchPage> {
    return this.adapter.search(query, searchConfig);
  }

  getSuggestions(term: string, pageSize?: number): Observable<Suggestion[]> {
    return this.adapter.loadSuggestions(term, pageSize);
  }
}

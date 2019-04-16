import { Injectable } from '@angular/core';
import { ProductSearchAdapter } from './product-search.adapter';
import {
  ProductSearchPage,
  SuggestionList,
} from '../../../occ/occ-models/occ.models';
import { SearchConfig } from '../../model/search-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchConnector {
  constructor(protected adapter: ProductSearchAdapter) {}

  search(
    query: string,
    searchConfig?: SearchConfig
  ): Observable<ProductSearchPage> {
    return this.adapter.search(query, searchConfig);
  }

  getSuggestions(term: string, pageSize?: number): Observable<SuggestionList> {
    return this.adapter.loadSuggestions(term, pageSize);
  }
}

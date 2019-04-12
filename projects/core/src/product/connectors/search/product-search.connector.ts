import { Injectable } from '@angular/core';
import { ProductSearchAdapter } from './product-search.adapter';
import {
  ProductSearchPage,
  SuggestionList,
} from '../../../occ/occ-models/occ.models';
import { SearchConfig } from '../../model/search-config';
import { Observable } from 'rxjs';

const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  pageSize: 20,
};

@Injectable({
  providedIn: 'root',
})
export class ProductSearchConnector {
  constructor(protected adapter: ProductSearchAdapter) {}

  search(
    fullQuery: string,
    searchConfig: SearchConfig = DEFAULT_SEARCH_CONFIG
  ): Observable<ProductSearchPage> {
    return this.adapter.loadSearch(fullQuery, searchConfig);
  }

  getSuggestions(term: string, pageSize = 3): Observable<SuggestionList> {
    return this.adapter.loadSuggestionList(term, pageSize);
  }
}

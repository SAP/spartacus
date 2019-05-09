import { SearchConfig } from '../../model/search-config';

import { Observable } from 'rxjs';
import { Suggestion, UIProductSearchPage } from '../../../model/product-search.model';

export abstract class ProductSearchAdapter {
  abstract search(
    query: string,
    searchConfig?: SearchConfig
  ): Observable<UIProductSearchPage>;

  abstract loadSuggestions(
    term: string,
    pageSize?: number
  ): Observable<Suggestion[]>;
}

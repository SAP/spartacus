import { Observable } from 'rxjs';

import { SearchConfig } from '../../model/search-config';
import {
  ProductSearchPage,
  Suggestion,
} from '../../../model/product-search.model';

export abstract class ProductSearchAdapter {
  abstract search(
    query: string,
    searchConfig?: SearchConfig
  ): Observable<ProductSearchPage>;

  abstract loadSuggestions(
    term: string,
    pageSize?: number
  ): Observable<Suggestion[]>;
}

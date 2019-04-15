import { SearchConfig } from '../../model/search-config';
import {
  ProductSearchPage,
  SuggestionList,
} from '../../../occ/occ-models/occ.models';

import { Observable } from 'rxjs';

export abstract class ProductSearchAdapter {
  abstract loadSearch(
    query: string,
    searchConfig?: SearchConfig
  ): Observable<ProductSearchPage>;

  abstract loadSuggestions(
    term: string,
    pageSize?: number
  ): Observable<SuggestionList>;
}

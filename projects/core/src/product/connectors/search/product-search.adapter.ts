import { SearchConfig } from '../../model/search-config';
import { Suggestion } from '../../../occ/occ-models/occ.models';
import { UIProductSearchPage } from '../../model/product-search-page';

import { Observable } from 'rxjs';

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

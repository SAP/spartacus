import { SearchConfig } from '../../model/search-config';
import {
  ProductSearchPage,
  SuggestionList,
} from '../../../occ/occ-models/occ.models';

import { Observable } from 'rxjs';

export abstract class ProductSearchAdapter {
  abstract loadSearch(
    fullQuery: string,
    searchConfig: SearchConfig
  ): Observable<ProductSearchPage>;

  abstract loadSuggestionList(
    term: string,
    pageSize: number
  ): Observable<SuggestionList>;
}

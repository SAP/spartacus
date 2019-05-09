import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';

import * as fromActions from '../actions/product-search.action';
import { SearchConfig } from '../../model/search-config';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { OccConfig } from '../../../occ/config/occ-config';

import * as fromEffects from './product-search.effect';
import { defaultOccProductConfig } from '../../config/product-config';
import createSpy = jasmine.createSpy;
import { ProductSearchPage } from '../../../model/product-search.model';
import { Occ } from '../../../occ/occ-models/occ.models';

const searchResult: ProductSearchPage = { products: [] };
const suggestionList: Occ.SuggestionList = { suggestions: [] };

class MockProductSearchConnector {
  search = createSpy().and.returnValue(of(searchResult));
  getSuggestions = createSpy().and.returnValue(of(suggestionList.suggestions));
}

describe('ProductSearch Effects', () => {
  let actions$: Observable<Action>;
  let effects: fromEffects.ProductsSearchEffects;
  let searchConfig: SearchConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductSearchConnector,
          useClass: MockProductSearchConnector,
        },
        { provide: OccConfig, useValue: defaultOccProductConfig },
        fromEffects.ProductsSearchEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(fromEffects.ProductsSearchEffects);
    searchConfig = { pageSize: 10 };
  });

  describe('searchProducts$', () => {
    it('should return searchResult from SearchProductsSuccess', () => {
      const action = new fromActions.SearchProducts({
        queryText: 'test',
        searchConfig: searchConfig,
      });
      const completion = new fromActions.SearchProductsSuccess(searchResult);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.searchProducts$).toBeObservable(expected);
    });
  });

  describe('searchProducts$', () => {
    it('should return auxiliarySearchResult from SearchProductsSuccess', () => {
      const action = new fromActions.SearchProducts(
        {
          queryText: 'test',
          searchConfig: searchConfig,
        },
        true
      );
      const completion = new fromActions.SearchProductsSuccess(
        searchResult,
        true
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.searchProducts$).toBeObservable(expected);
    });
  });

  describe('getProductSuggestions$', () => {
    it('should return suggestions from GetProductSuggestionsSuccess', () => {
      const action = new fromActions.GetProductSuggestions({
        term: 'test',
        searchConfig: searchConfig,
      });
      const completion = new fromActions.GetProductSuggestionsSuccess(
        suggestionList.suggestions
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.getProductSuggestions$).toBeObservable(expected);
    });
  });
});

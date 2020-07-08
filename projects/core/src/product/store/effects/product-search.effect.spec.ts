import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ProductSearchPage } from '../../../model/product-search.model';
import { defaultOccProductConfig } from '../../../occ/adapters/product/default-occ-product-config';
import { OccConfig } from '../../../occ/config/occ-config';
import { Occ } from '../../../occ/occ-models/occ.models';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { SearchConfig } from '../../model/search-config';
import { ProductActions } from '../actions/index';
import * as fromEffects from './product-search.effect';
import createSpy = jasmine.createSpy;

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

    effects = TestBed.inject(fromEffects.ProductsSearchEffects);
    searchConfig = { pageSize: 10 };
  });

  describe('searchProducts$', () => {
    it('should return searchResult from SearchProductsSuccess', () => {
      const action = new ProductActions.SearchProducts({
        queryText: 'test',
        searchConfig: searchConfig,
      });
      const completion = new ProductActions.SearchProductsSuccess(searchResult);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.searchProducts$).toBeObservable(expected);
    });
  });

  describe('searchProducts$', () => {
    it('should return auxiliarySearchResult from SearchProductsSuccess', () => {
      const action = new ProductActions.SearchProducts(
        {
          queryText: 'test',
          searchConfig: searchConfig,
        },
        true
      );
      const completion = new ProductActions.SearchProductsSuccess(
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
      const action = new ProductActions.GetProductSuggestions({
        term: 'test',
        searchConfig: searchConfig,
      });
      const completion = new ProductActions.GetProductSuggestionsSuccess(
        suggestionList.suggestions
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.getProductSuggestions$).toBeObservable(expected);
    });
  });
});

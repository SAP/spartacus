import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from '../actions/product-search.action';
import { ProductImageConverterService } from '../converters/product-image-converter.service';
import { SearchConfig } from '../../model/search-config';
import { OccProductSearchService } from '../../occ/product-search.service';
import { OccConfig } from '../../../occ/config/occ-config';
import {
  SuggestionList,
  ProductSearchPage
} from '../../../occ/occ-models/occ.models';

import * as fromEffects from './product-search.effect';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  }
};

describe('ProductSearch Effects', () => {
  let actions$: Observable<Action>;
  let service: OccProductSearchService;
  let effects: fromEffects.ProductsSearchEffects;
  let searchConfig: SearchConfig;

  const searchResult: ProductSearchPage = { products: [] };
  const suggestions: SuggestionList = { suggestions: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductSearchService,
        ProductImageConverterService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        fromEffects.ProductsSearchEffects,
        provideMockActions(() => actions$)
      ]
    });

    service = TestBed.get(OccProductSearchService);
    effects = TestBed.get(fromEffects.ProductsSearchEffects);

    searchConfig = { pageSize: 10 };

    spyOn(service, 'query').and.returnValue(of(searchResult));
    spyOn(service, 'queryProductSuggestions').and.returnValue(of(suggestions));
  });

  describe('searchProducts$', () => {
    it('should return searchResult from SearchProductsSuccess', () => {
      const action = new fromActions.SearchProducts({
        queryText: 'test',
        searchConfig: searchConfig
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
          searchConfig: searchConfig
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
        searchConfig: searchConfig
      });
      const completion = new fromActions.GetProductSuggestionsSuccess(
        suggestions.suggestions
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.getProductSuggestions$).toBeObservable(expected);
    });
  });
});

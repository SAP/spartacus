import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { OccProductSearchService } from '../../../newocc/product/product-search.service';
import { ConfigService } from '../../../newocc/config.service';
import { SearchConfig } from '../../search-config';
import { ProductImageConverterService } from '../../converters/product-image-converter.service';
import * as fromEffects from './product-search.effect';
import * as fromActions from '../actions/product-search.action';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

fdescribe('ProductSearch Effects', () => {
  let actions$: TestActions;
  let service: OccProductSearchService;
  let effects: fromEffects.ProductSearchEffects;

  const searchResult: any = { products: [] };
  const suggestions: any = { suggestions: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductSearchService,
        ProductImageConverterService,
        ConfigService,
        fromEffects.ProductsSearchEffects,
        { provide: Actions, useFactory: getActions }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(OccProductSearchService);
    effects = TestBed.get(fromEffects.ProductsSearchEffects);

    spyOn(service, 'query').and.returnValue(of(searchResult));
    spyOn(service, 'queryProductSuggestions').and.returnValue(of(suggestions));
  });

  describe('searchProducts$', () => {
    it('should return searchResult from SearchProductsSuccess', () => {
      const action = new fromActions.SearchProducts({
        queryText: 'test',
        searchConfig: new SearchConfig(10)
      });
      const completion = new fromActions.SearchProductsSuccess(searchResult);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.searchProducts$).toBeObservable(expected);
    });
  });

  describe('getProductSuggestions$', () => {
    it('should return suggestions from GetProductSuggestionsSuccess', () => {
      const action = new fromActions.GetProductSuggestions({
        term: 'test',
        searchConfig: new SearchConfig(10)
      });
      const completion = new fromActions.GetProductSuggestionsSuccess(
        suggestions.suggestions
      );

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.getProductSuggestions$).toBeObservable(expected);
    });
  });
});

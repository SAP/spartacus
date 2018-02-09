import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './product.selectors';

fdescribe('Cms Component Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const code = 'testCode';
  const product = {
    code,
    name: 'testProduct'
  };

  const entities = {
    testCode: product
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers)
        })
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getProductEntities', () => {
    it('should return products as entities', () => {
      let result;

      store
        .select(fromSelectors.getProductState)
        .subscribe(value => (result = value));
      expect(result.entities).toEqual({});

      store.dispatch(new fromActions.LoadProductSuccess(product));

      expect(result.entities).toEqual(entities);
    });
  });

  describe('getSelectedProductsFactory', () => {
    it('should return product by code', () => {
      let result;

      store
        .select(fromSelectors.getSelectedProductsFactory(['testCode']))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadProductSuccess(product));

      expect(result).toEqual([entities['testCode']]);
    });
  });

  describe('getAllProductCodes', () => {
    it('should return product codes as an array', () => {
      let result;

      store
        .select(fromSelectors.getAllProductCodes)
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadProductSuccess(product));

      expect(result).toEqual(['testCode']);
    });
  });

  describe('getSelectedProductFactory', () => {
    it('should return a single product by productCode', () => {
      let result;

      store
        .select(fromSelectors.getSelectedProductFactory(code))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadProductSuccess(product));
      expect(result).toEqual(product);
    });
  });
});

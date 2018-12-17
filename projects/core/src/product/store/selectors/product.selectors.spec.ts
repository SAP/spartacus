import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './product.selectors';
import { PRODUCT_FEATURE, StateWithProduct } from '../product-state';

describe('Cms Component Selectors', () => {
  let store: Store<StateWithProduct>;

  const code = 'testCode';
  const product = {
    code: code,
    name: 'testProduct'
  };

  const entities = {
    testCode: {
      loading: false,
      value: product
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(PRODUCT_FEATURE, fromReducers.getReducers())
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getSelectedProductsFactory', () => {
    it('should return product by code', () => {
      let result;

      store
        .pipe(select(fromSelectors.getSelectedProductsFactory(['testCode'])))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadProductSuccess(product));

      expect(result).toEqual([entities['testCode'].value]);
    });
  });

  describe('getAllProductCodes', () => {
    it('should return product codes as an array', () => {
      let result;

      store
        .pipe(select(fromSelectors.getAllProductCodes))
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
        .pipe(select(fromSelectors.getSelectedProductFactory(code)))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadProductSuccess(product));
      expect(result).toEqual(product);
    });
  });
});

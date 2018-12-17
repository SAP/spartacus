import { TestBed } from '@angular/core/testing';

import { StoreModule, Store, select } from '@ngrx/store';

import * as fromActions from '../actions';
import {
  PRODUCT_FEATURE,
  StateWithProduct,
  ProductState
} from '../product-state';
import * as fromReducers from '../reducers';
import { Product } from '../../../occ/occ-models/occ.models';

import * as fromSelectors from './product.selectors';

describe('Cms Component Selectors', () => {
  let store: Store<StateWithProduct>;

  const code = 'testCode';
  const product: Product = {
    code,
    name: 'testProduct'
  };

  const entities: { [code: string]: Product } = {
    testCode: product
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

  describe('getProductEntities', () => {
    it('should return products as entities', () => {
      let result: ProductState;
      store
        .pipe(select(fromSelectors.getProductState))
        .subscribe(value => (result = value));
      expect(result.entities).toEqual({});

      store.dispatch(new fromActions.LoadProductSuccess(product));

      expect(result.entities).toEqual(entities);
    });
  });

  describe('getSelectedProductsFactory', () => {
    it('should return product by code', () => {
      let result: Product[];
      store
        .pipe(select(fromSelectors.getSelectedProductsFactory(['testCode'])))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadProductSuccess(product));

      expect(result).toEqual([entities['testCode']]);
    });
  });

  describe('getAllProductCodes', () => {
    it('should return product codes as an array', () => {
      let result: string[];
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
      let result: Product;
      store
        .pipe(select(fromSelectors.getSelectedProductFactory(code)))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadProductSuccess(product));
      expect(result).toEqual(product);
    });
  });
});

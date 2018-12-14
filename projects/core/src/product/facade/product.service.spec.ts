import { TestBed, inject } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';

import { of } from 'rxjs';

import { Product } from '../../occ';
import * as fromStore from '../store/index';
import { ProductState } from '../store/index';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let store: Store<ProductState>;
  let service: ProductService;
  const mockProduct = { code: 'testId' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('product', fromStore.getReducers())
      ],
      providers: [ProductService]
    });

    service = TestBed.get(ProductService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.stub();
  });

  it('should ProductService is injected', inject(
    [ProductService],
    (productService: ProductService) => {
      expect(productService).toBeTruthy();
    }
  ));

  describe('get(productCode)', () => {
    it('should be able to get product by code', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(mockProduct)
      );
      let result: Product;
      service
        .get('testId')
        .subscribe(product => {
          result = product;
        })
        .unsubscribe();
      expect(result).toBe(mockProduct);
    });
  });

  describe('loadProduct(productCode)', () => {
    it('should be able to trigger the product load action for a product.', () => {
      service.loadProduct('productCode');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.LoadProduct('productCode')
      );
    });
  });

  describe('isProductLoaded(productCode)', () => {
    it('should be true that the product is loaded when a product is returned by the store', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(mockProduct)
      );
      let result: boolean;
      service
        .isProductLoaded('existingProduct')
        .subscribe(exists => {
          result = exists;
        })
        .unsubscribe();
      expect(result).toBeTruthy();
    });

    it('should be false that the product is loaded when an empty object is returned by the store', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () => of({}));
      let result: boolean;
      service
        .isProductLoaded('emptyObjectProduct')
        .subscribe(empty => {
          result = empty;
        })
        .unsubscribe();
      expect(result).toBeFalsy();
    });

    it('should be false that the product is loaded when undefined is returned by the store', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(undefined)
      );
      let result: boolean;
      service
        .isProductLoaded('undefinedProduct')
        .subscribe(isUndefined => {
          result = isUndefined;
        })
        .unsubscribe();
      expect(result).toBeFalsy();
    });
  });
});

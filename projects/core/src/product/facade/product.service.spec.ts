import { TestBed, inject } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';

import { BehaviorSubject, of } from 'rxjs';

import * as fromStore from '../store/index';
import { ProductsState } from '../store/index';
import { Product } from '../../occ/occ-models/occ.models';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let store: Store<ProductsState>;
  let service: ProductService;
  const mockProduct: Product = { code: 'testId' };

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
        of({
          value: mockProduct
        })
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

  describe('isLoading(productCode)', () => {
    it('should be able to get loading flag by code', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of({
          loading: true
        })
      );
      let isLoading: boolean;
      service.isLoading('testId').subscribe(value => {
        isLoading = value;
      });
      expect(isLoading).toBeTruthy();
    });
  });

  describe('hasError(productCode)', () => {
    it('should be able to get loading flag by code', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of({
          error: true
        })
      );
      let hasError: boolean;
      service.hasError('testId').subscribe(value => {
        hasError = value;
      });
      expect(hasError).toBeTruthy();
    });
  });

  describe('hasError(productCode)', () => {
    it('should be able to get loading flag by code', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of({
          success: true
        })
      );
      let isSuccess: boolean;
      service.isSuccess('testId').subscribe(value => {
        isSuccess = value;
      });
      expect(isSuccess).toBeTruthy();
    });
  });

  describe('loadProduct(productCode)', () => {
    it('should be able to trigger the product load action for a product.', () => {
      service
        .get('productCode')
        .subscribe()
        .unsubscribe();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.LoadProduct('productCode')
      );
    });

    it('should be not trigger multiple product load actions for multiple product subscription.', () => {
      const productMock = new BehaviorSubject({});
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        productMock
      );

      service.get('productCode').subscribe();
      service.get('productCode').subscribe();

      productMock.complete();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('isProductLoaded(productCode)', () => {
    it('should be true that the product is loaded when a product is returned by the store', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of({ value: mockProduct })
      );
      let result: Product;
      service
        .get('existingProduct')
        .subscribe(product => {
          result = product;
        })
        .unsubscribe();
      expect(result).toBeTruthy();
    });

    it('should be false that the product is loaded when an empty object is returned by the store', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of({ value: {} })
      );
      let result: Product;
      service
        .get('emptyObjectProduct')
        .subscribe(product => {
          result = product;
        })
        .unsubscribe();
      expect(result).toEqual({});
    });

    it('should be false that the product is loaded when undefined is returned by the store', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of({ value: undefined })
      );
      let result: Product;
      service
        .get('undefinedProduct')
        .subscribe(product => {
          result = product;
        })
        .unsubscribe();
      expect(result).toBeFalsy();
    });
  });
});

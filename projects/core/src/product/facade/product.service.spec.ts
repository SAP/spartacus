import { inject, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductService } from './product.service';
import { take } from 'rxjs/operators';
import { ProductLoadingService } from '@spartacus/core';

function mockProduct(code, scopes = []) {
  return { code, name: `product${scopes.join('')}` };
}

class MockProductLoadingService {
  get(code, scopes) {
    return of(mockProduct(code, scopes));
  }
}

describe('ProductService', () => {
  let store: Store<StateWithProduct>;
  let service: ProductService;
  const mockedProduct: Product = { code: 'testId' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [ProductService],
    });
  });

  describe('Current Implementation', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: ProductLoadingService,
            useClass: MockProductLoadingService,
          },
        ],
      });

      store = TestBed.inject(Store);
      service = TestBed.inject(ProductService);
      spyOn(store, 'dispatch').and.stub();
    });

    it('should ProductService is injected', inject(
      [ProductService],
      (productService: ProductService) => {
        expect(productService).toBeTruthy();
      }
    ));

    describe('get(productCode)', () => {
      it('should be able to get product by code', async () => {
        const result: Product = await service.get('testId').toPromise();
        expect(result).toEqual(mockProduct('testId'));
      });

      it('should be able to get product by code and scope', async () => {
        const result: Product = await service
          .get('testId', 'scope')
          .toPromise();
        expect(result).toEqual(mockProduct('testId', ['scope']));
      });

      it('should be able to get product by code and scopes', async () => {
        const result: Product = await service
          .get('testId', ['scope1', 'scope2'])
          .toPromise();
        expect(result).toEqual(mockProduct('testId', ['scope1', 'scope2']));
      });
    });

    describe('isLoading(productCode)', () => {
      it('should be able to get loading flag by code', () => {
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          of({
            loading: true,
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
            error: true,
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
            success: true,
          })
        );
        let isSuccess: boolean;
        service.isSuccess('testId').subscribe(value => {
          isSuccess = value;
        });
        expect(isSuccess).toBeTruthy();
      });
    });

    describe('isProductLoaded(productCode)', () => {
      it('should be true that the product is loaded when a product is returned by the store', async () => {
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          of({ value: mockedProduct })
        );
        const result: Product = await service
          .get('existingProduct')
          .toPromise();
        expect(result).toBeTruthy();
      });
    });
  });

  describe('Backward Compatibility / deprecated since 1.4', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: ProductLoadingService,
            useValue: undefined,
          },
        ],
      });

      store = TestBed.inject(Store);
      service = TestBed.inject(ProductService);
      spyOn(store, 'dispatch').and.stub();
    });

    describe('get(productCode)', () => {
      it('should be able to get product by code', async () => {
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          of({
            value: mockedProduct,
          })
        );
        const result: Product = await service.get('testId').toPromise();
        expect(result).toBe(mockedProduct);
      });

      it('should be able to trigger the product load action for a product.', async () => {
        await service
          .get('productCode')
          .pipe(take(1))
          .toPromise();
        expect(store.dispatch).toHaveBeenCalledWith(
          new ProductActions.LoadProduct('productCode')
        );
      });

      it('should be not trigger multiple product load actions for multiple product subscription.', async () => {
        const productMock = new BehaviorSubject({});
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          productMock
        );
        (store.dispatch as any).and.callFake(() =>
          productMock.next({ success: true })
        );

        service
          .get('productCode')
          .pipe(take(1))
          .subscribe();
        await service
          .get('productCode')
          .pipe(take(1))
          .toPromise();

        expect(store.dispatch).toHaveBeenCalledTimes(1);
      });
    });

    describe('isProductLoaded(productCode)', () => {
      it('should be true that the product is loaded when a product is returned by the store', async () => {
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          of({ value: mockedProduct })
        );
        const result: Product = await service
          .get('existingProduct')
          .toPromise();
        expect(result).toBeTruthy();
      });

      it('should be false that the product is loaded when an empty object is returned by the store', async () => {
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          of({ value: {} })
        );
        const result: Product = await service
          .get('emptyObjectProduct')
          .toPromise();
        expect(result).toEqual({});
      });

      it('should be false that the product is loaded when undefined is returned by the store', async () => {
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          of({ value: undefined })
        );
        const result: Product = await service
          .get('undefinedProduct')
          .toPromise();
        expect(result).toBeFalsy();
      });
    });
  });
});

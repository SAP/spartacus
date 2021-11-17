import { inject, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import { DEFAULT_SCOPE, ProductLoadingService } from '@spartacus/core';
import { of } from 'rxjs';
import { Product } from '../../model/product.model';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductService } from './product.service';

function mockProduct(code: string, scopes = [DEFAULT_SCOPE]) {
  return { code, name: `product${scopes.join('')}` };
}

class MockProductLoadingService {
  get(code: string, scopes: string[]) {
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
      providers: [
        ProductService,
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
      const result: Product = await service.get('testId', 'scope').toPromise();
      expect(result).toEqual(mockProduct('testId', ['scope']));
    });

    it('should be able to get product by code and scopes', async () => {
      const result: Product = await service
        .get('testId', ['scope1', 'scope2'])
        .toPromise();
      expect(result).toEqual(mockProduct('testId', ['scope1', 'scope2']));
    });

    it('should return undefined when no product code was provided', async () => {
      const result: Product = await service.get(undefined).toPromise();
      expect(result).toEqual(undefined);
    });
  });

  describe('isLoading(productCode)', () => {
    it('should be able to get loading flag by code', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () =>
          of({
            loading: true,
          })
      );
      let isLoading: boolean | undefined;
      service.isLoading('testId').subscribe((value) => {
        isLoading = value;
      });
      expect(isLoading).toBeTruthy();
    });
  });

  describe('hasError(productCode)', () => {
    it('should be able to get loading flag by code', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () =>
          of({
            error: true,
          })
      );
      let hasError: boolean | undefined;
      service.hasError('testId').subscribe((value) => {
        hasError = value;
      });
      expect(hasError).toBeTruthy();
    });
  });

  describe('hasError(productCode)', () => {
    it('should be able to get loading flag by code', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () =>
          of({
            success: true,
          })
      );
      let isSuccess: boolean | undefined;
      service.isSuccess('testId').subscribe((value) => {
        isSuccess = value;
      });
      expect(isSuccess).toBeTruthy();
    });
  });

  describe('isProductLoaded(productCode)', () => {
    it('should be true that the product is loaded when a product is returned by the store', async () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () => of({ value: mockedProduct })
      );
      const result: Product = await service.get('existingProduct').toPromise();
      expect(result).toBeTruthy();
    });
  });
});

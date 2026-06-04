import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ProductSearchByCategoryService } from './product-search-by-category.service';
import { ProductActions } from '../store';
import { of } from 'rxjs';
import { Product, StateUtils } from '@spartacus/core';

describe('ProductSearchByCategoryService', () => {
  let service: ProductSearchByCategoryService;
  let store: MockStore;
  const initialState = {
    products: {
      searchByCategory: {},
    },
  };

  const categoryCode = 'testCategory';
  const scope = 'testScope';
  const products: Product[] = [
    { code: 'product1', name: 'Test Product 1' },
    { code: 'product2', name: 'Test Product 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductSearchByCategoryService,
        provideMockStore({ initialState }),
      ],
    });

    service = TestBed.inject(ProductSearchByCategoryService);
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('load', () => {
    it('should dispatch ProductSearchLoadByCategory action', () => {
      service.load({ categoryCode, scope });
      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.ProductSearchLoadByCategory({
          categoryCode,
          scope,
        })
      );
    });

    it('should use an empty scope when not provided', () => {
      service.load({ categoryCode });
      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.ProductSearchLoadByCategory({
          categoryCode,
          scope: '',
        })
      );
    });
  });

  describe('get', () => {
    it('should return products when the state contains them', (done) => {
      const mockState = {
        loading: false,
        success: true,
        value: products,
      } as StateUtils.LoaderState<Product[]>;

      spyOn(store, 'pipe').and.returnValue(of(mockState));

      service.get({ categoryCode, scope }).subscribe((result) => {
        expect(result).toEqual(products);
        done();
      });
    });

    it('should not trigger load if state is already loading', (done) => {
      const mockState = {
        loading: true,
        success: false,
        error: false,
      } as StateUtils.LoaderState<Product[]>;

      spyOn(store, 'pipe').and.returnValue(of(mockState));

      service.get({ categoryCode, scope }).subscribe(() => {
        expect(store.dispatch).not.toHaveBeenCalled();
        done();
      });
    });
  });
});

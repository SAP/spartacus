import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ProductSearchByCategoryService } from './product-search-by-category.service';
import { ProductActions } from '../store';
import { firstValueFrom, of } from 'rxjs';
import { StateUtils } from '../../state';
import { Product } from '../../model/product.model';

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

    vi.spyOn(store, 'dispatch');
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
    it('should return products when the state contains them', async () => {
      const mockState = {
        loading: false,
        success: true,
        value: products,
      } as StateUtils.LoaderState<Product[]>;

      vi.spyOn(store, 'pipe').mockReturnValue(of(mockState));

      const result = await firstValueFrom(service.get({ categoryCode, scope }));
      expect(result).toEqual(products);
    });

    it('should not trigger load if state is already loading', async () => {
      const mockState = {
        loading: true,
        success: false,
        error: false,
      } as StateUtils.LoaderState<Product[]>;

      vi.spyOn(store, 'pipe').mockReturnValue(of(mockState));

      await firstValueFrom(service.get({ categoryCode, scope }));
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});

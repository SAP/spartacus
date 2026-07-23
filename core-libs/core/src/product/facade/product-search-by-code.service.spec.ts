import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { ProductSearchByCodeService } from './product-search-by-code.service';
import { Store, StoreModule } from '@ngrx/store';
import { ProductActions } from '@spartacus/core';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers';

describe('ProductSearchByCodeService', () => {
  let service: ProductSearchByCodeService;
  let store: Store<StateWithProduct>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [ProductSearchByCodeService],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(ProductSearchByCodeService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should ProductSearchByCodeService is injected', inject(
    [ProductSearchByCodeService],
    (productSearchByCodeService: ProductSearchByCodeService) => {
      expect(productSearchByCodeService).toBeTruthy();
    }
  ));

  it('should be able to call load', async () => {
    const searchParams = { code: 'testCode', scope: 'testScope' };

    service.load(searchParams);
    expect(store.dispatch).toHaveBeenCalledWith(
      new ProductActions.ProductSearchLoadByCode(searchParams)
    );
  });

  describe('get method', () => {
    it('should return product', async () => {
      const code = 'testCode';
      const scope = 'testScope';
      const product = { code };

      store.dispatch(
        new ProductActions.ProductSearchLoadByCodeSuccess({
          product,
          code,
          scope,
        })
      );

      service.get({ code, scope }).subscribe((result) => {
        expect(result).toEqual(product);
      });
    });

    it('should call load on initial state (loading, success and error are false)', fakeAsync(() => {
      const code = 'testCode';
      const scope = 'testScope';

      spyOn(service, 'load').and.callThrough();

      service.get({ code, scope }).subscribe();
      tick(0); // trigger the auditTime
      expect(service.load).toHaveBeenCalledWith({ code, scope });
      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.ProductSearchLoadByCode({ code, scope })
      );
    }));
  });
});

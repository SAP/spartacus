import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Action, Store, StoreModule } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { Product } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductLoadingService } from './product-loading.service';
import { LoadingScopesService } from '../../occ/services/loading-scopes.service';
import { delay, take } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';
import createSpy = jasmine.createSpy;

class MockLoadingScopesService {
  expand = createSpy('expand').and.callFake((_, scopes) => scopes);
  getMaxAge = createSpy('getMaxAge').and.returnValue(0);
}

describe('ProductLoadingService', () => {
  let store: Store<StateWithProduct>;
  let service: ProductLoadingService;

  const code = 'testId';
  const mockProduct: Product = { code };
  const mockActions = new Subject<Action>();

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
        ProductLoadingService,
        {
          provide: LoadingScopesService,
          useClass: MockLoadingScopesService,
        },
        {
          provide: Actions,
          useValue: mockActions,
        },
      ],
    });
    store = TestBed.get(Store as Type<Store<StateWithProduct>>);
    service = TestBed.get(ProductLoadingService as Type<ProductLoadingService>);
  });

  it('should ProductLoadingService is injected', inject(
    [ProductLoadingService],
    (productService: ProductLoadingService) => {
      expect(productService).toBeTruthy();
    }
  ));

  describe('get(productCode)', () => {
    it('should be able to get product by code', async () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(mockProduct)
      );
      const result: Product = await service.get(code, ['']).toPromise();
      expect(result).toEqual(mockProduct);
    });

    describe('multiple scopes', () => {
      it('should be able to get product data', async () => {
        store.dispatch(
          new ProductActions.LoadProductSuccess({ code }, 'scope1')
        );
        store.dispatch(
          new ProductActions.LoadProductSuccess(
            { code, name: 'test' },
            'scope2'
          )
        );

        const result: Product = await service
          .get(code, ['scope1', 'scope2'])
          .pipe(take(1))
          .toPromise();
        expect(result).toEqual({ code, name: 'test' });
      });

      it('should emit partial product data', async () => {
        // only one scope is loaded
        store.dispatch(
          new ProductActions.LoadProductSuccess(
            { code, name: 'test' },
            'scope2'
          )
        );

        const result: Product = await service
          .get(code, ['scope1', 'scope2'])
          .pipe(take(1))
          .toPromise();
        expect(result).toEqual({ code, name: 'test' });
      });

      it('should take into account order of scopes', async () => {
        store.dispatch(
          new ProductActions.LoadProductSuccess(
            { code, name: 'first', summary: 'a' },
            'scope1'
          )
        );
        store.dispatch(
          new ProductActions.LoadProductSuccess(
            { code, name: 'second', description: 'b' },
            'scope2'
          )
        );

        const result: Product = await service
          .get(code, ['scope1', 'scope2'])
          .pipe(take(1))
          .toPromise();
        expect(result).toEqual({
          code,
          name: 'second',
          summary: 'a',
          description: 'b',
        });
      });

      it('should take into account order of scopes for subsequent emissions', done => {
        const action1scope1 = new ProductActions.LoadProductSuccess(
          { code, name: 'first', summary: 'a' },
          'scope1'
        );
        const action1scope2 = new ProductActions.LoadProductSuccess(
          { code, name: 'second', description: 'b' },
          'scope2'
        );
        const action2scope1 = new ProductActions.LoadProductSuccess(
          { code, name: 'third', summary: 'c' },
          'scope1'
        );
        const action2scope2 = new ProductActions.LoadProductSuccess(
          { code, name: 'fourth', description: 'e' },
          'scope2'
        );

        const results: Product[] = [];
        service
          .get(code, ['scope1', 'scope2'])
          .pipe(take(3))
          .subscribe({
            next: res => {
              results.push(res);
            },
            complete: () => {
              expect(results).toEqual([
                { code, name: 'second', summary: 'a', description: 'b' },
                { code, name: 'second', summary: 'c', description: 'b' }, // after 1st subsequent emission
                { code, name: 'fourth', summary: 'c', description: 'e' }, // after 2nd subsequent emission
              ]);
              done();
            },
          });

        store.dispatch(action1scope1);
        store.dispatch(action1scope2);

        setTimeout(() => {
          store.dispatch(action2scope1);
          setTimeout(() => {
            store.dispatch(action2scope2);
          });
        });
      });
    });

    it('should emit undefined if there is no scope ready', async () => {
      let callNo = 0;
      const productScopes = [undefined, undefined];
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of({
          value: productScopes[callNo++], // serve different scope per call
        })
      );

      const result: Product = await service
        .get(code, ['scope1', 'scope2'])
        .toPromise();
      expect(result).toEqual(undefined);
    });

    it('should expand loading scopes', () => {
      const loadingScopesService = TestBed.get(LoadingScopesService);
      service
        .get(code, ['scope1', 'scope2'])
        .subscribe()
        .unsubscribe();
      expect(loadingScopesService.expand).toHaveBeenCalledWith('product', [
        'scope1',
        'scope2',
      ]);
    });
  });

  describe('get(productCode)', () => {
    it('should be able to trigger the product load action for a product.', async () => {
      spyOn(store, 'dispatch').and.stub();

      await service
        .get('productCode', [''])
        .pipe(
          delay(0), // give actions some time for dispatch
          take(1)
        )
        .toPromise();

      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.LoadProduct('productCode')
      );
    });

    it('should be not trigger multiple product load actions for multiple product subscription.', async () => {
      spyOn(store, 'dispatch').and.stub();

      service
        .get('productCode', [''])
        .pipe(take(1))
        .subscribe();
      await service
        .get('productCode', [''])
        .pipe(
          delay(0),
          take(1)
        )
        .toPromise();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Action, Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Product } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductLoadingService } from './product-loading.service';
import { LoadingScopesService } from '../../occ/services/loading-scopes.service';
import { take } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';
import createSpy = jasmine.createSpy;

class MockLoadingScopesService {
  expand = createSpy('expand').and.callFake((_, scopes) => scopes);
  getMaxAge = createSpy('getMaxAge').and.returnValue(0);
}

describe('ProductLoadingService', () => {
  let store: Store<StateWithProduct>;
  let service: ProductLoadingService;
  const mockProduct: Product = { code: 'testId' };
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
    spyOn(store, 'dispatch').and.stub();
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
      const result: Product = await service.get('testId', ['']).toPromise();
      expect(result).toEqual(mockProduct);
    });

    xdescribe('multiple scopes', () => {
      it('should be able to get product data', async () => {
        let callNo = 0;
        const productScopes = [{ code: '333' }, { name: 'test' }];
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          new BehaviorSubject(
            productScopes[callNo++] // serve different scope per call
          )
        );
        const result: Product = await service
          .get('testId', ['scope1', 'scope2'])
          .pipe(take(1))
          .toPromise();
        expect(result).toEqual({ code: '333', name: 'test' });
      });

      it('should emit partial product data', async () => {
        let callNo = 0;
        const productScopes = [undefined, { name: 'test' }];
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          new BehaviorSubject({
            value: productScopes[callNo++], // serve different scope per call
          })
        );

        const result: Product = await service
          .get('testId', ['scope1', 'scope2'])
          .pipe(take(1))
          .toPromise();
        expect(result).toEqual({ name: 'test' });
      });

      it('should take into account order of scopes', async () => {
        let callNo = 0;
        const productScopes = [
          { name: 'first', code: 'a' },
          { name: 'second', description: 'b' },
        ];
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          new BehaviorSubject({
            value: productScopes[callNo++], // serve different scope per call
          })
        );
        const result: Product = await service
          .get('testId', ['scope1', 'scope2'])
          .pipe(take(1))
          .toPromise();
        expect(result).toEqual({ name: 'second', code: 'a', description: 'b' });
      });

      it('should take into account order of scopes for subsequent emissions', done => {
        let callNo = 0;
        const productSources = [
          new BehaviorSubject<any>({
            value: { name: 'first', code: 'a' },
          }),
          new BehaviorSubject<any>({
            value: { name: 'second', description: 'b' },
          }),
        ];
        spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
          productSources[callNo++]
        );

        const results: Product[] = [];
        service
          .get('testId', ['scope1', 'scope2'])
          .pipe(take(3))
          .subscribe({
            next: res => {
              results.push(res);
            },
            complete: () => {
              expect(results).toEqual([
                { name: 'second', code: 'a', description: 'b' },
                { name: 'second', code: 'c', description: 'b' }, // after 1st subsequent emission
                { name: 'fourth', code: 'c', description: 'e' }, // after 2nd subsequent emission
              ]);
              done();
            },
          });

        setTimeout(() => {
          // 1st subsequent asynchronous emission (first source)
          productSources[0].next({
            value: { name: 'third', code: 'c' },
          });

          setTimeout(() => {
            // 2nd subsequent asynchronous emission (second source)
            productSources[1].next({
              value: { name: 'fourth', description: 'e' },
            });
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
        .get('testId', ['scope1', 'scope2'])
        .toPromise();
      expect(result).toEqual(undefined);
    });

    it('should expand loading scopes', () => {
      const loadingScopesService = TestBed.get(LoadingScopesService);
      service
        .get('testId', ['scope1', 'scope2'])
        .subscribe()
        .unsubscribe();
      expect(loadingScopesService.expand).toHaveBeenCalledWith('product', [
        'scope1',
        'scope2',
      ]);
    });
  });

  xdescribe('get(productCode)', () => {
    it('should be able to trigger the product load action for a product.', async () => {
      await service
        .get('productCode', [''])
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
        .get('productCode', [''])
        .pipe(take(1))
        .subscribe();
      await service
        .get('productCode', [''])
        .pipe(take(1))
        .toPromise();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});

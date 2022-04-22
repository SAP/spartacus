import { AbstractType } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import * as ngrxStore from '@ngrx/store';
import { Action, Store, StoreModule } from '@ngrx/store';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { NEVER, Observable, of, Subject, timer } from 'rxjs';
import { delay, switchMap, take } from 'rxjs/operators';
import { CxEvent } from '../../event/cx-event';
import { EventService } from '../../event/event.service';
import { Product } from '../../model/product.model';
import { LoadingScopesService } from '../../occ/services/loading-scopes.service';
import { ProductActions } from '../store/actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductLoadingService } from './product-loading.service';
import createSpy = jasmine.createSpy;

class MyEvent extends CxEvent {}

class MockLoadingScopesService {
  expand = createSpy('expand').and.callFake(
    (_: string, scopes: string[]) => scopes
  );
  getMaxAge = createSpy('getMaxAge').and.returnValue(0);
  getReloadTriggers = createSpy('getReloadTriggers').and.returnValue([MyEvent]);
}

class MockEventService implements Partial<EventService> {
  get<T>(_eventType: AbstractType<T>): Observable<T> {
    return of();
  }
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
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });
    store = TestBed.inject(Store);
    service = TestBed.inject(ProductLoadingService);
  });

  it('should ProductLoadingService is injected', inject(
    [ProductLoadingService],
    (productService: ProductLoadingService) => {
      expect(productService).toBeTruthy();
    }
  ));

  describe('get(productCode)', () => {
    it('should be able to get product by code', async () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () => of(mockProduct)
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

      it('should not emit partial product data', async () => {
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
        expect(result).toEqual(undefined);
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

      it('should take into account order of scopes for subsequent emissions', (done) => {
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
          .pipe(take(4))
          .subscribe({
            next: (res) => {
              results.push(res);
            },
            complete: () => {
              expect(results).toEqual([
                undefined,
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

    it('should emit undefined if there is no scope ready', (done) => {
      service
        .get(code, ['scope1', 'scope2'])
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(undefined);
          done();
        });
    });

    it('should expand loading scopes', () => {
      const loadingScopesService = TestBed.inject(LoadingScopesService);
      service.get(code, ['scope1', 'scope2']).subscribe().unsubscribe();
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

    it('should not trigger multiple product load actions for multiple product subscription.', async () => {
      spyOn(store, 'dispatch').and.stub();

      service.get('productCode', ['']).pipe(take(1)).subscribe();
      await service
        .get('productCode', [''])
        .pipe(delay(0), take(1))
        .toPromise();

      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMaxAgeTrigger', () => {
    it('should trigger reload after subscription', () => {
      const loadStart$ = hot('');
      const loadSuccess$ = hot('a');
      const trigger$ = (service as any).getMaxAgeTrigger(
        loadStart$,
        loadSuccess$,
        30,
        getTestScheduler()
      );
      const expected$ = cold('30ms a', { a: true });

      expect(trigger$).toBeObservable(expected$);
    });

    it('should not trigger reload when new load has started', () => {
      const loadStart$ = hot('20ms a');
      const loadSuccess$ = hot('a');
      const trigger$ = (service as any).getMaxAgeTrigger(
        loadStart$,
        loadSuccess$,
        30,
        getTestScheduler()
      );
      const expected$ = cold('');

      expect(trigger$).toBeObservable(expected$);
    });

    it('should trigger reload after new load succeed', () => {
      const loadStart$ = hot('20ms a');
      const loadSuccess$ = hot('a 40ms a');
      const trigger$ = (service as any).getMaxAgeTrigger(
        loadStart$,
        loadSuccess$,
        30,
        getTestScheduler()
      );
      const expected$ = cold('80ms a', { a: true });

      expect(trigger$).toBeObservable(expected$);
    });

    describe('should properly evaluate time to reload after resubscribe', () => {
      it('when resubscribed before maxAge has passed', () => {
        const loadStart$ = hot('');
        const loadSuccess$ = hot('a');

        // Initialize the trigger with maxAge 50ms
        const trigger$ = (service as any).getMaxAgeTrigger(
          loadStart$,
          loadSuccess$,
          50,
          getTestScheduler()
        );

        /*
        Simulate:
          - subscribe to trigger at 0ms
          - unsubscribe at 20ms
          - resubscribe at 40ms
          - maxAge expires when subscribed

        Expect:
          - Trigger emission at 50ms
         */
        const subscriber$ = timer(0, 20, getTestScheduler()).pipe(
          take(3),
          switchMap((intervalId) => (intervalId % 2 ? NEVER : trigger$))
        );
        const expected$ = cold('50ms a', { a: true });

        expect(subscriber$).toBeObservable(expected$);
      });

      it('when resubscribed after maxAge has passed', () => {
        const loadStart$ = hot('');
        const loadSuccess$ = hot('a');

        // initialize the trigger with maxAge 60ms
        const trigger$ = (service as any).getMaxAgeTrigger(
          loadStart$,
          loadSuccess$,
          60,
          getTestScheduler()
        );

        /*
        Simulate:
          - subscribe to trigger at 0ms
          - unsubscribe at 40ms
          - maxAge expires when unsubscribed
          - resubscribe at 80ms

        Expect:
          - Trigger emission at 80ms (closest subscription to maxAge expiration)
         */
        const subscriber$ = timer(0, 40, getTestScheduler()).pipe(
          take(3),
          switchMap((intervalId) => (intervalId % 2 ? NEVER : trigger$))
        );
        const expected$ = cold('80ms a', { a: true });

        expect(subscriber$).toBeObservable(expected$);
      });
    });
  });
});

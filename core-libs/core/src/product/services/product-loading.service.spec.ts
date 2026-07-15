import { vi } from 'vitest';
import { AbstractType } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Action, Store, StoreModule } from '@ngrx/store';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import {
  EMPTY,
  firstValueFrom,
  lastValueFrom,
  NEVER,
  Observable,
  of,
  Subject,
  timer,
} from 'rxjs';
import { delay, switchMap, take, toArray } from 'rxjs/operators';
import { CxEvent } from '../../event/cx-event';
import { EventService } from '../../event/event.service';
import { Product } from '../../model/product.model';
import { LoadingScopesService } from '../../occ/services/loading-scopes.service';
import { ProductActions } from '../store/actions/index';
import { PRODUCT_FEATURE, StateWithProduct } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductLoadingService } from './product-loading.service';

class MyEvent extends CxEvent {}

class MockLoadingScopesService {
  expand = vi.fn().mockImplementation((_: string, scopes: string[]) => scopes);
  getMaxAge = vi.fn().mockReturnValue(0);
  getReloadTriggers = vi.fn().mockReturnValue([MyEvent]);
}

class MockEventService implements Partial<EventService> {
  get<T>(_eventType: AbstractType<T>): Observable<T> {
    return EMPTY;
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
      store.dispatch(new ProductActions.LoadProductSuccess(mockProduct, ''));
      const result: Product = await firstValueFrom(service.get(code, ['']));
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

        const result: Product = await firstValueFrom(
          service.get(code, ['scope1', 'scope2'])
        );
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

        const result: Product = await firstValueFrom(
          service.get(code, ['scope1', 'scope2'])
        );
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

        const result: Product = await firstValueFrom(
          service.get(code, ['scope1', 'scope2'])
        );
        expect(result).toEqual({
          code,
          name: 'second',
          summary: 'a',
          description: 'b',
        });
      });

      it('should take into account order of scopes for subsequent emissions', async () => {
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

        const resultsPromise = lastValueFrom(
          service.get(code, ['scope1', 'scope2']).pipe(take(4), toArray())
        );

        store.dispatch(action1scope1);
        store.dispatch(action1scope2);

        setTimeout(() => {
          store.dispatch(action2scope1);
          setTimeout(() => {
            store.dispatch(action2scope2);
          });
        });

        const results = await resultsPromise;
        expect(results).toEqual([
          undefined,
          { code, name: 'second', summary: 'a', description: 'b' },
          { code, name: 'second', summary: 'c', description: 'b' }, // after 1st subsequent emission
          { code, name: 'fourth', summary: 'c', description: 'e' }, // after 2nd subsequent emission
        ]);
      });
    });

    it('should emit undefined if there is no scope ready', async () => {
      const result = await firstValueFrom(
        service.get(code, ['scope1', 'scope2'])
      );
      expect(result).toEqual(undefined);
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
      vi.spyOn(store, 'dispatch').mockImplementation(() => {});

      await firstValueFrom(
        service.get('productCode', ['']).pipe(
          delay(0) // give actions some time for dispatch
        )
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.LoadProduct('productCode')
      );
    });

    it('should not trigger multiple product load actions for multiple product subscription.', async () => {
      vi.spyOn(store, 'dispatch').mockImplementation(() => {});

      service.get('productCode', ['']).pipe(take(1)).subscribe();
      await firstValueFrom(service.get('productCode', ['']).pipe(delay(0)));

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

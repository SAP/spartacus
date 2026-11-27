/* SPDX-License-Identifier: Apache-2.0 */
import { PendingTasks } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { ScannedActionsSubject } from '@ngrx/store';
import { EMPTY, Subject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { LoggerService } from '../../../logger';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { ProductConnector } from '../../connectors/product/product.connector';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { ProductActions } from '../actions/index';
import { ProductEffects } from './product.effect';
import { ProductSearchByCodeEffects } from './product-search-by-code.effect';

describe('product task lifecycle regression (#22239)', () => {
  let active: number;
  let actions: ScannedActionsSubject;
  let request: Subject<unknown>;
  let scheduler: TestScheduler;
  let getMany: ReturnType<typeof vi.fn>;
  let searchByCodes: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    active = 0;
    request = new Subject();
    scheduler = new TestScheduler(() => {});
    getMany = vi.fn((products: { code: string; scope: string }[]) =>
      products.map((product) => ({ ...product, data$: request }))
    );
    searchByCodes = vi.fn(() => request);
    TestBed.configureTestingModule({
      providers: [
        ScannedActionsSubject,
        {
          provide: Actions,
          useFactory: () => new Actions(TestBed.inject(ScannedActionsSubject)),
        },
        {
          provide: LoggerService,
          useValue: {
            log: vi.fn(),
            warn: vi.fn(),
            error: vi.fn(),
            debug: vi.fn(),
          },
        },
        { provide: ProductConnector, useValue: { getMany } },
        { provide: ProductSearchConnector, useValue: { searchByCodes } },
        {
          provide: PendingTasks,
          useValue: {
            add: () => {
              active++;
              let removed = false;
              return () => {
                if (!removed) {
                  active--;
                  removed = true;
                }
              };
            },
          },
        },
        ProductEffects,
        ProductSearchByCodeEffects,
      ],
    });
    actions = TestBed.inject(ScannedActionsSubject);
  });

  for (const kind of ['product', 'search']) {
    function setup() {
      const effect =
        kind === 'product'
          ? TestBed.inject(ProductEffects).loadProduct$
          : TestBed.inject(ProductSearchByCodeEffects).searchByCodes$;
      const result: unknown[] = [];
      const subscription = effect({ scheduler, debounce: 5 }).subscribe(
        (action) => result.push(action)
      );
      const load = (code: string) =>
        kind === 'product'
          ? new ProductActions.LoadProduct(code, 'details')
          : new ProductActions.ProductSearchLoadByCode({
              code,
              scope: 'carouselMinimal',
            });
      const send = () => actions.next(load('one'));
      const connector = kind === 'product' ? getMany : searchByCodes;
      return { result, subscription, load, send, connector };
    }
    it(`${kind}: hands the scheduled task to the request and releases after success`, () => {
      const test = setup();
      test.send();
      expect(active).toBe(1);
      expect(test.connector).not.toHaveBeenCalled();
      scheduler.flush();
      expect(active).toBe(1);
      request.next(
        kind === 'product'
          ? { code: 'one', name: 'One' }
          : { products: [{ code: 'one', name: 'One' }] }
      );
      expect(test.result).toHaveLength(1);
      expect(active).toBe(0);
      test.subscription.unsubscribe();
    });
    it(`${kind}: error produces a failure action and releases its task`, () => {
      const test = setup();
      test.send();
      scheduler.flush();
      request.error(new Error('Request failed'));
      expect(test.result).toHaveLength(1);
      expect(active).toBe(0);
      test.subscription.unsubscribe();
    });
    it(`${kind}: cancellation before batching does not call the connector or replay stale codes`, () => {
      const test = setup();
      test.send();
      actions.next(new SiteContextActions.LanguageChange('de'));
      expect(active).toBe(0);
      scheduler.flush();
      expect(test.connector).not.toHaveBeenCalled();
      actions.next(test.load('two'));
      scheduler.flush();
      const argument = test.connector.mock.calls[0][0];
      expect(
        kind === 'product'
          ? argument.map((p: { code: string }) => p.code)
          : argument
      ).toEqual(['two']);
      test.subscription.unsubscribe();
      expect(active).toBe(0);
    });
    it(`${kind}: cancellation during the request releases and unsubscribes`, () => {
      const test = setup();
      test.send();
      scheduler.flush();
      expect(active).toBe(1);
      expect(request.observed).toBe(true);
      actions.next(new SiteContextActions.LanguageChange('de'));
      expect(active).toBe(0);
      expect(request.observed).toBe(false);
      test.subscription.unsubscribe();
    });
    it(`${kind}: actual injector teardown does not flush a connector call`, () => {
      const test = setup();
      test.send();
      expect(active).toBe(1);
      TestBed.resetTestingModule();
      scheduler.flush();
      expect(test.connector).not.toHaveBeenCalled();
      expect(active).toBe(0);
      test.subscription.unsubscribe();
    });
  }
  it('an empty adapter completion does not leak its request task', () => {
    getMany.mockImplementation((products: { code: string; scope: string }[]) =>
      products.map((product) => ({ ...product, data$: EMPTY }))
    );
    const subscription = TestBed.inject(ProductEffects)
      .loadProduct$({ scheduler })
      .subscribe();
    actions.next(new ProductActions.LoadProduct('one', 'details'));
    scheduler.flush();
    expect(active).toBe(0);
    subscription.unsubscribe();
  });
});

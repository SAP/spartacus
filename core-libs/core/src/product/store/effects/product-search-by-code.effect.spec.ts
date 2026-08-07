import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ProductSearchByCodeEffects } from './product-search-by-code.effect';
import { ProductActions } from '../actions/index';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { LoggerService } from '../../../logger/logger.service';
import { AuthActions } from '@spartacus/core';
import { tryNormalizeHttpError } from '../../../util/try-normalize-http-error';

describe('ProductSearchByCodeEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductSearchByCodeEffects;
  let productSearchConnector: ProductSearchConnector;
  let logger: LoggerService;

  beforeEach(() => {
    productSearchConnector = {
      searchByCodes: vi.fn(),
    };
    logger = { error: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        ProductSearchByCodeEffects,
        provideMockActions(() => actions$),
        { provide: ProductSearchConnector, useValue: productSearchConnector },
        { provide: LoggerService, useValue: logger },
      ],
    });

    effects = TestBed.inject(ProductSearchByCodeEffects);
  });

  it('should load products by codes successfully', () => {
    const action = new ProductActions.ProductSearchLoadByCode({
      code: '123',
      scope: 'test',
    });
    const completion = new ProductActions.ProductSearchLoadByCodeSuccess({
      code: '123',
      scope: 'test',
      product: { code: '123' },
    });

    actions$ = hot('-a-', { a: action });
    const response = cold('-a|', { a: { products: [{ code: '123' }] } });
    vi.spyOn(productSearchConnector, 'searchByCodes').mockReturnValue(response);

    const expected = cold('--b', { b: completion });

    expect(
      effects.searchByCodes$({ scheduler: getTestScheduler() })
    ).toBeObservable(expected);
  });

  it('should handle error when loading products by codes', () => {
    const action = new ProductActions.ProductSearchLoadByCode({
      code: '123',
      scope: 'test',
    });
    const error = tryNormalizeHttpError('Error loading products', logger);
    const completion = new ProductActions.ProductSearchLoadByCodeFail({
      code: '123',
      scope: 'test',
      error,
    });

    actions$ = hot('-a-', { a: action });
    const response = cold('-#|', {}, error);
    vi.spyOn(productSearchConnector, 'searchByCodes').mockReturnValue(response);

    const expected = cold('--b', { b: completion });

    expect(
      effects.searchByCodes$({ scheduler: getTestScheduler() })
    ).toBeObservable(expected);
  });

  it('should clear state on logout', () => {
    const action = new AuthActions.Logout();
    const completion = new ProductActions.ClearProductSearchByCodeState();

    actions$ = hot('-a-', { a: action });
    const expected = cold('-b', { b: completion });

    expect(effects.clearState$).toBeObservable(expected);
  });

  it('should clear state on login', () => {
    const action = new AuthActions.Login();
    const completion = new ProductActions.ClearProductSearchByCodeState();

    actions$ = hot('-a-', { a: action });
    const expected = cold('-b', { b: completion });

    expect(effects.clearState$).toBeObservable(expected);
  });
});

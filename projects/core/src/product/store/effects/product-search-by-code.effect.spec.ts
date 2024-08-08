import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ProductSearchByCodeEffects } from './product-search-by-code.effect';
import { ProductActions } from '../actions/index';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { LoggerService } from '../../../logger/logger.service';
import { AuthActions, normalizeHttpError } from '@spartacus/core';

describe('ProductSearchByCodeEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductSearchByCodeEffects;
  let productSearchConnector: jasmine.SpyObj<ProductSearchConnector>;
  let logger: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    productSearchConnector = jasmine.createSpyObj('ProductSearchConnector', [
      'searchByCodes',
    ]);
    logger = jasmine.createSpyObj('LoggerService', ['error']);

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
    productSearchConnector.searchByCodes.and.returnValue(response);

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
    const error = normalizeHttpError('Error loading products', logger);
    const completion = new ProductActions.ProductSearchLoadByCodeFail({
      code: '123',
      scope: 'test',
      error,
    });

    actions$ = hot('-a-', { a: action });
    const response = cold('-#|', {}, error);
    productSearchConnector.searchByCodes.and.returnValue(response);

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

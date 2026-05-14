import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';
import { LoggerService } from '../../../logger/logger.service';
import { ProductActions } from '../actions';
import { ProductSearchByCategoryEffects } from './product-search-by-category.effect';
import { tryNormalizeHttpError } from '@spartacus/core';

describe('ProductSearchByCategoryEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductSearchByCategoryEffects;
  let productSearchConnector: jasmine.SpyObj<ProductSearchConnector>;
  let logger: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    productSearchConnector = jasmine.createSpyObj('ProductSearchConnector', [
      'searchByCategory',
    ]);
    logger = jasmine.createSpyObj('LoggerService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        ProductSearchByCategoryEffects,
        provideMockActions(() => actions$),
        { provide: ProductSearchConnector, useValue: productSearchConnector },
        { provide: LoggerService, useValue: logger },
      ],
    });

    effects = TestBed.inject(ProductSearchByCategoryEffects);
  });

  it('should load products by category codes successfully', () => {
    const action = new ProductActions.ProductSearchLoadByCategory({
      categoryCode: 'brand_1',
      scope: 'list',
    });
    const completion = new ProductActions.ProductSearchLoadByCategorySuccess({
      categoryCode: 'brand_1',
      scope: 'list',
      products: [{ code: '123' }],
    });

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: { products: [{ code: '123' }] } });
    productSearchConnector.searchByCategory.and.returnValue(response);

    const expected = cold('---b', { b: completion });

    expect(
      effects.searchByCategory$({ scheduler: getTestScheduler() })
    ).toBeObservable(expected);
  });

  it('should handle multiple categories successfully', () => {
    const action1 = new ProductActions.ProductSearchLoadByCategory({
      categoryCode: 'brand_1',
      scope: 'list',
    });
    const action2 = new ProductActions.ProductSearchLoadByCategory({
      categoryCode: 'brand_2',
      scope: 'list',
    });
    const completion1 = new ProductActions.ProductSearchLoadByCategorySuccess({
      categoryCode: 'brand_1',
      scope: 'list',
      products: [{ code: '123' }, { code: '456' }],
    });
    const completion2 = new ProductActions.ProductSearchLoadByCategorySuccess({
      categoryCode: 'brand_2',
      scope: 'list',
      products: [{ code: '789' }, { code: '101' }],
    });

    actions$ = hot('-a-b', { a: action1, b: action2 });

    const response1 = cold('-a|', {
      a: { products: [{ code: '123' }, { code: '456' }] },
    });
    const response2 = cold('-a|', {
      a: { products: [{ code: '789' }, { code: '101' }] },
    });

    productSearchConnector.searchByCategory.and.returnValues(
      response1,
      response2
    );

    const expected = cold('---c-d', { c: completion1, d: completion2 });

    expect(
      effects.searchByCategory$({ scheduler: getTestScheduler() })
    ).toBeObservable(expected);
  });

  it('should handle errors when loading products by category codes', () => {
    const action = new ProductActions.ProductSearchLoadByCategory({
      categoryCode: 'brand_1',
      scope: 'list',
    });
    const error = tryNormalizeHttpError('Error loading products', logger);
    const completion = new ProductActions.ProductSearchLoadByCategoryFail({
      categoryCode: 'brand_1',
      scope: 'list',
      error,
    });

    actions$ = hot('-a-', { a: action });
    const response = cold('-#|', {}, error);
    productSearchConnector.searchByCategory.and.returnValue(response);

    const expected = cold('--b', { b: completion });

    expect(
      effects.searchByCategory$({ scheduler: getTestScheduler() })
    ).toBeObservable(expected);
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { CartActions } from '@spartacus/cart/base/core';
import {
  ErrorModel,
  LoggerService,
  normalizeHttpError,
  Product,
  ProductActions,
  ProductSearchPage,
} from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { BundleActions } from '..';
import { BundleConnector } from '../../connectors';
import { BundleStarter } from '../../model';
import * as fromEffects from './bundle.effect';
import createSpy = jasmine.createSpy;

const mockCartId = 'test-cart';
const mockUserId = 'test-user';
const entryGroupNumber = 1;
const mockProduct: Product = { code: 'test' };
const mockBundleStarter: BundleStarter = {
  productCode: '1',
  quantity: 1,
  templateId: 'test',
};

const mockProductSearchPage: ProductSearchPage = {
  products: [mockProduct],
  sorts: [],
  pagination: {},
};

class MockBundleConnector implements Partial<BundleConnector> {
  bundleStart = createSpy().and.returnValue(of({}));
  bundleAllowedProductsSearch = createSpy().and.returnValue(
    of(mockProductSearchPage)
  );
}

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

describe('Bundle Effects', () => {
  let connector: BundleConnector;
  let effects: fromEffects.BundleEffects;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromEffects.BundleEffects,
        {
          provide: BundleConnector,
          useClass: MockBundleConnector,
        },
        {
          provide: LoggerService,
          useClass: MockLoggerService,
        },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(fromEffects.BundleEffects);
    connector = TestBed.inject(BundleConnector);
  });

  describe('startBundle$', () => {
    it('should start a bundle success', () => {
      const starter = {
        userId: mockUserId,
        cartId: mockCartId,
        bundleStarter: mockBundleStarter,
      };
      const action = new BundleActions.StartBundle(starter);
      const completion = new BundleActions.StartBundleSuccess({});

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.startBundle$).toBeObservable(expected);
      expect(connector.bundleStart).toHaveBeenCalledWith(
        starter.userId,
        starter.cartId,
        starter.bundleStarter
      );
    });

    it('should start a bundle failed', () => {
      const error = 'error';
      const starter = {
        userId: mockUserId,
        cartId: mockCartId,
        bundleStarter: mockBundleStarter,
      };
      const action = new BundleActions.StartBundle(starter);
      const completion1 = new BundleActions.StartBundleFail({
        ...starter,
        error,
      });
      const completion2 = new CartActions.LoadCart({
        cartId: starter.cartId,
        userId: starter.userId,
      });

      connector.bundleStart = createSpy().and.returnValue(cold('#', {}, error));

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: completion1,
        c: completion2,
      });

      expect(effects.startBundle$).toBeObservable(expected);
    });
  });

  describe('getBundleAllowedProducts$', () => {
    it('should get allowed products succeed', () => {
      const actionPayload = {
        userId: mockUserId,
        cartId: mockCartId,
        entryGroupNumber,
        searchConfig: { pageSize: 10 },
      };
      const action = new BundleActions.GetBundleAllowedProducts(actionPayload);
      const searchSucceed = new ProductActions.SearchProductsSuccess(
        mockProductSearchPage
      );
      const getAllowedProductSucceed =
        new BundleActions.GetBundleAllowedProductsSuccess({
          ...actionPayload,
          ...mockProductSearchPage,
        });

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: searchSucceed,
        c: getAllowedProductSucceed,
      });

      expect(effects.getBundleAllowedProducts$).toBeObservable(expected);
    });

    it('should get allowed products failed', () => {
      const actionPayload = {
        userId: mockUserId,
        cartId: mockCartId,
        entryGroupNumber,
        searchConfig: { pageSize: 10 },
      };
      const action = new BundleActions.GetBundleAllowedProducts(actionPayload);
      const error: ErrorModel = {
        message: 'error',
      };
      const searchFailed = new ProductActions.SearchProductsFail(
        normalizeHttpError(error, new MockLoggerService())
      );
      const getAllowedProductFailed =
        new BundleActions.GetBundleAllowedProductsFail(
          normalizeHttpError(
            {
              ...actionPayload,
              error,
            },
            new MockLoggerService()
          )
        );

      connector.bundleAllowedProductsSearch = createSpy().and.returnValue(
        cold('#', {}, error)
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-(bc)', {
        b: searchFailed,
        c: getAllowedProductFailed,
      });

      expect(effects.getBundleAllowedProducts$).toBeObservable(expected);
    });
  });
});

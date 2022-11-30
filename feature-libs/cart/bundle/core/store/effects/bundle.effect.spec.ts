import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { BundleActions } from '..';
import { BundleConnector } from '../../connectors';
import * as fromEffects from './bundle.effect';
import createSpy = jasmine.createSpy;

const mockCartId = 'test-cart';
const mockUserId = 'test-user';
const entryGroupNumber = 1;

class MockBundleConnector implements Partial<BundleConnector> {
  bundleStart = createSpy().and.returnValue(of({}));
  bundleAllowedProductsSearch = createSpy().and.returnValue(
    of({
      entries: [
        { entryNumber: 0, product: { name: 'test-product' } },
        { entryNumber: 1, product: { name: 'test-product1' } },
        { entryNumber: 2, product: { name: 'test-product2' } },
      ],
    })
  );
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
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(fromEffects.BundleEffects);
    connector = TestBed.inject(BundleConnector);
  });

  describe('getBundleAllowedProducts$', () => {
    it('get allowed products', () => {
      const result: any = {
        userId: mockUserId,
        cartId: mockCartId,
        entryGroupNumber,
        searchConfig: { pageSize: 10 },
        data: {
          entries: [
            { entryNumber: 0, product: { name: 'test-product' } },
            { entryNumber: 1, product: { name: 'test-product1' } },
            { entryNumber: 2, product: { name: 'test-product2' } },
          ],
        },
      };
      const action = new BundleActions.GetBundleAllowedProducts({
        userId: mockUserId,
        cartId: mockCartId,
        entryGroupNumber,
        searchConfig: { pageSize: 10 },
      });
      const completion = new BundleActions.GetBundleAllowedProductsSuccess(
        result
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: completion,
      });

      expect(effects.getBundleAllowedProducts$).toBeObservable(expected);
    });
  });

  describe('startBundle$', () => {
    it('should start a bundle', () => {
      const action = new BundleActions.StartBundle({
        userId: mockUserId,
        cartId: mockCartId,
        bundleStarter: {
          productCode: '1',
        },
      });

      const completion = new BundleActions.StartBundleSuccess({});

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', {
        b: completion,
      });

      expect(effects.startBundle$).toBeObservable(expected);
      expect(connector.bundleStart).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        {
          productCode: '1',
        }
      );
    });
  });
});

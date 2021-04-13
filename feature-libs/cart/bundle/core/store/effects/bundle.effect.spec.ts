import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { BundleActions } from '../actions/index';
import * as fromEffects from './bundle.effect';
import createSpy = jasmine.createSpy;
import { SearchConfig } from '@spartacus/core';
import { BundleConnector } from '../../connectors';

const userId = 'anonymous';
const cartId = 'xxxxx';
const entryGroupNumber = 5;
const searchConfig: SearchConfig = { pageSize: 5 };
const params = {
  userId,
  cartId,
  entryGroupNumber,
  searchConfig,
};
const searchResult = {
  availableEntriesEntities: {
    [cartId]: { [entryGroupNumber]: { ...params, products: [] } },
  },
};
const bundleStarter = {};

const mockBundleConnector = {
  bundleStarter: createSpy('connector.bundleStarter').and.returnValue(
    of({ cartId, userId, bundleStarter })
  ),
  bundleAllowedProductsSearch: createSpy(
    'connector.bundleAllowedProductsSearch'
  ).and.returnValue(of(searchResult)),
};

describe('Bundle Effects', () => {
  let actions$: Observable<any>;
  let effects: fromEffects.BundleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BundleConnector, useValue: mockBundleConnector },
        fromEffects.BundleEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(fromEffects.BundleEffects);
  });

  describe('getBundleAllowedProducts$', () => {
    it('should return searchResult from GetBundleAllowedProductsSuccess', () => {
      const action = new BundleActions.GetBundleAllowedProducts({
        ...params,
      });
      const completion = new BundleActions.GetBundleAllowedProductsSuccess(<
        any
      >{
        ...params,
        data: searchResult,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.getBundleAllowedProducts$).toBeObservable(expected);
    });
  });

  describe('startBundle$', () => {
    it('should return payload from StartBundleSuccess', () => {
      const action = new BundleActions.StartBundle({
        cartId,
        userId,
        bundleStarter,
      });
      const completion = new BundleActions.StartBundleSuccess(<any>{
        cartId,
        userId,
        bundleStarter,
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.startBundle$).toBeObservable(expected);
    });
  });
});

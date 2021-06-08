import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import { StoreFinderActions } from '../actions/index';
import * as fromEffects from './view-all-stores.effect';
import createSpy = jasmine.createSpy;
import { OccConfig, SiteContextActions } from '@spartacus/core';
import { StoreCount } from '../../model/store-finder.model';

const mockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

const storesCountResult: StoreCount[] = [
  { count: 1, name: 'name1' },
  { count: 2, name: 'name2' },
];

const mockStoreFinderConnector = {
  getCounts: createSpy('connector.getCounts').and.returnValue(
    of(storesCountResult)
  ),
};

describe('ViewAllStores Effects', () => {
  let actions$: Observable<any>;
  let effects: fromEffects.ViewAllStoresEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: StoreFinderConnector, useValue: mockStoreFinderConnector },
        { provide: OccConfig, useValue: mockOccModuleConfig },
        fromEffects.ViewAllStoresEffect,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(fromEffects.ViewAllStoresEffect);
  });

  describe('viewAllStores$', () => {
    it('should return searchResult from ViewAllStoresSuccess', () => {
      const action = new StoreFinderActions.ViewAllStores();
      const completion = new StoreFinderActions.ViewAllStoresSuccess(
        storesCountResult
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.viewAllStores$).toBeObservable(expected);
    });
    it('should return search result on clear store finder data', () => {
      const action = new StoreFinderActions.ClearStoreFinderData();
      const completion = new StoreFinderActions.ViewAllStoresSuccess(
        storesCountResult
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.viewAllStores$).toBeObservable(expected);
    });
  });
  describe('clearStoreFinderData$', () => {
    it('should clear store finder data on language change', () => {
      const action = new SiteContextActions.LanguageChange({
        previous: 'previous',
        current: 'current',
      });
      const completion = new StoreFinderActions.ClearStoreFinderData();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.clearStoreFinderData$).toBeObservable(expected);
    });
    it('should clear store finder data on currency change', () => {
      const action = new SiteContextActions.CurrencyChange({
        previous: 'previous',
        current: 'current',
      });
      const completion = new StoreFinderActions.ClearStoreFinderData();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.clearStoreFinderData$).toBeObservable(expected);
    });
  });
});

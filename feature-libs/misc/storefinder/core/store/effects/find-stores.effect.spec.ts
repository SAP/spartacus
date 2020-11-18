import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { StoreFinderConnector } from '../../connectors/store-finder.connector';
import { StoreFinderActions } from '../actions/index';
import * as fromEffects from './find-stores.effect';
import createSpy = jasmine.createSpy;
import { GeoPoint, SearchConfig } from '@spartacus/core';

const singleStoreResult = {};
const searchResult: any = { stores: [] };

const mockStoreFinderConnector = {
  get: createSpy('connector.get').and.returnValue(of(singleStoreResult)),
  search: createSpy('connector.search').and.returnValue(of(searchResult)),
};

describe('FindStores Effects', () => {
  let actions$: Observable<any>;
  let effects: fromEffects.FindStoresEffect;
  let searchConfig: SearchConfig;
  const longitudeLatitude: GeoPoint = {
    longitude: 10.1,
    latitude: 20.2,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: StoreFinderConnector, useValue: mockStoreFinderConnector },
        fromEffects.FindStoresEffect,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(fromEffects.FindStoresEffect);
    searchConfig = { pageSize: 10 };
  });

  describe('findStores$', () => {
    it('should return searchResult from FindStoresSuccess', () => {
      const action = new StoreFinderActions.FindStores({
        queryText: 'test',
        searchConfig,
      });
      const completion = new StoreFinderActions.FindStoresSuccess(searchResult);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.findStores$).toBeObservable(expected);
    });
  });

  describe('findStoreById$', () => {
    it('should return searchResult from FindStoreByIdSuccess', () => {
      const action = new StoreFinderActions.FindStoreById({
        storeId: 'testId',
      });
      const completion = new StoreFinderActions.FindStoreByIdSuccess(
        singleStoreResult
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.findStoreById$).toBeObservable(expected);
    });
  });

  describe('findStores$ with coordinates', () => {
    it('should return searchResult from FindStoresSuccess without queryText', () => {
      const action = new StoreFinderActions.FindStores({
        queryText: '',
        longitudeLatitude,
        searchConfig,
      });
      const completion = new StoreFinderActions.FindStoresSuccess(searchResult);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.findStores$).toBeObservable(expected);
    });
  });
});

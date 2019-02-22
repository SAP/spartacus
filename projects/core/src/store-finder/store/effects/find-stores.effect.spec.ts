import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { hot, cold } from 'jasmine-marbles';

import * as fromActions from '../actions/find-stores.action';
import { OccConfig } from '../../../occ';
import { LongitudeLatitude } from '../../model/longitude-latitude';
import { StoreFinderSearchConfig } from '../../model/search-config';
import { OccStoreFinderService } from '../../occ/store-finder.service';

import * as fromEffects from './find-stores.effect';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  }
};

describe('FindStores Effects', () => {
  let actions$: Observable<any>;
  let service: OccStoreFinderService;
  let effects: fromEffects.FindStoresEffect;
  let searchConfig: StoreFinderSearchConfig;
  const longitudeLatitude: LongitudeLatitude = {
    longitude: 10.1,
    latitude: 20.2
  };

  const singleStoreResult = {};
  const searchResult: any = { stores: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccStoreFinderService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        fromEffects.FindStoresEffect,
        provideMockActions(() => actions$)
      ]
    });

    service = TestBed.get(OccStoreFinderService);
    effects = TestBed.get(fromEffects.FindStoresEffect);
    searchConfig = { pageSize: 10 };

    spyOn(service, 'findStores').and.returnValue(of(searchResult));
    spyOn(service, 'findStoreById').and.returnValue(of(singleStoreResult));
  });

  describe('findStores$', () => {
    it('should return searchResult from FindStoresSuccess', () => {
      const action = new fromActions.FindStores({
        queryText: 'test',
        searchConfig
      });
      const completion = new fromActions.FindStoresSuccess(searchResult);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.findStores$).toBeObservable(expected);
    });
  });

  describe('findStoreById$', () => {
    it('should return searchResult from FindStoreByIdSuccess', () => {
      const action = new fromActions.FindStoreById({ storeId: 'testId' });
      const completion = new fromActions.FindStoreByIdSuccess(
        singleStoreResult
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.findStoreById$).toBeObservable(expected);
    });
  });

  describe('findStores$ with coordinates', () => {
    it('should return searchResult from FindStoresSuccess without queryText', () => {
      const action = new fromActions.FindStores({
        queryText: '',
        longitudeLatitude,
        searchConfig
      });
      const completion = new fromActions.FindStoresSuccess(searchResult);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.findStores$).toBeObservable(expected);
    });
  });
});

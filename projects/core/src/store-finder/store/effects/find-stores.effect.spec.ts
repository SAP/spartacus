import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccStoreFinderService } from '../../occ/store-finder.service';
import { OccConfig } from '@spartacus/core';
import { StoreFinderSearchConfig } from '../../model/search-config';
import { LongitudeLatitude } from '../../model/longitude-latitude';

import * as fromEffects from './find-stores.effect';
import * as fromActions from '../actions/find-stores.action';

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
    spyOn(service, 'findStoresByCountry').and.returnValue(of(searchResult));
    spyOn(service, 'findStoresByRegion').and.returnValue(of(searchResult));
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

  describe('findAllStoresByCountry$', () => {
    it('should return searchResult from FindAllStoresByCountrySuccess', () => {
      const action = new fromActions.FindAllStoresByCountry({
        countryIsoCode: 'test'
      });
      const completion = new fromActions.FindAllStoresByCountrySuccess(
        searchResult
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.findAllStoresByCountry$).toBeObservable(expected);
    });
  });

  describe('findAllStoresByRegion$', () => {
    it('should return searchResult from FindAllStoresByRegionSuccess', () => {
      const action = new fromActions.FindAllStoresByRegion({
        countryIsoCode: 'test',
        regionIsoCode: 'CA-QC'
      });
      const completion = new fromActions.FindAllStoresByRegionSuccess(
        searchResult
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.findAllStoresByRegion$).toBeObservable(expected);
    });
  });
});

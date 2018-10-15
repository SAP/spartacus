import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import { OccStoreFinderService } from '../../../occ/store/store-finder.service';
import { OccModuleConfig } from '../../../occ/occ-module-config';
import { SearchConfig } from '../../models/search-config';
import * as fromEffects from './store-finder.effect';
import * as fromActions from '../actions/find-stores.action';
import { OccE2eConfigurationService } from '../../../occ/e2e/e2e-configuration-service';

describe('StoreFinder Effects', () => {
  let actions$: Observable<any>;
  let service: OccStoreFinderService;
  let effects: fromEffects.StoreFinderEffect;
  let searchConfig: SearchConfig;
  const longitudeLatitude: number[] = [10.1, 20.2];

  const searchResult: any = { stores: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccStoreFinderService,
        OccE2eConfigurationService,
        OccModuleConfig,
        fromEffects.StoreFinderEffect,
        provideMockActions(() => actions$)
      ]
    });

    service = TestBed.get(OccStoreFinderService);
    effects = TestBed.get(fromEffects.StoreFinderEffect);
    searchConfig = { pageSize: 10 };

    spyOn(service, 'findStores').and.returnValue(of(searchResult));
    spyOn(service, 'storesCount').and.returnValue(of(searchResult));
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

  describe('findAllStores$', () => {
    it('should return searchResult from FindAllStoresSuccess', () => {
      const action = new fromActions.FindAllStores();
      const completion = new fromActions.FindAllStoresSuccess(searchResult);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.findAllStores$).toBeObservable(expected);
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

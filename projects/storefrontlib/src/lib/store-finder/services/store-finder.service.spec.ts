import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromStore from '../store';

import { StoreFinderService } from './store-finder.service';
import { LongitudeLatitude } from '../models/longitude-latitude';

describe('StoreFinderService', () => {
  let service: StoreFinderService;
  let store: Store<fromStore.StoresState>;

  const longitudeLatitude: LongitudeLatitude = {
    longitude: 10.1,
    latitude: 20.2
  };
  const queryText = 'test';
  const countryIsoCode = 'CA';
  const regionIsoCode = 'CA-QC';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          store: combineReducers(fromStore.reducers)
        })
      ],
      providers: [StoreFinderService]
    });

    service = TestBed.get(StoreFinderService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should inject StoreFinderService', inject(
    [StoreFinderService],
    (storeFinderService: StoreFinderService) => {
      expect(storeFinderService).toBeTruthy();
    }
  ));

  describe('Find Stores', () => {
    it('should dispatch a new action', () => {
      service.findStores(queryText);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindStores({ queryText })
      );
    });
  });

  describe('Find Stores', () => {
    it('should dispatch a new action with coordinates', () => {
      service.findStores(queryText, longitudeLatitude);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindStores({ queryText, longitudeLatitude })
      );
    });
  });

  describe('View All Stores', () => {
    it('should dispatch a new action', () => {
      service.viewAllStores();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.ViewAllStores()
      );
    });
  });

  describe('View All Stores for Country', () => {
    it('should dispatch a new action', () => {
      service.viewAllStoresForCountry(countryIsoCode);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindAllStoresByCountry({ countryIsoCode })
      );
    });
  });

  describe('View All Stores for Region', () => {
    it('should dispatch a new action', () => {
      service.viewAllStoresForRegion('CA', 'CA-QC');

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindAllStoresByRegion({ countryIsoCode, regionIsoCode })
      );
    });
  });
});

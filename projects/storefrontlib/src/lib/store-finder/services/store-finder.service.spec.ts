import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromStore from '../store';

import { StoreFinderService } from './store-finder.service';

describe('StoreFinderService', () => {
  let service: StoreFinderService;
  let store: Store<fromStore.StoresState>;

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
      service.findStores(queryText, false);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindStores({ queryText: queryText, useMyLocation: false })
      );
    });
  });

  describe('Find Stores with My Location', () => {
    it('should dispatch a new action', () => {
      service.findStores('', true);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.FindStoresWithMyLocation({})
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

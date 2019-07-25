import { inject, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { GeoPoint } from '../../model/misc.model';
import { WindowRef } from '../../window/window-ref';
import { StoreFinderActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StoresState } from '../store/store-finder-state';
import { StoreFinderService } from './store-finder.service';

describe('StoreFinderService', () => {
  let service: StoreFinderService;
  let store: Store<StoresState>;
  let winRef: WindowRef;

  const queryText = 'test';

  const storeId = 'shop_los_angeles_1';
  const geolocationWatchId = 1;

  const longitudeLatitude: GeoPoint = {
    longitude: 10.1,
    latitude: 20.2,
  };

  const MockWindowRef = {
    nativeWindow: {
      navigator: {
        geolocation: {
          watchPosition: callback => {
            callback({ coords: longitudeLatitude });
            return geolocationWatchId;
          },
          clearWatch: () => {},
        },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          store: combineReducers(fromStoreReducers.getReducers),
        }),
      ],
      providers: [
        StoreFinderService,
        { provide: WindowRef, useValue: MockWindowRef },
      ],
    });

    service = TestBed.get(StoreFinderService);
    store = TestBed.get(Store);
    winRef = TestBed.get(WindowRef);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(
      winRef.nativeWindow.navigator.geolocation,
      'watchPosition'
    ).and.callThrough();
    spyOn(
      winRef.nativeWindow.navigator.geolocation,
      'clearWatch'
    ).and.callThrough();
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
        new StoreFinderActions.FindStores({ queryText: queryText })
      );
    });
  });

  describe('Find Stores with My Location', () => {
    it('should dispatch a OnHold action and a FindStores action', () => {
      service.findStores(queryText, true);

      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreFinderActions.FindStoresOnHold()
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreFinderActions.FindStores({
          queryText,
          longitudeLatitude,
        })
      );
      expect(
        winRef.nativeWindow.navigator.geolocation.watchPosition
      ).toHaveBeenCalled();
    });
  });

  describe('Find Stores Twice with My Location', () => {
    it('should clear watch geolocation', () => {
      service.findStores(queryText, true);
      service.findStores(queryText, false);
      expect(
        winRef.nativeWindow.navigator.geolocation.watchPosition
      ).toHaveBeenCalled();
      expect(
        winRef.nativeWindow.navigator.geolocation.clearWatch
      ).toHaveBeenCalledWith(geolocationWatchId);
    });
  });

  describe('View Store By Id', () => {
    it('should dispatch a new FindStoreById action', () => {
      service.viewStoreById(storeId);

      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreFinderActions.FindStoreById({ storeId })
      );
    });
  });

  describe('View All Stores', () => {
    it('should dispatch a new action', () => {
      service.viewAllStores();

      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreFinderActions.ViewAllStores()
      );
    });
  });
});

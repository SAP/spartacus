import { inject, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { StoreFinderActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import { StoresState } from '../store/store-finder-state';
import { StoreFinderService } from './store-finder.service';
import { NavigationExtras } from '@angular/router';
import { StoreFinderConfig } from '../config/store-finder-config';
import {
  GeoPoint,
  GlobalMessageService,
  RoutingService,
  UrlCommands,
  WindowRef,
} from '@spartacus/core';

class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}

class MockStoreFinderConfig {
  radius: 50000;
}

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
          watchPosition: (callback) => {
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
        { provide: RoutingService, useClass: MockRoutingService },
        GlobalMessageService,
        { provide: StoreFinderConfig, useClass: MockStoreFinderConfig },
      ],
    });

    service = TestBed.inject(StoreFinderService);
    store = TestBed.inject(Store);
    winRef = TestBed.inject(WindowRef);

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
      service.findStoresAction(
        queryText,
        { currentPage: 0 },
        undefined,
        undefined
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreFinderActions.FindStores({
          queryText: queryText,
          searchConfig: {
            currentPage: 0,
          },
          longitudeLatitude: undefined,
          countryIsoCode: undefined,
          radius: undefined,
        })
      );
    });
  });

  describe('Find Stores with My Location', () => {
    it('should dispatch a OnHold action and a FindStores action', () => {
      service.findStoresAction(
        queryText,
        { currentPage: 0 },
        undefined,
        undefined,
        true
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreFinderActions.FindStoresOnHold()
      );

      expect(
        winRef.nativeWindow.navigator.geolocation.watchPosition
      ).toHaveBeenCalled();
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

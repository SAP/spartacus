import { inject, TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  GeoPoint,
  GlobalMessageService,
  PointOfService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { vi } from 'vitest';
import { StoreFinderConfig } from '../config/store-finder-config';
import { StoreFinderSelectors } from '../store';
import { StoreFinderActions } from '../store/actions/index';
import {
  FindStoresState,
  StateWithStoreFinder,
} from '../store/store-finder-state';
import { StoreFinderService } from './store-finder.service';

const routerParam$: BehaviorSubject<{
  [key: string]: string;
}> = new BehaviorSubject({});

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);

  getParams = () => routerParam$.asObservable();
}

class MockStoreFinderConfig {
  radius: 50000;
}

const location: PointOfService = {
  geoPoint: {
    latitude: 35.528984,
    longitude: 139.700168,
  },

  openingHours: {
    code: 'electronics-japan-standard-hours',
    weekDayOpeningList: [
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '01:02',
          hour: 1,
          minute: 2,
        },
        closed: false,
        weekDay: 'Mon',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '03:04',
          hour: 3,
          minute: 4,
        },
        closed: false,
        weekDay: 'Tue',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '05:06',
          hour: 5,
          minute: 6,
        },
        closed: false,
        weekDay: 'Wed',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '07:08',
          hour: 7,
          minute: 8,
        },
        closed: false,
        weekDay: 'Thu',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '09:10',
          hour: 9,
          minute: 10,
        },
        closed: false,
        weekDay: 'Fri',
      },
      {
        closingTime: {
          formattedHour: '20:00',
          hour: 8,
          minute: 0,
        },
        openingTime: {
          formattedHour: '11:12',
          hour: 11,
          minute: 12,
        },
        closed: false,
        weekDay: 'Sat',
      },
      {
        closed: true,
        weekDay: 'Sun',
      },
    ],
  },
};

describe('StoreFinderService', () => {
  let service: StoreFinderService;
  let store: MockStore<StateWithStoreFinder>;
  let winRef: WindowRef;
  let routingService: RoutingService;

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

  const mockStoreEntities: FindStoresState = {
    findStoresEntities: { pointOfServices: [] },
    findStoreEntityById: {},
  };

  let mockSelectLoading: MemoizedSelector<StateWithStoreFinder, boolean>;
  let mockSelectSuccess: MemoizedSelector<StateWithStoreFinder, boolean>;
  let mockSelectEntities: MemoizedSelector<
    StateWithStoreFinder,
    FindStoresState
  >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreFinderService,
        { provide: WindowRef, useValue: MockWindowRef },
        { provide: RoutingService, useClass: MockRoutingService },
        GlobalMessageService,
        { provide: StoreFinderConfig, useClass: MockStoreFinderConfig },
        provideMockStore(),
      ],
    });

    store = TestBed.inject(MockStore);

    mockSelectLoading = store.overrideSelector(
      StoreFinderSelectors.getStoresLoading as MemoizedSelector<
        StateWithStoreFinder,
        boolean
      >,
      true
    );
    mockSelectSuccess = store.overrideSelector(
      StoreFinderSelectors.getStoresSuccess as MemoizedSelector<
        StateWithStoreFinder,
        boolean
      >,
      true
    );
    mockSelectEntities = store.overrideSelector(
      StoreFinderSelectors.getFindStoresEntities as MemoizedSelector<
        StateWithStoreFinder,
        FindStoresState
      >,
      mockStoreEntities
    );

    service = TestBed.inject(StoreFinderService);
    winRef = TestBed.inject(WindowRef);
    routingService = TestBed.inject(RoutingService);

    vi.spyOn(store, 'dispatch');
    vi.spyOn(winRef.nativeWindow.navigator.geolocation, 'watchPosition');
    vi.spyOn(winRef.nativeWindow.navigator.geolocation, 'clearWatch');
    routerParam$.next({});
  });

  it('should inject StoreFinderService', inject(
    [StoreFinderService],
    (storeFinderService: StoreFinderService) => {
      expect(storeFinderService).toBeTruthy();
    }
  ));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return store latitude', () => {
    expect(service.getStoreLatitude(location)).toBe(35.528984);
  });

  it('should return store longitude', () => {
    expect(service.getStoreLongitude(location)).toBe(139.700168);
  });

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

  describe('Reload store entities on context change', () => {
    beforeEach(() => {
      mockSelectLoading.setResult(false);
      mockSelectSuccess.setResult(false);
      store.refreshState();
    });

    it('should dispatch findStores action on context change', () => {
      routerParam$.next({ country: 'US' });
      mockSelectEntities.setResult({
        findStoresEntities: {},
        findStoreEntityById: {},
      });
      store.refreshState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreFinderActions.FindStores({
          queryText: '',
          searchConfig: {
            pageSize: -1,
          },
          longitudeLatitude: undefined,
          countryIsoCode: 'US',
          radius: undefined,
        })
      );
    });

    it('should dispatch viewStoreById action on context change', () => {
      routerParam$.next({ store: storeId });
      mockSelectEntities.setResult({
        findStoresEntities: {},
        findStoreEntityById: {},
      });
      store.refreshState();
      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreFinderActions.FindStoreById({ storeId })
      );
    });
  });
});

import { inject, TestBed } from '@angular/core/testing';
import * as NgrxStore from '@ngrx/store';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import {
  GeoPoint,
  GlobalMessageService,
  PointOfService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { StoreFinderConfig } from '../config/store-finder-config';
import { StoreFinderSelectors } from '../store';
import { StoreFinderActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import {
  FindStoresState,
  StateWithStoreFinder,
  StoresState,
  STORE_FINDER_FEATURE,
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
  let store: Store<StoresState>;
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
  const storeLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  const storeLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  const storeEntities$: BehaviorSubject<FindStoresState> = new BehaviorSubject(
    mockStoreEntities
  );

  const mockSelect = (
    selector: MemoizedSelector<StateWithStoreFinder, FindStoresState | boolean>
  ) => {
    switch (selector) {
      case StoreFinderSelectors.getStoresLoading:
        return () => storeLoading$.asObservable();
      case StoreFinderSelectors.getStoresSuccess:
        return () => storeLoaded$.asObservable();
      case StoreFinderSelectors.getFindStoresEntities:
        return () => storeEntities$.asObservable();
      default:
        return () => EMPTY;
    }
  };

  beforeEach(() => {
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          STORE_FINDER_FEATURE,
          fromStoreReducers.getReducers()
        ),
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
    routingService = TestBed.inject(RoutingService);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(
      winRef.nativeWindow.navigator.geolocation,
      'watchPosition'
    ).and.callThrough();
    spyOn(
      winRef.nativeWindow.navigator.geolocation,
      'clearWatch'
    ).and.callThrough();
    spyOn(routingService, 'getParams').and.returnValue(of());
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
      storeLoaded$.next(false);
      storeLoading$.next(false);
    });

    it('should dispatch findStores action on context change', () => {
      routerParam$.next({ country: 'US' });
      storeEntities$.next({ findStoresEntities: {}, findStoreEntityById: {} });
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
      storeEntities$.next({ findStoresEntities: {}, findStoreEntityById: {} });
      expect(store.dispatch).toHaveBeenCalledWith(
        new StoreFinderActions.FindStoreById({ storeId })
      );
    });
  });
});

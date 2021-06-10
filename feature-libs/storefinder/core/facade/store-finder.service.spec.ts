import { inject, TestBed } from '@angular/core/testing';
import * as NgrxStore from '@ngrx/store';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { StoreFinderActions } from '../store/actions/index';
import * as fromStoreReducers from '../store/reducers/index';
import {
  FindStoresState,
  StoresState,
  StateWithStoreFinder,
  STORE_FINDER_FEATURE,
} from '../store/store-finder-state';
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
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { StoreFinderSelectors } from '../store';

const routerParam$: BehaviorSubject<{
  [key: string]: string;
}> = new BehaviorSubject({});

class MockRoutingService implements Partial<RoutingService> {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}

  getParams = () => routerParam$.asObservable();
}

class MockStoreFinderConfig {
  radius: 50000;
}

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

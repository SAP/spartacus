import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PointOfService, PointOfServiceStock, Stock } from '@spartacus/core';
import {
  PickupLocationsSearchFacade,
  StockLocationSearchParams,
} from '@spartacus/pickup-in-store/root';
import { EMPTY, Observable, of } from 'rxjs';
import {
  BrowserLocationActions,
  PickupLocationActions,
  PickupLocationsState,
  PICKUP_LOCATIONS_FEATURE,
  StateWithPickupLocations,
  StockLevelActions,
  ToggleHideOutOfStockOptionsAction,
} from '../store';
import { PickupLocationsSearchService } from './pickup-locations-search.service';

export class MockPickupLocationsSearchService
  implements PickupLocationsSearchFacade
{
  stockLevelAtStore(_productCode: string, _storeName: string): void {}

  getStockLevelAtStore(
    _productCode: string,
    _storeName: string
  ): Observable<Stock | undefined> {
    return of(undefined);
  }

  startSearch(_params: StockLocationSearchParams): void {}

  hasSearchStarted(_productCode: string): Observable<boolean> {
    return of(true);
  }

  isSearchRunning(): Observable<boolean> {
    return of(true);
  }

  getSearchResults(_productCode: string): Observable<PointOfServiceStock[]> {
    return of([]);
  }

  clearSearchResults(): void {}

  getHideOutOfStock(): Observable<boolean> {
    return of(true);
  }

  setBrowserLocation(_latitude: number, _longitude: number): void {}

  toggleHideOutOfStock(): void {}

  getStoreDetails(_name: string): Observable<PointOfService> {
    return EMPTY;
  }

  loadStoreDetails(_name: string): void {}
}

describe('PickupLocationsSearchService', () => {
  let service: PickupLocationsSearchService;
  let store: MockStore;

  const stockLocationSearchParams: StockLocationSearchParams = {
    productCode: 'P0001',
    location: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PickupLocationsSearchService,
        provideMockStore({
          initialState: <StateWithPickupLocations>{
            [PICKUP_LOCATIONS_FEATURE]: {
              defaultPointOfService: { name: 'name', displayName: '' },
              intendedPickupLocations: {},
              storeDetails: { storeDetails: { name: 'name' } },
            } as PickupLocationsState,
          },
        }),
      ],
    });

    service = TestBed.inject(PickupLocationsSearchService);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('getStock', () => {
    service.startSearch(stockLocationSearchParams);
    expect(store.dispatch).toHaveBeenCalledWith(
      new StockLevelActions.StockLevel({
        productCode: 'P0001',
        location: '',
      })
    );
  });

  it('clearStockData', () => {
    service.clearSearchResults();
    expect(store.dispatch).toHaveBeenCalledWith(
      new StockLevelActions.ClearStockData()
    );
  });

  it('getStockLoading', () => {
    spyOn(store, 'pipe');
    service.isSearchRunning();
    expect(store.pipe).toHaveBeenCalled();
  });

  it('getHideOutOfStockState', () => {
    spyOn(store, 'pipe');
    service.getHideOutOfStock();
    expect(store.pipe).toHaveBeenCalled();
  });

  it('toggleHideOutOfStock', () => {
    service.toggleHideOutOfStock();
    expect(store.dispatch).toHaveBeenCalledWith(
      ToggleHideOutOfStockOptionsAction()
    );
  });

  it('hasSearchBeenStartedForProductCode', () => {
    spyOn(store, 'pipe');
    service.hasSearchStarted('productCode');
    expect(store.pipe).toHaveBeenCalled();
  });

  it('getStoresWithStockForProductCode', () => {
    spyOn(store, 'pipe');
    service.getSearchResults('productCode');
    expect(store.pipe).toHaveBeenCalled();
  });

  it('Add Browser Location', () => {
    service.setBrowserLocation(1, 1);
    expect(store.dispatch).toHaveBeenCalledWith(
      BrowserLocationActions.AddBrowserLocation({
        payload: {
          latitude: 1,
          longitude: 1,
        },
      })
    );
  });

  it('getStoreDetails', () => {
    spyOn(store, 'pipe');
    service.getStoreDetails('name');
    expect(store.pipe).toHaveBeenCalled();
  });

  it('loadStoreDetails', () => {
    service.loadStoreDetails('name');
    expect(store.dispatch).toHaveBeenCalledWith(
      PickupLocationActions.GetStoreDetailsById({
        payload: 'name',
      })
    );
  });

  it('stockLevelAtStore', () => {
    service.stockLevelAtStore('productCode', 'name');
    expect(store.dispatch).toHaveBeenCalledWith(
      StockLevelActions.StockLevelAtStore({
        payload: { productCode: 'productCode', storeName: 'name' },
      })
    );
  });

  it('getStockLevelAtStore', () => {
    spyOn(store, 'pipe');
    service.getStockLevelAtStore('productCode', 'name');
    expect(store.pipe).toHaveBeenCalled();
  });
});

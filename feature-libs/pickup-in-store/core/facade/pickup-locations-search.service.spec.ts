import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { PointOfServiceStock, ProcessModule } from '@spartacus/core';
import {
  PickupLocationsSearchFacade,
  StockLocationSearchParams,
} from 'feature-libs/pickup-in-store/root';
import { Observable, of } from 'rxjs';
import {
  StateWithStock,
  StockLevelActions,
  ToggleHideOutOfStockOptionsAction,
} from '../store';
import { PickupLocationsSearchService } from './pickup-locations-search.service';

@Injectable()
export class MockPickupLocationsSearchService
  implements PickupLocationsSearchFacade
{
  constructor(protected store: Store<StateWithStock>) {}

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

  toggleHideOutOfStock(): void {}
}

describe('PickupInStoreService', () => {
  let service: PickupLocationsSearchService;
  let store: Store<{}>;

  const stockLocationSearchParams: StockLocationSearchParams = {
    productCode: 'P0001',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), ProcessModule.forRoot()],
      providers: [PickupLocationsSearchService, Store],
    });

    service = TestBed.inject(PickupLocationsSearchService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
    spyOn(store, 'pipe');
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('getStock', () => {
    service.startSearch(stockLocationSearchParams);
    expect(store.dispatch).toHaveBeenCalledWith(
      new StockLevelActions.StockLevel({
        productCode: 'P0001',
        latitude: undefined,
        longitude: undefined,
        location: undefined,
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
    service.isSearchRunning();
    expect(store.pipe).toHaveBeenCalled();
  });

  it('getHideOutOfStockState', () => {
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
    service.hasSearchStarted('productCode');
    expect(store.pipe).toHaveBeenCalled();
  });

  it('getStoresWithStockForProductCode', () => {
    service.getSearchResults('productCode');
    expect(store.pipe).toHaveBeenCalled();
  });
});

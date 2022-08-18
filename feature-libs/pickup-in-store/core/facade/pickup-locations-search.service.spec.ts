import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  PointOfService,
  PointOfServiceStock,
  ProcessModule,
  Stock,
} from '@spartacus/core';
import {
  PickupLocationsSearchFacade,
  SetPickupOptionDeliveryPayload,
  SetPickupOptionInStorePayload,
  StockLocationSearchParams,
} from 'feature-libs/pickup-in-store/root';
import { EMPTY, Observable, of } from 'rxjs';
import {
  BrowserLocationActions,
  PickupLocationActions,
  StateWithStock,
  StockLevelActions,
  ToggleHideOutOfStockOptionsAction,
} from '../store';
import { GetStoreDetailsById } from '../store/actions/pickup-location.action';
import { PickupLocationsSearchService } from './pickup-locations-search.service';

@Injectable()
export class MockPickupLocationsSearchService
  implements PickupLocationsSearchFacade
{
  constructor(protected store: Store<StateWithStock>) {
    // Intentional empty constructor
  }

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
  setPickupOptionDelivery(
    _cartId: string,
    _entryNumber: number,
    _userId: string,
    _requestPayload: SetPickupOptionDeliveryPayload
  ): void {}

  setPickupOptionInStore(
    _cartId: string,
    _entryNumber: number,
    _userId: string,
    _requestPayload: SetPickupOptionInStorePayload
  ): void {}
}

describe('PickupLocationsSearchService', () => {
  let service: PickupLocationsSearchService;
  let store: Store<{}>;

  const stockLocationSearchParams: StockLocationSearchParams = {
    productCode: 'P0001',
    location: '',
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

  it('setPickupOptionDelivery', () => {
    const requestPayload: SetPickupOptionDeliveryPayload = {
      deliveryPointOfService: {
        name: '',
      },
      product: {
        code: 'productCode',
      },
      quantity: 1,
    };
    service.setPickupOptionDelivery('cartID', 1, 'userID', requestPayload);
    expect(store.dispatch).toHaveBeenCalledWith(
      PickupLocationActions.SetPickupOptionDelivery({
        payload: {
          cartId: 'cartID',
          entryNumber: 1,
          userId: 'userID',
          requestPayload,
        },
      })
    );
  });

  it('setPickupOptionInStore', () => {
    const requestPayload: SetPickupOptionInStorePayload = {
      deliveryPointOfService: {
        name: 'storeName',
      },
      quantity: 1,
    };
    const cartId = 'cartID';
    const entryNumber = 1;
    const userId = 'userID';

    service.setPickupOptionInStore(cartId, entryNumber, userId, requestPayload);
    expect(store.dispatch).toHaveBeenCalledWith(
      PickupLocationActions.SetPickupOptionInStore({
        payload: {
          cartId,
          entryNumber,
          userId,
          requestPayload,
        },
      })
    );
  });

  it('getStoreDetails', () => {
    service.getStoreDetails('name');
    expect(store.pipe).toHaveBeenCalled();
  });

  it('loadStoreDetails', () => {
    service.loadStoreDetails('name');
    expect(store.dispatch).toHaveBeenCalledWith(
      GetStoreDetailsById({
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
    service.getStockLevelAtStore('productCode', 'name');
    expect(store.pipe).toHaveBeenCalled();
  });
});

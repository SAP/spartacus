import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { PointOfServiceStock, ProcessModule } from '@spartacus/core';
import { PickupInStoreService } from './pickup-in-store.service';
import {
  StockEntities,
  StockLocationSearchParams,
} from '@spartacus/pickup-in-store/core';
import {
  HideOutOfStockOptionsAction,
  StateWithStock,
  StockLevelActions,
} from '../store';
import { PickupInStoreFacade } from 'feature-libs/pickup-in-store/root';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockPickupInStoreService implements PickupInStoreFacade {
  constructor(protected store: Store<StateWithStock>) {}

  getStock(_params: StockLocationSearchParams): void {}

  clearStockData(): void {}

  getStockLoading(): Observable<boolean> {
    return of(true);
  }

  getHideOutOfStockState(): Observable<boolean> {
    return of(true);
  }

  hideOutOfStock(): void {}

  getStockSuccess(): Observable<boolean> {
    return of(true);
  }

  getSearchHasBeenPerformed(): Observable<boolean> {
    return of(true);
  }

  getStockEntities(): Observable<StockEntities> {
    return of({});
  }

  getStores(): Observable<PointOfServiceStock[]> {
    return of([]);
  }
}

describe('PickupInStoreService', () => {
  let service: PickupInStoreService;
  let store: Store<{}>;

  const stockLocationSearchParams: StockLocationSearchParams = {
    productCode: 'P0001',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), ProcessModule.forRoot()],
      providers: [PickupInStoreService, Store],
    });

    service = TestBed.inject(PickupInStoreService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
    spyOn(store, 'pipe');
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('getStock', () => {
    service.getStock(stockLocationSearchParams);
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
    service.clearStockData();
    expect(store.dispatch).toHaveBeenCalledWith(
      new StockLevelActions.ClearStockData()
    );
  });

  it('getStockLoading', () => {
    service.getStockLoading();
    expect(store.pipe).toHaveBeenCalled();
  });

  it('getHideOutOfStockState', () => {
    service.getHideOutOfStockState();
    expect(store.pipe).toHaveBeenCalled();
  });

  it('hideOutOfStock', () => {
    service.hideOutOfStock();
    expect(store.dispatch).toHaveBeenCalledWith(HideOutOfStockOptionsAction());
  });

  it('getStockSuccess', () => {
    service.getStockSuccess();
    expect(store.pipe).toHaveBeenCalled();
  });

  it('getSearchHasBeenPerformed', () => {
    service.getSearchHasBeenPerformed();
    expect(store.pipe).toHaveBeenCalled();
  });

  it('getStockEntities', () => {
    service.getStockEntities();
    expect(store.pipe).toHaveBeenCalled();
  });

  it('getStores', () => {
    service.getStores();
    expect(store.pipe).toHaveBeenCalled();
  });
});

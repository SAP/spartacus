import { TestBed } from '@angular/core/testing';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  OrderEntry,
  Product,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { QuickOrderStatePersistenceService } from './quick-order-state-persistance.service';

class MockSiteContextParamsService {
  getValues(): Observable<Array<string>> {
    return of(['context']);
  }
}

class MockQuickOrderFacade implements Partial<QuickOrderFacade> {
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return new BehaviorSubject<OrderEntry[]>([mockEntry]);
  }
  loadEntries(_entries: OrderEntry[]): void {}
}
const mockProduct: Product = {
  code: 'testCode',
  price: {
    value: 1,
  },
};
const mockEntry: OrderEntry = {
  product: mockProduct,
  quantity: 1,
  basePrice: {
    value: 1,
  },
  totalPrice: {
    value: 1,
  },
};

describe('QuickOrderStatePersistenceService', () => {
  let service: QuickOrderStatePersistenceService;
  let persistenceService: StatePersistenceService;
  let quickOrderService: QuickOrderFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuickOrderStatePersistenceService,
        {
          provide: SiteContextParamsService,
          useClass: MockSiteContextParamsService,
        },
        { provide: QuickOrderFacade, useClass: MockQuickOrderFacade },
        StatePersistenceService,
      ],
    });

    service = TestBed.inject(QuickOrderStatePersistenceService);
    persistenceService = TestBed.inject(StatePersistenceService);
    quickOrderService = TestBed.inject(QuickOrderFacade);
    spyOn(persistenceService, 'syncWithStorage').and.stub();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should sync state with storage', () => {
    service.initSync();

    expect(persistenceService.syncWithStorage).toHaveBeenCalled();
  });

  describe('on read', () => {
    it('with state should load entries', () => {
      spyOn(quickOrderService, 'loadEntries');

      service['onRead']([mockEntry]);

      expect(quickOrderService.loadEntries).toHaveBeenCalled();
    });

    it('without state should not load entries', () => {
      spyOn(quickOrderService, 'loadEntries');

      service['onRead'](undefined);

      expect(quickOrderService.loadEntries).not.toHaveBeenCalled();
    });
  });

  describe('getEntries()', () => {
    it('should return the full state', (done: DoneFn) => {
      spyOn(quickOrderService, 'getEntries').and.returnValue(
        new BehaviorSubject<OrderEntry[]>([])
      );

      quickOrderService['getEntries']().subscribe((state) => {
        expect(state).toEqual([]);
        done();
      });
    });
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const spyUnsubscribe = spyOn(Subscription.prototype, 'unsubscribe');
    service.ngOnDestroy();
    expect(spyUnsubscribe).toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';
import { OrderEntry } from '@spartacus/cart/main/root';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { QuickOrderStatePersistenceService } from './quick-order-state-persistance.service';

class MockSiteContextParamsService {
  getValues(): Observable<Array<string>> {
    return of(['context']);
  }
}

class MockQuickOrderFacade implements Partial<QuickOrderFacade> {
  getEntries(): BehaviorSubject<OrderEntry[]> {
    return new BehaviorSubject<OrderEntry[]>([]);
  }
  loadEntries(_entries: OrderEntry[]): void {}
}

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

  it('state should be cleared on base site change', () => {
    service['onRead']([]);
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
});

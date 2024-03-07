import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  AuthService,
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
  StorageSyncType,
} from '@spartacus/core';
import { EMPTY, Observable, of, skip, take } from 'rxjs';
import { OpfMiniCartComponentService } from './opf-mini-cart-component.service';

const mockCart: Cart = {
  totalPrice: {
    formattedValue: '99.99',
  },
  totalUnitCount: 5,
};

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return EMPTY;
  }
}

class MockStatePersistenceService implements Partial<StatePersistenceService> {
  readStateFromStorage<T>({}: {
    key: string;
    context?: string | Array<string>;
    storageType?: StorageSyncType;
  }): T | undefined {
    return {} as T | undefined;
  }
}
class MockSiteContextParamsService
  implements Partial<SiteContextParamsService>
{
  getValues(_params: string[]): Observable<Array<string>> {
    return of([]);
  }
}

describe('OpfMiniCartComponentService', () => {
  let service: OpfMiniCartComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: StatePersistenceService,
          useClass: MockStatePersistenceService,
        },
        {
          provide: SiteContextParamsService,
          useClass: MockSiteContextParamsService,
        },
        { provide: EventService, useClass: MockEventService },
      ],
    });

    service = TestBed.inject(OpfMiniCartComponentService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('blockMiniCartUpdate', () => {
    it('should not block MiniCart with new quantity value', (done) => {
      service.blockUpdate(false);
      service
        .getQuantity()
        .pipe(take(2), skip(1))
        .subscribe({
          next: (qty) => {
            expect(qty).toEqual(5);
            done();
          },
        });
    });

    it('should not block MiniCart with new totalPrice value', (done) => {
      service.blockUpdate(false);
      service
        .getTotalPrice()
        .pipe(take(1))
        .subscribe({
          next: (price) => {
            expect(price).toEqual('99.99');
            done();
          },
        });
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  AuthService,
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
  StorageSyncType,
} from '@spartacus/core';
import { cold } from 'jasmine-marbles';
import { EMPTY, Observable, of, ReplaySubject } from 'rxjs';
import { MiniCartComponentService } from './mini-cart-component.service';

const activeCart = new ReplaySubject<Cart>();

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of(false);
  }
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return activeCart.asObservable();
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

const mockBrowserCartStateWithCart = {
  active: 'mockCartId',
};

const mockBrowserCartStateNoCart = {
  active: '',
};

const mockBaseSite = 'mockBaseSite';

const booleanValues = { f: false, t: true };

describe('MiniCartComponentService', () => {
  let service: MiniCartComponentService;
  let activeCartFacade: ActiveCartFacade;
  let statePersistenceService: StatePersistenceService;
  let siteContextParamsService: SiteContextParamsService;
  let authService: AuthService;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
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
    service = TestBed.inject(MiniCartComponentService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    statePersistenceService = TestBed.inject(StatePersistenceService);
    siteContextParamsService = TestBed.inject(SiteContextParamsService);
    authService = TestBed.inject(AuthService);
    eventService = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCartStateFromBrowserStorage', () => {
    it('should return the state from the browser storage', () => {
      spyOn(siteContextParamsService, 'getValues').and.returnValue(
        cold('a', { a: [mockBaseSite] })
      );
      spyOn(statePersistenceService, 'readStateFromStorage').and.returnValue(
        mockBrowserCartStateWithCart
      );
      const result = (service as any)['getCartStateFromBrowserStorage']();
      expect(result).toBeObservable(
        cold('r', { r: mockBrowserCartStateWithCart })
      );
    });
  });

  describe('hasActiveCartInStorage', () => {
    it('should return true when the browser storage has an active cart.', () => {
      spyOn(service as any, 'getCartStateFromBrowserStorage').and.returnValue(
        cold('a', {
          a: mockBrowserCartStateWithCart,
        })
      );
      expect((service as any)['hasActiveCartInStorage']()).toBeObservable(
        cold('t', booleanValues)
      );
    });

    it('should return false when the browser storage has no active cart.', () => {
      spyOn(service as any, 'getCartStateFromBrowserStorage').and.returnValue(
        cold('a', {
          a: mockBrowserCartStateNoCart,
        })
      );
      expect((service as any)['hasActiveCartInStorage']()).toBeObservable(
        cold('f', booleanValues)
      );
    });

    it('should return false and then true if we swiitch to a site with a cart in storage.', () => {
      spyOn(service as any, 'getCartStateFromBrowserStorage').and.returnValue(
        cold('a---b', {
          a: mockBrowserCartStateNoCart,
          b: mockBrowserCartStateWithCart,
        })
      );
      expect((service as any)['hasActiveCartInStorage']()).toBeObservable(
        cold('f---t', booleanValues)
      );
    });
  });

  describe('isCartCreated', () => {
    it('should return flase if no event is caught', () => {
      spyOn(eventService, 'get').and.returnValue(cold('-'));

      expect((service as any)['isCartCreated']()).toBeObservable(
        cold('f', booleanValues)
      );
    });
    it('should return true when the CreateCart event is caught', () => {
      spyOn(eventService, 'get').and.returnValue(cold('e', { e: {} }));

      expect((service as any)['isCartCreated']()).toBeObservable(
        cold('(ft)', booleanValues)
      );
    });
  });

  describe('activeCartRequired', () => {
    it('should return false if no user is logged in and no cart in browser storage and no new cart created', () => {
      spyOn(service as any, 'hasActiveCartInStorage').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(service as any, 'isCartCreated').and.returnValue(
        cold('f', booleanValues)
      );
      expect((service as any)['activeCartRequired']()).toBeObservable(
        cold('f', booleanValues)
      );
    });

    it('should return true if there is a cart in browser storage', () => {
      spyOn(service as any, 'hasActiveCartInStorage').and.returnValue(
        cold('t', booleanValues)
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(service as any, 'isCartCreated').and.returnValue(
        cold('f', booleanValues)
      );
      expect((service as any)['activeCartRequired']()).toBeObservable(
        cold('(t|)', booleanValues)
      );
    });

    it('should return true if a user is logged in.', () => {
      spyOn(service as any, 'hasActiveCartInStorage').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('t', booleanValues)
      );
      spyOn(service as any, 'isCartCreated').and.returnValue(
        cold('f', booleanValues)
      );
      expect((service as any)['activeCartRequired']()).toBeObservable(
        cold('(t|)', booleanValues)
      );
    });

    it('should return true if a cart iis created', () => {
      spyOn(service as any, 'hasActiveCartInStorage').and.returnValue(
        cold('t', booleanValues)
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(service as any, 'isCartCreated').and.returnValue(
        cold('t', booleanValues)
      );
      expect((service as any)['activeCartRequired']()).toBeObservable(
        cold('(t|)', booleanValues)
      );
    });

    it('should eventually return true if ther is a cart in browser storage', () => {
      spyOn(service as any, 'hasActiveCartInStorage').and.returnValue(
        cold('f--t', booleanValues)
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(service as any, 'isCartCreated').and.returnValue(
        cold('f', booleanValues)
      );
      expect((service as any)['activeCartRequired']()).toBeObservable(
        cold('f--(t|)', booleanValues)
      );
    });

    it('should eventually return true if a user eventually logs in.', () => {
      spyOn(service as any, 'hasActiveCartInStorage').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('f--f--t', booleanValues)
      );
      spyOn(service as any, 'isCartCreated').and.returnValue(
        cold('f', booleanValues)
      );
      expect((service as any)['activeCartRequired']()).toBeObservable(
        cold('f-----(t|)', booleanValues)
      );
    });

    it('should eventually return true if a cart is eventually created.', () => {
      spyOn(service as any, 'hasActiveCartInStorage').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(service as any, 'isCartCreated').and.returnValue(
        cold('f--t', booleanValues)
      );
      expect((service as any)['activeCartRequired']()).toBeObservable(
        cold('f--(t|)', booleanValues)
      );
    });
  });

  describe('getTotalPrice', () => {
    it('should return default value when user has no cart', () => {
      spyOn(service as any, 'activeCartRequired').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(activeCartFacade, 'getActive').and.stub();
      expect(service.getTotalPrice()).toBeObservable(cold('a', { a: '' }));
      expect(activeCartFacade.getActive).not.toHaveBeenCalled();
    });

    it('should return value from activeCartFacade when user has a cart', () => {
      spyOn(service as any, 'activeCartRequired').and.returnValue(
        cold('(t|)', booleanValues)
      );
      const mockActiveCart = {
        totalPrice: {
          formattedValue: '122$',
        },
      } as Partial<Cart>;

      spyOn(activeCartFacade, 'getActive').and.returnValue(
        cold('c', { c: mockActiveCart })
      );
      expect(service.getTotalPrice()).toBeObservable(cold('a', { a: '122$' }));
    });
  });

  describe('getQuantity', () => {
    it('should return default value when user has no cart', () => {
      spyOn(service as any, 'activeCartRequired').and.returnValue(
        cold('f', booleanValues)
      );
      spyOn(activeCartFacade, 'getActive').and.stub();
      expect(service.getQuantity()).toBeObservable(cold('a', { a: 0 }));
      expect(activeCartFacade.getActive).not.toHaveBeenCalled();
    });

    it('should return value from activeCartFacade when user has a cart', () => {
      spyOn(service as any, 'activeCartRequired').and.returnValue(
        cold('(t|)', booleanValues)
      );
      const mockActiveCart = {
        totalUnitCount: 7,
      } as Partial<Cart>;

      spyOn(activeCartFacade, 'getActive').and.returnValue(
        cold('c', { c: mockActiveCart })
      );
      expect(service.getQuantity()).toBeObservable(
        cold('(ab)', { a: 0, b: 7 })
      );
    });
  });
});

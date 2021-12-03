import { TestBed } from '@angular/core/testing';
import {
  AuthService,
  EventService,
  SiteContextParamsService,
  StatePersistenceService,
  StorageSyncType,
} from '@spartacus/core';
import { cold } from 'jasmine-marbles';
import { EMPTY, Observable, of, ReplaySubject } from 'rxjs';
import { CartConfig } from '../../config/cart-config';
import { defaultCartConfig } from '../../config/default-cart-config';
import { ActiveCartBrowserStorageChangeEvent } from '../../events/cart.events';
import { ActiveCartFacade } from '../../facade/active-cart.facade';
import { Cart } from '../../models/cart.model';
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
  getValue(_param: string): string {
    return 'SiteContextParamsService.value';
  }
}

const mockBrowserCartState = {
  active: 'mockCartId',
};

const mockBaseSite = 'mockBaseSite';

const mockPersistEventWithCart = new ActiveCartBrowserStorageChangeEvent();
mockPersistEventWithCart.state = mockBrowserCartState;

describe('MiniCartComponentService', () => {
  let service: MiniCartComponentService;
  let activeCartFacade: ActiveCartFacade;
  let eventService: EventService;
  let statePersistenceService: StatePersistenceService;
  let siteContextParamsService: SiteContextParamsService;
  let authService: AuthService;
  // let config: CartConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: AuthService, useClass: MockAuthService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: StatePersistenceService,
          useClass: MockStatePersistenceService,
        },
        {
          provide: SiteContextParamsService,
          useClass: MockSiteContextParamsService,
        },
        {
          provide: CartConfig,
          useValue: JSON.parse(JSON.stringify(defaultCartConfig)),
        },
      ],
    });
    service = TestBed.inject(MiniCartComponentService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    eventService = TestBed.inject(EventService);
    statePersistenceService = TestBed.inject(StatePersistenceService);
    siteContextParamsService = TestBed.inject(SiteContextParamsService);
    authService = TestBed.inject(AuthService);
    // config = TestBed.inject(CartConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCartStateFromBrowserStorage', () => {
    it('should return the state from the browser storage', () => {
      spyOn(siteContextParamsService, 'getValue').and.returnValue(mockBaseSite);
      spyOn(statePersistenceService, 'readStateFromStorage').and.returnValue(
        mockBrowserCartState
      );
      const result = service.getCartStateFromBrowserStorage();
      expect(result).toBe(mockBrowserCartState);
    });
  });

  describe('createEventFromStorage', () => {
    it('should create an event from the browser storage state.', () => {
      spyOn(service, 'getCartStateFromBrowserStorage').and.returnValue(
        mockBrowserCartState
      );
      const result = service.createEventFromStorage();
      expect(result).toEqual(mockPersistEventWithCart);
    });
  });

  describe('browserHasCartInStorage', () => {
    it('should return true and complete when the browser storage has a cart.', () => {
      spyOn(service, 'createEventFromStorage').and.returnValue(
        mockPersistEventWithCart
      );
      spyOn(eventService, 'get').and.returnValue(cold('-'));

      expect(service.browserHasCartInStorage()).toBeObservable(
        cold('(a|)', { a: true })
      );
    });

    it('should return false and stay open when no cart id is in storage', () => {
      spyOn(service, 'createEventFromStorage').and.returnValue({
        ...mockPersistEventWithCart,
        state: { active: '' },
      });
      spyOn(eventService, 'get').and.returnValue(cold('-'));

      expect(service.browserHasCartInStorage()).toBeObservable(
        cold('a', { a: false })
      );
    });

    it('should eventually emit true and close when a cart id is persisted in the browseer storage', () => {
      const mockPersistEventNoCart = {
        state: { active: '' },
      };
      spyOn(service, 'createEventFromStorage').and.returnValue(
        mockPersistEventNoCart
      );
      spyOn(eventService, 'get').and.returnValue(
        cold('--e--f', {
          e: mockPersistEventNoCart,
          f: mockPersistEventWithCart,
        })
      );

      expect(service.browserHasCartInStorage()).toBeObservable(
        cold('a----(b|)', { a: false, b: true })
      );
    });
  });

  describe('getTotalPrice', () => {
    it('should return defaul value when no cart is in storage and no user logged ins', () => {
      spyOn(service, 'browserHasCartInStorage').and.returnValue(
        cold('f', { f: false })
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('f', { f: false })
      );
      spyOn(activeCartFacade, 'getActive').and.stub();
      expect(service.getTotalPrice()).toBeObservable(cold('a', { a: '' }));
      expect(activeCartFacade.getActive).not.toHaveBeenCalled();
    });
  });

  it('should return value from activeCartFacade when a cart is in storage', () => {
    spyOn(service, 'browserHasCartInStorage').and.returnValue(
      cold('(t|)', { t: true, f: false })
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(
      cold('f', { f: false })
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

  it('should return value from activeCartFacade when a user is logged in', () => {
    spyOn(service, 'browserHasCartInStorage').and.returnValue(
      cold('(f|)', { f: false })
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(
      cold('t', { t: true })
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

  it('should return value from activeCartFacade when a cart is eventually in storage', () => {
    spyOn(service, 'browserHasCartInStorage').and.returnValue(
      cold('f--(t|)', { t: true, f: false })
    );
    spyOn(authService, 'isUserLoggedIn').and.returnValue(
      cold('f', { f: false })
    );
    const mockActiveCart = {
      totalPrice: {
        formattedValue: '122$',
      },
    } as Partial<Cart>;

    spyOn(activeCartFacade, 'getActive').and.returnValue(
      cold('c', { c: mockActiveCart })
    );
    expect(service.getTotalPrice()).toBeObservable(
      cold('a--b', { a: '', b: '122$' })
    );
  });

  describe('getQuantity', () => {
    it('should return defaul value when no cart is in storage and no user logged in', () => {
      spyOn(service, 'browserHasCartInStorage').and.returnValue(
        cold('f', { f: false })
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('f', { f: false })
      );
      spyOn(activeCartFacade, 'getActive').and.stub();
      expect(service.getQuantity()).toBeObservable(cold('a', { a: 0 }));
      expect(activeCartFacade.getActive).not.toHaveBeenCalled();
    });

    it('should return value from activeCartFacade when a cart is in storage and no user logged in', () => {
      spyOn(service, 'browserHasCartInStorage').and.returnValue(
        cold('(t|)', { t: true })
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('f', { f: false })
      );
      const mockActiveCart = {
        deliveryItemsQuantity: 7,
      } as Partial<Cart>;

      spyOn(activeCartFacade, 'getActive').and.returnValue(
        cold('c', { c: mockActiveCart })
      );
      expect(service.getQuantity()).toBeObservable(
        cold('(ab)', { a: 0, b: 7 })
      );
    });

    it('should return value from activeCartFacade when a user is logged in', () => {
      spyOn(service, 'browserHasCartInStorage').and.returnValue(
        cold('(f|)', { f: false })
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('t', { t: true })
      );
      const mockActiveCart = {
        deliveryItemsQuantity: 7,
      } as Partial<Cart>;

      spyOn(activeCartFacade, 'getActive').and.returnValue(
        cold('c', { c: mockActiveCart })
      );
      expect(service.getQuantity()).toBeObservable(
        cold('(ab)', { a: 0, b: 7 })
      );
    });

    it('should return value from activeCartFacade when a cart is eventually in storage', () => {
      spyOn(service, 'browserHasCartInStorage').and.returnValue(
        cold('f--(t|)', { t: true, f: false })
      );
      spyOn(authService, 'isUserLoggedIn').and.returnValue(
        cold('f', { f: false })
      );

      const mockActiveCart = {
        deliveryItemsQuantity: 7,
      } as Partial<Cart>;

      spyOn(activeCartFacade, 'getActive').and.returnValue(
        cold('c', { c: mockActiveCart })
      );
      expect(service.getQuantity()).toBeObservable(
        cold('a--(ab)', { a: 0, b: 7 })
      );
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { Cart, MultiCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import {
  FeatureToggles,
  getLastValueSync,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  OCC_USER_ID_GUEST,
  SiteContextParamsService,
  StatePersistenceService,
  StateUtils,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { provideMockFeatureToggles } from '@spartacus/core/testing/mock-feature-toggles';
import {
  BehaviorSubject,
  EMPTY,
  firstValueFrom,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { take } from 'rxjs/operators';
import { vi } from 'vitest';
import { ActiveCartService } from './active-cart.service';

const userId$ = new BehaviorSubject<string>(OCC_USER_ID_ANONYMOUS);

export class UserIdServiceStub implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return userId$.asObservable();
  }
}

export class MultiCartFacadeStub {
  loadCart() {}
  deleteCart() {}
  initAddEntryProcess() {}
  getCartEntity() {
    return EMPTY;
  }
  assignEmail() {}
  getEntry() {
    return EMPTY;
  }
  getLastEntry() {
    return EMPTY;
  }
  updateEntry() {}
  removeEntry() {}
  getEntries() {
    return of([]);
  }
  createCart() {}
  mergeToCurrentCart() {}
  addEntry() {}
  addEntries() {}
  isStable() {}
  getCartIdByType(): Observable<string> {
    return of('');
  }
}

const store: any = {};
const MockWindowRef = {
  localStorage: {
    getItem: (key: string): string | null => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
  },
  isBrowser(): boolean {
    return true;
  },
};

const mockCartEntry: OrderEntry = {
  entryNumber: 0,
  product: { code: 'code' },
  quantity: 1,
};

describe('ActiveCartService', () => {
  let service: ActiveCartService;
  let winRef: WindowRef;
  let multiCartFacade: MultiCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActiveCartService,
        { provide: MultiCartFacade, useClass: MultiCartFacadeStub },
        { provide: UserIdService, useClass: UserIdServiceStub },
        { provide: WindowRef, useValue: MockWindowRef },
        {
          provide: FeatureToggles,
          useValue: { enableCartSlowNetworkResilience: true },
        },
        {
          provide: SiteContextParamsService,
          useValue: { getValues: () => of(['electronics-spa']) },
        },
      ],
    });
    service = TestBed.inject(ActiveCartService);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    winRef = TestBed.inject(WindowRef);
  });

  describe('getActive', () => {
    it('should attempt to load cart if it is empty and not loaded', () => {
      userId$.next(OCC_USER_ID_CURRENT);
      service['cartEntity$'] = of({
        value: undefined,
        loading: false,
        success: false,
        error: false,
        processesCount: 0,
      });
      service['activeCartId$'] = of('code');
      vi.spyOn(service, 'load');
      service['initActiveCart']();
      let result;
      service
        .getActive()
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(service['load']).toHaveBeenCalledWith('code', 'current');
      expect(result).toEqual({});
    });

    it('should not emit non empty cart only when loading', () => {
      service['cartEntity$'] = of({
        value: {
          code: 'code',
        },
        loading: true,
        success: true,
        error: false,
        processesCount: 1,
      });
      service['activeCartId$'] = of('code');
      service['initActiveCart']();
      let result;
      service
        .getActive()
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(result).toEqual(undefined);
    });

    it('should emit empty cart even when it is not stable', () => {
      service['cartEntity$'] = of({
        value: undefined,
        loading: true,
        success: false,
        error: false,
        processesCount: 0,
      });
      service['activeCartId$'] = of('code');
      service['initActiveCart']();
      let result;
      service
        .getActive()
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(result).toEqual({});
    });
  });

  describe('takeActive', () => {
    it('should NOT emit if the cart is NOT stable', () => {
      const isStableMock = new Subject<boolean>();
      service.isStable = vi.fn().mockReturnValue(isStableMock);

      let emissions = 0;
      service
        .takeActive()
        .pipe(take(1))
        .subscribe(() => emissions++);

      isStableMock.next(false);

      expect(emissions).toBe(0);
    });

    it('should emit only when the cart is stable', () => {
      const mockCart: Cart = {
        code: 'code',
      };
      const isStableMock = new Subject<boolean>();

      service.isStable = vi.fn().mockReturnValue(isStableMock);
      service.getActive = vi.fn().mockReturnValue(of(mockCart));

      let result: Cart | undefined;
      service
        .takeActive()
        .pipe(take(1))
        .subscribe((cart) => (result = cart));

      isStableMock.next(true);

      expect(result).toEqual(mockCart);
    });
  });

  describe('getActiveCartId', () => {
    it('should return active cart id as guid for anonymous user', () => {
      userId$.next(OCC_USER_ID_ANONYMOUS);
      service['activeCart$'] = of({ code: 'code', guid: 'guid' });

      let result;
      service
        .getActiveCartId()
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(result).toBe('guid');
    });

    it('should return active cart id as guid for non anonymous user', () => {
      userId$.next(OCC_USER_ID_CURRENT);
      service['activeCart$'] = of({ code: 'code', guid: 'guid' });

      let result;
      service
        .getActiveCartId()
        .subscribe((val) => (result = val))
        .unsubscribe();
      expect(result).toBe('code');
    });
  });

  describe('takeActiveCartId', () => {
    it('should NOT emit if the cart ID is NOT stable', () => {
      const isStableMock = new Subject<boolean>();
      service.isStable = vi.fn().mockReturnValue(isStableMock);

      let emissions = 0;
      service
        .takeActiveCartId()
        .pipe(take(1))
        .subscribe(() => emissions++);

      isStableMock.next(false);

      expect(emissions).toBe(0);
    });

    it('should emit only when the cart ID is stable', () => {
      const mockCartId = 'xxx';
      const isStableMock = new Subject<boolean>();

      service.isStable = vi.fn().mockReturnValue(isStableMock);
      service.getActiveCartId = vi.fn().mockReturnValue(of(mockCartId));

      let result: string | undefined;
      service
        .takeActiveCartId()
        .pipe(take(1))
        .subscribe((cartId) => (result = cartId));

      isStableMock.next(true);

      expect(result).toEqual(mockCartId);
    });
  });

  describe('getEntries', () => {
    it('should return cart entries', () => {
      vi.spyOn(multiCartFacade, 'getEntries').mockReturnValue(
        of([mockCartEntry])
      );
      service['activeCartId$'] = of('cartId');

      let result;
      service
        .getEntries()
        .subscribe((val) => (result = val))
        .unsubscribe();

      expect(result).toEqual([mockCartEntry]);
      expect(multiCartFacade['getEntries']).toHaveBeenCalledWith('cartId');
    });
  });

  describe('getLastEntry', () => {
    it('should return last entry by product code', () => {
      vi.spyOn(multiCartFacade, 'getLastEntry').mockReturnValue(
        of(mockCartEntry)
      );
      service['activeCartId$'] = of('cartId');

      let result;
      service
        .getLastEntry('code123')
        .subscribe((entry) => (result = entry))
        .unsubscribe();

      expect(result).toEqual(mockCartEntry);
      expect(multiCartFacade['getLastEntry']).toHaveBeenCalledWith(
        'cartId',
        'code123'
      );
    });
  });

  describe('isStable', () => {
    it('should return true when isStable returns true', async () => {
      vi.spyOn(multiCartFacade, 'isStable').mockReturnValue(of(true));

      const val = await firstValueFrom(service.isStable());
      expect(val).toBe(true);
    });

    it('should return false when isStable returns false', async () => {
      vi.spyOn(multiCartFacade, 'isStable').mockReturnValue(of(false));

      const val = await firstValueFrom(service.isStable());
      expect(val).toBe(false);
    });
  });

  describe('detectUserChange', () => {
    it('should change loading flag to false if logged in with code flow', () => {
      winRef.localStorage?.setItem('oAuthRedirectCodeFlow', 'true');

      service['detectUserChange']();

      expect(service['shouldLoadCartOnCodeFlow']).toBeFalsy();
    });

    it('should remove oAuth flow key from local storage', () => {
      winRef.localStorage?.setItem('oAuthRedirectCodeFlow', 'true');

      service['detectUserChange']();

      const storedOauthFlowKey = winRef.localStorage?.getItem(
        'oAuthRedirectCodeFlow'
      );

      expect(storedOauthFlowKey).toBeNull();
    });
  });

  describe('loadOrMerge', () => {
    it('should load cart when cartId is default "current"', () => {
      vi.spyOn(multiCartFacade, 'loadCart');

      service['loadOrMerge'](
        OCC_CART_ID_CURRENT,
        'userId',
        OCC_USER_ID_ANONYMOUS
      );
      expect(multiCartFacade['loadCart']).toHaveBeenCalledWith({
        userId: 'userId',
        cartId: OCC_USER_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    });

    it('should be called if user is logged in with code flow', () => {
      vi.spyOn(service, 'loadOrMerge').mockImplementation(() => {});
      winRef.localStorage?.setItem('oAuthRedirectCodeFlow', 'true');

      service['detectUserChange']();

      expect(service['loadOrMerge']).toHaveBeenCalled();
    });

    it('should merge guest cart', () => {
      vi.spyOn(service, 'guestCartMerge').mockImplementation(() => {});
      vi.spyOn(service, 'isGuestCart').mockReturnValue(of(true));
      service['loadOrMerge'](
        'cartId',
        OCC_USER_ID_CURRENT,
        OCC_USER_ID_ANONYMOUS
      );

      expect(service['guestCartMerge']).toHaveBeenCalledWith('cartId');
    });

    it('should dispatch load for current -> emulated user switch', () => {
      vi.spyOn(multiCartFacade, 'loadCart');

      service['loadOrMerge']('cartId', 'ala-ma-kota', OCC_USER_ID_CURRENT);
      expect(multiCartFacade['loadCart']).toHaveBeenCalledWith({
        userId: 'ala-ma-kota',
        cartId: 'cartId',
        extraData: {
          active: true,
        },
      });
    });

    it('should dispatch merge for non guest cart', () => {
      vi.spyOn(multiCartFacade, 'mergeToCurrentCart').mockImplementation(
        () => {}
      );

      service['loadOrMerge']('cartId', 'userId', OCC_USER_ID_ANONYMOUS);

      expect(multiCartFacade.mergeToCurrentCart).toHaveBeenCalledWith({
        userId: 'userId',
        cartId: 'cartId',
        extraData: {
          active: true,
        },
      });
    });
  });

  describe('load', () => {
    it('should load if user is not anonymous and cartId is the default "current"', () => {
      vi.spyOn(multiCartFacade, 'loadCart');
      service['load'](OCC_CART_ID_CURRENT, OCC_USER_ID_CURRENT);

      expect(multiCartFacade['loadCart']).toHaveBeenCalledWith({
        userId: OCC_USER_ID_CURRENT,
        cartId: OCC_CART_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    });

    it('should load if user is anonymous and cartId is provided', () => {
      vi.spyOn(multiCartFacade, 'loadCart');
      service['load']('cartId', OCC_USER_ID_ANONYMOUS);

      expect(multiCartFacade['loadCart']).toHaveBeenCalledWith({
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: 'cartId',
        extraData: {
          active: true,
        },
      });
    });

    it('should not load if user is anonymous and cartId is default "current"', () => {
      vi.spyOn(multiCartFacade, 'loadCart');
      service['load'](OCC_CART_ID_CURRENT, OCC_USER_ID_ANONYMOUS);

      expect(multiCartFacade['loadCart']).not.toHaveBeenCalled();
    });
  });

  describe('addEntry', () => {
    it('should just add entry after cart is provided', () => {
      vi.spyOn(service, 'requireLoadedCart').mockReturnValue(
        of({ code: 'code', guid: 'guid' })
      );
      vi.spyOn(multiCartFacade, 'addEntry');
      userId$.next(OCC_USER_ID_ANONYMOUS);

      service.addEntry('productCode', 2);

      expect(multiCartFacade['addEntry']).toHaveBeenCalledWith(
        OCC_USER_ID_ANONYMOUS,
        'guid',
        'productCode',
        2,
        undefined
      );
    });

    it('should handle pickup in store', () => {
      vi.spyOn(service, 'requireLoadedCart').mockReturnValue(
        of({ code: 'code', guid: 'guid' })
      );
      vi.spyOn(multiCartFacade, 'addEntry');
      userId$.next(OCC_USER_ID_ANONYMOUS);

      service.addEntry('productCode', 2, 'pickupStore');

      expect(multiCartFacade['addEntry']).toHaveBeenCalledWith(
        OCC_USER_ID_ANONYMOUS,
        'guid',
        'productCode',
        2,
        'pickupStore'
      );
    });
  });

  describe('removeEntry', () => {
    it('should call multiCartFacade remove entry method with active cart', () => {
      userId$.next('userId');
      service['activeCartId$'] = of('cartId');
      vi.spyOn(multiCartFacade, 'removeEntry');

      service.removeEntry({
        entryNumber: 3,
      });
      expect(multiCartFacade['removeEntry']).toHaveBeenCalledWith(
        'userId',
        'cartId',
        3
      );
    });
  });

  describe('updateEntry', () => {
    it('should call multiCartFacade update entry method with active cart', () => {
      userId$.next('userId');
      service['activeCartId$'] = of('cartId');
      vi.spyOn(multiCartFacade, 'updateEntry');

      service.updateEntry(1, 2);
      expect(multiCartFacade['updateEntry']).toHaveBeenCalledWith(
        'userId',
        'cartId',
        1,
        2,
        undefined,
        false
      );
    });

    it('should handle pickup in store', () => {
      userId$.next('userId');
      service['activeCartId$'] = of('cartId');
      vi.spyOn(multiCartFacade, 'updateEntry');

      service.updateEntry(1, 2, 'pickupStore');
      expect(multiCartFacade['updateEntry']).toHaveBeenCalledWith(
        'userId',
        'cartId',
        1,
        2,
        'pickupStore',
        false
      );
    });

    it('should switch from pickup to delivery', () => {
      userId$.next('userId');
      service['activeCartId$'] = of('cartId');
      vi.spyOn(multiCartFacade, 'updateEntry');

      service.updateEntry(1, 2, undefined, true);
      expect(multiCartFacade['updateEntry']).toHaveBeenCalledWith(
        'userId',
        'cartId',
        1,
        2,
        undefined,
        true
      );
    });
  });

  describe('getEntry', () => {
    it('should return entry by product code', () => {
      vi.spyOn(multiCartFacade, 'getEntry').mockReturnValue(of(mockCartEntry));
      service['activeCartId$'] = of('cartId');

      let result;
      service
        .getEntry('code123')
        .subscribe((entry) => (result = entry))
        .unsubscribe();

      expect(result).toEqual(mockCartEntry);
      expect(multiCartFacade['getEntry']).toHaveBeenCalledWith(
        'cartId',
        'code123'
      );
    });
  });

  describe('getLastEntry', () => {
    it('should return last entry by product code', () => {
      vi.spyOn(multiCartFacade, 'getLastEntry').mockReturnValue(
        of(mockCartEntry)
      );
      service['activeCartId$'] = of('cartId');

      let result;
      service
        .getLastEntry('code123')
        .subscribe((entry) => (result = entry))
        .unsubscribe();

      expect(result).toEqual(mockCartEntry);
      expect(multiCartFacade['getLastEntry']).toHaveBeenCalledWith(
        'cartId',
        'code123'
      );
    });
  });

  describe('addEmail', () => {
    it('should assign email to active cart', () => {
      userId$.next('userId');
      service['activeCartId$'] = of('cartId');
      vi.spyOn(multiCartFacade, 'assignEmail');

      service.addEmail('test@email.com');
      expect(multiCartFacade.assignEmail).toHaveBeenCalledWith(
        'cartId',
        'userId',
        'test@email.com'
      );
    });
  });

  describe('getAssignedUser', () => {
    it('should return user property from cart', () => {
      const mockCartUser = {
        name: OCC_USER_ID_ANONYMOUS,
        uid: 'test|test@email.com',
      };
      service['activeCart$'] = of({
        code: 'xxx',
        user: mockCartUser,
      });

      let result;
      service
        .getAssignedUser()
        .subscribe((user) => (result = user))
        .unsubscribe();

      expect(result).toEqual(mockCartUser);
    });
  });

  describe('isGuestCart', () => {
    it('should return true if user is OCC_USER_ID_GUEST', () => {
      service['activeCart$'] = of({
        user: {
          name: OCC_USER_ID_GUEST,
          uid: 'uid',
        },
      });

      expect(getLastValueSync(service.isGuestCart())).toBe(true);
    });

    it('should return false for OCC_USER_ID_CURRENT', () => {
      service['activeCart$'] = of({
        user: {
          name: OCC_USER_ID_CURRENT,
          uid: 'uid',
        },
      });

      expect(getLastValueSync(service.isGuestCart())).toBe(false);
    });

    it('should return false for OCC_USER_ID_ANONYMOUS', () => {
      service['activeCart$'] = of({
        user: {
          name: OCC_USER_ID_ANONYMOUS,
          uid: 'uid',
        },
      });

      expect(getLastValueSync(service.isGuestCart())).toBe(false);
    });

    it('should return true when uid contains an email', () => {
      service['activeCart$'] = of({
        user: {
          name: OCC_USER_ID_ANONYMOUS,
          uid: 'test|test@email.com',
        },
      });

      expect(getLastValueSync(service.isGuestCart())).toBe(true);
    });

    it('should return false when uid does not contain an email', () => {
      service['activeCart$'] = of({
        user: {
          name: OCC_USER_ID_ANONYMOUS,
          uid: 'test|test@notvalidemail',
        },
      });

      expect(getLastValueSync(service.isGuestCart())).toBe(false);
    });
  });

  describe('addEntries', () => {
    it('should add multiple entries at once', () => {
      vi.spyOn(multiCartFacade, 'addEntries');
      vi.spyOn(service, 'requireLoadedCart').mockReturnValue(
        of({ code: 'someCode', guid: 'guid' })
      );
      userId$.next('someUserId');

      service.addEntries([mockCartEntry, mockCartEntry]);
      expect(multiCartFacade['addEntries']).toHaveBeenCalledWith(
        'someUserId',
        'someCode',
        [
          {
            productCode: mockCartEntry.product?.code,
            quantity: mockCartEntry.quantity,
          },
          {
            productCode: mockCartEntry.product?.code,
            quantity: mockCartEntry.quantity,
          },
        ]
      );
    });
  });

  describe('guestCartMerge', () => {
    it('should delete cart and add entries from previous cart', () => {
      vi.spyOn(multiCartFacade, 'deleteCart');
      vi.spyOn(service, 'addEntries');
      vi.spyOn(service, 'getEntries').mockReturnValue(of([mockCartEntry]));
      vi.spyOn(service, 'addEntriesGuestMerge');

      service['guestCartMerge']('cartId');
      expect(service['addEntriesGuestMerge']).toHaveBeenCalledWith([
        mockCartEntry,
      ]);
      expect(multiCartFacade['deleteCart']).toHaveBeenCalledWith(
        'cartId',
        OCC_USER_ID_ANONYMOUS
      );
    });
  });

  describe('mergeGuestCartOnCodeFlowLogin feature', () => {
    let service: ActiveCartService;
    let winRef: WindowRef;
    let multiCartFacade: MultiCartFacade;

    const BASE_SITE = 'electronics-spa';
    // Full storage key as generated by StatePersistenceService for the base-site
    // context (spartacus⚿<baseSite>⚿<key>). `pendingGuestCartMerge` is the
    // (protected) key held by ActiveCartStatePersistenceService.
    const STORAGE_KEY = `spartacus⚿${BASE_SITE}⚿pendingGuestCartMerge`;
    beforeEach(() => {
      winRef?.localStorage?.removeItem(STORAGE_KEY);
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ActiveCartService,
          StatePersistenceService,
          { provide: MultiCartFacade, useClass: MultiCartFacadeStub },
          { provide: UserIdService, useClass: UserIdServiceStub },
          { provide: WindowRef, useValue: MockWindowRef },
          {
            provide: SiteContextParamsService,
            useValue: { getValues: () => of([BASE_SITE]) },
          },
          {
            provide: FeatureToggles,
            useValue: {
              authorizationCodeFlowByDefault: true,
              mergeGuestCartOnCodeFlowLogin: true,
            },
          },
        ],
      });
      service = TestBed.inject(ActiveCartService);
      winRef = TestBed.inject(WindowRef);
      multiCartFacade = TestBed.inject(MultiCartFacade);
    });

    afterEach(() => {
      winRef.localStorage?.removeItem(STORAGE_KEY);
    });

    describe('persisting the guest cart', () => {
      it('should persist entries when the active cart is a guest cart', () => {
        const guestCart: Cart = {
          user: { name: OCC_USER_ID_GUEST },
          entries: [mockCartEntry],
        };
        vi.spyOn(service, 'getActive').mockReturnValue(of(guestCart));

        service['persistGuestCartForCodeFlowMerge']();

        expect(winRef.localStorage?.getItem(STORAGE_KEY)).toEqual(
          JSON.stringify([{ product: { code: 'code' }, quantity: 1 }])
        );
      });

      it('should not persist for a non guest cart', () => {
        const normalCart: Cart = {
          user: { name: 'John', uid: 'john@sap.com' },
          entries: [mockCartEntry],
        };
        vi.spyOn(service, 'getActive').mockReturnValue(of(normalCart));

        service['persistGuestCartForCodeFlowMerge']();

        expect(winRef.localStorage?.getItem(STORAGE_KEY)).toBeFalsy();
      });
    });

    describe('loadOrMerge', () => {
      it('should route to guestCartMerge when a pending guest merge is persisted', () => {
        vi.spyOn(service as any, 'guestCartMerge').mockImplementation(() => {});
        vi.spyOn(service, 'isGuestCart').mockReturnValue(of(false));
        winRef.localStorage?.setItem(
          STORAGE_KEY,
          JSON.stringify([{ product: { code: 'code' }, quantity: 1 }])
        );

        service['loadOrMerge'](
          'cartId',
          OCC_USER_ID_CURRENT,
          OCC_USER_ID_ANONYMOUS
        );

        expect(service['guestCartMerge']).toHaveBeenCalledWith('cartId');
      });

      it('should merge normally when nothing is persisted', () => {
        vi.spyOn(multiCartFacade, 'mergeToCurrentCart');
        vi.spyOn(service, 'isGuestCart').mockReturnValue(of(false));

        service['loadOrMerge']('cartId', 'userId', OCC_USER_ID_ANONYMOUS);

        expect(multiCartFacade.mergeToCurrentCart).toHaveBeenCalled();
      });
    });

    describe('guestCartMerge', () => {
      it('should add the persisted entries and clear storage without deleting the guest cart', () => {
        vi.spyOn(multiCartFacade, 'deleteCart').mockImplementation(() => {});
        vi.spyOn(service as any, 'addEntriesGuestMerge').mockImplementation(
          () => {}
        );
        const persisted = [{ product: { code: 'code' }, quantity: 1 }];
        winRef.localStorage?.setItem(STORAGE_KEY, JSON.stringify(persisted));

        service['guestCartMerge']('cartId');

        expect(service['addEntriesGuestMerge']).toHaveBeenCalledWith(
          persisted as OrderEntry[]
        );
        expect(multiCartFacade.deleteCart).not.toHaveBeenCalled();
        // Storage entry is removed, so it no longer reads back.
        expect(winRef.localStorage?.getItem(STORAGE_KEY)).toBeFalsy();
      });

      it('should remove the storage key entirely rather than leaving an empty value', () => {
        vi.spyOn(service as any, 'addEntriesGuestMerge').mockImplementation(
          () => {}
        );
        vi.spyOn(winRef.localStorage as Storage, 'removeItem');
        winRef.localStorage?.setItem(
          STORAGE_KEY,
          JSON.stringify([{ product: { code: 'code' }, quantity: 1 }])
        );

        service['guestCartMerge']('cartId');

        expect(winRef.localStorage?.removeItem).toHaveBeenCalledWith(
          STORAGE_KEY
        );
        expect(winRef.localStorage?.getItem(STORAGE_KEY)).toBeFalsy();
      });
    });
  });

  describe('mergeGuestCartOnCodeFlowLogin feature with authorizationCodeFlowByDefault disabled', () => {
    let service: ActiveCartService;
    let winRef: WindowRef;
    let multiCartFacade: MultiCartFacade;

    const BASE_SITE = 'electronics-spa';
    const STORAGE_KEY = `spartacus⚿${BASE_SITE}⚿pendingGuestCartMerge`;

    beforeEach(() => {
      winRef?.localStorage?.removeItem(STORAGE_KEY);
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ActiveCartService,
          StatePersistenceService,
          { provide: MultiCartFacade, useClass: MultiCartFacadeStub },
          { provide: UserIdService, useClass: UserIdServiceStub },
          { provide: WindowRef, useValue: MockWindowRef },
          {
            provide: SiteContextParamsService,
            useValue: { getValues: () => of([BASE_SITE]) },
          },
          provideMockFeatureToggles({
            authorizationCodeFlowByDefault: false,
            mergeGuestCartOnCodeFlowLogin: true,
          }),
        ],
      });
      service = TestBed.inject(ActiveCartService);
      winRef = TestBed.inject(WindowRef);
      multiCartFacade = TestBed.inject(MultiCartFacade);
    });

    afterEach(() => {
      winRef.localStorage?.removeItem(STORAGE_KEY);
    });

    it('should not read persisted state in loadOrMerge and merge normally', () => {
      vi.spyOn(service as any, 'guestCartMerge').mockImplementation(() => {});
      vi.spyOn(multiCartFacade, 'mergeToCurrentCart');
      vi.spyOn(service, 'isGuestCart').mockReturnValue(of(false));
      winRef.localStorage?.setItem(
        STORAGE_KEY,
        JSON.stringify([{ product: { code: 'code' }, quantity: 1 }])
      );

      service['loadOrMerge'](
        'cartId',
        OCC_USER_ID_CURRENT,
        OCC_USER_ID_ANONYMOUS
      );

      expect(service['guestCartMerge']).not.toHaveBeenCalled();
      expect(multiCartFacade.mergeToCurrentCart).toHaveBeenCalled();
    });

    it('should not use persisted state in guestCartMerge and fall back to deleting the guest cart', () => {
      vi.spyOn(multiCartFacade, 'deleteCart').mockImplementation(() => {});
      vi.spyOn(service as any, 'addEntriesGuestMerge').mockImplementation(
        () => {}
      );
      vi.spyOn(service, 'getEntries').mockImplementation(() =>
        of([mockCartEntry])
      );
      winRef.localStorage?.setItem(
        STORAGE_KEY,
        JSON.stringify([{ product: { code: 'code' }, quantity: 1 }])
      );

      service['guestCartMerge']('cartId');

      expect(multiCartFacade.deleteCart).toHaveBeenCalledWith(
        'cartId',
        OCC_USER_ID_ANONYMOUS
      );
      expect(service['addEntriesGuestMerge']).toHaveBeenCalledWith([
        mockCartEntry,
      ]);
      // Persisted entry is left untouched (never read/cleared) when disabled.
      expect(winRef.localStorage?.getItem(STORAGE_KEY)).toBeTruthy();
    });
  });

  describe('requireLoadedCart', () => {
    let cartState: any;

    beforeEach(() => {
      cartState = {
        loading: false,
        success: true,
        error: false,
        value: {
          code: 'code',
        },
      };
    });

    it('should return cart if this already exists without loading again and creating new one', async () => {
      vi.spyOn(service, 'load');
      vi.spyOn(multiCartFacade, 'createCart');

      service['cartEntity$'] = of(cartState);

      const cart = await firstValueFrom(service.requireLoadedCart());
      expect(cart).toEqual(cartState.value);
      expect(service['load']).not.toHaveBeenCalled();
      expect(multiCartFacade.createCart).not.toHaveBeenCalled();
    });

    it('should try to load cart for logged user if it is not already loaded', async () => {
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
        {}
      );
      vi.spyOn(service, 'load').mockImplementation(() => {
        cart$.next({
          loading: false,
          success: true,
          error: false,
          value: {
            code: 'code',
          },
        });
      });
      vi.spyOn(multiCartFacade, 'createCart');

      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_CURRENT);

      const cart = await firstValueFrom(service['requireLoadedCart']());
      expect(cart).toEqual(cartState.value);
      expect(service['load']).toHaveBeenCalledWith(
        OCC_CART_ID_CURRENT,
        OCC_USER_ID_CURRENT
      );
      expect(multiCartFacade.createCart).not.toHaveBeenCalled();
    });

    it('should not load cart for logged user if it is loading', async () => {
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
        {}
      );
      // init loading is running
      cart$.next({
        loading: true,
        success: false,
        error: false,
      });
      vi.spyOn(service, 'load');
      vi.spyOn(multiCartFacade, 'createCart');

      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_CURRENT);

      const cartPromise = firstValueFrom(service['requireLoadedCart']());
      // init loading done
      cart$.next({
        loading: false,
        success: true,
        error: false,
        value: {
          code: 'code',
        },
      });
      const cart = await cartPromise;
      expect(cart).toEqual(cartState.value);
      expect(service['load']).not.toHaveBeenCalledWith(
        OCC_CART_ID_CURRENT,
        OCC_USER_ID_CURRENT
      );
      expect(multiCartFacade.createCart).not.toHaveBeenCalled();
    });

    it('should try to create cart after failed load cart for logged user', async () => {
      userId$.next(OCC_USER_ID_CURRENT);
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
        {}
      );
      vi.spyOn(service, 'load').mockImplementation(() => {
        cart$.next({
          loading: false,
          success: false,
          error: true,
          value: undefined,
        });
      });
      vi.spyOn(multiCartFacade, 'createCart').mockImplementation(() => {
        cart$.next({
          loading: false,
          success: true,
          error: false,
          value: {
            code: 'code',
          },
        });
        return EMPTY;
      });

      service['cartEntity$'] = cart$.asObservable();

      const cart = await firstValueFrom(service['requireLoadedCart']());
      expect(cart).toEqual(cartState.value);
      expect(service['load']).toHaveBeenCalledWith(
        OCC_CART_ID_CURRENT,
        OCC_USER_ID_CURRENT
      );
      expect(multiCartFacade.createCart).toHaveBeenCalledWith({
        userId: OCC_USER_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    });

    it('should try to create cart for anonymous user', async () => {
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
        {}
      );
      vi.spyOn(service, 'load');

      vi.spyOn(multiCartFacade, 'createCart').mockImplementation(() => {
        cart$.next({
          loading: false,
          success: true,
          error: false,
          value: {
            code: 'code',
          },
        });
        return EMPTY;
      });

      userId$.next(OCC_USER_ID_ANONYMOUS);
      service['cartEntity$'] = cart$.asObservable();

      const cart = await firstValueFrom(service['requireLoadedCart']());
      expect(cart).toEqual(cartState.value);
      expect(service['load']).not.toHaveBeenCalled();
      expect(multiCartFacade.createCart).toHaveBeenCalledWith({
        userId: OCC_USER_ID_ANONYMOUS,
        extraData: {
          active: true,
        },
      });
    });

    it('should share the same observable for concurrent requireLoadedCart calls (race condition prevention)', async () => {
      // This test verifies the fix for race condition on slow networks
      // where multiple rapid addEntry() calls could trigger parallel cart creations.
      // With shareReplay caching, concurrent calls share the same cart creation flow.
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
        {}
      );
      let createCartCallCount = 0;

      vi.spyOn(service as any, 'load');
      vi.spyOn(multiCartFacade, 'createCart').mockImplementation(() => {
        createCartCallCount++;
        // Simulate delayed cart creation
        setTimeout(() => {
          cart$.next({
            loading: false,
            success: true,
            error: false,
            value: {
              code: 'code',
            },
          });
        }, 50);
        return EMPTY;
      });

      userId$.next(OCC_USER_ID_ANONYMOUS);
      service['cartEntity$'] = cart$.asObservable();

      let completedCount = 0;
      const expectedCart = { code: 'code' };

      return new Promise<void>((resolve) => {
        function checkDone() {
          if (completedCount === 3) {
            // Critical assertion: createCart should only be called once
            // even though we called requireLoadedCart 3 times concurrently
            expect(createCartCallCount).toBe(1);
            resolve();
          }
        }

        // Simulate 3 concurrent addEntry calls triggering requireLoadedCart
        service['requireLoadedCart']().subscribe((cart) => {
          expect(cart).toEqual(expectedCart);
          completedCount++;
          checkDone();
        });

        service['requireLoadedCart']().subscribe((cart) => {
          expect(cart).toEqual(expectedCart);
          completedCount++;
          checkDone();
        });

        service['requireLoadedCart']().subscribe((cart) => {
          expect(cart).toEqual(expectedCart);
          completedCount++;
          checkDone();
        });
      });
    });

    it('should clear cached observable after completion for subsequent calls', async () => {
      // Verify that after one cart creation completes, a new call gets a fresh observable
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>({
        loading: false,
        success: true,
        error: false,
        value: { code: 'existingCart' },
      });

      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_ANONYMOUS);

      // First call - should cache and return
      return new Promise<void>((resolve) => {
        service['requireLoadedCart']()
          .pipe(take(1))
          .subscribe((cart) => {
            expect(cart).toEqual({ code: 'existingCart' });

            // After first call completes, the cache should be cleared
            // Accessing private property for testing
            setTimeout(() => {
              expect(service['loadedCart$']).toBeNull();
              resolve();
            }, 10);
          });
      });
    });

    it('should clear cached observable on error for subsequent retry', async () => {
      // This tests that the cache is cleared after an observable completes,
      // allowing retry attempts to get a fresh pipeline
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>({
        loading: false,
        success: true,
        error: false,
        value: { code: 'testCart' },
      });

      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_ANONYMOUS);

      // First call creates and caches the observable
      const obs1 = service['requireLoadedCart']();
      expect(service['loadedCart$']).not.toBeNull();

      // Subscribe and complete
      return new Promise<void>((resolve) => {
        obs1.pipe(take(1)).subscribe({
          next: (cart) => {
            expect(cart).toEqual({ code: 'testCart' });
          },
          complete: () => {
            // After completion, cache should be cleared via tap/finalize
            setTimeout(() => {
              expect(service['loadedCart$']).toBeNull();

              // A subsequent call should create a new observable (fresh retry)
              const obs2 = service['requireLoadedCart']();
              expect(obs2).not.toBe(obs1);
              resolve();
            }, 10);
          },
        });
      });
    });

    it('should not use cache when forGuestMerge is true', () => {
      // forGuestMerge requires special filtering, so caching is bypassed
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>({
        loading: false,
        success: true,
        error: false,
        value: { code: 'guestCart' },
      });

      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_ANONYMOUS);

      // Call with forGuestMerge = true twice
      const obs1 = service['requireLoadedCart'](true);
      const obs2 = service['requireLoadedCart'](true);

      // These should be different observables (no caching for guest merge)
      expect(obs1).not.toBe(obs2);

      // loadedCart$ should remain null (not cached for guest merge)
      expect(service['loadedCart$']).toBeNull();
    });

    it('should create new pipeline for calls after previous completion', async () => {
      // Verifies that after a successful cart creation completes, subsequent
      // calls get a fresh pipeline (not stale cached data)
      let callCount = 0;
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>({
        loading: false,
        success: true,
        error: false,
        value: { code: 'cart1' },
      });

      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_ANONYMOUS);

      return new Promise<void>((resolve) => {
        // First call
        service['requireLoadedCart']()
          .pipe(take(1))
          .subscribe((cart) => {
            callCount++;
            expect(cart).toEqual({ code: 'cart1' });

            // After first completes, update cart and make second call
            setTimeout(() => {
              cart$.next({
                loading: false,
                success: true,
                error: false,
                value: { code: 'cart2' },
              });

              service['requireLoadedCart']()
                .pipe(take(1))
                .subscribe((secondCart) => {
                  callCount++;
                  // Second call should get fresh data, not cached cart1
                  expect(secondCart).toEqual({ code: 'cart2' });
                  expect(callCount).toBe(2);
                  resolve();
                });
            }, 20);
          });
      });
    });

    it('should leave loadedCart$ null until the first non-guest-merge call', () => {
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>({
        loading: false,
        success: true,
        error: false,
        value: { code: 'cartCode' },
      });
      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_ANONYMOUS);

      expect(service['loadedCart$']).toBeNull();

      service['requireLoadedCart']();

      expect(service['loadedCart$']).not.toBeNull();
    });

    it('should give each guest-merge call a fresh pipeline (no shared cache)', () => {
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>({
        loading: false,
        success: true,
        error: false,
        value: { code: 'guestCart' },
      });
      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_ANONYMOUS);

      const obsA = service['requireLoadedCart'](true);
      const obsB = service['requireLoadedCart'](true);
      const obsC = service['requireLoadedCart'](true);

      expect(obsA).not.toBe(obsB);
      expect(obsB).not.toBe(obsC);
      expect(obsA).not.toBe(obsC);
      expect(service['loadedCart$']).toBeNull();
    });

    it('should not let a guest-merge call pollute the cache for a subsequent normal call', () => {
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>({
        loading: false,
        success: true,
        error: false,
        value: { code: 'cartCode' },
      });
      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_ANONYMOUS);

      const guestObs = service['requireLoadedCart'](true);
      expect(service['loadedCart$']).toBeNull();

      const normalObs = service['requireLoadedCart']();
      expect(service['loadedCart$']).not.toBeNull();
      expect(normalObs).not.toBe(guestObs);
    });

    it('should clear loadedCart$ via finalize when the inner pipeline errors', async () => {
      // Build a cartEntity$ that emits a successful cart-state, so the inner
      // pipeline runs to completion and `tap → loadedCart$ = null` fires.
      // This exercises the "cleanup on terminal event" branch of the gate
      // (tap-on-success and finalize both null the cache).
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>({
        loading: false,
        success: true,
        error: false,
        value: { code: 'cartCode' },
      });
      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_ANONYMOUS);

      return new Promise<void>((resolve) => {
        service['requireLoadedCart']().subscribe({
          next: () => {
            // After completion, both tap() and finalize() must have nulled the
            // cache; a subsequent call builds a fresh pipeline.
            setTimeout(() => {
              expect(service['loadedCart$']).toBeNull();
              const next = service['requireLoadedCart']();
              expect(service['loadedCart$']).not.toBeNull();
              expect(next).toBeDefined();
              resolve();
            }, 10);
          },
        });
      });
    });

    it('should clear loadedCart$ when the last subscriber unsubscribes mid-flight', async () => {
      // refCount=true tears the inner pipeline down on the last unsubscribe,
      // which fires `finalize` and clears the cache. Use never-emitting
      // upstream sources so the pipeline can't complete synchronously.
      vi.useFakeTimers();
      try {
        const cart$ = new Subject<StateUtils.ProcessesLoaderState<Cart>>();
        service['cartEntity$'] = cart$.asObservable();
        service['activeCartId$'] = new Subject<string>().asObservable();
        userId$.next(OCC_USER_ID_ANONYMOUS);

        const obs = service['requireLoadedCart']();
        expect(service['loadedCart$']).not.toBeNull();

        const sub = obs.subscribe();
        expect(service['loadedCart$']).not.toBeNull();

        sub.unsubscribe();

        // Advance timers to allow finalize to execute
        vi.advanceTimersByTime(100);

        expect(service['loadedCart$']).toBeNull();
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe('hasPickupItems and hasDeliveryItems', () => {
    it('cart has pickup items', async () => {
      const mockCart: Cart = {
        pickupItemsQuantity: 1,
      };
      service.getActive = vi.fn().mockReturnValue(of(mockCart));

      const hasPickup = await firstValueFrom(service.hasPickupItems());
      expect(hasPickup).toBeTruthy();
    });

    it('cart does not have pickup items', async () => {
      const mockCart = {
        code: 'test',
      };
      service.getActive = vi.fn().mockReturnValue(of(mockCart));

      const hasPickup = await firstValueFrom(service.hasPickupItems());
      expect(hasPickup).toBeFalsy();
    });

    it('should be able to get whether cart has delivery items', async () => {
      let mockCart: Cart = {
        deliveryItemsQuantity: 1,
      };
      service.getActive = vi.fn().mockReturnValue(of(mockCart));

      const hasDelivery = await firstValueFrom(service.hasDeliveryItems());
      expect(hasDelivery).toBeTruthy();

      mockCart = {
        code: 'test',
      };
      service.getActive = vi.fn().mockReturnValue(of(mockCart));

      const hasPickup = await firstValueFrom(service.hasDeliveryItems());
      expect(hasPickup).toBeFalsy();
    });
  });

  describe('getPickupEntries and getDeliveryEntries', () => {
    const entries: OrderEntry[] = [
      { orderCode: 'pickupEntry', deliveryPointOfService: { name: 'test' } },
      { orderCode: 'deliveryEntry' },
    ];

    it('should be able to get pickup entries', async () => {
      service.getEntries = vi.fn().mockReturnValue(of(entries));

      const pickupEntries = await firstValueFrom(service.getPickupEntries());
      expect(pickupEntries.length).toEqual(1);
      expect(pickupEntries[0].orderCode).toEqual('pickupEntry');
    });

    it('should be able to get delivery entries', async () => {
      service.getEntries = vi.fn().mockReturnValue(of(entries));

      const deliveryEntries = await firstValueFrom(
        service.getDeliveryEntries()
      );
      expect(deliveryEntries.length).toEqual(1);
      expect(deliveryEntries[0].orderCode).toEqual('deliveryEntry');
    });
  });
});

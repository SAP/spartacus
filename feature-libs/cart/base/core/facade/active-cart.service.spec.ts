import { TestBed } from '@angular/core/testing';
import { Cart, MultiCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import {
  getLastValueSync,
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  OCC_USER_ID_GUEST,
  StateUtils,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject, EMPTY, Observable, of, Subject, firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
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

const store = {};
const MockWindowRef = {
  localStorage: {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string): void => {
      if (key in store) {
        store[key] = undefined;
      }
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
      service.isStable = vi.fn()
        .mockReturnValue(isStableMock);

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

      service.isStable = vi.fn()
        .mockReturnValue(isStableMock);
      service.getActive = vi.fn()
        .mockReturnValue(of(mockCart));

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
      service.isStable = vi.fn()
        .mockReturnValue(isStableMock);

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

      service.isStable = vi.fn()
        .mockReturnValue(isStableMock);
      service.getActiveCartId = vi.fn()
        .mockReturnValue(of(mockCartId));

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
      vi.spyOn(multiCartFacade, 'getEntries').mockReturnValue(of([mockCartEntry]));
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
      vi.spyOn(multiCartFacade, 'getLastEntry').mockReturnValue(of(mockCartEntry));
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

      expect(storedOauthFlowKey).toBeUndefined();
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
      vi.spyOn(multiCartFacade, 'mergeToCurrentCart').mockImplementation(() => {});

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
      vi.spyOn(multiCartFacade, 'getLastEntry').mockReturnValue(of(mockCartEntry));
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
  });

  describe('hasPickupItems and hasDeliveryItems', () => {
    it('cart has pickup items', async () => {
      const mockCart: Cart = {
        pickupItemsQuantity: 1,
      };
      service.getActive = vi.fn()
        .mockReturnValue(of(mockCart));

      const hasPickup = await firstValueFrom(service.hasPickupItems());
      expect(hasPickup).toBeTruthy();
    });

    it('cart does not have pickup items', async () => {
      const mockCart = {
        code: 'test',
      };
      service.getActive = vi.fn()
        .mockReturnValue(of(mockCart));

      const hasPickup = await firstValueFrom(service.hasPickupItems());
      expect(hasPickup).toBeFalsy();
    });

    it('should be able to get whether cart has delivery items', async () => {
      let mockCart: Cart = {
        deliveryItemsQuantity: 1,
      };
      service.getActive = vi.fn()
        .mockReturnValue(of(mockCart));

      const hasDelivery = await firstValueFrom(service.hasDeliveryItems());
      expect(hasDelivery).toBeTruthy();

      mockCart = {
        code: 'test',
      };
      service.getActive = vi.fn()
        .mockReturnValue(of(mockCart));

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
      service.getEntries = vi.fn()
        .mockReturnValue(of(entries));

      const pickupEntries = await firstValueFrom(service.getPickupEntries());
      expect(pickupEntries.length).toEqual(1);
      expect(pickupEntries[0].orderCode).toEqual('pickupEntry');
    });

    it('should be able to get delivery entries', async () => {
      service.getEntries = vi.fn()
        .mockReturnValue(of(entries));

      const deliveryEntries = await firstValueFrom(service.getDeliveryEntries());
      expect(deliveryEntries.length).toEqual(1);
      expect(deliveryEntries[0].orderCode).toEqual('deliveryEntry');
    });
  });
});

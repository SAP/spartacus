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
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
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
    return of();
  }
  assignEmail() {}
  getEntry() {
    return of();
  }
  getLastEntry() {
    return of();
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
      spyOn<any>(service, 'load').and.callThrough();
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
    it('should NOT emit if the cart is NOT stable', (done) => {
      const isStableMock = new Subject<boolean>();
      service.isStable = jasmine
        .createSpy('isStable')
        .and.returnValue(isStableMock);

      let emissions = 0;
      service
        .takeActive()
        .pipe(take(1))
        .subscribe(() => emissions++);

      isStableMock.next(false);

      expect(emissions).toBe(0);
      done();
    });

    it('should emit only when the cart is stable', (done) => {
      const mockCart: Cart = {
        code: 'code',
      };
      const isStableMock = new Subject<boolean>();

      service.isStable = jasmine
        .createSpy('isStable')
        .and.returnValue(isStableMock);
      service.getActive = jasmine
        .createSpy('getActive')
        .and.returnValue(of(mockCart));

      let result: Cart | undefined;
      service
        .takeActive()
        .pipe(take(1))
        .subscribe((cart) => (result = cart));

      isStableMock.next(true);

      expect(result).toEqual(mockCart);
      done();
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
    it('should NOT emit if the cart ID is NOT stable', (done) => {
      const isStableMock = new Subject<boolean>();
      service.isStable = jasmine
        .createSpy('isStable')
        .and.returnValue(isStableMock);

      let emissions = 0;
      service
        .takeActiveCartId()
        .pipe(take(1))
        .subscribe(() => emissions++);

      isStableMock.next(false);

      expect(emissions).toBe(0);
      done();
    });

    it('should emit only when the cart ID is stable', (done) => {
      const mockCartId = 'xxx';
      const isStableMock = new Subject<boolean>();

      service.isStable = jasmine
        .createSpy('isStable')
        .and.returnValue(isStableMock);
      service.getActiveCartId = jasmine
        .createSpy('getActiveCartId')
        .and.returnValue(of(mockCartId));

      let result: string | undefined;
      service
        .takeActiveCartId()
        .pipe(take(1))
        .subscribe((cartId) => (result = cartId));

      isStableMock.next(true);

      expect(result).toEqual(mockCartId);
      done();
    });
  });

  describe('getEntries', () => {
    it('should return cart entries', () => {
      spyOn(multiCartFacade, 'getEntries').and.returnValue(of([mockCartEntry]));
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
      spyOn(multiCartFacade, 'getLastEntry').and.returnValue(of(mockCartEntry));
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
    it('should return true when isStable returns true', (done) => {
      spyOn(multiCartFacade, 'isStable').and.returnValue(of(true));

      service
        .isStable()
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBe(true);
          done();
        });
    });

    it('should return false when isStable returns false', (done) => {
      spyOn(multiCartFacade, 'isStable').and.returnValue(of(false));

      service
        .isStable()
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBe(false);
          done();
        });
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
      spyOn(multiCartFacade, 'loadCart').and.callThrough();

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
      spyOn<any>(service, 'loadOrMerge').and.callFake(() => {});
      winRef.localStorage?.setItem('oAuthRedirectCodeFlow', 'true');

      service['detectUserChange']();

      expect(service['loadOrMerge']).toHaveBeenCalled();
    });

    it('should merge guest cart', () => {
      spyOn<any>(service, 'guestCartMerge').and.callFake(() => {});
      spyOn(service, 'isGuestCart').and.returnValue(of(true));
      service['loadOrMerge'](
        'cartId',
        OCC_USER_ID_CURRENT,
        OCC_USER_ID_ANONYMOUS
      );

      expect(service['guestCartMerge']).toHaveBeenCalledWith('cartId');
    });

    it('should dispatch load for current -> emulated user switch', () => {
      spyOn(multiCartFacade, 'loadCart').and.callThrough();

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
      spyOn(multiCartFacade, 'mergeToCurrentCart').and.stub();

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
      spyOn(multiCartFacade, 'loadCart').and.callThrough();
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
      spyOn(multiCartFacade, 'loadCart').and.callThrough();
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
      spyOn(multiCartFacade, 'loadCart').and.callThrough();
      service['load'](OCC_CART_ID_CURRENT, OCC_USER_ID_ANONYMOUS);

      expect(multiCartFacade['loadCart']).not.toHaveBeenCalled();
    });
  });

  describe('addEntry', () => {
    it('should just add entry after cart is provided', () => {
      spyOn<any>(service, 'requireLoadedCart').and.returnValue(
        of({ code: 'code', guid: 'guid' })
      );
      spyOn(multiCartFacade, 'addEntry').and.callThrough();
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
      spyOn<any>(service, 'requireLoadedCart').and.returnValue(
        of({ code: 'code', guid: 'guid' })
      );
      spyOn(multiCartFacade, 'addEntry').and.callThrough();
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
      spyOn(multiCartFacade, 'removeEntry').and.callThrough();

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
      spyOn(multiCartFacade, 'updateEntry').and.callThrough();

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
      spyOn(multiCartFacade, 'updateEntry').and.callThrough();

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
      spyOn(multiCartFacade, 'updateEntry').and.callThrough();

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
      spyOn(multiCartFacade, 'getEntry').and.returnValue(of(mockCartEntry));
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
      spyOn(multiCartFacade, 'getLastEntry').and.returnValue(of(mockCartEntry));
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
      spyOn(multiCartFacade, 'assignEmail').and.callThrough();

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
      spyOn(multiCartFacade, 'addEntries').and.callThrough();
      spyOn<any>(service, 'requireLoadedCart').and.returnValue(
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
      spyOn(multiCartFacade, 'deleteCart').and.callThrough();
      spyOn(service, 'addEntries').and.callThrough();
      spyOn(service, 'getEntries').and.returnValue(of([mockCartEntry]));
      spyOn<any>(service, 'addEntriesGuestMerge').and.callThrough();

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

    it('should return cart if this already exists without loading again and creating new one', (done) => {
      spyOn<any>(service, 'load').and.callThrough();
      spyOn(multiCartFacade, 'createCart').and.callThrough();

      service['cartEntity$'] = of(cartState);

      service.requireLoadedCart().subscribe((cart) => {
        expect(cart).toEqual(cartState.value);
        expect(service['load']).not.toHaveBeenCalled();
        expect(multiCartFacade.createCart).not.toHaveBeenCalled();
        done();
      });
    });

    it('should try to load cart for logged user if it is not already loaded', (done) => {
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
        {}
      );
      spyOn<any>(service, 'load').and.callFake(() => {
        cart$.next({
          loading: false,
          success: true,
          error: false,
          value: {
            code: 'code',
          },
        });
      });
      spyOn(multiCartFacade, 'createCart').and.callThrough();

      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_CURRENT);

      service['requireLoadedCart']().subscribe((cart) => {
        expect(cart).toEqual(cartState.value);
        expect(service['load']).toHaveBeenCalledWith(
          OCC_CART_ID_CURRENT,
          OCC_USER_ID_CURRENT
        );
        expect(multiCartFacade.createCart).not.toHaveBeenCalled();
        done();
      });
    });

    it('should not load cart for logged user if it is loading', (done) => {
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
        {}
      );
      // init loading is running
      cart$.next({
        loading: true,
        success: false,
        error: false,
      });
      spyOn<any>(service, 'load').and.callThrough();
      spyOn(multiCartFacade, 'createCart').and.callThrough();

      service['cartEntity$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_CURRENT);

      service['requireLoadedCart']().subscribe((cart) => {
        expect(cart).toEqual(cartState.value);
        expect(service['load']).not.toHaveBeenCalledWith(
          OCC_CART_ID_CURRENT,
          OCC_USER_ID_CURRENT
        );
        expect(multiCartFacade.createCart).not.toHaveBeenCalled();
        done();
      });
      // init loading done
      cart$.next({
        loading: false,
        success: true,
        error: false,
        value: {
          code: 'code',
        },
      });
    });

    it('should try to create cart after failed load cart for logged user', (done) => {
      userId$.next(OCC_USER_ID_CURRENT);
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
        {}
      );
      spyOn<any>(service, 'load').and.callFake(() => {
        cart$.next({
          loading: false,
          success: false,
          error: true,
          value: undefined,
        });
      });
      spyOn(multiCartFacade, 'createCart').and.callFake(() => {
        cart$.next({
          loading: false,
          success: true,
          error: false,
          value: {
            code: 'code',
          },
        });
        return of();
      });

      service['cartEntity$'] = cart$.asObservable();

      service['requireLoadedCart']().subscribe((cart) => {
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
        done();
      });
    });

    it('should try to create cart for anonymous user', (done) => {
      const cart$ = new BehaviorSubject<StateUtils.ProcessesLoaderState<Cart>>(
        {}
      );
      spyOn<any>(service, 'load').and.callThrough();

      spyOn(multiCartFacade, 'createCart').and.callFake(() => {
        cart$.next({
          loading: false,
          success: true,
          error: false,
          value: {
            code: 'code',
          },
        });
        return of();
      });

      userId$.next(OCC_USER_ID_ANONYMOUS);
      service['cartEntity$'] = cart$.asObservable();

      service['requireLoadedCart']().subscribe((cart) => {
        expect(cart).toEqual(cartState.value);
        expect(service['load']).not.toHaveBeenCalled();
        expect(multiCartFacade.createCart).toHaveBeenCalledWith({
          userId: OCC_USER_ID_ANONYMOUS,
          extraData: {
            active: true,
          },
        });
        done();
      });
    });
  });

  describe('hasPickupItems and hasDeliveryItems', () => {
    it('should be able to get whether cart has pickup items', (done) => {
      let mockCart: Cart = {
        pickupItemsQuantity: 1,
      };
      service.getActive = jasmine
        .createSpy('getActive')
        .and.returnValue(of(mockCart));

      service.hasPickupItems().subscribe((hasPickup) => {
        expect(hasPickup).toBeTruthy();
        done();
      });

      mockCart = {
        code: 'test',
      };
      service.getActive = jasmine
        .createSpy('getActive')
        .and.returnValue(of(mockCart));

      service.hasPickupItems().subscribe((hasPickup) => {
        expect(hasPickup).toBeFalsy();
        done();
      });
    });

    it('should be able to get whether cart has delivery items', (done) => {
      let mockCart: Cart = {
        deliveryItemsQuantity: 1,
      };
      service.getActive = jasmine
        .createSpy('getActive')
        .and.returnValue(of(mockCart));

      service.hasDeliveryItems().subscribe((hasDelivery) => {
        expect(hasDelivery).toBeTruthy();
        done();
      });

      mockCart = {
        code: 'test',
      };
      service.getActive = jasmine
        .createSpy('getActive')
        .and.returnValue(of(mockCart));

      service.hasDeliveryItems().subscribe((hasPickup) => {
        expect(hasPickup).toBeFalsy();
        done();
      });
    });
  });

  describe('getPickupEntries and getDeliveryEntries', () => {
    const entries: OrderEntry[] = [
      { orderCode: 'pickupEntry', deliveryPointOfService: { name: 'test' } },
      { orderCode: 'deliveryEntry' },
    ];

    it('should be able to get pickup entries', (done) => {
      service.getEntries = jasmine
        .createSpy('getEntries')
        .and.returnValue(of(entries));

      service.getPickupEntries().subscribe((pickupEntries) => {
        expect(pickupEntries.length).toEqual(1);
        expect(pickupEntries[0].orderCode).toEqual('pickupEntry');
        done();
      });
    });

    it('should be able to get delivery entries', (done) => {
      service.getEntries = jasmine
        .createSpy('getEntries')
        .and.returnValue(of(entries));

      service.getDeliveryEntries().subscribe((deliveryEntries) => {
        expect(deliveryEntries.length).toEqual(1);
        expect(deliveryEntries[0].orderCode).toEqual('deliveryEntry');
        done();
      });
    });
  });
});

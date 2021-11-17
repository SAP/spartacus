import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserIdService } from '../../auth/index';
import * as fromReducers from '../../cart/store/reducers/index';
import { Cart } from '../../model/cart.model';
import { OrderEntry } from '../../model/order.model';
import {
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  OCC_USER_ID_GUEST,
} from '../../occ/utils/occ-constants';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers/index';
import { StateUtils } from '../../state';
import { MULTI_CART_FEATURE } from '../store/multi-cart-state';
import { ActiveCartService } from './active-cart.service';
import { MultiCartService } from './multi-cart.service';

const userId$ = new BehaviorSubject<string>(OCC_USER_ID_ANONYMOUS);

class UserIdServiceStub implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return userId$.asObservable();
  }
}

class MultiCartServiceStub {
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
}

const mockCartEntry: OrderEntry = {
  entryNumber: 0,
  product: { code: 'code' },
  quantity: 1,
};

describe('ActiveCartService', () => {
  let service: ActiveCartService;
  let multiCartService: MultiCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          MULTI_CART_FEATURE,
          fromReducers.getMultiCartReducers()
        ),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        ActiveCartService,
        { provide: MultiCartService, useClass: MultiCartServiceStub },
        { provide: UserIdService, useClass: UserIdServiceStub },
      ],
    });
    service = TestBed.inject(ActiveCartService);
    multiCartService = TestBed.inject(MultiCartService);
  });

  describe('getActive', () => {
    it('should attempt to load cart if it is empty and not loaded', () => {
      userId$.next(OCC_USER_ID_CURRENT);
      service['cartSelector$'] = of({
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
      service['cartSelector$'] = of({
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
      service['cartSelector$'] = of({
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

  describe('getEntries', () => {
    it('should return cart entries', () => {
      spyOn(multiCartService, 'getEntries').and.returnValue(
        of([mockCartEntry])
      );
      service['activeCartId$'] = of('cartId');

      let result;
      service
        .getEntries()
        .subscribe((val) => (result = val))
        .unsubscribe();

      expect(result).toEqual([mockCartEntry]);
      expect(multiCartService['getEntries']).toHaveBeenCalledWith('cartId');
    });
  });

  describe('getLastEntry', () => {
    it('should return last entry by product code', () => {
      spyOn(multiCartService, 'getLastEntry').and.returnValue(
        of(mockCartEntry)
      );
      service['activeCartId$'] = of('cartId');

      let result;
      service
        .getLastEntry('code123')
        .subscribe((entry) => (result = entry))
        .unsubscribe();

      expect(result).toEqual(mockCartEntry);
      expect(multiCartService['getLastEntry']).toHaveBeenCalledWith(
        'cartId',
        'code123'
      );
    });
  });

  describe('isStable', () => {
    it('should return true when isStable returns true', (done) => {
      spyOn(multiCartService, 'isStable').and.returnValue(of(true));

      service
        .isStable()
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBe(true);
          done();
        });
    });

    it('should return false when isStable returns false', (done) => {
      spyOn(multiCartService, 'isStable').and.returnValue(of(false));

      service
        .isStable()
        .pipe(take(1))
        .subscribe((val) => {
          expect(val).toBe(false);
          done();
        });
    });
  });

  describe('loadOrMerge', () => {
    it('should load cart when cartId is default "current"', () => {
      spyOn(multiCartService, 'loadCart').and.callThrough();

      service['loadOrMerge'](
        OCC_CART_ID_CURRENT,
        'userId',
        OCC_USER_ID_ANONYMOUS
      );
      expect(multiCartService['loadCart']).toHaveBeenCalledWith({
        userId: 'userId',
        cartId: OCC_USER_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    });

    it('should merge guest cart', () => {
      spyOn<any>(service, 'guestCartMerge').and.callFake(() => {});
      spyOn(service, 'isGuestCart').and.returnValue(true);
      service['loadOrMerge'](
        'cartId',
        OCC_USER_ID_CURRENT,
        OCC_USER_ID_ANONYMOUS
      );

      expect(service['guestCartMerge']).toHaveBeenCalledWith('cartId');
    });

    it('should dispatch load for current -> emulated user switch', () => {
      spyOn(multiCartService, 'loadCart').and.callThrough();

      service['loadOrMerge']('cartId', 'ala-ma-kota', OCC_USER_ID_CURRENT);
      expect(multiCartService['loadCart']).toHaveBeenCalledWith({
        userId: 'ala-ma-kota',
        cartId: 'cartId',
        extraData: {
          active: true,
        },
      });
    });

    it('should dispatch merge for non guest cart', () => {
      spyOn(multiCartService, 'mergeToCurrentCart').and.stub();

      service['loadOrMerge']('cartId', 'userId', OCC_USER_ID_ANONYMOUS);

      expect(multiCartService.mergeToCurrentCart).toHaveBeenCalledWith({
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
      spyOn(multiCartService, 'loadCart').and.callThrough();
      service['load'](OCC_CART_ID_CURRENT, OCC_USER_ID_CURRENT);

      expect(multiCartService['loadCart']).toHaveBeenCalledWith({
        userId: OCC_USER_ID_CURRENT,
        cartId: OCC_CART_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
    });

    it('should load if user is anonymous and cartId is provided', () => {
      spyOn(multiCartService, 'loadCart').and.callThrough();
      service['load']('cartId', OCC_USER_ID_ANONYMOUS);

      expect(multiCartService['loadCart']).toHaveBeenCalledWith({
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: 'cartId',
        extraData: {
          active: true,
        },
      });
    });

    it('should not load if user is anonymous and cartId is default "current"', () => {
      spyOn(multiCartService, 'loadCart').and.callThrough();
      service['load'](OCC_CART_ID_CURRENT, OCC_USER_ID_ANONYMOUS);

      expect(multiCartService['loadCart']).not.toHaveBeenCalled();
    });
  });

  describe('addEntry', () => {
    it('should just add entry after cart is provided', () => {
      spyOn<any>(service, 'requireLoadedCart').and.returnValue(
        of({ value: { code: 'code', guid: 'guid' } })
      );
      spyOn(multiCartService, 'addEntry').and.callThrough();
      userId$.next(OCC_USER_ID_ANONYMOUS);

      service.addEntry('productCode', 2);

      expect(multiCartService['addEntry']).toHaveBeenCalledWith(
        OCC_USER_ID_ANONYMOUS,
        'guid',
        'productCode',
        2
      );
    });
  });

  describe('removeEntry', () => {
    it('should call multiCartService remove entry method with active cart', () => {
      userId$.next('userId');
      service['activeCartId$'] = of('cartId');
      spyOn(multiCartService, 'removeEntry').and.callThrough();

      service.removeEntry({
        entryNumber: 3,
      });
      expect(multiCartService['removeEntry']).toHaveBeenCalledWith(
        'userId',
        'cartId',
        3
      );
    });
  });

  describe('updateEntry', () => {
    it('should call multiCartService update entry method with active cart', () => {
      service['activeCartId$'] = of('cartId');
      spyOn(multiCartService, 'updateEntry').and.callThrough();

      service.updateEntry(1, 2);
      expect(multiCartService['updateEntry']).toHaveBeenCalledWith(
        'userId',
        'cartId',
        1,
        2
      );
    });
  });

  describe('getEntry', () => {
    it('should return entry by product code', () => {
      spyOn(multiCartService, 'getEntry').and.returnValue(of(mockCartEntry));
      service['activeCartId$'] = of('cartId');

      let result;
      service
        .getEntry('code123')
        .subscribe((entry) => (result = entry))
        .unsubscribe();

      expect(result).toEqual(mockCartEntry);
      expect(multiCartService['getEntry']).toHaveBeenCalledWith(
        'cartId',
        'code123'
      );
    });
  });

  describe('getLastEntry', () => {
    it('should return last entry by product code', () => {
      spyOn(multiCartService, 'getLastEntry').and.returnValue(
        of(mockCartEntry)
      );
      service['activeCartId$'] = of('cartId');

      let result;
      service
        .getLastEntry('code123')
        .subscribe((entry) => (result = entry))
        .unsubscribe();

      expect(result).toEqual(mockCartEntry);
      expect(multiCartService['getLastEntry']).toHaveBeenCalledWith(
        'cartId',
        'code123'
      );
    });
  });

  describe('addEmail', () => {
    it('should assign email to active cart', () => {
      service['activeCartId$'] = of('cartId');
      spyOn(multiCartService, 'assignEmail').and.callThrough();

      service.addEmail('test@email.com');
      expect(multiCartService.assignEmail).toHaveBeenCalledWith(
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
      spyOn(service, 'getActive').and.returnValue(
        of({
          code: 'xxx',
          user: mockCartUser,
        })
      );

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

      expect(service.isGuestCart()).toBe(true);
    });

    it('should return false for OCC_USER_ID_CURRENT', () => {
      service['activeCart$'] = of({
        user: {
          name: OCC_USER_ID_CURRENT,
          uid: 'uid',
        },
      });

      expect(service.isGuestCart()).toBe(false);
    });

    it('should return false for OCC_USER_ID_ANONYMOUS', () => {
      service['activeCart$'] = of({
        user: {
          name: OCC_USER_ID_ANONYMOUS,
          uid: 'uid',
        },
      });

      expect(service.isGuestCart()).toBe(false);
    });

    it('should return true when uid contains an email', () => {
      service['activeCart$'] = of({
        user: {
          name: OCC_USER_ID_ANONYMOUS,
          uid: 'test|test@email.com',
        },
      });

      expect(service.isGuestCart()).toBe(true);
    });

    it('should return false when uid does not contain an email', () => {
      service['activeCart$'] = of({
        user: {
          name: OCC_USER_ID_ANONYMOUS,
          uid: 'test|test@notvalidemail',
        },
      });

      expect(service.isGuestCart()).toBe(false);
    });
  });

  describe('addEntries', () => {
    it('should add multiple entries at once', () => {
      spyOn(multiCartService, 'addEntries').and.callThrough();
      spyOn<any>(service, 'requireLoadedCart').and.returnValue(
        of({ value: { code: 'someCode', guid: 'guid' } })
      );
      userId$.next('someUserId');

      service.addEntries([mockCartEntry, mockCartEntry]);
      expect(multiCartService['addEntries']).toHaveBeenCalledWith(
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

  describe('isEmail', () => {
    it('should return false for empty email', () => {
      const result = service['isEmail']('');
      expect(result).toBe(false);
    });

    it('should return false for incorrect email', () => {
      const result = service['isEmail']('test@email');
      expect(result).toBe(false);
    });

    it('should return true for correct email', () => {
      const result = service['isEmail']('test@email.com');
      expect(result).toBe(true);
    });
  });

  describe('guestCartMerge', () => {
    it('should delete cart and add entries from previous cart', () => {
      spyOn(multiCartService, 'deleteCart').and.callThrough();
      spyOn(service, 'addEntries').and.callThrough();
      spyOn(service, 'getEntries').and.returnValue(of([mockCartEntry]));
      spyOn<any>(service, 'addEntriesGuestMerge').and.callThrough();

      service['guestCartMerge']('cartId');
      expect(service['addEntriesGuestMerge']).toHaveBeenCalledWith([
        mockCartEntry,
      ]);
      expect(multiCartService['deleteCart']).toHaveBeenCalledWith(
        'cartId',
        OCC_USER_ID_ANONYMOUS
      );
    });
  });

  describe('isEmpty', () => {
    it('should return true for undefined', () => {
      const result = service['isEmpty'](undefined);
      expect(result).toBe(true);
    });

    it('should return true for null', () => {
      const result = service['isEmpty'](null);
      expect(result).toBe(true);
    });

    it('should return true for empty object', () => {
      const result = service['isEmpty']({});
      expect(result).toBe(true);
    });

    it('should return false for correct cart', () => {
      const result = service['isEmpty']({ code: 'testCode' });
      expect(result).toBe(false);
    });
  });

  describe('isJustLoggedIn', () => {
    it('should only return true after user change', () => {
      // set to anonymous value as other tests altered that value
      const result = service['isJustLoggedIn'](
        OCC_USER_ID_CURRENT,
        OCC_USER_ID_ANONYMOUS
      );
      expect(result).toBe(true);
    });

    it('should return false when previous user is identical', () => {
      // simulate that we got current user after initialization
      const result = service['isJustLoggedIn'](
        OCC_USER_ID_CURRENT,
        OCC_USER_ID_CURRENT
      );
      expect(result).toBe(false);
    });
  });

  describe('requireLoadedCart', () => {
    let cartState;

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
      spyOn(multiCartService, 'createCart').and.callThrough();

      service['cartSelector$'] = of(cartState);

      service['requireLoadedCart']().subscribe((cart) => {
        expect(cart).toEqual(cartState);
        expect(service['load']).not.toHaveBeenCalled();
        expect(multiCartService.createCart).not.toHaveBeenCalled();
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
      spyOn(multiCartService, 'createCart').and.callThrough();

      service['cartSelector$'] = cart$.asObservable();
      userId$.next(OCC_USER_ID_CURRENT);

      service['requireLoadedCart']().subscribe((cart) => {
        expect(cart).toEqual(cartState);
        expect(service['load']).toHaveBeenCalledWith(
          OCC_CART_ID_CURRENT,
          OCC_USER_ID_CURRENT
        );
        expect(multiCartService.createCart).not.toHaveBeenCalled();
        done();
      });
    });

    it('should try to create cart after failed load cart for logged user', (done) => {
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
      spyOn(multiCartService, 'createCart').and.callFake(() => {
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

      service['cartSelector$'] = cart$.asObservable();

      service['requireLoadedCart']().subscribe((cart) => {
        expect(cart).toEqual(cartState);
        expect(service['load']).toHaveBeenCalledWith(
          OCC_CART_ID_CURRENT,
          OCC_USER_ID_CURRENT
        );
        expect(multiCartService.createCart).toHaveBeenCalledWith({
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

      spyOn(multiCartService, 'createCart').and.callFake(() => {
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
      service['cartSelector$'] = cart$.asObservable();

      service['requireLoadedCart']().subscribe((cart) => {
        expect(cart).toEqual(cartState);
        expect(service['load']).not.toHaveBeenCalled();
        expect(multiCartService.createCart).toHaveBeenCalledWith({
          userId: OCC_USER_ID_ANONYMOUS,
          extraData: {
            active: true,
          },
        });
        done();
      });
    });
  });
});

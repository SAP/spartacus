import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import * as fromReducers from '../../cart/store/reducers/index';
import { OrderEntry } from '../../model/order.model';
import {
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  OCC_USER_ID_GUEST,
} from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process';
import * as fromProcessReducers from '../../process/store/reducers/index';
import { CartActions, StateWithMultiCart } from '../store';
import * as DeprecatedCartActions from '../store/actions/cart.action';
import { ActiveCartService } from './active-cart.service';
import { MultiCartService } from './multi-cart.service';

const userId$ = new BehaviorSubject<string>(OCC_USER_ID_ANONYMOUS);

class AuthServiceStub {
  getOccUserId(): Observable<string> {
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
  updateEntry() {}
  removeEntry() {}
  getEntries() {}
  createCart() {}
  addEntries() {}
}

const mockCartEntry: OrderEntry = {
  entryNumber: 0,
  product: { code: 'code' },
  quantity: 1,
};

describe('ActiveCartService', () => {
  let service: ActiveCartService;
  let multiCartService: MultiCartService;
  let store: Store<StateWithMultiCart | StateWithProcess<void>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          'multi-cart',
          fromReducers.getMultiCartReducers()
        ),
        StoreModule.forFeature('process', fromProcessReducers.getReducers()),
      ],
      providers: [
        ActiveCartService,
        { provide: MultiCartService, useClass: MultiCartServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    });
    service = TestBed.get(ActiveCartService as Type<ActiveCartService>);
    multiCartService = TestBed.get(MultiCartService as Type<MultiCartService>);
    store = TestBed.get(Store as Type<
      Store<StateWithMultiCart | StateWithProcess<void>>
    >);
  });

  describe('getActive', () => {
    it('should attempt to load cart if it is empty and not loaded', () => {
      service['cartSelector$'] = of({
        value: undefined,
        loading: false,
        success: false,
        error: false,
      });
      service['activeCartId$'] = of('code');
      spyOn<any>(service, 'load').and.callThrough();
      service['initActiveCart']();
      let result;
      service
        .getActive()
        .subscribe(val => (result = val))
        .unsubscribe();
      expect(service['load']).toHaveBeenCalledWith('code');
      expect(result).toEqual({});
    });

    it('should set cartUser from cart', () => {
      service['cartSelector$'] = of({
        value: {
          user: {
            name: OCC_USER_ID_CURRENT,
            uid: 'test|test@test.com',
          },
        },
        loading: false,
        success: true,
        error: false,
      });
      service['activeCartId$'] = of('code');
      service['initActiveCart']();
      let result;
      service
        .getActive()
        .subscribe(val => (result = val))
        .unsubscribe();
      expect(result).toEqual({
        user: {
          name: OCC_USER_ID_CURRENT,
          uid: 'test|test@test.com',
        },
      });
      expect(service['cartUser']).toEqual({
        name: OCC_USER_ID_CURRENT,
        uid: 'test|test@test.com',
      });
    });

    it('should return only cart when loaded', () => {
      service['cartSelector$'] = of({
        value: {
          code: 'code',
        },
        loading: true,
        success: true,
        error: false,
      });
      service['activeCartId$'] = of('code');
      service['initActiveCart']();
      let result;
      service
        .getActive()
        .subscribe(val => (result = val))
        .unsubscribe();
      expect(result).toEqual(undefined);
    });
  });

  describe('getActiveCartId', () => {
    it('should return active cart id as guid for anonymous user', () => {
      service['activeCart$'] = of({ code: 'code', guid: 'guid' });
      service['userId'] = OCC_USER_ID_ANONYMOUS;

      let result;
      service
        .getActiveCartId()
        .subscribe(val => (result = val))
        .unsubscribe();
      expect(result).toBe('guid');
    });

    it('should return active cart id as guid for non anonymous user', () => {
      service['activeCart$'] = of({ code: 'code', guid: 'guid' });
      service['userId'] = OCC_USER_ID_CURRENT;

      let result;
      service
        .getActiveCartId()
        .subscribe(val => (result = val))
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
        .subscribe(val => (result = val))
        .unsubscribe();

      expect(result).toEqual([mockCartEntry]);
      expect(multiCartService['getEntries']).toHaveBeenCalledWith('cartId');
    });
  });

  describe('getLoaded', () => {
    it('should return true for success flag', () => {
      service['cartSelector$'] = of({ success: true, loading: false });

      let result;
      service
        .getLoaded()
        .subscribe(val => (result = val))
        .unsubscribe();
      expect(result).toBe(true);
    });

    it('should return false for loading flag', () => {
      service['cartSelector$'] = of({ success: true, loading: true });

      let result;
      service
        .getLoaded()
        .subscribe(val => (result = val))
        .unsubscribe();
      expect(result).toBe(false);
    });

    it('should return true for error flag', () => {
      service['cartSelector$'] = of({ error: true, loading: false });

      let result;
      service
        .getLoaded()
        .subscribe(val => (result = val))
        .unsubscribe();
      expect(result).toBe(true);
    });
  });

  describe('loadOrMerge', () => {
    it('should load cart when cartId is not provided', () => {
      service['userId'] = 'userId';
      spyOn(multiCartService, 'loadCart').and.callThrough();

      service['loadOrMerge'](undefined);
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
      service['loadOrMerge']('cartId');

      expect(service['guestCartMerge']).toHaveBeenCalledWith('cartId');
    });

    it('should dispatch merge for non guest cart', () => {
      spyOn(store, 'dispatch').and.callFake(() => {});
      service['userId'] = 'userId';
      service['loadOrMerge']('cartId');

      expect(store.dispatch).toHaveBeenCalledWith(
        new DeprecatedCartActions.MergeCart({
          userId: 'userId',
          cartId: 'cartId',
          extraData: {
            active: true,
          },
        })
      );
    });
  });

  describe('load', () => {
    it('should load if user is not anonymous and cartId is not provided', () => {
      spyOn(multiCartService, 'loadCart').and.callThrough();
      service['userId'] = OCC_USER_ID_CURRENT;
      service['load'](undefined);

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
      service['userId'] = OCC_USER_ID_ANONYMOUS;
      service['load']('cartId');

      expect(multiCartService['loadCart']).toHaveBeenCalledWith({
        userId: OCC_USER_ID_ANONYMOUS,
        cartId: 'cartId',
        extraData: {
          active: true,
        },
      });
    });

    it('should not load if user is anonymous and cartId is not provided', () => {
      spyOn(multiCartService, 'loadCart').and.callThrough();
      service['userId'] = OCC_USER_ID_ANONYMOUS;
      service['load'](undefined);

      expect(multiCartService['loadCart']).not.toHaveBeenCalled();
    });
  });

  describe('getAddEntryLoaded', () => {
    it('should return true for successful process', () => {
      store.dispatch(new CartActions.CartSuccessAddEntryProcess());
      let result;
      service
        .getAddEntryLoaded()
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toBe(true);
    });

    it('should return false when loading', () => {
      store.dispatch(new CartActions.CartStartAddEntryProcess());
      let result;
      service
        .getAddEntryLoaded()
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toBe(false);
    });
  });

  describe('addEntry', () => {
    it('should just add entry when cart exists', () => {
      spyOn<any>(service, 'load').and.callThrough();
      spyOn(multiCartService, 'createCart').and.callThrough();
      spyOn(multiCartService, 'addEntries').and.callThrough();
      service['userId'] = OCC_USER_ID_CURRENT;
      service['cartSelector$'] = of({
        value: { code: 'code', guid: 'guid' },
        loading: false,
        success: true,
      });

      service.addEntry('productCode', 2);

      expect(multiCartService['createCart']).not.toHaveBeenCalled();
      expect(service['load']).not.toHaveBeenCalled();
      expect(multiCartService['addEntries']).toHaveBeenCalledWith(
        OCC_USER_ID_CURRENT,
        'code',
        [{ productCode: 'productCode', quantity: 2 }]
      );
    });

    it('should create cart and add entries when there is no cart and user is anonymous', done => {
      spyOn<any>(service, 'load').and.callThrough();
      spyOn(multiCartService, 'createCart').and.returnValue(
        of({ value: { code: 'code', guid: 'guid' } }).pipe(delay(1))
      );
      spyOn(multiCartService, 'addEntries').and.callThrough();
      service['userId'] = OCC_USER_ID_ANONYMOUS;
      service['cartSelector$'] = of({
        value: undefined,
        loading: false,
        success: false,
      });

      service.addEntry('productCode', 2);
      service.addEntry('productCode2', 3);

      setTimeout(() => {
        expect(multiCartService['createCart']).toHaveBeenCalledWith({
          userId: OCC_USER_ID_ANONYMOUS,
          extraData: {
            active: true,
          },
        });
        expect(service['load']).not.toHaveBeenCalled();
        expect(multiCartService['addEntries']).toHaveBeenCalledWith(
          OCC_USER_ID_ANONYMOUS,
          'guid',
          [
            { productCode: 'productCode', quantity: 2 },
            { productCode: 'productCode2', quantity: 3 },
          ]
        );
        done();
      }, 10);
    });

    it('should attempt to load cart and then add entries if there is no cart and user is not anonymous', () => {
      spyOn<any>(service, 'load').and.callThrough();
      spyOn(multiCartService, 'createCart').and.callThrough();
      spyOn(multiCartService, 'addEntries').and.callThrough();
      const cartSelector$ = new BehaviorSubject<any>({
        value: undefined,
        loading: false,
        success: false,
      });
      service['userId'] = OCC_USER_ID_CURRENT;
      service['cartSelector$'] = cartSelector$.asObservable();

      service.addEntry('productCode', 2);

      expect(service['load']).toHaveBeenCalledWith(undefined);
      expect(multiCartService['addEntries']).not.toHaveBeenCalled();

      cartSelector$.next({ value: undefined, loading: true, success: false });
      expect(multiCartService['addEntries']).not.toHaveBeenCalled();

      cartSelector$.next({
        value: { code: 'code', guid: 'guid' },
        loading: false,
        success: true,
      });
      expect(multiCartService['createCart']).not.toHaveBeenCalled();
      expect(multiCartService['addEntries']).toHaveBeenCalledWith(
        OCC_USER_ID_CURRENT,
        'code',
        [{ productCode: 'productCode', quantity: 2 }]
      );
    });

    it('should fallback to creating cart after load fails', () => {
      spyOn<any>(service, 'load').and.callThrough();
      spyOn(multiCartService, 'createCart').and.returnValue(
        of({ value: { code: 'code2', guid: 'guid2' } })
      );
      spyOn(multiCartService, 'addEntries').and.callThrough();
      const cartSelector$ = new BehaviorSubject<any>({
        value: undefined,
        loading: false,
        success: false,
      });
      service['userId'] = OCC_USER_ID_CURRENT;
      service['cartSelector$'] = cartSelector$.asObservable();

      service.addEntry('productCode', 2);

      expect(service['load']).toHaveBeenCalledWith(undefined);
      expect(multiCartService['addEntries']).not.toHaveBeenCalled();

      cartSelector$.next({ value: undefined, loading: true, success: false });
      expect(multiCartService['addEntries']).not.toHaveBeenCalled();

      cartSelector$.next({ value: undefined, loading: false, error: true });
      expect(multiCartService['createCart']).toHaveBeenCalledWith({
        userId: OCC_USER_ID_CURRENT,
        extraData: {
          active: true,
        },
      });
      expect(multiCartService['addEntries']).toHaveBeenCalledWith(
        OCC_USER_ID_CURRENT,
        'code2',
        [{ productCode: 'productCode', quantity: 2 }]
      );
    });
  });

  describe('removeEntry', () => {
    it('should call multiCartService remove entry method with active cart', () => {
      service['cartId'] = 'cartId';
      service['userId'] = 'userId';
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
      service['cartId'] = 'cartId';
      service['userId'] = 'userId';
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
        .subscribe(entry => (result = entry))
        .unsubscribe();

      expect(result).toEqual(mockCartEntry);
      expect(multiCartService['getEntry']).toHaveBeenCalledWith(
        'cartId',
        'code123'
      );
    });
  });

  describe('addEmail', () => {
    it('should assign email to active cart', () => {
      service['cartId'] = 'cartId';
      service['userId'] = 'userId';
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
        .subscribe(user => (result = user))
        .unsubscribe();

      expect(result).toEqual(mockCartUser);
    });
  });

  describe('isGuestCart', () => {
    it('should return true if user is OCC_USER_ID_GUEST', () => {
      service['cartUser'] = {
        name: OCC_USER_ID_GUEST,
        uid: 'uid',
      };

      expect(service.isGuestCart()).toBe(true);
    });

    it('should return false for OCC_USER_ID_CURRENT', () => {
      service['cartUser'] = {
        name: OCC_USER_ID_CURRENT,
        uid: 'uid',
      };

      expect(service.isGuestCart()).toBe(false);
    });

    it('should return false for OCC_USER_ID_ANONYMOUS', () => {
      service['cartUser'] = {
        name: OCC_USER_ID_ANONYMOUS,
        uid: 'uid',
      };

      expect(service.isGuestCart()).toBe(false);
    });

    it('should return true when uid contains an email', () => {
      service['cartUser'] = {
        name: OCC_USER_ID_ANONYMOUS,
        uid: 'test|test@email.com',
      };

      expect(service.isGuestCart()).toBe(true);
    });

    it('should return false when uid does not contain an email', () => {
      service['cartUser'] = {
        name: OCC_USER_ID_ANONYMOUS,
        uid: 'test|test@notvalidemail',
      };

      expect(service.isGuestCart()).toBe(false);
    });
  });

  describe('addEntries', () => {
    it('should add each entry one by one', () => {
      spyOn(service, 'addEntry').and.callThrough();

      service.addEntries([mockCartEntry, mockCartEntry], false);
      expect(service['addEntry']).toHaveBeenCalledTimes(2);
      expect(service['addEntry']).toHaveBeenCalledWith(
        mockCartEntry.product.code,
        mockCartEntry.quantity,
        false
      );
    });

    it('should pass guestMerge flag', () => {
      spyOn(service, 'addEntry').and.callThrough();

      service.addEntries([mockCartEntry], true);
      expect(service['addEntry']).toHaveBeenCalledWith(
        mockCartEntry.product.code,
        mockCartEntry.quantity,
        true
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

      service['guestCartMerge']('cartId');
      expect(service['addEntries']).toHaveBeenCalledWith([mockCartEntry], true);
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
      const result = service['isJustLoggedIn'](OCC_USER_ID_CURRENT);
      expect(result).toBe(true);
    });

    it('should return false when previous user is identical', () => {
      userId$.next(OCC_CART_ID_CURRENT);
      const result = service['isJustLoggedIn'](OCC_USER_ID_CURRENT);
      expect(result).toBe(false);
    });
  });
});

import { TestBed, TestBedStatic } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of, ReplaySubject } from 'rxjs';
import { AuthService, UserToken } from '../../auth/index';
import { CartActions } from '../../cart/store/actions/index';
import * as fromReducers from '../../cart/store/reducers/index';
import { Cart } from '../../model/cart.model';
import { OrderEntry } from '../../model/order.model';
import {
  OCC_CART_ID_CURRENT,
  OCC_USER_ID_ANONYMOUS,
} from '../../occ/utils/occ-constants';
import * as DeprecatedCartActions from '../store/actions/cart.action';
import { StateWithCart } from '../store/cart-state';
import { ActiveCartService } from './active-cart.service';
import { CartDataService } from './cart-data.service';
import { CartService } from './cart.service';

class CartDataServiceStub {
  userId;
  cart;
  cartId;
  isGuestCart;
}

const userToken$ = new ReplaySubject<UserToken>();

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return userToken$.asObservable();
  }
}

describe('CartService', () => {
  let service: CartService;
  let cartData: CartDataServiceStub;
  let store: Store<StateWithCart>;
  let activeCart: ActiveCartService;

  function configureTestingModule(): TestBedStatic {
    return TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromReducers.getReducers()),
      ],
      providers: [
        CartService,
        { provide: CartDataService, useClass: CartDataServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ActiveCartService, useValue: null },
      ],
    });
  }

  function testBedConnector() {
    service = TestBed.inject(CartService);
    cartData = TestBed.inject(CartDataService);
    store = TestBed.inject(Store);
    activeCart = TestBed.inject(ActiveCartService);
  }

  const productCode = '1234';
  const userId = 'testUserId';
  const mockUserToken: UserToken = {
    userId,
    access_token: 'access_token',
    token_type: 'token_type',
    refresh_token: 'refresh_token',
    expires_in: 1,
    scope: ['scope'],
  };
  const cart = { code: 'testCartId', guid: 'testGuid', user: 'assigned' };
  const mockCartEntry: OrderEntry = {
    entryNumber: 0,
    product: { code: productCode },
    quantity: 1,
  };

  describe('without ActiveCartService dependency provided', () => {
    beforeEach(() => {
      configureTestingModule();
      testBedConnector();
    });

    it('should CartService be injected', () => {
      expect(service).toBeTruthy();
    });

    const loadOrMergeMethod = 'loadOrMerge';
    describe(loadOrMergeMethod, () => {
      describe('when the cart is not created', () => {
        it('should load the cart', () => {
          spyOn(store, 'dispatch').and.stub();
          cartData.cart = {};

          service[loadOrMergeMethod]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new DeprecatedCartActions.LoadCart({
              userId: cartData.userId,
              cartId: OCC_CART_ID_CURRENT,
            })
          );
        });
      });
      describe('when the cart is created', () => {
        it('should merge the cart', () => {
          spyOn(store, 'dispatch').and.stub();
          cartData.cart = cart;

          service[loadOrMergeMethod]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new DeprecatedCartActions.MergeCart({
              userId: cartData.userId,
              cartId: cartData.cart.guid,
            })
          );
        });
      });
      const guestCartMergeMethod = 'guestCartMerge';
      describe('when user is guest', () => {
        beforeEach(() => {
          spyOn(service, 'isGuestCart').and.returnValue(true);
          spyOn(store, 'dispatch').and.stub();

          cartData.cart = cart;
        });
        it('should delete guest cart', () => {
          service[loadOrMergeMethod]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new DeprecatedCartActions.DeleteCart({
              userId: OCC_USER_ID_ANONYMOUS,
              cartId: cartData.cart.guid,
            })
          );
        });

        it('should create a new cart', () => {
          spyOn<any>(service, 'isCreated').and.returnValue(false);

          service[guestCartMergeMethod]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new DeprecatedCartActions.CreateCart({ userId: cartData.userId })
          );
        });

        it('should copy content of guest cart to user cart', () => {
          spyOn<any>(service, 'isCreated').and.returnValue(true);
          spyOn(service, 'addEntries').and.stub();
          spyOn(service, 'getEntries').and.returnValues(
            of([mockCartEntry]),
            of([])
          );

          service[guestCartMergeMethod]();
          expect(service.addEntries).toHaveBeenCalledWith([mockCartEntry]);
        });
      });
    });

    describe('load', () => {
      it('should dispatch load with cartId when exists', () => {
        spyOn(store, 'dispatch').and.stub();
        cartData.cartId = cart.code;

        service['load']();
        expect(store.dispatch).toHaveBeenCalledWith(
          new DeprecatedCartActions.LoadCart({
            userId: cartData.userId,
            cartId: cartData.cartId,
          })
        );
      });
      it('should dispatch load with "current" for logged user without cartId', () => {
        spyOn(store, 'dispatch').and.stub();
        cartData.cartId = null;

        service['load']();
        expect(store.dispatch).toHaveBeenCalledWith(
          new DeprecatedCartActions.LoadCart({
            userId: cartData.userId,
            cartId: OCC_CART_ID_CURRENT,
          })
        );
      });
      it('should dispatch with cartId for anonymous user', () => {
        spyOn(store, 'dispatch').and.stub();
        cartData.cartId = cart.code;
        cartData.userId = OCC_USER_ID_ANONYMOUS;

        service['load']();
        expect(store.dispatch).toHaveBeenCalledWith(
          new DeprecatedCartActions.LoadCart({
            userId: cartData.userId,
            cartId: cartData.cartId,
          })
        );
      });
    });

    describe('addEntry', () => {
      it('should be able to add entry if cart exists', () => {
        store.dispatch(new DeprecatedCartActions.CreateCartSuccess(cart));
        spyOn(store, 'dispatch').and.callThrough();

        cartData.userId = userId;
        cartData.cart = cart;
        cartData.cartId = cart.code;

        service.addEntry(productCode, 2);

        expect(store.dispatch).toHaveBeenCalledWith(
          new CartActions.CartAddEntry({
            userId: userId,
            cartId: cart.code,
            productCode: productCode,
            quantity: 2,
          })
        );
      });

      it('should be able to add entry if cart does not exist', () => {
        store.dispatch(new DeprecatedCartActions.LoadCartSuccess({}));
        const spy = spyOn(store, 'dispatch').and.callThrough();

        cartData.userId = userId;
        cartData.cart = {};
        service.addEntry(productCode, 2);

        cartData.cartId = cart.code;
        store.dispatch(new DeprecatedCartActions.LoadCartSuccess(cart));

        expect(spy.calls.first().args).toEqual([
          new DeprecatedCartActions.CreateCart({
            userId: userId,
          }),
        ]);

        expect(spy.calls.mostRecent().args).toEqual([
          new CartActions.CartAddEntry({
            userId: userId,
            cartId: cart.code,
            productCode: productCode,
            quantity: 2,
          }),
        ]);
      });
    });

    describe('update CartEntry', () => {
      it('should be able to updateCartEntry with quantity > 0', () => {
        spyOn(store, 'dispatch').and.stub();

        cartData.userId = userId;
        cartData.cart = cart;
        cartData.cartId = cart.code;
        service.updateEntry('1', 1);

        expect(store.dispatch).toHaveBeenCalledWith(
          new CartActions.CartUpdateEntry({
            userId: userId,
            cartId: cart.code,
            entry: '1',
            qty: 1,
          })
        );
      });

      it('should be able to updateCartEntry with quantity = 0', () => {
        spyOn(store, 'dispatch').and.stub();
        cartData.userId = userId;
        cartData.cart = cart;
        cartData.cartId = cart.code;
        service.updateEntry('1', 0);

        expect(store.dispatch).toHaveBeenCalledWith(
          new CartActions.CartRemoveEntry({
            userId: userId,
            cartId: cart.code,
            entry: '1',
          })
        );
      });
    });

    describe('remove CartEntry', () => {
      it('should be able to removeCartEntry', () => {
        spyOn(store, 'dispatch').and.stub();
        cartData.userId = userId;
        cartData.cart = cart;
        cartData.cartId = cart.code;

        service.removeEntry(mockCartEntry);

        expect(store.dispatch).toHaveBeenCalledWith(
          new CartActions.CartRemoveEntry({
            userId: userId,
            cartId: cart.code,
            entry: mockCartEntry.entryNumber,
          })
        );
      });
    });

    describe('getLoaded', () => {
      it('should return a loaded state', () => {
        store.dispatch(new DeprecatedCartActions.CreateCartSuccess(cart));
        let result: boolean;
        service
          .getLoaded()
          .subscribe(value => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
      });
    });

    describe('getEntry', () => {
      it('should return an entry', () => {
        const testCart: Cart = <Cart>{
          entries: [
            { product: { code: 'code1' } },
            { product: { code: 'code2' } },
          ],
        };
        store.dispatch(new DeprecatedCartActions.LoadCartSuccess(testCart));

        let result: OrderEntry;
        service
          .getEntry('code1')
          .subscribe(value => (result = value))
          .unsubscribe();
        expect(result).toEqual(testCart.entries[0]);
      });
    });

    describe('getEntries', () => {
      it('should return entries', () => {
        const testCart: Cart = <Cart>{
          entries: [
            { product: { code: 'code1' } },
            { product: { code: 'code2' } },
          ],
        };
        store.dispatch(new DeprecatedCartActions.LoadCartSuccess(testCart));

        let result: OrderEntry[];
        service
          .getEntries()
          .subscribe(value => (result = value))
          .unsubscribe();
        expect(result).toEqual(testCart.entries);
      });
    });

    describe('getCartMergeComplete', () => {
      it('should return true when the merge is complete', () => {
        store.dispatch(
          new DeprecatedCartActions.MergeCartSuccess({
            cartId: 'cartId',
            userId: 'userId',
          })
        );
        let result: boolean;
        service
          .getCartMergeComplete()
          .subscribe(mergeComplete => (result = mergeComplete))
          .unsubscribe();
        expect(result).toEqual(true);
      });
    });

    describe('addEmail', () => {
      it('should be able to add email to cart', () => {
        spyOn(store, 'dispatch').and.stub();
        cartData.userId = userId;
        cartData.cart = cart;
        cartData.cartId = cart.code;

        service.addEmail('test@test.com');

        expect(store.dispatch).toHaveBeenCalledWith(
          new DeprecatedCartActions.AddEmailToCart({
            userId: userId,
            cartId: cart.code,
            email: 'test@test.com',
          })
        );
      });
    });

    describe('getAssignedUser', () => {
      it('should be able to return cart assigned user', () => {
        store.dispatch(new DeprecatedCartActions.CreateCartSuccess(cart));
        let result: any;
        service
          .getAssignedUser()
          .subscribe(value => (result = value))
          .unsubscribe();
        expect(result).toEqual('assigned');
      });
    });

    describe('isGuestCart', () => {
      it('should be able to return whether cart belongs to guest', () => {
        cartData.isGuestCart = true;
        expect(service.isGuestCart()).toBeTruthy();

        cartData.isGuestCart = false;
        expect(service.isGuestCart()).toBeFalsy();
      });
    });

    describe('addEntries', () => {
      beforeEach(() => {
        spyOn(store, 'dispatch').and.stub();
      });

      it('should add entries to the cart if cart HAS content', () => {
        service.addEntries([mockCartEntry]);

        expect(store.dispatch).toHaveBeenCalledWith(
          new CartActions.CartAddEntry({
            userId: cartData.userId,
            cartId: cartData.cartId,
            productCode: mockCartEntry.product.code,
            quantity: mockCartEntry.quantity,
          })
        );
      });
      it('should add entries to the cart if cart is empty', () => {
        service.addEntries([mockCartEntry]);

        expect(store.dispatch).toHaveBeenCalledWith(
          new CartActions.CartAddEntry({
            userId: cartData.userId,
            cartId: cartData.cartId,
            productCode: mockCartEntry.product.code,
            quantity: mockCartEntry.quantity,
          })
        );
      });
    });

    describe('isCreated', () => {
      it('should return false when guid is not present', () => {
        const result = service['isCreated']({});
        expect(result).toEqual(false);
      });
      it('should return true when guid is set', () => {
        const result = service['isCreated']({ guid: 'testGuid' });
        expect(result).toEqual(true);
      });
    });

    describe('isIncomplete', () => {
      it('should return true for empty object', () => {
        const result = service['isIncomplete']({});
        expect(result).toEqual(true);
      });
      it('should return false for cart with guid and code only', () => {
        const result = service['isIncomplete']({
          guid: 'testGuid',
          code: 'testCode',
        });
        expect(result).toEqual(true);
      });
      it('should return false for loaded cart', () => {
        const result = service['isIncomplete']({
          guid: 'testGuid',
          code: 'testCode',
          totalItems: 3,
          user: { name: 'name', uid: 'userId' },
        });
        expect(result).toEqual(false);
      });
    });

    describe('isJustLoggedIn', () => {
      it('should return true on change from not logged in to logged', () => {
        service['previousUserId'] = '';
        const result = service['isJustLoggedIn']('testUserId');
        expect(result).toEqual(true);
      });

      it('should return false on app initialization', () => {
        const result = service['isJustLoggedIn']('testUserId');
        expect(result).toEqual(false);
      });

      it('should return false when previous userId equals passed userId', () => {
        service['previousUserId'] = 'testUserId';
        const result = service['isJustLoggedIn']('testUserId');
        expect(result).toEqual(false);
      });

      it('should return false for missing userId or logout', () => {
        const result = service['isJustLoggedIn'](null);
        expect(result).toEqual(false);
      });
    });

    describe('getActive (_activeCart$)', () => {
      it('should not return or invoke other methods when cart is loading', done => {
        let result: Cart;

        service['loadOrMerge'] = jasmine.createSpy().and.callFake(() => {});
        service['load'] = jasmine.createSpy().and.callFake(() => {});

        service.getActive().subscribe(val => (result = val));

        store.dispatch(
          new DeprecatedCartActions.LoadCart({ userId, cartId: cart.guid })
        );

        setTimeout(() => {
          expect(result).toBeUndefined();
          expect(service['loadOrMerge']).not.toHaveBeenCalled();
          expect(service['load']).not.toHaveBeenCalled();
          done();
        });
      });

      it('should loadOrMerge cart for user that just logged in', done => {
        service['loadOrMerge'] = jasmine.createSpy().and.callFake(() => {});

        let result: Cart;
        service.getActive().subscribe(val => (result = val));

        // simulate setting empty previousUserId after app init
        service['previousUserId'] = '';

        userToken$.next(mockUserToken);
        setTimeout(() => {
          expect(service['loadOrMerge']).toHaveBeenCalled();
          expect(service['previousUserId']).toEqual(mockUserToken.userId);
          expect(result).toEqual({});
          done();
        });
      });

      it('should load cart when not fully loaded', done => {
        service['load'] = jasmine.createSpy().and.callFake(() => {});

        let result: Cart;
        service.getActive().subscribe(val => (result = val));
        store.dispatch(new DeprecatedCartActions.LoadCartSuccess(cart));

        setTimeout(() => {
          expect(service['load']).toHaveBeenCalled();
          expect(result).toEqual(undefined); // shouldn't return incomplete cart
          done();
        });
      });

      it('should load cart for logged user without cart', done => {
        service['load'] = jasmine.createSpy().and.callFake(() => {});

        service.getActive().subscribe();
        store.dispatch(new DeprecatedCartActions.ClearCart());
        userToken$.next(mockUserToken);
        setTimeout(() => {
          expect(service['load']).toHaveBeenCalled();
          done();
        });
      });

      it('should not load cart when loaded', done => {
        service['load'] = jasmine.createSpy().and.callFake(() => {});

        let result: Cart;
        service.getActive().subscribe(val => (result = val));
        const fullCart = {
          code: 'code',
          guid: 'guid',
          totalItems: 2,
          user: { name: 'name', user: 'userId' },
        };
        store.dispatch(new DeprecatedCartActions.LoadCartSuccess(fullCart));

        setTimeout(() => {
          expect(service['load']).not.toHaveBeenCalled();
          expect(result).toEqual(fullCart);
          done();
        });
      });
    });
  });

  describe('with ActiveCartService dependency provided', () => {
    const mockActiveCartService = {
      getActive() {},
      getEntries() {},
      getLoaded() {},
      getAddEntryLoaded() {},
      addEntry() {},
      updateEntry() {},
      removeEntry() {},
      getEntry() {},
      getAssignedUser() {},
      addEmail() {},
      isGuestCart() {},
      addEntries() {},
    };
    beforeEach(() => {
      configureTestingModule().overrideProvider(ActiveCartService, {
        useValue: mockActiveCartService,
      });
      testBedConnector();
    });

    it('getActive should invoke ActiveCartService getActive', () => {
      spyOn(activeCart, 'getActive');
      service.getActive();
      expect(activeCart['getActive']).toHaveBeenCalled();
    });

    it('getEntries should invoke ActiveCartService getEntries', () => {
      spyOn(activeCart, 'getEntries');
      service.getEntries();
      expect(activeCart['getEntries']).toHaveBeenCalled();
    });

    it('getLoaded should invoke ActiveCartService getLoaded', () => {
      spyOn(activeCart, 'getLoaded');
      service.getLoaded();
      expect(activeCart['getLoaded']).toHaveBeenCalled();
    });

    it('addEntry should invoke ActiveCartService addEntry', () => {
      spyOn(activeCart, 'addEntry');
      service.addEntry('testId', 1);
      expect(activeCart['addEntry']).toHaveBeenCalledWith('testId', 1);
    });

    it('removeEntry should invoke ActiveCartService removeEntry', () => {
      spyOn(activeCart, 'removeEntry');
      service.removeEntry({});
      expect(activeCart['removeEntry']).toHaveBeenCalledWith({});
    });

    it('updateEntry should invoke ActiveCartService updateEntry', () => {
      spyOn(activeCart, 'updateEntry');
      service.updateEntry('2', 1);
      expect(activeCart['updateEntry']).toHaveBeenCalledWith(2, 1);
    });

    it('getEntry should invoke ActiveCartService getEntry', () => {
      spyOn(activeCart, 'getEntry');
      service.getEntry('testProductId');
      expect(activeCart['getEntry']).toHaveBeenCalledWith('testProductId');
    });

    it('addEmail should invoke ActiveCartService addEmail', () => {
      spyOn(activeCart, 'addEmail');
      service.addEmail('test@email.com');
      expect(activeCart['addEmail']).toHaveBeenCalledWith('test@email.com');
    });

    it('getAssignedUser should invoke ActiveCartService getAssignedUser', () => {
      spyOn(activeCart, 'getAssignedUser');
      service.getAssignedUser();
      expect(activeCart['getAssignedUser']).toHaveBeenCalled();
    });

    it('isGuestCart should invoke ActiveCartService isGuestCart', () => {
      spyOn(activeCart, 'isGuestCart');
      service.isGuestCart();
      expect(activeCart['isGuestCart']).toHaveBeenCalled();
    });

    it('addEntries should invoke ActiveCartService addEntries', () => {
      spyOn(activeCart, 'addEntries');
      service.addEntries([]);
      expect(activeCart['addEntries']).toHaveBeenCalledWith([]);
    });
  });
});

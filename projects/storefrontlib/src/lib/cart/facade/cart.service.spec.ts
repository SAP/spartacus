import { TestBed } from '@angular/core/testing';

import { StoreModule, Store } from '@ngrx/store';

import { Cart, OrderEntry } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { AuthService } from '../../auth';
import * as fromCart from '../../cart/store';
import { UserToken } from '../../auth/models/token-types.model';

import { CartDataService, ANONYMOUS_USERID } from './cart-data.service';
import { CartService } from './cart.service';

class CartDataServiceStub {
  userId;
  cart;
  cartId;
}

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return of();
  }
}

describe('CartService', () => {
  let service: CartService;
  let cartData: CartDataServiceStub;
  let authService: AuthServiceStub;
  let store: Store<fromCart.CartState>;

  const productCode = '1234';
  const userId = 'testUserId';
  const cart = { code: 'testCartId', guid: 'testGuid' };
  const userToken: UserToken = {
    access_token: 'xxx',
    token_type: 'bearer',
    refresh_token: 'xxx',
    expires_in: 1000,
    scope: ['xxx'],
    userId: 'xxx'
  };
  const mockCartEntry: OrderEntry = {
    entryNumber: 0,
    product: { code: productCode }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromCart.getReducers())
      ],
      providers: [
        CartService,
        { provide: CartDataService, useClass: CartDataServiceStub },
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    });

    service = TestBed.get(CartService);
    authService = TestBed.get(AuthService);
    cartData = TestBed.get(CartDataService);
    store = TestBed.get(Store);
  });

  it('should CartService is injected', () => {
    expect(service).toBeTruthy();
  });

  const setUserIdMethod = 'setUserId';
  describe(setUserIdMethod, () => {
    describe('when the userToken is empty', () => {
      it('should set an anonymous user', () => {
        const testUserToken: UserToken = <UserToken>{};
        service[setUserIdMethod](testUserToken);
        expect(cartData.userId).toEqual(ANONYMOUS_USERID);
      });
    });
    describe('when the userToken is not empty', () => {
      it('should set the user', () => {
        const testUserToken: UserToken = <UserToken>{ userId: 'testUser' };
        service[setUserIdMethod](testUserToken);
        expect(cartData.userId).toEqual('testUser');
      });
    });
  });

  const loadOrMergeCartMethod = 'loadOrMergeCart';
  describe(loadOrMergeCartMethod, () => {
    describe('when user is not an anonymous', () => {
      describe('and the cart is not created', () => {
        it('should load the cart', () => {
          spyOn(service, 'isCartCreated').and.returnValue(false);
          spyOn(store, 'dispatch').and.stub();
          cartData.cart = cart;

          service[loadOrMergeCartMethod]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new fromCart.LoadCart({
              userId: cartData.userId,
              cartId: 'current'
            })
          );
        });
      });
      describe('and the cart is created', () => {
        it('should merge the cart', () => {
          spyOn(service, 'isCartCreated').and.returnValue(true);
          spyOn(store, 'dispatch').and.stub();
          cartData.cart = cart;

          service[loadOrMergeCartMethod]();
          expect(store.dispatch).toHaveBeenCalledWith(
            new fromCart.MergeCart({
              userId: cartData.userId,
              cartId: cartData.cart.guid
            })
          );
        });
      });
    });
  });

  const refreshCartMethod = 'refreshCart';
  describe(refreshCartMethod, () => {
    describe('when refresh is true', () => {
      it('should load the cart', () => {
        store.dispatch(new fromCart.AddEntrySuccess('test'));
        cartData.cart = cart;
        spyOn(store, 'dispatch').and.stub();

        service[refreshCartMethod]();
        expect(store.dispatch).toHaveBeenCalledWith(
          new fromCart.LoadCart({
            userId: cartData.userId,
            cartId: cartData.cartId,
            details: true
          })
        );
      });
    });
  });

  const initCartMethod = 'initCart';
  describe(initCartMethod, () => {
    describe(`when user's token and cart's user id are not equal`, () => {
      it(`should call '${setUserIdMethod}' and '${loadOrMergeCartMethod}' methods`, () => {
        spyOn(authService, 'getUserToken').and.returnValue(of(userToken));
        store.dispatch(new fromCart.LoadCartSuccess(cart));
        store.dispatch(new fromCart.AddEntrySuccess('foo'));
        spyOn<any>(service, setUserIdMethod).and.stub();
        spyOn<any>(service, loadOrMergeCartMethod).and.stub();
        spyOn<any>(service, refreshCartMethod).and.stub();

        service[initCartMethod]();
        expect(cartData.cart).toEqual(cart);
        expect(service[setUserIdMethod]).toHaveBeenCalledWith(userToken);
        expect(service[loadOrMergeCartMethod]).toHaveBeenCalled();
        expect(service[refreshCartMethod]).toHaveBeenCalled();
      });
    });

    describe(`when user's token and cart's user id are equal`, () => {
      it(`should not call '${setUserIdMethod}' and '${loadOrMergeCartMethod}' methods`, () => {
        spyOn(authService, 'getUserToken').and.returnValue(of(userToken));
        cartData.userId = userToken.userId;
        store.dispatch(new fromCart.LoadCartSuccess(cart));
        store.dispatch(new fromCart.AddEntrySuccess('foo'));

        spyOn<any>(service, setUserIdMethod).and.stub();
        spyOn<any>(service, loadOrMergeCartMethod).and.stub();
        spyOn<any>(service, refreshCartMethod).and.stub();

        service[initCartMethod]();
        expect(cartData.cart).toEqual(cart);
        expect(service[setUserIdMethod]).not.toHaveBeenCalled();
        expect(service[loadOrMergeCartMethod]).not.toHaveBeenCalled();
        expect(service[refreshCartMethod]).toHaveBeenCalled();
      });
    });
  });

  describe('Load cart details', () => {
    it('should load more details when a user is logged in', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.userId = userId;
      cartData.cart = cart;

      service.loadCartDetails();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.LoadCart({
          userId: userId,
          cartId: 'current',
          details: true
        })
      );
    });

    it('should load more details for anonymous user if cartid exists', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.cart = cart;
      cartData.userId = ANONYMOUS_USERID;
      cartData.cartId = cart.guid;

      service.loadCartDetails();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.LoadCart({
          userId: ANONYMOUS_USERID,
          cartId: cart.guid,
          details: true
        })
      );
    });

    it('should not load more details for anonymous user if cartid is null', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.userId = ANONYMOUS_USERID;

      service.loadCartDetails();

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('add CartEntry', () => {
    it('should be able to addCartEntry if cart exists', () => {
      spyOn(store, 'dispatch').and.callThrough();

      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;

      service.addCartEntry(productCode, 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.AddEntry({
          userId: userId,
          cartId: cart.code,
          productCode: productCode,
          quantity: 2
        })
      );
    });

    it('should be able to addCartEntry if cart does not exist', () => {
      spyOn(service, 'isCartCreated').and.returnValue(false);
      store.dispatch(new fromCart.LoadCartSuccess(cart));
      spyOn(store, 'dispatch').and.callThrough();

      cartData.userId = userId;
      cartData.cart = {};
      service.addCartEntry(productCode, 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.CreateCart({
          userId: userId
        })
      );
    });
  });

  describe('update CartEntry', () => {
    it('should be able to updateCartEntry with quantity <> 0', () => {
      spyOn(store, 'dispatch').and.stub();

      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;
      service.updateCartEntry('1', 1);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.UpdateEntry({
          userId: userId,
          cartId: cart.code,
          entry: '1',
          qty: 1
        })
      );
    });

    it('should be able to updateCartEntry with quantity = 0', () => {
      spyOn(store, 'dispatch').and.stub();
      cartData.userId = userId;
      cartData.cart = cart;
      cartData.cartId = cart.code;
      service.updateCartEntry('1', 0);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.RemoveEntry({
          userId: userId,
          cartId: cart.code,
          entry: '1'
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

      service.removeCartEntry(mockCartEntry);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.RemoveEntry({
          userId: userId,
          cartId: cart.code,
          entry: mockCartEntry.entryNumber
        })
      );
    });
  });

  describe('isCartCreated', () => {
    it('should return false, when argument is empty object', () => {
      expect(service.isCartCreated({})).toBe(false);
    });

    it('should return true, when argument is an non-empty object', () => {
      expect(service.isCartCreated({ guid: 'hash' })).toBe(true);
      expect(service.isCartCreated({ totalItems: 0 })).toBe(true);
      expect(service.isCartCreated({ totalItems: 99 })).toBe(true);
    });
  });

  describe('isCartEmpty', () => {
    it('should return true, when argument is an empty object', () => {
      expect(service.isCartEmpty({})).toBe(true);
    });

    it('should return true, when totalItems property of argument is 0', () => {
      expect(service.isCartEmpty({ totalItems: 0 })).toBe(true);
    });

    it('should return false, when totalItems property of argument is greater than 0', () => {
      expect(service.isCartEmpty({ totalItems: 1 })).toBe(false);
      expect(service.isCartEmpty({ totalItems: 99 })).toBe(false);
    });
  });

  describe('getLoaded', () => {
    it('should return a loaded state', () => {
      store.dispatch(new fromCart.CreateCartSuccess(cart));
      let result;
      service.loaded$.subscribe(value => (result = value)).unsubscribe();
      expect(result).toEqual(true);
    });
  });

  describe('getEntry', () => {
    it('should return an entry', () => {
      const testCart: Cart = <Cart>{
        entries: [
          { product: { code: 'code1' } },
          { product: { code: 'code2' } }
        ]
      };
      store.dispatch(new fromCart.LoadCartSuccess(testCart));

      let result;
      service
        .getEntry('code1')
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toEqual(testCart.entries[0]);
    });
  });

  describe('getCartMergeComplete', () => {
    it('should return true when the merge is complete', () => {
      store.dispatch(new fromCart.MergeCartSuccess());
      let result;
      service.cartMergeComplete$
        .subscribe(mergeComplete => (result = mergeComplete))
        .unsubscribe();
      expect(result).toEqual(true);
    });
  });
});

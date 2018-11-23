import { TestBed } from '@angular/core/testing';

import { StoreModule, Store } from '@ngrx/store';

import { Cart } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { AuthService } from '../../auth';
import * as fromCart from '../../cart/store';
import {
  LoadCartSuccess,
  AddEntrySuccess,
  CreateCartSuccess,
  MergeCartSuccess
} from '../../cart/store';
import { UserToken } from '../../auth/models/token-types.model';

import { CartDataService, ANONYMOUS_USERID } from './cart-data.service';
import { CartService } from './cart.service';

class CartDataServiceStub {}

class AuthServiceStub {
  userToken$: Observable<UserToken> = of();
}

xdescribe('CartService', () => {
  let service: CartService;
  let cartData: CartDataService;
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
  const mockCartEntry: any = { entryNumber: 0, product: { code: productCode } };

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

  describe('initCart', () => {
    it('should init cart for login user who has session cart', () => {
      authService.userToken$ = of(userToken);
      store.dispatch(new LoadCartSuccess(cart));
      store.dispatch(new AddEntrySuccess('foo'));
      const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

      service.initCart();
      expect(cartData.cart).toEqual(cart);
      expect(cartData.userId).toEqual(userToken.userId);
      expect(dispatchSpy.calls.allArgs()).toEqual([
        [
          new fromCart.MergeCart({
            userId: userToken.userId,
            cartId: cart.guid
          })
        ],
        [
          new fromCart.LoadCart({
            userId: userToken.userId,
            cartId: undefined,
            details: true
          })
        ]
      ]);
    });

    it('should init cart for login user who does not have session cart', () => {
      authService.userToken$ = of(userToken);
      spyOn(store, 'dispatch').and.callThrough();

      service.initCart();
      expect(cartData.cart).toEqual({});
      expect(cartData.userId).toBe(userToken.userId);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.LoadCart({
          userId: userToken.userId,
          cartId: 'current'
        })
      );
    });

    it('should init cart for anonymous user', () => {
      cartData.userId = 'foo';
      authService.userToken$ = of(<UserToken>{});

      service.initCart();
      expect(cartData.cart).toEqual({});
      expect(cartData.userId).toBe('anonymous');
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
      cartData.userId = ANONYMOUS_USERID;
      cartData.cart = cart;

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
      store.dispatch(new LoadCartSuccess(cart));
      spyOn(store, 'dispatch').and.callThrough();

      cartData.userId = userId;
      cartData.cart = {};
      service.addCartEntry(productCode, 2);

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.CreateCart({
          userId: userId
        })
      );

      service.initCart();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.AddEntry({
          userId: userId,
          cartId: cart.code,
          productCode: productCode,
          quantity: 2
        })
      );
    });
  });

  describe('update CartEntry', () => {
    it('should be able to updateCartEntry with quantity <> 0', () => {
      spyOn(store, 'dispatch').and.stub();

      cartData.userId = userId;
      cartData.cart = cart;
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
      store.dispatch(new CreateCartSuccess(cart));
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
      store.dispatch(new LoadCartSuccess(testCart));

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
      store.dispatch(new MergeCartSuccess());
      let result;
      service.cartMergeComplete$
        .subscribe(mergeComplete => (result = mergeComplete))
        .unsubscribe();
      expect(result).toEqual(true);
    });
  });
});

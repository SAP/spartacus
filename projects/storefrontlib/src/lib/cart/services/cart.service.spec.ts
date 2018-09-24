import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRoot from '../../routing/store';
import * as fromCart from '../../cart/store';
import * as fromUser from '../../user/store';
import * as fromAuth from '../../auth/store';

import { CartService } from './cart.service';
import { UserToken } from '../../auth/models/token-types.model';
import { CartDataService } from './cart-data.service';

describe('CartService', () => {
  let service: CartService;
  let cartData: CartDataService;
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
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        })
      ],
      providers: [CartService, CartDataService]
    });

    service = TestBed.get(CartService);
    cartData = TestBed.get(CartDataService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should CartService is injected', inject(
    [CartService],
    (cartService: CartService) => {
      expect(cartService).toBeTruthy();
    }
  ));

  describe('initCart', () => {
    it('should init cart for login user who has session cart', () => {
      spyOn(store, 'select').and.returnValues(
        of(cart),
        of(userToken),
        of(true)
      );
      service.initCart();
      expect(cartData.cart).toBe(cart);
      expect(cartData.userId).toBe(userToken.userId);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.MergeCart({
          userId: userToken.userId,
          cartId: cart.guid
        })
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.LoadCart({
          userId: userToken.userId,
          cartId: cart.code,
          details: true
        })
      );
    });

    it('should init cart for login user who does not have session cart', () => {
      spyOn(store, 'select').and.returnValues(of({}), of(userToken), of(false));
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
      spyOn(store, 'select').and.returnValues(of({}), of({}), of(false));
      service.initCart();
      expect(cartData.cart).toEqual({});
      expect(cartData.userId).toBe('anonymous');
    });
  });

  describe('Load cart details', () => {
    it('should be able to load cart with more details', () => {
      cartData.userId = userId;
      cartData.cart = cart;

      service.loadCartDetails();

      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCart.LoadCart({
          userId: userId,
          cartId: cart.code,
          details: true
        })
      );
    });
  });

  describe('add CartEntry', () => {
    it('should be able to addCartEntry if cart exists', () => {
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
      spyOn(store, 'select').and.returnValue(of(cart));
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
});

import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../auth/facade/auth.service';
import { CartDataService } from './cart-data.service';
import { Observable, ReplaySubject } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { StateWithCart, CartActions } from '../store/index';
import { Type } from '@angular/core';
import * as fromReducers from '../store/reducers/index';
import { UserToken } from '../../auth/models/token-types.model';
import { ANONYMOUS_USERID } from './cart-data.service';
import { Cart } from '../../model/cart.model';

const userToken$ = new ReplaySubject<UserToken | any>();

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return userToken$.asObservable();
  }
}

const testUserToken: UserToken = {
  access_token: 'access_token',
  userId: 'userId',
  refresh_token: 'refresh_token',
  token_type: 'token_type',
  expires_in: 1,
  scope: ['scope'],
};
const testCart: Cart = {
  totalItems: 2,
  guid: 'testGuid',
  code: 'testCode',
};

describe('CartDataService', () => {
  let service: CartDataService;
  let store: Store<StateWithCart>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromReducers.getReducers()),
      ],
      providers: [
        CartDataService,
        {
          provide: AuthService,
          useClass: AuthServiceStub,
        },
      ],
    });
    service = TestBed.get(CartDataService as Type<CartDataService>);
    store = TestBed.get(Store as Type<Store<StateWithCart>>);
  });

  describe('userId', () => {
    it('should return ANONYMOUS_USERID when user not logged in', () => {
      expect(service.userId).toEqual(ANONYMOUS_USERID);
      userToken$.next({});
      expect(service.userId).toEqual(ANONYMOUS_USERID);
    });

    it('should return userId when user logged in', () => {
      expect(service.userId).toEqual(ANONYMOUS_USERID);
      userToken$.next(testUserToken);
      expect(service.userId).toEqual(testUserToken.userId);
    });
  });

  describe('cart', () => {
    it('should return current cart', () => {
      expect(service.cart).toEqual({});
      store.dispatch(new CartActions.CreateCartSuccess(testCart));
      expect(service.cart).toEqual(testCart);
    });
  });

  describe('hasCart', () => {
    it('should check if cart exists', () => {
      store.dispatch(new CartActions.ClearCart());
      expect(service.hasCart).toEqual(false);
      store.dispatch(new CartActions.CreateCartSuccess(testCart));
      expect(service.hasCart).toEqual(true);
    });
  });

  describe('cartId', () => {
    it('should return cart guid for anonymous user', () => {
      userToken$.next({});
      store.dispatch(new CartActions.CreateCartSuccess(testCart));
      expect(service.cartId).toEqual(testCart.guid);
    });

    it('should return code for logged user', () => {
      userToken$.next(testUserToken);
      store.dispatch(new CartActions.CreateCartSuccess(testCart));
      expect(service.cartId).toEqual(testCart.code);
    });
  });
});

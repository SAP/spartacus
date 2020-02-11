import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../../auth/facade/auth.service';
import { UserToken } from '../../auth/models/token-types.model';
import { Cart } from '../../model/cart.model';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../occ/utils/occ-constants';
import * as DeprecatedCartActions from '../store/actions/cart.action';
import { StateWithCart } from '../store/index';
import * as fromReducers from '../store/reducers/index';
import { CartDataService } from './cart-data.service';

const userToken$ = new ReplaySubject<UserToken | any>();
const occUserId$ = new BehaviorSubject<string>(OCC_USER_ID_ANONYMOUS);

class AuthServiceStub {
  getUserToken(): Observable<UserToken> {
    return userToken$.asObservable();
  }
  getOccUserId(): Observable<string> {
    return occUserId$.asObservable();
  }
}

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
    it('should return OCC_USER_ID_ANONYMOUS when user not logged in', () => {
      expect(service.userId).toEqual(OCC_USER_ID_ANONYMOUS);
      occUserId$.next(OCC_USER_ID_ANONYMOUS);
      expect(service.userId).toEqual(OCC_USER_ID_ANONYMOUS);
    });

    it('should return userId when user logged in', () => {
      expect(service.userId).toEqual(OCC_USER_ID_ANONYMOUS);
      occUserId$.next(OCC_USER_ID_CURRENT);
      expect(service.userId).toEqual(OCC_USER_ID_CURRENT);
    });
  });

  describe('cart', () => {
    it('should return current cart', () => {
      expect(service.cart).toEqual({});
      store.dispatch(new DeprecatedCartActions.CreateCartSuccess(testCart));
      expect(service.cart).toEqual(testCart);
    });
  });

  describe('hasCart', () => {
    it('should check if cart exists', () => {
      store.dispatch(new DeprecatedCartActions.ClearCart());
      expect(service.hasCart).toEqual(false);
      store.dispatch(new DeprecatedCartActions.CreateCartSuccess(testCart));
      expect(service.hasCart).toEqual(true);
    });
  });

  describe('cartId', () => {
    it('should return cart guid for anonymous user', () => {
      occUserId$.next(OCC_USER_ID_ANONYMOUS);
      store.dispatch(new DeprecatedCartActions.CreateCartSuccess(testCart));
      expect(service.cartId).toEqual(testCart.guid);
    });

    it('should return code for logged user', () => {
      occUserId$.next(OCC_USER_ID_CURRENT);
      // .next(testUserToken);
      store.dispatch(new DeprecatedCartActions.CreateCartSuccess(testCart));
      expect(service.cartId).toEqual(testCart.code);
    });
  });

  describe('isGuestCart', () => {
    it('should be able to check cart owned by guest or not', () => {
      store.dispatch(
        new DeprecatedCartActions.CreateCartSuccess({
          guid: 'guid',
          code: 'code',
          user: { name: 'anonymous', uid: 'anonymous' },
        })
      );
      expect(service.isGuestCart).toBeFalsy();

      store.dispatch(
        new DeprecatedCartActions.CreateCartSuccess({
          guid: 'guid',
          code: 'code',
          user: { name: 'guest' },
        })
      );
      expect(service.isGuestCart).toBeTruthy();

      store.dispatch(
        new DeprecatedCartActions.CreateCartSuccess({
          guid: 'guid',
          code: 'code',
          user: { name: 'test', uid: 'use-guid|test@test.com' },
        })
      );
      expect(service.isGuestCart).toBeTruthy();
    });
  });
});

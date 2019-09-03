import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/index';
import { CartActions } from '../../cart/store/actions/index';
import { StateWithCart } from '../store/cart-state';
import * as fromReducers from '../../cart/store/reducers/index';
import { CartDataService } from './cart-data.service';
import createSpy = jasmine.createSpy;

const userToken = new BehaviorSubject({});
const mockAuthService = {
  getUserToken: createSpy().and.returnValue(userToken),
};

describe('CartDataService', () => {
  let cartData: CartDataService;
  let store: Store<StateWithCart>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromReducers.getReducers()),
      ],
      providers: [
        CartDataService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    cartData = TestBed.get(CartDataService as Type<CartDataService>);
    store = TestBed.get(Store as Type<Store<StateWithCart>>);
  });

  it('should CartDataService is injected', () => {
    expect(cartData).toBeTruthy();
  });

  it('should return userId when user login (token exist)', () => {
    userToken.next({
      userId: 'test',
    });
    expect(cartData.userId).toEqual('test');
  });

  it('should return anonymous when user not login', () => {
    userToken.next({});
    expect(cartData.userId).toEqual('anonymous');
  });

  it('should able to get cartId', () => {
    store.dispatch(
      new CartActions.CreateCartSuccess({ guid: 'guid', code: 'code' })
    );

    userToken.next({
      userId: 'test',
    });
    expect(cartData.cartId).toEqual('code');

    userToken.next({});
    expect(cartData.cartId).toEqual('guid');
  });

  it('should able to check has cart or not', () => {
    store.dispatch(
      new CartActions.CreateCartSuccess({ guid: 'guid', code: 'code' })
    );
    expect(cartData.hasCart).toBeTruthy();
  });

  it('should able to get cart data', () => {
    store.dispatch(
      new CartActions.CreateCartSuccess({ guid: 'guid', code: 'code' })
    );
    expect(cartData.cart).toEqual({ guid: 'guid', code: 'code' });
  });

  it('should be able to check cart owned by guest or not', () => {
    store.dispatch(
      new CartActions.CreateCartSuccess({
        guid: 'guid',
        code: 'code',
        user: { name: 'anonymous', uid: 'anonymous' },
      })
    );
    expect(cartData.isGuestCart).toBeFalsy();

    store.dispatch(
      new CartActions.CreateCartSuccess({
        guid: 'guid',
        code: 'code',
        user: { name: 'guest' },
      })
    );
    expect(cartData.isGuestCart).toBeTruthy();

    store.dispatch(
      new CartActions.CreateCartSuccess({
        guid: 'guid',
        code: 'code',
        user: { name: 'test', uid: 'use-guid|test@test.com' },
      })
    );
    expect(cartData.isGuestCart).toBeTruthy();
  });
});

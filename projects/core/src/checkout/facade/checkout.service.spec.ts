import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthService } from '../../auth/facade/auth.service';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import { Cart } from '../../model/cart.model';
import { Order } from '../../model/order.model';
import { ORDER_TYPE } from '../../model/replenishment-order.model';
import { CheckoutActions } from '../store/actions/index';
import { CheckoutState, CHECKOUT_FEATURE } from '../store/checkout-state';
import * as CheckoutActionsReducers from '../store/reducers/index';
import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let activeCartService: ActiveCartService;
  let authService: AuthService;
  let store: Store<CheckoutState>;
  const userId = 'testUserId';
  const cart: Cart = { code: 'testCartId', guid: 'testGuid' };

  class ActiveCartServiceStub {
    cart;
    isGuestCart() {
      return true;
    }

    getActiveCartId() {
      return of(cart.code);
    }
  }

  class AuthServiceStub {
    userId;
    getOccUserId() {
      return of(userId);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CHECKOUT_FEATURE,
          CheckoutActionsReducers.getReducers()
        ),
      ],
      providers: [
        CheckoutService,
        { provide: ActiveCartService, useClass: ActiveCartServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    });

    service = TestBed.inject(CheckoutService);
    store = TestBed.inject(Store);
    activeCartService = TestBed.inject(ActiveCartService);
    authService = TestBed.inject(AuthService);

    authService['userId'] = userId;
    activeCartService['cart'] = cart;

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should CheckoutService is injected', inject(
    [CheckoutService],
    (checkoutService: CheckoutService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  it('should be able to get the order details', () => {
    store.dispatch(
      new CheckoutActions.PlaceOrderSuccess({ code: 'testOrder' })
    );

    let orderDetails: Order;
    service
      .getOrderDetails()
      .subscribe((data) => {
        orderDetails = data;
      })
      .unsubscribe();
    expect(orderDetails).toEqual({ code: 'testOrder' });
  });

  it('should be able to place order', () => {
    service.placeOrder();

    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.PlaceOrder({
        userId: userId,
        cartId: cart.code,
      })
    );
  });

  it('should be able to clear checkout data', () => {
    service.clearCheckoutData();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.ClearCheckoutData()
    );
  });

  it('should be able to clear checkout step', () => {
    service.clearCheckoutStep(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.ClearCheckoutStep(2)
    );
  });

  it('should be able to load checkout details', () => {
    const cartId = cart.code;
    service.loadCheckoutDetails(cartId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.LoadCheckoutDetails({ userId, cartId })
    );
  });

  describe('get checkout details loaded', () => {
    it('should return true for success', () => {
      store.dispatch(
        new CheckoutActions.LoadCheckoutDetailsSuccess({ deliveryAddress: {} })
      );

      let loaded: boolean;
      service
        .getCheckoutDetailsLoaded()
        .subscribe((data) => {
          loaded = data;
        })
        .unsubscribe();
      expect(loaded).toBeTruthy();
    });
  });

  it('should return false for fail', () => {
    store.dispatch(new CheckoutActions.LoadCheckoutDetailsFail(new Error()));

    let loaded: boolean;
    service
      .getCheckoutDetailsLoaded()
      .subscribe((data) => {
        loaded = data;
      })
      .unsubscribe();
    expect(loaded).toBeFalsy();
  });

  it('should allow actions for login user or guest user', () => {
    authService['userId'] = 'anonymous';
    expect(service['actionAllowed']()).toBeTruthy();
  });

  it('should set checkout order type', () => {
    service.setOrderType(ORDER_TYPE.PLACE_ORDER);
    expect(store.dispatch).toHaveBeenCalledWith(
      new CheckoutActions.SetOrderType(ORDER_TYPE.PLACE_ORDER)
    );
  });

  it('should be able to get the current order type', () => {
    store.dispatch(
      new CheckoutActions.SetOrderType(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER)
    );

    let result: ORDER_TYPE;
    service
      .getCurrentOrderType()
      .subscribe((data) => {
        result = data;
      })
      .unsubscribe();
    expect(result).toEqual(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER);
  });
});

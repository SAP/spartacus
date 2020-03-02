import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CartDataService } from '../../cart/facade/cart-data.service';
import { Cart } from '../../model/cart.model';
import { Order } from '../../model/order.model';
import { CheckoutActions } from '../store/actions/index';
import { CHECKOUT_FEATURE, CheckoutState } from '../store/checkout-state';
import * as CheckoutActionsReducers from '../store/reducers/index';
import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let cartData: CartDataServiceStub;
  let store: Store<CheckoutState>;
  const userId = 'testUserId';
  const cart: Cart = { code: 'testCartId', guid: 'testGuid' };

  class CartDataServiceStub {
    userId;
    cart;
    get cartId() {
      return this.cart.code;
    }
    get isGuestCart() {
      return true;
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
        { provide: CartDataService, useClass: CartDataServiceStub },
      ],
    });

    service = TestBed.inject(CheckoutService);
    cartData = TestBed.inject(CartDataService);
    store = TestBed.inject(Store);

    cartData.userId = userId;
    cartData.cart = cart;

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
      .subscribe(data => {
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
        .subscribe(data => {
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
      .subscribe(data => {
        loaded = data;
      })
      .unsubscribe();
    expect(loaded).toBeFalsy();
  });

  it('should allow actions for login user or guest user', () => {
    cartData.userId = 'anonymous';
    expect(service['actionAllowed']()).toBeTruthy();
  });
});

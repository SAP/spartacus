import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CartDataService } from '@spartacus/core';
import { Cart } from '../../model/cart.model';
import { Order } from '../../model/order.model';
import * as fromCheckout from '../store/index';
import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let cartData: CartDataService;
  let store: Store<fromCheckout.CheckoutState>;
  const userId = 'testUserId';
  const cart: Cart = { code: 'testCartId', guid: 'testGuid' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromCheckout.getReducers()),
      ],
      providers: [CheckoutService, CartDataService],
    });

    service = TestBed.get(CheckoutService);
    cartData = TestBed.get(CartDataService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should CheckoutService is injected', inject(
    [CheckoutService],
    (checkoutService: CheckoutService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  it('should be able to get the order details', () => {
    store.dispatch(new fromCheckout.PlaceOrderSuccess({ code: 'testOrder' }));

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
    cartData.userId = userId;
    cartData.cart = cart;

    service.placeOrder();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.PlaceOrder({
        userId: userId,
        cartId: cart.code,
      })
    );
  });

  it('should be able to clear checkout data', () => {
    service.clearCheckoutData();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.ClearCheckoutData()
    );
  });

  it('should be able to clear checkout step', () => {
    service.clearCheckoutStep(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.ClearCheckoutStep(2)
    );
  });

  it('should be able to load checkout details', () => {
    const cartId = cart.code;
    cartData.userId = userId;
    service.loadCheckoutDetails(cartId);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.LoadCheckoutDetails({ userId, cartId })
    );
  });

  describe('get checkout details loaded', () => {
    it('should return true for success', () => {
      store.dispatch(
        new fromCheckout.LoadCheckoutDetailsSuccess({ deliveryAddress: {} })
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
    store.dispatch(new fromCheckout.LoadCheckoutDetailsFail(new Error()));

    let loaded: boolean;
    service
      .getCheckoutDetailsLoaded()
      .subscribe(data => {
        loaded = data;
      })
      .unsubscribe();
    expect(loaded).toBeFalsy();
  });
});

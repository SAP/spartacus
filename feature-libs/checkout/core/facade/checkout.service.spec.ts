import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  Cart,
  Order,
  ORDER_TYPE,
  PROCESS_FEATURE,
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import * as fromProcessReducers from '../../../../projects/core/src/process/store/reducers/index';
import { CheckoutActions } from '../store/actions/index';
import { CHECKOUT_FEATURE, StateWithCheckout } from '../store/checkout-state';
import * as CheckoutActionsReducers from '../store/reducers/index';
import { CheckoutService } from './checkout.service';

const mockCartId = 'test-cart';
const mockTermsChecked = true;
const mockError = 'test-error';

const mockReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: 'test-number-days',
};

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

const mockOrder: Order = { code: 'testOrder', guestCustomer: true };

class ActiveCartServiceStub implements Partial<ActiveCartService> {
  isGuestCart(): boolean {
    return true;
  }

  getActiveCartId(): Observable<string> {
    return of(mockCartId);
  }
}

class UserIdServiceStub implements Partial<UserIdService> {
  userId;
  getUserId() {
    return of(this.userId);
  }
  takeUserId() {
    return of(this.userId);
  }
}

describe('CheckoutService', () => {
  let service: CheckoutService;
  let store: Store<StateWithCheckout | StateWithProcess<void>>;
  let activeCartService: ActiveCartService;
  let userIdService: UserIdService;
  const userId = 'testUserId';
  const cart: Cart = { code: 'testCartId', guid: 'testGuid' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CHECKOUT_FEATURE,
          CheckoutActionsReducers.getReducers()
        ),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        CheckoutService,
        { provide: ActiveCartService, useClass: ActiveCartServiceStub },
        { provide: UserIdService, useClass: UserIdServiceStub },
      ],
    });

    service = TestBed.inject(CheckoutService);
    activeCartService = TestBed.inject(ActiveCartService);
    userIdService = TestBed.inject(UserIdService);

    userIdService['userId'] = userId;
    activeCartService['cart'] = cart;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should CheckoutService is injected', inject(
    [CheckoutService],
    (checkoutService: CheckoutService) => {
      expect(checkoutService).toBeTruthy();
    }
  ));

  describe('Load checkout details for extensible checkout', () => {
    it('should be able to load checkout details', () => {
      service.loadCheckoutDetails(mockCartId);
      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.LoadCheckoutDetails({
          userId: userId,
          cartId: mockCartId,
        })
      );
    });

    describe('get checkout details success', () => {
      it('should return true for success', () => {
        store.dispatch(
          new CheckoutActions.LoadCheckoutDetailsSuccess({
            deliveryAddress: {},
            deliveryMode: {},
            paymentInfo: {},
          })
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

      it('should return false for fail', () => {
        store.dispatch(
          new CheckoutActions.LoadCheckoutDetailsFail(new Error())
        );

        let loaded: boolean;
        service
          .getCheckoutDetailsLoaded()
          .subscribe((data) => {
            loaded = data;
          })
          .unsubscribe();
        expect(loaded).toBeFalsy();
      });
    });

    describe('is loading', () => {
      it('should return true in case loading was triggered', () => {
        store.dispatch(
          new CheckoutActions.LoadCheckoutDetails({
            userId: userId,
            cartId: cart.code,
          })
        );

        let loaded: boolean;
        service
          .isLoading()
          .subscribe((data) => {
            loaded = data;
          })
          .unsubscribe();
        expect(loaded).toBeTruthy();
      });
    });

    it('should return false in case checkout load failed', () => {
      store.dispatch(new CheckoutActions.LoadCheckoutDetailsFail(new Error()));

      let loaded: boolean;
      service
        .isLoading()
        .subscribe((data) => {
          loaded = data;
        })
        .unsubscribe();
      expect(loaded).toBeFalsy();
    });
  });

  describe('Type of order', () => {
    it('should set checkout order type', () => {
      service.setOrderType(ORDER_TYPE.PLACE_ORDER);
      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.SetOrderType(ORDER_TYPE.PLACE_ORDER)
      );
    });

    it('should be able to get the current order type', () => {
      store.dispatch(
        new CheckoutActions.SetOrderType(
          ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER
        )
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

  describe('Place an order', () => {
    it('should be able to place order', () => {
      service.placeOrder(mockTermsChecked);

      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.PlaceOrder({
          userId: userId,
          cartId: mockCartId,
          termsChecked: mockTermsChecked,
        })
      );
    });

    it('should return the loading flag', () => {
      store.dispatch(new CheckoutActions.PlaceOrderSuccess(mockOrder));

      let result: boolean;

      service
        .getPlaceOrderLoading()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should return the success flag', () => {
      store.dispatch(new CheckoutActions.PlaceOrderSuccess(mockOrder));

      let result: boolean;

      service
        .getPlaceOrderSuccess()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the error flag', () => {
      store.dispatch(new CheckoutActions.PlaceOrderFail(mockError));

      let result: boolean;

      service
        .getPlaceOrderError()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should be able to get the order details when placing an order', () => {
      store.dispatch(new CheckoutActions.PlaceOrderSuccess(mockOrder));

      let orderDetails: Order;
      service
        .getOrderDetails()
        .subscribe((data) => {
          orderDetails = data;
        })
        .unsubscribe();
      expect(orderDetails).toEqual(mockOrder);
    });
  });

  describe('Schedule a replenishment order', () => {
    it('should be able to schedule replenishment order', () => {
      service.scheduleReplenishmentOrder(
        mockReplenishmentOrderFormData,
        mockTermsChecked
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.ScheduleReplenishmentOrder({
          cartId: mockCartId,
          scheduleReplenishmentForm: mockReplenishmentOrderFormData,
          termsChecked: mockTermsChecked,
          userId: userId,
        })
      );
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new CheckoutActions.ScheduleReplenishmentOrderSuccess(
          mockReplenishmentOrder
        )
      );

      let result: boolean;

      service
        .getPlaceOrderLoading()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should return the success flag', () => {
      store.dispatch(
        new CheckoutActions.ScheduleReplenishmentOrderSuccess(
          mockReplenishmentOrder
        )
      );

      let result: boolean;

      service
        .getPlaceOrderSuccess()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should return the error flag', () => {
      store.dispatch(
        new CheckoutActions.ScheduleReplenishmentOrderFail(mockError)
      );

      let result: boolean;

      service
        .getPlaceOrderError()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should be able to get the order details when scheduling an order', () => {
      const mockReplenishmentOrderDetails: ReplenishmentOrder = {
        active: true,
        purchaseOrderNumber: 'test-po',
        replenishmentOrderCode: 'test-repl-order',
      };

      store.dispatch(
        new CheckoutActions.ScheduleReplenishmentOrderSuccess(
          mockReplenishmentOrderDetails
        )
      );

      let orderDetails: ReplenishmentOrder;
      service
        .getOrderDetails()
        .subscribe((data) => {
          orderDetails = data;
        })
        .unsubscribe();

      expect(orderDetails).toEqual(mockReplenishmentOrderDetails);
    });
  });

  describe('Clearing data from state', () => {
    it('should dispatch a ClearPlaceOrder action', () => {
      service.clearPlaceOrderState();

      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.ClearPlaceOrder()
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
  });

  describe('actionAllowed', () => {
    it('should allow actions for login user or guest user', () => {
      userIdService['userId'] = 'anonymous';

      expect(service['actionAllowed']()).toBeTruthy();
    });
  });
});

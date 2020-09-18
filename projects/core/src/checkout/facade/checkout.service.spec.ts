import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/facade/auth.service';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import { Order } from '../../model/order.model';
import {
  ORDER_TYPE,
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../model/replenishment-order.model';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../occ/utils/occ-constants';
import {
  PROCESS_FEATURE,
  StateWithProcess,
} from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { CheckoutActions } from '../store/actions/index';
import { CHECKOUT_FEATURE, StateWithCheckout } from '../store/checkout-state';
import * as CheckoutActionsReducers from '../store/reducers/index';
import { CheckoutService } from './checkout.service';

const mockCartId = 'test-cart';
const mockTermsChecked = true;
const mockUserId = OCC_USER_ID_CURRENT;
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

class MockActiveCartServiceStub {
  isGuestCart(): boolean {
    return true;
  }

  getActiveCartId(): Observable<string> {
    return of(mockCartId);
  }
}

class MockAuthServiceStub {
  getOccUserId(): Observable<string> {
    return of(mockUserId);
  }
  invokeWithUserId(cb) {
    cb(mockUserId);
  }
}

describe('CheckoutService', () => {
  let service: CheckoutService;
  let authService: AuthService;
  let store: Store<StateWithCheckout | StateWithProcess<void>>;

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
        { provide: ActiveCartService, useClass: MockActiveCartServiceStub },
        { provide: AuthService, useClass: MockAuthServiceStub },
      ],
    });

    service = TestBed.inject(CheckoutService);
    authService = TestBed.inject(AuthService);
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
          userId: mockUserId,
          cartId: mockCartId,
        })
      );
    });

    describe('get checkout details success', () => {
      it('should return true for success', () => {
        store.dispatch(
          new CheckoutActions.LoadCheckoutDetailsSuccess({
            deliveryAddress: {},
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
      service.placeOrder();

      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.PlaceOrder({
          userId: mockUserId,
          cartId: mockCartId,
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
          userId: mockUserId,
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
      spyOn(authService, 'getOccUserId').and.returnValue(
        of(OCC_USER_ID_ANONYMOUS)
      );

      expect(service['actionAllowed']()).toBeTruthy();
    });
  });
});

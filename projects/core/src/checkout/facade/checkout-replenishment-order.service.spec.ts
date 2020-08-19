import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthService } from '../../auth/facade/auth.service';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../model/replenishment-order.model';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import {
  PROCESS_FEATURE,
  StateWithProcess,
} from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { CheckoutActions } from '../store/actions/index';
import { CHECKOUT_FEATURE, StateWithCheckout } from '../store/checkout-state';
import * as fromStoreReducers from '../store/reducers/index';
import { CheckoutReplenishmentOrderService } from './checkout-replenishment-order.service';

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

class MockAuthService {
  invokeWithUserId(cb) {
    cb(mockUserId);
  }
}

class MockActiveCartService {
  getActiveCartId() {
    return of(mockCartId);
  }
}

describe('Checkout Replenishment Order Service', () => {
  let service: CheckoutReplenishmentOrderService;
  let store: Store<StateWithCheckout | StateWithProcess<void>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          CHECKOUT_FEATURE,
          fromStoreReducers.getReducers()
        ),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        CheckoutReplenishmentOrderService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
      ],
    });
  }));

  beforeEach(() => {
    service = TestBed.inject(CheckoutReplenishmentOrderService);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
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

    it('should get the replenishment order details after successfully scheduling an order', () => {
      store.dispatch(
        new CheckoutActions.ScheduleReplenishmentOrderSuccess(
          mockReplenishmentOrder
        )
      );

      let result: ReplenishmentOrder;
      service
        .getReplenishmentOrderDetails()
        .subscribe((data) => {
          result = data;
        })
        .unsubscribe();

      expect(result).toEqual(mockReplenishmentOrder);
    });

    it('should return the loading flag', () => {
      store.dispatch(
        new CheckoutActions.ScheduleReplenishmentOrderSuccess(
          mockReplenishmentOrder
        )
      );

      let result: boolean;

      service
        .getScheduleReplenishmentOrderLoading()
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
        .getScheduleReplenishmentOrderSuccess()
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
        .getScheduleReplenishmentOrderError()
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });

    it('should dispatch a ClearScheduleReplenishmentOrderAction action', () => {
      service.clearScheduleReplenishmentOrderState();

      expect(store.dispatch).toHaveBeenCalledWith(
        new CheckoutActions.ClearScheduleReplenishmentOrderAction()
      );
    });
  });
});

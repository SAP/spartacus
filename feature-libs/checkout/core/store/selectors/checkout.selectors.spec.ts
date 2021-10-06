import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Order, ReplenishmentOrder } from '@spartacus/core';
import { CheckoutActions } from '../actions/index';
import { CHECKOUT_FEATURE, StateWithCheckout } from '../checkout-state';
import * as fromReducers from '../reducers/index';
import { CheckoutSelectors } from '../selectors/index';

describe('Checkout Selectors', () => {
  let store: Store<StateWithCheckout>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CHECKOUT_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getOrderDetails', () => {
    it('should return order details', () => {
      let result: Order;
      const orderDetails: Order = {
        code: 'testOrder123',
      };

      store
        .pipe(select(CheckoutSelectors.getCheckoutOrderDetails))
        .subscribe((value) => (result = value));

      expect(result).toEqual({});

      store.dispatch(new CheckoutActions.PlaceOrderSuccess(orderDetails));

      expect(result).toEqual(orderDetails);
    });
  });

  describe('getPoNumer', () => {
    it('should get the po number', () => {
      let result: string;
      store
        .pipe(select(CheckoutSelectors.getPoNumer))
        .subscribe((value) => (result = value));
      expect(result).toEqual(undefined);

      store.dispatch(
        new CheckoutActions.SetPaymentTypeSuccess({
          code: 'testCart',
          purchaseOrderNumber: 'testNumber',
          paymentType: { code: 'ACCOUNT' },
        })
      );
      expect(result).toEqual('testNumber');
    });
  });

  describe('getCostCenter', () => {
    it('should get the cost center of cart', () => {
      let result: string;
      store
        .pipe(select(CheckoutSelectors.getCostCenter))
        .subscribe((value) => (result = value));
      expect(result).toEqual(undefined);

      store.dispatch(
        new CheckoutActions.SetCostCenterSuccess('testCostCenterId')
      );
      expect(result).toEqual('testCostCenterId');
    });
  });

  describe('getCheckoutReplenishmentOrderDetails', () => {
    it('should return replenishment order details', () => {
      let result: ReplenishmentOrder;
      const replenishmentOrderDetails: ReplenishmentOrder = {
        active: true,
        purchaseOrderNumber: 'test-po',
        replenishmentOrderCode: 'test-repl-order',
      };

      store
        .pipe(select(CheckoutSelectors.getCheckoutOrderDetails))
        .subscribe((value) => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new CheckoutActions.ScheduleReplenishmentOrderSuccess(
          replenishmentOrderDetails
        )
      );

      expect(result).toEqual(replenishmentOrderDetails);
    });
  });
});

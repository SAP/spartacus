import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import {
  Address,
  DeliveryMode,
  Order,
  PaymentDetails,
  ReplenishmentOrder,
} from '@spartacus/core';
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

  describe('getDeliveryAddress', () => {
    it('should return the cart delivery address', () => {
      const address: Address = {
        id: 'testAddressId',
        firstName: 'John',
        lastName: 'Doe',
        titleCode: 'mr',
        line1: 'Toyosaki 2 create on cart',
        town: 'Montreal',
        postalCode: 'L6M1P9',
        country: { isocode: 'CA' },
      };

      let result: Address;
      store
        .pipe(select(CheckoutSelectors.getDeliveryAddress))
        .subscribe((value) => (result = value));

      expect(result).toEqual({});

      store.dispatch(new CheckoutActions.AddDeliveryAddressSuccess(address));

      expect(result).toEqual(address);
    });
  });

  describe('getDeliveryMode', () => {
    it('should return the cart delivery mode', () => {
      const modes: DeliveryMode[] = [{ code: 'code1' }, { code: 'code2' }];

      const emptyEntities = {
        supported: {},
        selected: '',
      };

      const entities = {
        supported: {
          code1: modes[0],
          code2: modes[1],
        },
        selected: '',
      };

      let result;
      store
        .pipe(select(CheckoutSelectors.getDeliveryMode))
        .subscribe((value) => (result = value));

      expect(result).toEqual(emptyEntities);

      store.dispatch(
        new CheckoutActions.LoadSupportedDeliveryModesSuccess(modes)
      );

      expect(result).toEqual(entities);
    });
  });

  describe('getSupportedDeliveryModes', () => {
    it('should return all supported cart delivery modes', () => {
      const modes: DeliveryMode[] = [{ code: 'code1' }, { code: 'code2' }];

      let result: DeliveryMode[];
      store
        .pipe(select(CheckoutSelectors.getSupportedDeliveryModes))
        .subscribe((value) => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new CheckoutActions.LoadSupportedDeliveryModesSuccess(modes)
      );

      expect(result).toEqual(modes);
    });
  });

  describe('getSelectedDeliveryMode', () => {
    it('should return selected cart delivery mode', () => {
      const modes: DeliveryMode[] = [{ code: 'code1' }, { code: 'code2' }];

      let result: DeliveryMode;
      store
        .pipe(select(CheckoutSelectors.getSelectedDeliveryMode))
        .subscribe((value) => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(
        new CheckoutActions.LoadSupportedDeliveryModesSuccess(modes)
      );
      store.dispatch(new CheckoutActions.SetDeliveryModeSuccess('code1'));

      expect(result).toEqual(modes[0]);
    });
  });

  describe('getSelectedDeliveryModeCode', () => {
    it('should return selected delivery mode code', () => {
      const modes: DeliveryMode[] = [{ code: 'code1' }, { code: 'code2' }];

      let result: string;
      store
        .pipe(select(CheckoutSelectors.getSelectedDeliveryModeCode))
        .subscribe((value) => (result = value));

      expect(result).toEqual('');

      store.dispatch(
        new CheckoutActions.LoadSupportedDeliveryModesSuccess(modes)
      );
      store.dispatch(new CheckoutActions.SetDeliveryModeSuccess('code1'));

      expect(result).toEqual('code1');
    });
  });

  describe('getPaymentDetails', () => {
    it('should return payment details', () => {
      let result: PaymentDetails;
      const paymentDetails: PaymentDetails = {
        id: 'mockPaymentDetails',
      };

      store
        .pipe(select(CheckoutSelectors.getPaymentDetails))
        .subscribe((value) => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new CheckoutActions.CreatePaymentDetailsSuccess(paymentDetails)
      );

      expect(result).toEqual(paymentDetails);
    });
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

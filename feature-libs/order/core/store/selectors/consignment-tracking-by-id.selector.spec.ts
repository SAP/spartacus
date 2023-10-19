import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { ConsignmentTracking, Order } from '@spartacus/order/root';
import { OrderSelectors } from '.';
import { OrderActions } from '../actions';
import { ORDER_FEATURE, StateWithOrder } from '../order-state';
import * as fromReducers from '../reducers';
const order1 = 'order1';
const order2 = 'order2';
const cons1 = 'cons1';
const cons2 = 'cons2';
const tracking1: ConsignmentTracking = {
  trackingID: 't1',
  trackingUrl: 'url1',
};
const tracking2: ConsignmentTracking = {
  trackingID: 't2',
  trackingUrl: 'url2',
};
const testEntities = {
  entities: {
    'order1,cons1': {
      loading: false,
      error: false,
      success: true,
      value: tracking1,
    },
    'order2,cons2': {
      loading: false,
      error: false,
      success: true,
      value: tracking2,
    },
  },
};
const entity = {
  loading: false,
  error: false,
  success: true,
  value: tracking2,
};
describe('Consignment Tracking By Id Selector', () => {
  let store: Store<StateWithOrder>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ORDER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getConsignmentTrackingByIdEntities', () => {
    it('should return consignment tracking by id', () => {
      let result: StateUtils.EntityLoaderState<ConsignmentTracking>;
      store
        .pipe(select(OrderSelectors.getConsignmentTrackingByIdEntities))
        .subscribe((value) => {
          result = value;
        });

      store.dispatch(
        new OrderActions.LoadConsignmentTrackingByIdSuccess({
          orderCode: order1,
          consignmentCode: cons1,
          consignmentTracking: tracking1,
        })
      );
      store.dispatch(
        new OrderActions.LoadConsignmentTrackingByIdSuccess({
          orderCode: order2,
          consignmentCode: cons2,
          consignmentTracking: tracking2,
        })
      );
      expect(result).toEqual(testEntities);
    });
  });

  describe('getConsignmentTrackingByIdEntity', () => {
    it('should return consignment tracking by id', () => {
      let result: StateUtils.LoaderState<Order>;
      store
        .pipe(
          select(OrderSelectors.getConsignmentTrackingByIdEntity(order2, cons2))
        )
        .subscribe((value) => {
          result = value;
        });

      store.dispatch(
        new OrderActions.LoadConsignmentTrackingByIdSuccess({
          orderCode: order1,
          consignmentCode: cons1,
          consignmentTracking: tracking1,
        })
      );
      store.dispatch(
        new OrderActions.LoadConsignmentTrackingByIdSuccess({
          orderCode: order2,
          consignmentCode: cons2,
          consignmentTracking: tracking2,
        })
      );
      expect(result).toEqual(entity);
    });
  });

  describe('getConsignmentTrackingById', () => {
    it('should return value of consignment tracking by id', () => {
      let result: ConsignmentTracking;
      store
        .pipe(select(OrderSelectors.getConsignmentTrackingById(order2, cons2)))
        .subscribe((value) => (result = value));

      store.dispatch(
        new OrderActions.LoadConsignmentTrackingByIdSuccess({
          orderCode: order1,
          consignmentCode: cons1,
          consignmentTracking: tracking1,
        })
      );
      store.dispatch(
        new OrderActions.LoadConsignmentTrackingByIdSuccess({
          orderCode: order2,
          consignmentCode: cons2,
          consignmentTracking: tracking2,
        })
      );
      expect(result).toEqual(entity.value);
    });
  });
  describe('getConsignmentTrackingByIdLoading', () => {
    it('should return loading state', () => {
      let result: boolean;
      store
        .pipe(
          select(
            OrderSelectors.getConsignmentTrackingByIdLoading(order2, cons2)
          )
        )
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);
      store.dispatch(
        new OrderActions.LoadConsignmentTrackingById({
          userId: 'current',
          orderCode: order1,
          consignmentCode: cons1,
        })
      );
      expect(result).toEqual(false);
      store.dispatch(
        new OrderActions.LoadConsignmentTrackingById({
          userId: 'current',
          orderCode: order2,
          consignmentCode: cons2,
        })
      );
      expect(result).toEqual(true);
    });
  });
  describe('getConsignmentTrackingByIdSuccess', () => {
    it('should return success state', () => {
      let result: boolean;
      store
        .pipe(
          select(
            OrderSelectors.getConsignmentTrackingByIdSuccess(order2, cons2)
          )
        )
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);
      store.dispatch(
        new OrderActions.LoadConsignmentTrackingByIdSuccess({
          orderCode: order1,
          consignmentCode: cons1,
          consignmentTracking: tracking1,
        })
      );
      expect(result).toEqual(false);
      store.dispatch(
        new OrderActions.LoadConsignmentTrackingByIdSuccess({
          orderCode: order2,
          consignmentCode: cons2,
          consignmentTracking: tracking2,
        })
      );
      expect(result).toEqual(true);
    });
  });
});

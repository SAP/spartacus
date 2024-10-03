import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { OrderSelectors } from '.';
import { OrderActions } from '../actions';
import { ORDER_FEATURE, StateWithOrder } from '../order-state';
import * as fromReducers from '../reducers';
const order1: Order = {
  code: 'order1',
  guid: 'xxxx',
};
const order2: Order = {
  code: 'order2',
  guid: 'yyyy',
};
const testEntities = {
  entities: {
    order1: {
      loading: false,
      error: false,
      success: true,
      value: {
        code: 'order1',
        guid: 'xxxx',
      },
    },
    order2: {
      loading: false,
      error: false,
      success: true,
      value: {
        code: 'order2',
        guid: 'yyyy',
      },
    },
  },
};
const entity = {
  loading: false,
  error: false,
  success: true,
  value: order2,
};
describe('Order By Id Selector', () => {
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

  describe('getOrderByIdEntities', () => {
    it('should return orders by id', () => {
      let result: StateUtils.EntityLoaderState<Order>;
      store
        .pipe(select(OrderSelectors.getOrderByIdEntities))
        .subscribe((value) => {
          result = value;
        });

      store.dispatch(new OrderActions.LoadOrderByIdSuccess(order1));
      store.dispatch(new OrderActions.LoadOrderByIdSuccess(order2));
      expect(result).toEqual(testEntities);
    });
  });

  describe('getOrderByIdEntity', () => {
    it('should return order by id', () => {
      let result: StateUtils.LoaderState<Order>;
      store
        .pipe(select(OrderSelectors.getOrderByIdEntity('order2')))
        .subscribe((value) => {
          result = value;
        });

      store.dispatch(new OrderActions.LoadOrderByIdSuccess(order1));
      store.dispatch(new OrderActions.LoadOrderByIdSuccess(order2));
      expect(result).toEqual(entity);
    });
  });

  describe('getOrderById', () => {
    it('should return value of order by id', () => {
      let result: Order;
      store
        .pipe(select(OrderSelectors.getOrderById('order2')))
        .subscribe((value) => (result = value));

      store.dispatch(new OrderActions.LoadOrderByIdSuccess(order1));
      store.dispatch(new OrderActions.LoadOrderByIdSuccess(order2));
      expect(result).toEqual(entity.value);
    });
  });
  describe('getOrderByIdLoading', () => {
    it('should return loading state', () => {
      let result: boolean;
      store
        .pipe(select(OrderSelectors.getOrderByIdLoading('order2')))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);
      store.dispatch(
        new OrderActions.LoadOrderById({ userId: 'current', code: 'order1' })
      );
      expect(result).toEqual(false);
      store.dispatch(
        new OrderActions.LoadOrderById({ userId: 'current', code: 'order2' })
      );
      expect(result).toEqual(true);
    });
  });
  describe('getOrderByIdSuccess', () => {
    it('should return success state', () => {
      let result: boolean;
      store
        .pipe(select(OrderSelectors.getOrderByIdSuccess('order2')))
        .subscribe((value) => (result = value));

      expect(result).toEqual(false);
      store.dispatch(new OrderActions.LoadOrderByIdSuccess(order1));
      expect(result).toEqual(false);
      store.dispatch(new OrderActions.LoadOrderByIdSuccess(order2));
      expect(result).toEqual(true);
    });
  });
});

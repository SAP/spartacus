import { StateUtils } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { ORDER_BY_ID_ENTITIES } from '../order-state';
import * as fromAction from './order-by-id.action';

const mockOrder: Order = {
  code: 'order1',
  status: 'shipped',
};

describe('Order By Id Actions', () => {
  describe('LoadOrderById Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadOrderById({
        userId: 'user1',
        code: mockOrder.code ?? '',
      });
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_ORDER_BY_ID,
        payload: {
          userId: 'user1',
          code: mockOrder.code,
        },
        meta: StateUtils.entityLoadMeta(ORDER_BY_ID_ENTITIES, 'order1'),
      });
    });
  });

  describe('LoadOrderByIdFail Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadOrderByIdFail({
        code: 'order1',
        error: 'error',
      });
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_ORDER_BY_ID_FAIL,
        payload: {
          code: 'order1',
          error: 'error',
        },
        meta: StateUtils.entityFailMeta(
          ORDER_BY_ID_ENTITIES,
          'order1',
          'error'
        ),
      });
    });
  });

  describe('LoadOrderByIdSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromAction.LoadOrderByIdSuccess(mockOrder);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_ORDER_BY_ID_SUCCESS,
        payload: mockOrder,
        meta: StateUtils.entitySuccessMeta(ORDER_BY_ID_ENTITIES, 'order1'),
      });
    });
  });
});

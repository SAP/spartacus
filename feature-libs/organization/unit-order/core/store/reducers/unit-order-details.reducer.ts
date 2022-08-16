import { Order } from '@spartacus/order/root';
import { UnitOrderActions } from '../actions/index';

export const initialState: Order = {};

export function reducer(
  state = initialState,
  action: UnitOrderActions.UnitOrderDetailsAction
): Order {
  switch (action.type) {
    case UnitOrderActions.LOAD_UNIT_ORDER_DETAILS_SUCCESS: {
      const order: Order = action.payload;
      return order;
    }
  }
  return state;
}

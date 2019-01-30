import * as fromAction from '../actions/index';
import { OrderHistoryList } from '../../../occ';

export const initialState: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: []
};

export function reducer(
  state = initialState,
  action: fromAction.MiscsDataAction
): OrderHistoryList {
  switch (action.type) {
    case fromAction.CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}

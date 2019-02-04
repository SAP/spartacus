import * as fromActions from '../actions/user-addresses.action';
import { Address } from '../../../occ';

export const initialState: Address[] = [];

export function reducer(
  state = initialState,
  action: fromActions.UserAddressesAction
): Address[] {
  switch (action.type) {
    case fromActions.LOAD_USER_ADDRESSES_FAIL: {
      return initialState;
    }

    case fromActions.LOAD_USER_ADDRESSES_SUCCESS: {
      return action.payload ? action.payload : state;
    }
  }
  return state;
}

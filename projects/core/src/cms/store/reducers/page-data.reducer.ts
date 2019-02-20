import * as fromAction from '../actions';
import { Page } from '../../model/page.model';

export const initialState: Page = undefined;

export function reducer(
  state = initialState,
  action: fromAction.AddPageDataSuccess
): Page {
  switch (action.type) {
    case fromAction.ADD_PAGEDATA_SUCCESS: {
      return action.payload;
    }
  }
  return state;
}

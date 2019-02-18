import * as fromAction from '../actions';
import { EntityLoaderAction } from '../../../state';
import { Page } from '../../model/page.model';

export const initialState: Page = undefined;

export function reducer(
  state = initialState,
  action: EntityLoaderAction
): Page {
  switch (action.type) {
    case fromAction.LOAD_PAGEDATA_SUCCESS: {
      return action.payload;
    }

    case fromAction.LOAD_PAGEDATA_FAIL: {
      return initialState;
    }
  }
  return state;
}

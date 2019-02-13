import * as fromAction from '../actions';
import { EntityLoaderAction } from '../../../state';
import { Page } from '../../model/page.model';

const initialState: Page = undefined;

// TODO:#1135 - rename file to match the effect, action and selector

// TODO:#1135 - test
export function pageDataReducer(
  state = initialState,
  action: EntityLoaderAction
): Page {
  switch (action.type) {
    case fromAction.LOAD_PAGEDATA_SUCCESS: {
      return action.payload;
    }
  }
  return state;
}

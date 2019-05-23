import * as fromBaseSite from '../actions/base-site.action';
import { BaseSiteState } from '../state';

export const initialState: BaseSiteState = {
  details: {},
  activeSite: '',
};

export function reducer(
  state = initialState,
  action: fromBaseSite.BaseSiteAction
): BaseSiteState {
  switch (action.type) {
    case fromBaseSite.LOAD_BASE_SITE_SUCCESS: {
      return {
        ...state,
        details: action.payload,
      };
    }

    case fromBaseSite.SET_ACTIVE_BASE_SITE: {
      return {
        ...state,
        activeSite: action.payload,
      };
    }
  }

  return state;
}

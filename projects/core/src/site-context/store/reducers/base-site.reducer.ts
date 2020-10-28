import { SiteContextActions } from '../actions/index';
import { BaseSiteState } from '../state';

export const initialState: BaseSiteState = {
  details: {},
  activeSite: '',
};

export function reducer(
  state = initialState,
  action: SiteContextActions.BaseSiteAction
): BaseSiteState {
  switch (action.type) {
    case SiteContextActions.LOAD_BASE_SITE_SUCCESS: {
      return {
        ...state,
        details: action.payload,
      };
    }

    case SiteContextActions.SET_ACTIVE_BASE_SITE: {
      return {
        ...state,
        activeSite: action.payload,
      };
    }
  }

  return state;
}

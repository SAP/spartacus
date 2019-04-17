import * as fromBaseSite from '../actions/base-site.action';

export const initialState = '';

export function reducer(
  state = initialState,
  action: fromBaseSite.BaseSiteAction
): string {
  switch (action.type) {
    case fromBaseSite.SET_ACTIVE_BASE_SITE: {
      return action.payload;
    }
  }

  return state;
}

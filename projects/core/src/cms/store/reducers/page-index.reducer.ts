import * as fromAction from '../actions/page.action';

export const initialState = '';

export function reducer(
  state = initialState,
  action: fromAction.LoadPageDataSuccess | fromAction.LoadPageDataFail
): string {
  switch (action.type) {
    case fromAction.LOAD_PAGE_DATA_SUCCESS: {
      return action.payload.pageId;
    }

    case fromAction.LOAD_PAGE_DATA_FAIL: {
      return initialState;
    }
  }
  return state;
}

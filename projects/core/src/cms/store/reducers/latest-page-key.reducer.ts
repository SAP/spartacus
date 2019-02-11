import * as fromPageData from '../actions/page.action';

const initialState = '';

// TODO:#1135 - test
export function latestPageKeyReducer(
  state = initialState,
  action: fromPageData.PageAction
): string {
  switch (action.type) {
    case fromPageData.UPDATE_LATEST_PAGE_KEY: {
      return action.payload;
    }
  }

  return state;
}

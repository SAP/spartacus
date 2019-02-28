import * as fromAction from '../actions/page.action';

export const initialState = undefined;

export function reducer(
  entityType: string
): (
  state: string,
  action: fromAction.LoadPageDataSuccess | fromAction.LoadPageDataFail
) => string {
  return (
    state = initialState,
    action: fromAction.LoadPageDataSuccess | fromAction.LoadPageDataFail
  ): string => {
    if (action.meta && action.meta.entityType === entityType) {
      switch (action.type) {
        case fromAction.LOAD_PAGE_DATA_SUCCESS: {
          return action.payload.pageId;
        }

        case fromAction.LOAD_PAGE_DATA_FAIL: {
          return initialState;
        }
      }
    }
    return state;
  };
}

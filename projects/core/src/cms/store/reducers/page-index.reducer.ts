import { CmsActions } from '../actions/index';

export const initialState = undefined;

export function reducer(
  entityType: string
): (
  state: string,
  action:
    | CmsActions.LoadCmsPageDataSuccess
    | CmsActions.LoadCmsPageDataFail
    | CmsActions.CmsSetPageFailIndex
) => string {
  return (
    state = initialState,
    action:
      | CmsActions.LoadCmsPageDataSuccess
      | CmsActions.LoadCmsPageDataFail
      | CmsActions.CmsSetPageSuccessIndex
      | CmsActions.CmsSetPageFailIndex
  ): string => {
    if (action.meta && action.meta.entityType === entityType) {
      switch (action.type) {
        case CmsActions.LOAD_CMS_PAGE_DATA_SUCCESS: {
          return action.payload.pageId;
        }

        case CmsActions.LOAD_CMS_PAGE_DATA_FAIL: {
          return initialState;
        }

        case CmsActions.CMS_SET_PAGE_FAIL_INDEX: {
          return action.payload;
        }

        case CmsActions.CMS_SET_PAGE_SUCCESS_INDEX: {
          return action.payload.pageId;
        }
      }
    }
    return state;
  };
}

import { serializePageContext } from 'projects/core/src/util/serialization-utils';
import { initialLoaderState } from '../../../state/utils/loader/loader.reducer';
import { CmsActions } from '../actions/index';
import { ComponentsContext } from '../cms-state';

export const initialState: ComponentsContext = {
  component: undefined,
  pageContext: {},
};

// TODO:#4603 - test
export function reducer<T>(
  state = initialState,
  action: CmsActions.CmsComponentAction<T>
): ComponentsContext {
  const context = serializePageContext(action.pageContext);
  switch (action.type) {
    case CmsActions.LOAD_CMS_COMPONENT: {
      return {
        ...state,
        pageContext: {
          [context]: {
            ...initialLoaderState,
            loading: true,
            value: false,
          },
        },
      };
    }
    case CmsActions.LOAD_CMS_COMPONENT_FAIL: {
      return {
        ...state,
        pageContext: {
          [context]: {
            ...initialLoaderState,
            error: true,
            value: false,
          },
        },
      };
    }
    case CmsActions.CMS_GET_COMPONENET_FROM_PAGE:
    case CmsActions.LOAD_CMS_COMPONENT_SUCCESS: {
      return {
        ...state,
        component: action.payload,
        pageContext: {
          [context]: {
            ...initialLoaderState,
            success: true,
            value: true,
          },
        },
      };
    }
  }
  return state;
}

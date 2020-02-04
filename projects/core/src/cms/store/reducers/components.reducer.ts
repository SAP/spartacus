import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import { serializePageContextForState } from '../../../util/serialization-utils';
import { CmsActions } from '../actions/index';
import { ComponentsContext } from '../cms-state';

export const initialState: ComponentsContext = {
  component: undefined,
  pageContext: {},
};

function componentExistsReducer<T>(
  state = false,
  action: CmsActions.CmsComponentAction<T>
): boolean {
  switch (action.type) {
    case CmsActions.LOAD_CMS_COMPONENT_FAIL:
      return false;

    case CmsActions.CMS_GET_COMPONENET_FROM_PAGE:
    case CmsActions.LOAD_CMS_COMPONENT_SUCCESS:
      return true;
  }
  return state;
}

export function reducer<T>(
  state = initialState,
  action: CmsActions.CmsComponentAction<T>
): ComponentsContext {
  switch (action.type) {
    case CmsActions.LOAD_CMS_COMPONENT: {
      const pageContextReducer = loaderReducer<boolean>(
        action.meta.entityType,
        componentExistsReducer
      );
      const context = serializePageContextForState(action.pageContext);
      return {
        ...state,
        pageContext: {
          ...state.pageContext,
          [context]: pageContextReducer(state.pageContext[context], action),
        },
      };
    }
    case CmsActions.LOAD_CMS_COMPONENT_FAIL: {
      const pageContextReducer = loaderReducer<boolean>(
        action.meta.entityType,
        componentExistsReducer
      );
      const context = serializePageContextForState(action.pageContext);
      return {
        ...state,
        pageContext: {
          ...state.pageContext,
          [context]: pageContextReducer(state.pageContext[context], action),
        },
      };
    }
    case CmsActions.CMS_GET_COMPONENET_FROM_PAGE:
    case CmsActions.LOAD_CMS_COMPONENT_SUCCESS: {
      const pageContextReducer = loaderReducer<boolean>(
        action.meta.entityType,
        componentExistsReducer
      );
      const context = serializePageContextForState(action.pageContext);
      return {
        ...state,
        component: action.payload as T,
        pageContext: {
          ...state.pageContext,
          [context]: pageContextReducer(state.pageContext[context], action),
        },
      };
    }
  }
  return state;
}

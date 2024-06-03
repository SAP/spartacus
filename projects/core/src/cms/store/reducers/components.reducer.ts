/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsComponent } from '../../../model/cms.model';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import { serializePageContext } from '../../utils/cms-utils';
import { CmsActions } from '../actions/index';
import { ComponentsContext } from '../cms-state';

export const initialState: ComponentsContext = {
  component: undefined,
  pageContext: {},
};

function componentExistsReducer<T extends CmsComponent>(
  state: boolean | undefined,
  action: CmsActions.CmsComponentAction<T>
): boolean | undefined {
  switch (action.type) {
    case CmsActions.LOAD_CMS_COMPONENT_FAIL:
      return false;

    case CmsActions.CMS_GET_COMPONENT_FROM_PAGE:
    case CmsActions.LOAD_CMS_COMPONENT_SUCCESS:
      return true;
  }
  return state;
}

export function reducer<T extends CmsComponent>(
  state = initialState,
  action: CmsActions.CmsComponentAction<T>
): ComponentsContext {
  switch (action.type) {
    case CmsActions.LOAD_CMS_COMPONENT: {
      const pageContextReducer = loaderReducer<boolean, any>(
        action.meta.entityType,
        componentExistsReducer
      );
      const context = serializePageContext(action.payload.pageContext, true);
      return {
        ...state,
        pageContext: {
          ...state.pageContext,
          [context]: pageContextReducer(state.pageContext[context], action),
        },
      };
    }
    case CmsActions.LOAD_CMS_COMPONENT_FAIL: {
      const pageContextReducer = loaderReducer<boolean, any>(
        action.meta.entityType,
        componentExistsReducer
      );
      const context = serializePageContext(action.payload.pageContext, true);
      return {
        ...state,
        pageContext: {
          ...state.pageContext,
          [context]: pageContextReducer(state.pageContext[context], action),
        },
      };
    }
    case CmsActions.LOAD_CMS_COMPONENT_SUCCESS: {
      const pageContextReducer = loaderReducer<boolean, any>(
        action.meta.entityType,
        componentExistsReducer
      );
      const context = serializePageContext(action.payload.pageContext, true);
      return {
        ...state,
        component: action.payload.component as T,
        pageContext: {
          ...state.pageContext,
          [context]: pageContextReducer(state.pageContext[context], action),
        },
      };
    }
    case CmsActions.CMS_GET_COMPONENT_FROM_PAGE: {
      const pageContextReducer = loaderReducer<boolean, any>(
        action.meta.entityType,
        componentExistsReducer
      );
      if (!Array.isArray(action.payload)) {
        const context = serializePageContext(action.payload.pageContext, true);
        return {
          ...state,
          component: action.payload.component as T,
          pageContext: {
            ...state.pageContext,
            [context]: pageContextReducer(state.pageContext[context], action),
          },
        };
      }
    }
  }
  return state;
}

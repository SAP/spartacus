import { CmsComponent, PageType } from '../../../model/index';
import { PageContext } from '../../../routing/index';
import { initialLoaderState } from '../../../state/utils/loader/loader.reducer';
import { serializePageContext } from '../../utils/cms-utils';
import { CmsActions } from '../actions/index';
import { ComponentsContext } from '../cms-state';
import * as fromComponents from './components.reducer';

describe('Components Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const initialStateSlice = fromComponents.initialState;
      const action = {} as CmsActions.LoadCmsComponent;
      const state = fromComponents.reducer(undefined, action);
      expect(state).toEqual(initialStateSlice);
    });
  });

  const initialState: ComponentsContext = {
    component: undefined,
    pageContext: {
      'pre-existing': {
        error: false,
        loading: false,
        success: true,
        value: true,
      },
    },
  };
  describe('LOAD_CMS_COMPONENT action', () => {
    it('should populate the page context slice', () => {
      const pageContext: PageContext = {
        id: 'homepage',
        type: PageType.CONTENT_PAGE,
      };

      const action = new CmsActions.LoadCmsComponent({
        uid: 'xxx',
        pageContext,
      });
      const state = fromComponents.reducer(initialState, action);

      const serializedPageContext = serializePageContext(pageContext, true);
      expect(state).toEqual({
        ...initialState,
        pageContext: {
          ...initialState.pageContext,
          [serializedPageContext]: {
            ...initialLoaderState,
            loading: true,
            value: undefined,
          },
        },
      });
    });
  });
  describe('LOAD_CMS_COMPONENT_FAIL action', () => {
    it('should populate the page context slice and set error to true', () => {
      const pageContext: PageContext = {
        id: 'homepage',
        type: PageType.CONTENT_PAGE,
      };

      const action = new CmsActions.LoadCmsComponentFail({
        uid: 'xxx',
        error: {},
        pageContext,
      });
      const state = fromComponents.reducer(initialState, action);

      const serializedPageContext = serializePageContext(pageContext, true);
      expect(state).toEqual({
        ...initialState,
        pageContext: {
          ...initialState.pageContext,
          [serializedPageContext]: {
            ...initialLoaderState,
            error: true,
            value: false,
          },
        },
      });
    });
  });
  describe('CMS_GET_COMPONENT_FROM_PAGE action', () => {
    it('should populate the page context slice and set success to true', () => {
      const pageContext: PageContext = {
        id: 'homepage',
        type: PageType.CONTENT_PAGE,
      };

      const component: CmsComponent = {
        uid: 'xxx',
      };
      const action = new CmsActions.CmsGetComponentFromPage({
        component,
        pageContext,
      });
      const state = fromComponents.reducer(initialState, action);

      const serializedPageContext = serializePageContext(pageContext, true);
      expect(state).toEqual({
        ...initialState,
        component,
        pageContext: {
          ...initialState.pageContext,
          [serializedPageContext]: {
            ...initialLoaderState,
            success: true,
            value: true,
          },
        },
      });
    });
  });
  describe('LOAD_CMS_COMPONENT_SUCCESS action', () => {
    it('should populate the page context slice and set success to true', () => {
      const pageContext: PageContext = {
        id: 'homepage',
        type: PageType.CONTENT_PAGE,
      };

      const component: CmsComponent = {
        uid: 'xxx',
      };
      const action = new CmsActions.LoadCmsComponentSuccess({
        component,
        uid: component.uid,
        pageContext,
      });
      const state = fromComponents.reducer(initialState, action);

      const serializedPageContext = serializePageContext(pageContext, true);
      expect(state).toEqual({
        ...initialState,
        component,
        pageContext: {
          ...initialState.pageContext,
          [serializedPageContext]: {
            ...initialLoaderState,
            success: true,
            value: true,
          },
        },
      });
    });
  });
});

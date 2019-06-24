import { PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing';
import { Page } from '../../model/page.model';
import { CmsActions } from '../actions/index';
import * as fromPage from './page-index.reducer';

const pageContext: PageContext = {
  id: 'testPageId',
  type: PageType.CONTENT_PAGE,
};

describe('Cms Page Index Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromPage;
      const action = {} as CmsActions.LoadCmsPageDataSuccess;

      const state = fromPage.reducer(PageType.CONTENT_PAGE)(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PAGE_DATA_SUCCESS action', () => {
    it('should populate the page index state', () => {
      const page = {
        pageId: 'testPageId',
        name: 'testPage',
      } as Page;

      const { initialState } = fromPage;
      const action = new CmsActions.LoadCmsPageDataSuccess(pageContext, page);
      const state = fromPage.reducer(PageType.CONTENT_PAGE)(
        initialState,
        action
      );

      expect(state).toEqual(page.pageId);
    });
  });

  describe('LOAD_PAGE_DATA_FAIL action', () => {
    it('should return the initial state', () => {
      const error = 'error';
      const { initialState } = fromPage;
      const action = new CmsActions.LoadCmsPageDataFail(pageContext, error);
      const state = fromPage.reducer(PageType.CONTENT_PAGE)(
        initialState,
        action
      );

      expect(state).toEqual(initialState);
    });
  });

  describe('SET_PAGE_FAIL_INDEX action', () => {
    it('should return index', () => {
      const newIndex = 'index';
      const { initialState } = fromPage;
      const action = new CmsActions.CmsSetPageFailIndex(pageContext, newIndex);
      const state = fromPage.reducer(PageType.CONTENT_PAGE)(
        initialState,
        action
      );

      expect(state).toEqual('index');
    });
  });
});

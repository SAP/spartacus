import { PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing';
import { Page } from '../../model/page.model';
import { CmsActions } from '../actions/index';
import * as fromPage from './page-data.reducer';

describe('Cms Page Data Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromPage;
      const action = {} as CmsActions.LoadCmsPageDataSuccess;
      const state = fromPage.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('ADD_PAGEDATA_SUCCESS action', () => {
    it('should populate the page state', () => {
      const pageContext: PageContext = {
        id: 'homepage',
        type: PageType.CONTENT_PAGE,
      };
      const page = {
        pageId: 'homepage',
        name: 'testPage',
      } as Page;

      const { initialState } = fromPage;
      const action = new CmsActions.LoadCmsPageDataSuccess(pageContext, page);
      const state = fromPage.reducer(initialState, action);

      expect(state).toEqual({
        entities: {
          [page.pageId]: page,
        },
      });
    });
  });
});

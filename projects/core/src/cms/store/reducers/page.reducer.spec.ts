import * as fromActions from '../actions/page.action';
import { PageType } from '../../../occ';
import { PageContext } from '../../../routing';
import { Page } from '../../model/page.model';

import * as fromPage from './page.reducer';

describe('Cms Page Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromPage;
      const action = {} as fromActions.PageAction;
      const state = fromPage.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PAGEDATA_SUCCESS action', () => {
    it('should populate the page state', () => {
      const page = {
        pageId: 'testPageId',
        name: 'testPage'
      } as Page;

      const { initialState } = fromPage;
      const action = new fromActions.LoadPageDataSuccess(page);
      const state = fromPage.reducer(initialState, action);

      expect(state).toEqual(page);
    });
  });

  describe('LOAD_PAGEDATA_FAIL action', () => {
    it('should return the default state', () => {
      const pageContext: PageContext = {
        id: 'homepage',
        type: PageType.CONTENT_PAGE
      };

      const { initialState } = fromPage;
      const action = new fromActions.LoadPageDataFail(pageContext, 'error');
      const state = fromPage.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });
});

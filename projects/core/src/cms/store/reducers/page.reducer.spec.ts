import * as fromActions from '../actions/page.action';
import { Page } from '../../model/page.model';

import * as fromPage from './page.reducer';

describe('Cms Page Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromPage;
      const action = {} as fromActions.AddPageDataSuccess;
      const state = fromPage.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('ADD_PAGEDATA_SUCCESS action', () => {
    it('should populate the page state', () => {
      const page = {
        pageId: 'testPageId',
        name: 'testPage'
      } as Page;

      const { initialState } = fromPage;
      const action = new fromActions.AddPageDataSuccess(page);
      const state = fromPage.reducer(initialState, action);

      expect(state).toEqual(page);
    });
  });
});

import * as fromPage from './page.action';
import { Page } from '../../model/page.model';
import { PageContext } from '../../../routing';
import { PageType } from '../../../occ-models';

describe('Cms Page Actions', () => {
  describe('LoadPageData Actions', () => {
    describe('LoadPageData', () => {
      it('should create an action', () => {
        const payload = new PageContext('123', PageType.PRODUCT_PAGE);
        const action = new fromPage.LoadPageData(payload);
        expect({ ...action }).toEqual({
          type: fromPage.LOAD_PAGEDATA,
          payload: payload
        });
      });
    });

    describe('LoadLoadPageDataFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromPage.LoadPageDataFail(payload);

        expect({ ...action }).toEqual({
          type: fromPage.LOAD_PAGEDATA_FAIL,
          payload
        });
      });
    });

    describe('LoadLoadPageDataSuccess', () => {
      it('should create an action', () => {
        const page: Page = {
          pageId: 'testPageId',
          name: 'testPage',
          seen: [],
          slots: { left: [] }
        };
        const payload = { key: 'test', value: page };
        const action = new fromPage.LoadPageDataSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromPage.LOAD_PAGEDATA_SUCCESS,
          payload
        });
      });
    });
  });

  describe('UpdateLatestPageKey Action', () => {
    describe('Update Latest PageKey', () => {
      it('should create an action', () => {
        const pageKey = '123_2';
        const action = new fromPage.UpdateLatestPageKey(pageKey);
        expect({ ...action }).toEqual({
          type: fromPage.UPDATE_LATEST_PAGE_KEY,
          payload: pageKey
        });
      });
    });
  });

  describe('CleanPageState Action', () => {
    describe('Clean Page State', () => {
      it('should create an action', () => {
        const action = new fromPage.CleanPageState();
        expect({ ...action }).toEqual({
          type: fromPage.CLEAN_PAGE_STATE
        });
      });
    });
  });
});

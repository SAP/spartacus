import { Page } from '../../model/page.model';
import { PageContext } from '../../../routing/index';
import { PageType } from '../../../occ/occ-models/index';

import * as fromPage from './page.action';
import {
  entityLoadMeta,
  entityFailMeta,
  entitySuccessMeta
} from '../../../state';
import { PAGE_DATA_ENTITY } from '../cms-state';

describe('Cms Page Actions', () => {
  const pageContext: PageContext = {
    id: 'test',
    type: PageType.CONTENT_PAGE
  };

  describe('LoadPageIndex Actions', () => {
    describe('LoadPageIndex', () => {
      it('should create the action', () => {
        const action = new fromPage.LoadPageIndex(pageContext);

        expect({ ...action }).toEqual({
          type: fromPage.LOAD_PAGE_INDEX,
          meta: entityLoadMeta(pageContext.type, pageContext.id),
          payload: pageContext
        });
      });
    });

    describe('LoadPageIndexFail', () => {
      it('should create the action', () => {
        const payload = 'error';
        const action = new fromPage.LoadPageIndexFail(pageContext, payload);

        expect({ ...action }).toEqual({
          type: fromPage.LOAD_PAGE_INDEX_FAIL,
          meta: entityFailMeta(pageContext.type, pageContext.id, payload),
          payload
        });
      });
    });

    describe('LoadPageIndexSuccess', () => {
      it('should create the action', () => {
        const payload = 'testKey';
        const action = new fromPage.LoadPageIndexSuccess(pageContext, payload);

        expect({ ...action }).toEqual({
          type: fromPage.LOAD_PAGE_INDEX_SUCCESS,
          meta: entitySuccessMeta(pageContext.type, pageContext.id),
          payload
        });
      });
    });
  });

  describe('LoadPageData Actions', () => {
    describe('LoadPageData', () => {
      it('should create an action', () => {
        const action = new fromPage.LoadPageData(pageContext);
        expect({ ...action }).toEqual({
          type: fromPage.LOAD_PAGEDATA,
          payload: pageContext,
          meta: entityLoadMeta(PAGE_DATA_ENTITY, pageContext.id)
        });
      });
    });

    describe('LoadLoadPageDataFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromPage.LoadPageDataFail(pageContext, payload);

        expect({ ...action }).toEqual({
          type: fromPage.LOAD_PAGEDATA_FAIL,
          payload,
          meta: entityFailMeta(PAGE_DATA_ENTITY, pageContext.id, payload)
        });
      });
    });

    describe('LoadLoadPageDataSuccess', () => {
      it('should create an action', () => {
        const payload: Page = {
          pageId: 'test',
          name: 'testPage',
          slots: { left: {} }
        };
        const action = new fromPage.LoadPageDataSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromPage.LOAD_PAGEDATA_SUCCESS,
          payload,
          meta: entitySuccessMeta(PAGE_DATA_ENTITY, payload.pageId)
        });
      });
    });
  });
});

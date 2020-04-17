import { PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing/index';
import { StateUtils } from '../../../state/utils/index';
import { Page } from '../../model/page.model';
import { CmsActions } from './index';

describe('Cms Page Actions', () => {
  const pageContext: PageContext = {
    id: 'test',
    type: PageType.CONTENT_PAGE,
  };

  describe('LoadCmsPageData Actions', () => {
    describe('LoadCmsPageData', () => {
      it('should create the action', () => {
        const action = new CmsActions.LoadCmsPageData(pageContext);

        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_PAGE_DATA,
          meta: StateUtils.entityLoadMeta(pageContext.type, pageContext.id),
          payload: pageContext,
        });
      });
    });

    describe('LoadCmsPageDataFail', () => {
      it('should create the action', () => {
        const payload = 'error';
        const action = new CmsActions.LoadCmsPageDataFail(pageContext, payload);

        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_PAGE_DATA_FAIL,
          meta: StateUtils.entityFailMeta(
            pageContext.type,
            pageContext.id,
            payload
          ),
        });
      });
    });

    describe('CmsSetPageFailIndex', () => {
      it('should create the action', () => {
        const newIndex = 'index';
        const action = new CmsActions.CmsSetPageFailIndex(
          pageContext,
          newIndex
        );

        expect({ ...action }).toEqual({
          payload: newIndex,
          type: CmsActions.CMS_SET_PAGE_FAIL_INDEX,
          meta: StateUtils.entityFailMeta(pageContext.type, pageContext.id),
        });
      });
    });

    describe('LoadCmsPageDataSuccess', () => {
      it('should create the action', () => {
        const page: Page = <Page>{
          pageId: 'test',
        };
        const action = new CmsActions.LoadCmsPageDataSuccess(pageContext, page);

        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_PAGE_DATA_SUCCESS,
          meta: StateUtils.entitySuccessMeta(pageContext.type, pageContext.id),
          payload: page,
        });
      });
    });
  });
});

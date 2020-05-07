import { CmsComponent, PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing/index';
import { StateUtils } from '../../../state/utils/index';
import { COMPONENT_ENTITY } from '../cms-state';
import { CmsActions } from './index';

describe('Cms Component Actions', () => {
  const test_uid = 'test_uid';
  const pageContext: PageContext = {
    id: 'xxx',
    type: PageType.CONTENT_PAGE,
  };

  describe('LoadCmsComponent Actions', () => {
    describe('LoadCmsComponent', () => {
      it('should create an action', () => {
        const payload = { uid: test_uid, pageContext };
        const action = new CmsActions.LoadCmsComponent(payload);
        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_COMPONENT,
          payload: payload,
          meta: StateUtils.entityLoadMeta(COMPONENT_ENTITY, test_uid),
        });
      });
    });

    describe('LoadCmsComponentFail', () => {
      it('should create an action', () => {
        const error = { message: 'Load Error' };
        const action = new CmsActions.LoadCmsComponentFail({
          uid: test_uid,
          error,
          pageContext,
        });

        expect({ ...action }).toEqual({
          payload: {
            uid: test_uid,
            error,
            pageContext,
          },
          type: CmsActions.LOAD_CMS_COMPONENT_FAIL,
          meta: StateUtils.entityFailMeta(COMPONENT_ENTITY, test_uid, error),
        });
      });
    });

    describe('LoadCmsComponentSuccess', () => {
      it('should create an action', () => {
        const component: CmsComponent = {
          uid: 'comp1',
          typeCode: 'SimpleBannerComponent',
        };
        const action = new CmsActions.LoadCmsComponentSuccess({
          component,
          uid: component.uid,
          pageContext,
        });

        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_COMPONENT_SUCCESS,
          payload: { component, uid: component.uid, pageContext },
          meta: StateUtils.entitySuccessMeta(COMPONENT_ENTITY, 'comp1'),
        });
      });
    });
  });

  describe('CmsGetComponentFromPage Action', () => {
    describe('Get Component from Page', () => {
      it('should create an action', () => {
        const component1: CmsComponent = { uid: 'uid1' };
        const component2: CmsComponent = { uid: 'uid2' };
        const action = new CmsActions.CmsGetComponentFromPage([
          {
            component: component1,
            pageContext,
          },
          {
            component: component2,
            pageContext,
          },
        ]);
        expect({ ...action }).toEqual({
          type: CmsActions.CMS_GET_COMPONENT_FROM_PAGE,
          payload: [
            {
              component: component1,
              pageContext,
            },
            {
              component: component2,
              pageContext,
            },
          ],
          meta: StateUtils.entitySuccessMeta(COMPONENT_ENTITY, [
            'uid1',
            'uid2',
          ]),
        });
      });
    });
  });
});

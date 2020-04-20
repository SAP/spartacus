import { CmsComponent } from '../../../model/cms.model';
import { StateUtils } from '../../../state/utils/index';
import { NAVIGATION_DETAIL_ENTITY } from '../cms-state';
import { CmsActions } from './index';

describe('Navigation Entry Item Actions', () => {
  describe('LoadCmsNavigationItems Actions', () => {
    describe('LoadCmsNavigationItems', () => {
      it('should create an action', () => {
        const payload = {
          nodeId: 'test_uid',
          items: ['mockSuperType1', 'mockId1'],
        };

        const action = new CmsActions.LoadCmsNavigationItems(payload);
        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_NAVIGATION_ITEMS,
          payload,
          meta: StateUtils.entityLoadMeta(
            NAVIGATION_DETAIL_ENTITY,
            payload.nodeId
          ),
        });
      });
    });

    describe('LoadCmsNavigationItemsFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const nodeId = 'test_uid';
        const action = new CmsActions.LoadCmsNavigationItemsFail(
          nodeId,
          payload
        );

        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_NAVIGATION_ITEMS_FAIL,
          payload,
          meta: StateUtils.entityFailMeta(
            NAVIGATION_DETAIL_ENTITY,
            nodeId,
            payload
          ),
        });
      });
    });

    describe('LoadCmsNavigationItemsSuccess', () => {
      it('should create an action', () => {
        const components: CmsComponent[] = [
          { uid: 'comp1', typeCode: 'SimpleBannerComponent1' },
          { uid: 'comp2', typeCode: 'SimpleBannerComponent2' },
        ];

        const payload = { nodeId: 'testId', components };

        const action = new CmsActions.LoadCmsNavigationItemsSuccess(payload);

        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_NAVIGATION_ITEMS_SUCCESS,
          payload,
          meta: StateUtils.entitySuccessMeta(
            NAVIGATION_DETAIL_ENTITY,
            payload.nodeId
          ),
        });
      });
    });
  });
});

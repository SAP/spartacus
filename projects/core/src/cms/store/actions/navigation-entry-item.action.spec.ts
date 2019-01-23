import * as fromAction from './navigation-entry-item.action';
import { CmsComponent } from '../../../occ/occ-models/index';
import { NAVIGATION_DETAIL_ENTITY } from '../cms-state';
import {
  entityFailMeta,
  entityLoadMeta,
  entitySuccessMeta
} from '../../../state/utils/entity-loader/entity-loader.action';

describe('Navigation Entry Item Actions', () => {
  describe('LoadNavigationItems Actions', () => {
    describe('LoadNavigationItems', () => {
      it('should create an action', () => {
        const payload = {
          nodeId: 'test_uid',
          items: ['mockSuperType1', 'mockId1']
        };

        const action = new fromAction.LoadNavigationItems(payload);
        expect({ ...action }).toEqual({
          type: fromAction.LOAD_NAVIGATION_ITEMS,
          payload: payload,
          meta: entityLoadMeta(NAVIGATION_DETAIL_ENTITY, payload.nodeId)
        });
      });
    });

    describe('LoadNavigationItemsFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const nodeId = 'test_uid';
        const action = new fromAction.LoadNavigationItemsFail(nodeId, payload);

        expect({ ...action }).toEqual({
          type: fromAction.LOAD_NAVIGATION_ITEMS_FAIL,
          payload,
          meta: entityFailMeta(NAVIGATION_DETAIL_ENTITY, nodeId, payload)
        });
      });
    });

    describe('LoadNavigationItemsSuccess', () => {
      it('should create an action', () => {
        const components: CmsComponent[] = [
          { uid: 'comp1', typeCode: 'SimpleBannerComponent1' },
          { uid: 'comp2', typeCode: 'SimpleBannerComponent2' }
        ];

        const payload = { nodeId: 'testId', components };

        const action = new fromAction.LoadNavigationItemsSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromAction.LOAD_NAVIGATION_ITEMS_SUCCESS,
          payload,
          meta: entitySuccessMeta(NAVIGATION_DETAIL_ENTITY, payload.nodeId)
        });
      });
    });
  });
});

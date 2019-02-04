import * as fromComponent from './component.action';
import { CmsComponent } from '../../../occ/occ-models/index';
import { COMPONENT_ENTITY } from '../cms-state';
import {
  entityFailMeta,
  entityLoadMeta,
  entitySuccessMeta
} from '../../../state/utils/entity-loader/entity-loader.action';

describe('Cms Component Actions', () => {
  const test_uid = 'test_uid';

  describe('LoadComponent Actions', () => {
    describe('LoadComponent', () => {
      it('should create an action', () => {
        const payload = test_uid;
        const action = new fromComponent.LoadComponent(payload);
        expect({ ...action }).toEqual({
          type: fromComponent.LOAD_COMPONENT,
          payload: payload,
          meta: entityLoadMeta(COMPONENT_ENTITY, test_uid)
        });
      });
    });

    describe('LoadComponentFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromComponent.LoadComponentFail(test_uid, payload);

        expect({ ...action }).toEqual({
          type: fromComponent.LOAD_COMPONENT_FAIL,
          payload,
          meta: entityFailMeta(COMPONENT_ENTITY, test_uid, payload)
        });
      });
    });

    describe('LoadComponentSuccess', () => {
      it('should create an action', () => {
        const component: CmsComponent = {
          uid: 'comp1',
          typeCode: 'SimpleBannerComponent'
        };
        const action = new fromComponent.LoadComponentSuccess(component);

        expect({ ...action }).toEqual({
          type: fromComponent.LOAD_COMPONENT_SUCCESS,
          payload: component,
          meta: entitySuccessMeta(COMPONENT_ENTITY, 'comp1')
        });
      });
    });
  });

  describe('GetComponentFromPage Action', () => {
    describe('Get Component from Page', () => {
      it('should create an action', () => {
        const component1: CmsComponent = { uid: 'uid1' };
        const component2: CmsComponent = { uid: 'uid2' };
        const action = new fromComponent.GetComponentFromPage([
          component1,
          component2
        ]);
        expect({ ...action }).toEqual({
          type: fromComponent.GET_COMPONENET_FROM_PAGE,
          payload: [component1, component2],
          meta: entitySuccessMeta(COMPONENT_ENTITY, ['uid1', 'uid2'])
        });
      });
    });
  });
});

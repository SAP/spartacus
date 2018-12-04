import * as fromComponent from './component.action';
import { CmsComponent } from '@spartacus/core';

describe('Cms Component Actions', () => {
  describe('LoadComponent Actions', () => {
    describe('LoadComponent', () => {
      it('should create an action', () => {
        const payload = 'test_uid';
        const action = new fromComponent.LoadComponent(payload);
        expect({ ...action }).toEqual({
          type: fromComponent.LOAD_COMPONENT,
          payload: payload
        });
      });
    });

    describe('LoadComponentFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromComponent.LoadComponentFail(payload);

        expect({ ...action }).toEqual({
          type: fromComponent.LOAD_COMPONENT_FAIL,
          payload
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
          payload: component
        });
      });
    });
  });

  describe('GetComponentFromPage Action', () => {
    describe('Get Component from Page', () => {
      it('should create an action', () => {
        const component1 = { uid: 'uid1' };
        const component2 = { uid: 'uid2' };
        const action = new fromComponent.GetComponentFromPage([
          component1,
          component2
        ]);
        expect({ ...action }).toEqual({
          type: fromComponent.GET_COMPONENET_FROM_PAGE,
          payload: [component1, component2]
        });
      });
    });
  });

  describe('CleanComponentState Action', () => {
    describe('Clean Component State', () => {
      it('should create an action', () => {
        const action = new fromComponent.CleanComponentState();
        expect({ ...action }).toEqual({
          type: fromComponent.CLEAN_COMPONENT_STATE
        });
      });
    });
  });
});

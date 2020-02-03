import { CmsComponent, PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing/index';
import { StateEntityLoaderActions } from '../../../state/utils/index';
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
        const payload = test_uid;
        const action = new CmsActions.LoadCmsComponent(payload);
        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_COMPONENT,
          payload: payload,
          meta: StateEntityLoaderActions.entityLoadMeta(
            COMPONENT_ENTITY,
            test_uid
          ),
          pageContext: undefined,
        });
      });
      it('should create an action with provided pageContext', () => {
        const payload = test_uid;
        const action = new CmsActions.LoadCmsComponent(payload, pageContext);
        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_COMPONENT,
          payload: payload,
          meta: StateEntityLoaderActions.entityLoadMeta(
            COMPONENT_ENTITY,
            test_uid
          ),
          pageContext,
        });
      });
    });

    describe('LoadCmsComponentFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new CmsActions.LoadCmsComponentFail(test_uid, payload);

        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_COMPONENT_FAIL,
          payload,
          meta: StateEntityLoaderActions.entityFailMeta(
            COMPONENT_ENTITY,
            test_uid,
            payload
          ),
          pageContext: undefined,
        });
      });
      it('should create an action with the provided page context', () => {
        const payload = { message: 'Load Error' };
        const action = new CmsActions.LoadCmsComponentFail(
          test_uid,
          payload,
          pageContext
        );

        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_COMPONENT_FAIL,
          payload,
          meta: StateEntityLoaderActions.entityFailMeta(
            COMPONENT_ENTITY,
            test_uid,
            payload
          ),
          pageContext,
        });
      });
    });

    describe('LoadCmsComponentSuccess', () => {
      it('should create an action', () => {
        const component: CmsComponent = {
          uid: 'comp1',
          typeCode: 'SimpleBannerComponent',
        };
        const action = new CmsActions.LoadCmsComponentSuccess(component);

        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_COMPONENT_SUCCESS,
          payload: component,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            COMPONENT_ENTITY,
            'comp1'
          ),
          pageContext: undefined,
        });
      });
      it('should create an action with the provided page context', () => {
        const component: CmsComponent = {
          uid: 'comp1',
          typeCode: 'SimpleBannerComponent',
        };
        const action = new CmsActions.LoadCmsComponentSuccess(
          component,
          component.uid,
          pageContext
        );

        expect({ ...action }).toEqual({
          type: CmsActions.LOAD_CMS_COMPONENT_SUCCESS,
          payload: component,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            COMPONENT_ENTITY,
            'comp1'
          ),
          pageContext,
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
          component1,
          component2,
        ]);
        expect({ ...action }).toEqual({
          type: CmsActions.CMS_GET_COMPONENET_FROM_PAGE,
          payload: [component1, component2],
          meta: StateEntityLoaderActions.entitySuccessMeta(COMPONENT_ENTITY, [
            'uid1',
            'uid2',
          ]),
          pageContext: undefined,
        });
      });
      it('should create an action with the provided page context', () => {
        const component1: CmsComponent = { uid: 'uid1' };
        const component2: CmsComponent = { uid: 'uid2' };
        const action = new CmsActions.CmsGetComponentFromPage(
          [component1, component2],
          pageContext
        );
        expect({ ...action }).toEqual({
          type: CmsActions.CMS_GET_COMPONENET_FROM_PAGE,
          payload: [component1, component2],
          meta: StateEntityLoaderActions.entitySuccessMeta(COMPONENT_ENTITY, [
            'uid1',
            'uid2',
          ]),
          pageContext,
        });
      });
    });
  });
});

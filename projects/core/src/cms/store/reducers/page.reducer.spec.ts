import * as fromPage from './page.reducer';
import * as fromActions from '../actions/page.action';
import { Page } from '../../model/page.model';
import { CmsComponent } from '../../../occ/occ-models/index';

describe('Cms Page Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromPage;
      const action = {} as fromActions.PageAction;
      const state = fromPage.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PAGEDATA_SUCCESS action', () => {
    it('should populate the page state', () => {
      const components: CmsComponent[] = [
        { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
        { uid: 'comp2', typeCode: 'CMSLinkComponent' },
        { uid: 'comp3', typeCode: 'NavigationComponent' }
      ];
      const page: Page = {
        pageId: 'testPageId',
        name: 'testPage',
        seen: [],
        slots: { left: { components } }
      };
      const payload = { key: 'test', value: page };

      const { initialState } = fromPage;
      const action = new fromActions.LoadPageDataSuccess(payload);
      const state = fromPage.reducer(initialState, action);

      expect(state.count).toEqual(1);
      expect(state.entities['test']).toEqual(page);
      expect(state.latestPageKey).toEqual('test');
    });

    it('should add id to array `seen` for the same cms page', () => {
      const page: Page = {
        pageId: 'testPageId',
        seen: [],
        slots: { left: { uid: 'uid' } }
      };
      const payload = { key: 'test', value: page };
      const { initialState } = fromPage;
      const currentState = { ...initialState, [payload.key]: payload.value };

      const newPage: Page = {
        pageId: 'testPageId',
        seen: ['123'],
        slots: { left: { uid: 'uid' } }
      };
      const newPayload = { key: 'test', value: newPage };
      const action = new fromActions.LoadPageDataSuccess(newPayload);
      const state = fromPage.reducer(currentState, action);

      expect(state.entities['test'].seen).toEqual(['123']);
      expect(state.latestPageKey).toEqual('test');
    });

    it('should overwrite the existing cms page', () => {
      const page: Page = {
        pageId: 'testPageId',
        slots: { left: { components: [{ uid: 'comp1' }] } }
      };
      const payload = { key: 'test', value: page };
      const { initialState } = fromPage;
      const currentState = { ...initialState, [payload.key]: payload.value };

      const newPage: Page = {
        pageId: 'testPageId',
        slots: { left: { components: [{ uid: 'comp1' }, { uid: 'comp2' }] } }
      };
      const newPayload = { key: 'test', value: newPage };
      const action = new fromActions.LoadPageDataSuccess(newPayload);
      const state = fromPage.reducer(currentState, action);

      expect(state.entities['test'].slots['left']).toEqual({
        components: [{ uid: 'comp1' }, { uid: 'comp2' }]
      });
      expect(state.latestPageKey).toEqual('test');
    });
  });

  describe('CLEAN_PAGE_STATE action', () => {
    it('should clean the page state entities', () => {
      const page: Page = {
        pageId: 'testPageId',
        name: 'testPage',
        seen: [],
        slots: { left: null }
      };
      const payload = { key: 'test', value: page };

      const { initialState } = fromPage;
      const state = { ...initialState, [payload.key]: payload.value };
      const cleanAction = new fromActions.CleanPageState();
      const newState = fromPage.reducer(state, cleanAction);

      expect(newState).toEqual(initialState);
    });
  });

  describe('UPDATE_LATEST_PAGE_KEY action', () => {
    it('should update the latestPageKey in page state', () => {
      const payload = 'new key';

      const { initialState } = fromPage;
      const action = new fromActions.UpdateLatestPageKey(payload);
      const state = fromPage.reducer(initialState, action);

      expect(state.latestPageKey).toEqual(payload);
    });
  });

  describe('REFRESH_LATEST_PAGE action', () => {
    it('should reset latest page', () => {
      const page: Page = {
        pageId: 'testPageId',
        name: 'testPage',
        seen: [],
        slots: { left: null }
      };
      const payload = { key: 'test', value: page };

      const { initialState } = fromPage;
      const state = {
        ...initialState,
        [payload.key]: payload.value,
        latestPageKey: 'test'
      };
      const refreshAction = new fromActions.RefreshLatestPage();
      const newState = fromPage.reducer(state, refreshAction);

      expect(newState.entities['test']).toEqual(null);
    });
  });
});

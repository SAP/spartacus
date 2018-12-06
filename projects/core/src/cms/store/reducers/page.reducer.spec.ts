import * as fromPage from './page.reducer';
import * as fromActions from '../actions/page.action';
import { Page } from '../../model/page.model';
import { CmsComponent } from '../../../occ-models/index';

describe('Cms Page Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromPage;
      const action = {} as any;
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
        slots: { left: components }
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
        slots: { position: 'left', value: 'uid' }
      };
      const payload = { key: 'test', value: page };
      const { initialState } = fromPage;
      const currentState = { ...initialState, [payload.key]: payload.value };

      const newPage: Page = {
        pageId: 'testPageId',
        seen: ['123'],
        slots: { left: 'uid' }
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
        slots: { left: ['comp1'] }
      };
      const payload = { key: 'test', value: page };
      const { initialState } = fromPage;
      const currentState = { ...initialState, [payload.key]: payload.value };

      const newPage: Page = {
        pageId: 'testPageId',
        slots: { left: ['comp1', 'comp2'] }
      };
      const newPayload = { key: 'test', value: newPage };
      const action = new fromActions.LoadPageDataSuccess(newPayload);
      const state = fromPage.reducer(currentState, action);

      expect(state.entities['test'].slots['left']).toEqual(['comp1', 'comp2']);
      expect(state.latestPageKey).toEqual('test');
    });
  });

  describe('CLEAN_PAGE_STATE action', () => {
    it('should clean the page state entities', () => {
      const page: Page = {
        pageId: 'testPageId',
        name: 'testPage',
        seen: [],
        slots: { position: 'left', value: null }
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
});

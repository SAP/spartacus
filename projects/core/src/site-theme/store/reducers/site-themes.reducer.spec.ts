import { SiteThemeActions } from '../actions/index';
import * as fromSiteThemes from './site-themes.reducer';

describe('Site Theme Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromSiteThemes;
      const action = {} as SiteThemeActions.SiteThemesAction;
      const state = fromSiteThemes.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SET_ACTIVE_THEME action', () => {
    it('should set active theme', () => {
      const { initialState } = fromSiteThemes;
      const action = new SiteThemeActions.SetActiveSiteTheme('light');
      const state = fromSiteThemes.reducer(initialState, action);

      expect(state.activeSiteTheme).toEqual('light');
    });
  });
});

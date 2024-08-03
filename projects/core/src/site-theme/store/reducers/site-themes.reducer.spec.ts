import { SiteTheme } from '../../../model/misc.model';
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

  describe('LOAD_THEMES_SUCCESS action', () => {
    it('should populate the theme state entities', () => {
      const siteThemes: SiteTheme[] = [
        { i18nNameKey: 'dark', className: 'dark', default: true },
      ];

      const entities: { [key: string]: SiteTheme } = {
        dark: siteThemes[0],
      };

      const { initialState } = fromSiteThemes;
      const action = new SiteThemeActions.LoadSiteThemesSuccess(siteThemes);
      const state = fromSiteThemes.reducer(initialState, action);
      expect(state.entities).toEqual(entities);
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

import { SiteTheme } from '../../../model/misc.model';
import { SiteThemeActions } from './index';

describe('Site Theme Actions', () => {
  describe('LoadSiteThemes Actions', () => {
    describe('LoadSiteThemes', () => {
      it('should create an theme', () => {
        const action = new SiteThemeActions.LoadSiteThemes();
        expect({ ...action }).toEqual({
          type: SiteThemeActions.LOAD_SITE_THEMES,
        });
      });
    });

    describe('LoadSiteThemesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new SiteThemeActions.LoadSiteThemesFail(payload);

        expect({ ...action }).toEqual({
          type: SiteThemeActions.LOAD_SITE_THEMES_FAIL,
          payload,
        });
      });
    });

    describe('LoadSiteThemesSuccess', () => {
      it('should create an action', () => {
        const payload: SiteTheme[] = [
          {
            i18nNameKey: 'key',
            className: 'theme1',
          },
        ];
        const action = new SiteThemeActions.LoadSiteThemesSuccess(payload);

        expect({ ...action }).toEqual({
          type: SiteThemeActions.LOAD_SITE_THEMES_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('SetActiveSiteTheme Action', () => {
    it('should create an action', () => {
      const action = new SiteThemeActions.SetActiveSiteTheme('black');
      expect({ ...action }).toEqual({
        type: SiteThemeActions.SET_ACTIVE_SITE_THEME,
        payload: 'black',
      });
    });
  });

  describe('SiteThemeChange Action', () => {
    it('should create an action', () => {
      const action = new SiteThemeActions.SiteThemeChange({
        previous: 'previous',
        current: 'current',
      });
      expect({ ...action }).toEqual({
        type: SiteThemeActions.SITE_THEME_CHANGE,
        payload: {
          previous: 'previous',
          current: 'current',
        },
      });
    });
  });
});

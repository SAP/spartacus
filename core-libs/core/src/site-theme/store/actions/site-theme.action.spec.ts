import { SiteThemeActions } from './index';

describe('Site Theme Actions', () => {
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

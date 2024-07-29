import { Theme } from '../../../model/misc.model';
import { SiteThemeActions } from './index';

describe('Site Theme Actions', () => {
  describe('LoadThemes Actions', () => {
    describe('LoadThemes', () => {
      it('should create an theme', () => {
        const action = new SiteThemeActions.LoadThemes();
        expect({ ...action }).toEqual({
          type: SiteThemeActions.LOAD_THEMES,
        });
      });
    });

    describe('LoadThemesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new SiteThemeActions.LoadThemesFail(payload);

        expect({ ...action }).toEqual({
          type: SiteThemeActions.LOAD_THEMES_FAIL,
          payload,
        });
      });
    });

    describe('LoadThemesSuccess', () => {
      it('should create an action', () => {
        const payload: Theme[] = [
          {
            i18nNameKey: 'key',
            className: 'theme1',
          },
        ];
        const action = new SiteThemeActions.LoadThemesSuccess(payload);

        expect({ ...action }).toEqual({
          type: SiteThemeActions.LOAD_THEMES_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('SetActiveTheme Action', () => {
    it('should create an action', () => {
      const action = new SiteThemeActions.SetActiveTheme('black');
      expect({ ...action }).toEqual({
        type: SiteThemeActions.SET_ACTIVE_THEME,
        payload: 'black',
      });
    });
  });

  describe('ThemeChange Action', () => {
    it('should create an action', () => {
      const action = new SiteThemeActions.ThemeChange({
        previous: 'previous',
        current: 'current',
      });
      expect({ ...action }).toEqual({
        type: SiteThemeActions.THEME_CHANGE,
        payload: {
          previous: 'previous',
          current: 'current',
        },
      });
    });
  });
});

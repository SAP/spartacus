import { Language } from '../../../model/misc.model';
import { SiteContextActions } from './index';

describe('Languages Actions', () => {
  describe('LoadLanguages Actions', () => {
    describe('LoadLanguages', () => {
      it('should create an action', () => {
        const action = new SiteContextActions.LoadLanguages();
        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_LANGUAGES,
        });
      });
    });

    describe('LoadLanguagesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new SiteContextActions.LoadLanguagesFail(payload);

        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_LANGUAGES_FAIL,
          payload,
        });
      });
    });

    describe('LoadLanguagesSuccess', () => {
      it('should create an action', () => {
        const payload: Language[] = [
          {
            active: false,
            isocode: 'en',
            name: 'English',
            nativeName: 'English',
          },
        ];
        const action = new SiteContextActions.LoadLanguagesSuccess(payload);

        expect({ ...action }).toEqual({
          type: SiteContextActions.LOAD_LANGUAGES_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('SetActiveLanguage Action', () => {
    it('should create an action', () => {
      const action = new SiteContextActions.SetActiveLanguage('en');
      expect({ ...action }).toEqual({
        type: SiteContextActions.SET_ACTIVE_LANGUAGE,
        payload: 'en',
      });
    });
  });

  describe('LanguageChange Action', () => {
    it('should create an action', () => {
      const action = new SiteContextActions.LanguageChange({
        previous: 'previous',
        current: 'current',
      });
      expect({ ...action }).toEqual({
        type: SiteContextActions.LANGUAGE_CHANGE,
        payload: {
          previous: 'previous',
          current: 'current',
        },
      });
    });
  });
});

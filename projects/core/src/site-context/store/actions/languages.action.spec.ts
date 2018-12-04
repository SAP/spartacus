import * as fromLanguage from './languages.action';
import { Language } from '../../../occ-models/occ.models';

describe('Languages Actions', () => {
  describe('LoadLanguages Actions', () => {
    describe('LoadLanguages', () => {
      it('should create an action', () => {
        const action = new fromLanguage.LoadLanguages();
        expect({ ...action }).toEqual({
          type: fromLanguage.LOAD_LANGUAGES
        });
      });
    });

    describe('LoadLanguagesFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromLanguage.LoadLanguagesFail(payload);

        expect({ ...action }).toEqual({
          type: fromLanguage.LOAD_LANGUAGES_FAIL,
          payload
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
            nativeName: 'English'
          }
        ];
        const action = new fromLanguage.LoadLanguagesSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromLanguage.LOAD_LANGUAGES_SUCCESS,
          payload
        });
      });
    });
  });

  describe('SetActiveLanguage Action', () => {
    it('should create an action', () => {
      const action = new fromLanguage.SetActiveLanguage('en');
      expect({ ...action }).toEqual({
        type: fromLanguage.SET_ACTIVE_LANGUAGE,
        payload: 'en'
      });
    });
  });

  describe('LanguageChange Action', () => {
    it('should create an action', () => {
      const action = new fromLanguage.LanguageChange();
      expect({ ...action }).toEqual({
        type: fromLanguage.LANGUAGE_CHANGE
      });
    });
  });
});

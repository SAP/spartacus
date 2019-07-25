import { Currency, Language } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import * as fromLanguages from './languages.reducer';

describe('Languages Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromLanguages;
      const action = {} as SiteContextActions.LanguagesAction;
      const state = fromLanguages.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_LANGUAGES_SUCCESS action', () => {
    it('should populate the languages state entities', () => {
      const languages: Language[] = [
        { active: true, isocode: 'ja', name: 'Japanese' },
      ];

      const entities: { [key: string]: Currency } = {
        ja: languages[0],
      };

      const { initialState } = fromLanguages;
      const action = new SiteContextActions.LoadLanguagesSuccess(languages);
      const state = fromLanguages.reducer(initialState, action);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('SET_ACTIVE_LANGUAGE action', () => {
    it('should set active language', () => {
      const { initialState } = fromLanguages;
      const action = new SiteContextActions.SetActiveLanguage('zh');
      const state = fromLanguages.reducer(initialState, action);

      expect(state.activeLanguage).toEqual('zh');
    });
  });
});

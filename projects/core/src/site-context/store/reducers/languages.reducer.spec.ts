import * as fromLanguages from './languages.reducer';
import * as fromActions from '../actions/languages.action';
import { Language } from '../../../occ-models/occ.models';

describe('Languages Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromLanguages;
      const action = {} as any;
      const state = fromLanguages.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_LANGUAGES_SUCCESS action', () => {
    it('should populate the languages state entities', () => {
      const languages: Language[] = [
        { active: true, isocode: 'ja', name: 'Japanese' }
      ];

      const entities = {
        ja: languages[0]
      };

      const { initialState } = fromLanguages;
      const action = new fromActions.LoadLanguagesSuccess(languages);
      const state = fromLanguages.reducer(initialState, action);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('SET_ACTIVE_LANGUAGE action', () => {
    it('should set active language', () => {
      const { initialState } = fromLanguages;
      const action = new fromActions.SetActiveLanguage('zh');
      const state = fromLanguages.reducer(initialState, action);

      expect(state.activeLanguage).toEqual('zh');
    });
  });
});

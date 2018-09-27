import * as fromLanguages from './languages.reducer';
import * as fromActions from '../actions/languages.action';

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
      const languages: any[] = [
        { active: true, isocode: 'ja', name: 'Japanese' }
      ];

      const entities = {
        ja: languages[0]
      };

      const { initialState } = fromLanguages;
      const action = new fromActions.LoadLanguagesSuccess(languages);
      const state = fromLanguages.reducer(initialState, action);
      expect(state.entities).toEqual(entities);
      expect(state.loading).toEqual(false);
      expect(state.loadAttempted).toEqual(true);
    });
  });

  describe('LOAD_LANGUAGES_FAIL action', () => {
    it('should disable loading', () => {
      const { initialState } = fromLanguages;
      initialState.loading = true;
      const action = new fromActions.LoadLanguagesFail({});
      const state = fromLanguages.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.loadAttempted).toEqual(true);
    });
  });

  describe('LOAD_LANGUAGES action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromLanguages;
      const action = new fromActions.LoadLanguages();
      const state = fromLanguages.reducer(initialState, action);
      expect(state.loading).toEqual(true);
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

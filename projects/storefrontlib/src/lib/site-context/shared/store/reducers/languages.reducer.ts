import * as fromLanguages from '../actions/languages.action';

export interface LanguagesState {
  entities: { [isocode: string]: any };
  loadAttempted: boolean;
  loading: boolean;
  loaded: boolean;
  activeLanguage: string;
}

export const initialState: LanguagesState = {
  entities: {},
  loadAttempted: false,
  loading: false,
  loaded: false,
  activeLanguage: null
};

export function reducer(
  state = initialState,
  action: fromLanguages.LanguagesAction
): LanguagesState {
  switch (action.type) {
    case fromLanguages.LOAD_LANGUAGES_SUCCESS: {
      const languages = action.payload;
      const entities = languages.reduce(
        (langEntities: { [isocode: string]: any }, language: any) => {
          return {
            ...langEntities,
            [language.isocode]: language
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        entities,
        loadAttempted: true,
        loading: false,
        loaded: true
      };
    }

    case fromLanguages.LOAD_LANGUAGES_FAIL: {
      return {
        ...state,
        loadAttempted: true,
        loading: false
      };
    }

    case fromLanguages.LOAD_LANGUAGES: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromLanguages.SET_ACTIVE_LANGUAGE: {
      const isocode = action.payload;

      return {
        ...state,
        activeLanguage: isocode
      };
    }
  }
  return state;
}

export const getLanguagesEntities = (state: LanguagesState) => state.entities;
export const getLanguagesLoadAttempted = (state: LanguagesState) =>
  state.loadAttempted;
export const getLanguagesLoading = (state: LanguagesState) => state.loading;
export const getLanguagesLoaded = (state: LanguagesState) => state.loaded;
export const getActiveLanguage = (state: LanguagesState) =>
  state.activeLanguage;

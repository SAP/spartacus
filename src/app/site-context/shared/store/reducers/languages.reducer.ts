import * as fromLanguages from "../actions/languages.action";

export interface LanguagesState {
  entities: { [isocode: string]: any };
  loaded: boolean;
  activeLanguage: string;
}

export const initialState: LanguagesState = {
  entities: {},
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
        (entities: { [isocode: string]: any }, language: any) => {
          return {
            ...entities,
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
        loaded: true
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
export const getLanguagesLoaded = (state: LanguagesState) => state.loaded;
export const getActiveLanguage = (state: LanguagesState) =>
  state.activeLanguage;

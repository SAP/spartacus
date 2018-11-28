import * as fromLanguages from '../actions/languages.action';
import { LanguagesState } from '../state';
import { Language } from '../../../occ-models/occ.models';

export const initialState: LanguagesState = {
  entities: {},
  activeLanguage: null
};

export function reducer(
  state = initialState,
  action: fromLanguages.LanguagesAction
): LanguagesState {
  switch (action.type) {
    case fromLanguages.LOAD_LANGUAGES_SUCCESS: {
      const languages: Language[] = action.payload;
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
        entities
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

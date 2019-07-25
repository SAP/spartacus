import { Language } from '../../../model/misc.model';
import { SiteContextActions } from '../actions/index';
import { LanguagesState } from '../state';

export const initialState: LanguagesState = {
  entities: null,
  activeLanguage: null,
};

export function reducer(
  state = initialState,
  action: SiteContextActions.LanguagesAction
): LanguagesState {
  switch (action.type) {
    case SiteContextActions.LOAD_LANGUAGES_SUCCESS: {
      const languages: Language[] = action.payload;
      const entities = languages.reduce(
        (langEntities: { [isocode: string]: Language }, language: Language) => {
          return {
            ...langEntities,
            [language.isocode]: language,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        entities,
      };
    }

    case SiteContextActions.SET_ACTIVE_LANGUAGE: {
      const isocode = action.payload;

      return {
        ...state,
        activeLanguage: isocode,
      };
    }
  }
  return state;
}

import { Action } from '@ngrx/store';
import { Language } from '../../../model/misc.model';

export const LOAD_LANGUAGES = '[Site-context] Load Languages';
export const LOAD_LANGUAGES_FAIL = '[Site-context] Load Languages Fail';
export const LOAD_LANGUAGES_SUCCESS = '[Site-context] Load Languages Success';
export const SET_ACTIVE_LANGUAGE = '[Site-context] Set Active Language';
export const LANGUAGE_CHANGE = '[Site-context] Language Change';

export class LoadLanguages implements Action {
  readonly type = LOAD_LANGUAGES;
}

export class LoadLanguagesFail implements Action {
  readonly type = LOAD_LANGUAGES_FAIL;
  constructor(public payload: any) {}
}

export class LoadLanguagesSuccess implements Action {
  readonly type = LOAD_LANGUAGES_SUCCESS;
  constructor(public payload: Language[]) {}
}

export class SetActiveLanguage implements Action {
  readonly type = SET_ACTIVE_LANGUAGE;
  constructor(public payload: string) {}
}

export class LanguageChange implements Action {
  readonly type = LANGUAGE_CHANGE;
  constructor(public payload: { previous: string; current: string }) {}
}

// action types
export type LanguagesAction =
  | LoadLanguages
  | LoadLanguagesFail
  | LoadLanguagesSuccess
  | SetActiveLanguage
  | LanguageChange;

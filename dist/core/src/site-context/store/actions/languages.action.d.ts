import { Action } from '@ngrx/store';
import { Language } from '../../../model/misc.model';
export declare const LOAD_LANGUAGES = "[Site-context] Load Languages";
export declare const LOAD_LANGUAGES_FAIL = "[Site-context] Load Languages Fail";
export declare const LOAD_LANGUAGES_SUCCESS = "[Site-context] Load Languages Success";
export declare const SET_ACTIVE_LANGUAGE = "[Site-context] Set Active Language";
export declare const LANGUAGE_CHANGE = "[Site-context] Language Change";
export declare class LoadLanguages implements Action {
    readonly type = "[Site-context] Load Languages";
}
export declare class LoadLanguagesFail implements Action {
    payload: any;
    readonly type = "[Site-context] Load Languages Fail";
    constructor(payload: any);
}
export declare class LoadLanguagesSuccess implements Action {
    payload: Language[];
    readonly type = "[Site-context] Load Languages Success";
    constructor(payload: Language[]);
}
export declare class SetActiveLanguage implements Action {
    payload: string;
    readonly type = "[Site-context] Set Active Language";
    constructor(payload: string);
}
export declare class LanguageChange implements Action {
    payload: {
        previous: string | null;
        current: string | null;
    };
    readonly type = "[Site-context] Language Change";
    constructor(payload: {
        previous: string | null;
        current: string | null;
    });
}
export type LanguagesAction = LoadLanguages | LoadLanguagesFail | LoadLanguagesSuccess | SetActiveLanguage | LanguageChange;

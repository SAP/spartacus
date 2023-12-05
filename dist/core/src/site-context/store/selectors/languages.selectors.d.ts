import { MemoizedSelector } from '@ngrx/store';
import { Language } from '../../../model/misc.model';
import { LanguagesEntities, LanguagesState, StateWithSiteContext } from '../state';
export declare const getLanguagesState: MemoizedSelector<StateWithSiteContext, LanguagesState>;
export declare const getLanguagesEntities: MemoizedSelector<StateWithSiteContext, LanguagesEntities | null>;
export declare const getActiveLanguage: MemoizedSelector<StateWithSiteContext, string | null>;
export declare const getAllLanguages: MemoizedSelector<StateWithSiteContext, Language[] | null>;

import { Action } from '@ngrx/store';
import { BaseSite } from '../../../model/misc.model';
export declare const LOAD_BASE_SITE = "[Site-context] Load BaseSite";
export declare const LOAD_BASE_SITE_FAIL = "[Site-context] Load BaseSite Fail";
export declare const LOAD_BASE_SITE_SUCCESS = "[Site-context] Load BaseSite Success";
export declare const LOAD_BASE_SITES = "[Site-context] Load BaseSites";
export declare const LOAD_BASE_SITES_FAIL = "[Site-context] Load BaseSites Fail";
export declare const LOAD_BASE_SITES_SUCCESS = "[Site-context] Load BaseSites Success";
export declare const SET_ACTIVE_BASE_SITE = "[Site-context] Set Active BaseSite";
export declare const BASE_SITE_CHANGE = "[Site-context] BaseSite Change";
export declare class LoadBaseSite implements Action {
    readonly type = "[Site-context] Load BaseSite";
}
export declare class LoadBaseSiteFail implements Action {
    payload: any;
    readonly type = "[Site-context] Load BaseSite Fail";
    constructor(payload: any);
}
export declare class LoadBaseSiteSuccess implements Action {
    payload: BaseSite;
    readonly type = "[Site-context] Load BaseSite Success";
    constructor(payload: BaseSite);
}
export declare class LoadBaseSites implements Action {
    readonly type = "[Site-context] Load BaseSites";
}
export declare class LoadBaseSitesFail implements Action {
    payload: any;
    readonly type = "[Site-context] Load BaseSites Fail";
    constructor(payload: any);
}
export declare class LoadBaseSitesSuccess implements Action {
    payload: BaseSite[];
    readonly type = "[Site-context] Load BaseSites Success";
    constructor(payload: BaseSite[]);
}
export declare class SetActiveBaseSite implements Action {
    payload: string;
    readonly type = "[Site-context] Set Active BaseSite";
    constructor(payload: string);
}
export declare class BaseSiteChange implements Action {
    readonly type = "[Site-context] BaseSite Change";
}
export type BaseSiteAction = LoadBaseSite | LoadBaseSiteFail | LoadBaseSiteSuccess | LoadBaseSites | LoadBaseSitesFail | LoadBaseSitesSuccess | SetActiveBaseSite | BaseSiteChange;

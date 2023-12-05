import { Action } from '@ngrx/store';
export declare const LOADER_LOAD_ACTION = "[LOADER] LOAD";
export declare const LOADER_FAIL_ACTION = "[LOADER] FAIL";
export declare const LOADER_SUCCESS_ACTION = "[LOADER] SUCCESS";
export declare const LOADER_RESET_ACTION = "[LOADER] RESET";
export interface LoaderMeta {
    entityType: string;
    loader: {
        load?: boolean;
        error?: any;
        success?: boolean;
    } | undefined;
}
export interface LoaderAction extends Action {
    readonly payload?: any;
    readonly meta?: LoaderMeta;
}
export declare function loadMeta(entityType: string): LoaderMeta;
export declare function failMeta(entityType: string, error?: any): LoaderMeta;
export declare function successMeta(entityType: string): LoaderMeta;
export declare function resetMeta(entityType: string): LoaderMeta;
export declare class LoaderLoadAction implements LoaderAction {
    type: string;
    readonly meta: LoaderMeta;
    constructor(entityType: string);
}
export declare class LoaderFailAction implements LoaderAction {
    type: string;
    readonly meta: LoaderMeta;
    constructor(entityType: string, error?: any);
}
export declare class LoaderSuccessAction implements LoaderAction {
    type: string;
    readonly meta: LoaderMeta;
    constructor(entityType: string);
}
export declare class LoaderResetAction implements LoaderAction {
    type: string;
    readonly meta: LoaderMeta;
    constructor(entityType: string);
}

import { Action } from '@ngrx/store';
import { ErrorModel, HttpErrorModel } from '@spartacus/core';
export declare const LOAD_CDC_USER_TOKEN = "[Auth] Load CDC User Token";
export declare const LOAD_CDC_USER_TOKEN_FAIL = "[Auth] Load CDC User Token Fail";
interface LoadUserTokenPayload {
    UID: string;
    UIDSignature: string;
    signatureTimestamp: string;
    idToken: string;
    baseSite: string;
}
interface LoadUserTokenFailurePayload {
    error: ErrorModel | HttpErrorModel | any;
    initialActionPayload: LoadUserTokenPayload;
}
export declare class LoadCdcUserTokenFail implements Action {
    payload: LoadUserTokenFailurePayload;
    readonly type = "[Auth] Load CDC User Token Fail";
    constructor(payload: LoadUserTokenFailurePayload);
}
export declare class LoadCdcUserToken implements Action {
    payload: LoadUserTokenPayload;
    readonly type = "[Auth] Load CDC User Token";
    constructor(payload: LoadUserTokenPayload);
}
export type CdcUserTokenAction = LoadCdcUserToken | LoadCdcUserTokenFail;
export {};

import { StateUtils } from '../../../../state/utils/index';
import { ClientToken } from '../../models/client-token.model';
export declare const LOAD_CLIENT_TOKEN = "[Token] Load Client Token";
export declare const LOAD_CLIENT_TOKEN_FAIL = "[Token] Load Client Token Fail";
export declare const LOAD_CLIENT_TOKEN_SUCCESS = "[Token] Load Client Token Success";
export declare class LoadClientToken extends StateUtils.LoaderLoadAction {
    readonly type = "[Token] Load Client Token";
    constructor();
}
export declare class LoadClientTokenFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Token] Load Client Token Fail";
    constructor(payload: any);
}
export declare class LoadClientTokenSuccess extends StateUtils.LoaderSuccessAction {
    payload: ClientToken;
    readonly type = "[Token] Load Client Token Success";
    constructor(payload: ClientToken);
}
export type ClientTokenAction = LoadClientToken | LoadClientTokenFail | LoadClientTokenSuccess;

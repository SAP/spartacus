import { StateUtils } from '../../../../state/utils/index';
import { ClientToken } from '../../models/client-token.model';
import { CLIENT_TOKEN_DATA } from '../client-auth-state';

export const LOAD_CLIENT_TOKEN = '[Token] Load Client Token';
export const LOAD_CLIENT_TOKEN_FAIL = '[Token] Load Client Token Fail';
export const LOAD_CLIENT_TOKEN_SUCCESS = '[Token] Load Client Token Success';

export class LoadClientToken extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CLIENT_TOKEN;
  constructor() {
    super(CLIENT_TOKEN_DATA);
  }
}

export class LoadClientTokenFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_CLIENT_TOKEN_FAIL;
  constructor(public payload: any) {
    super(CLIENT_TOKEN_DATA, payload);
  }
}

export class LoadClientTokenSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_CLIENT_TOKEN_SUCCESS;
  constructor(public payload: ClientToken) {
    super(CLIENT_TOKEN_DATA);
  }
}

export type ClientTokenAction =
  | LoadClientToken
  | LoadClientTokenFail
  | LoadClientTokenSuccess;

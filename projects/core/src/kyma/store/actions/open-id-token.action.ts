import { StateLoaderActions } from '../../../state/utils/index';
import { OpenIdToken } from '../../models/kyma-token-types.model';
import { OPEN_ID_TOKEN_DATA } from '../kyma-state';

export const LOAD_OPEN_ID_TOKEN = '[Kyma] Load Open ID Token';
export const LOAD_OPEN_ID_TOKEN_FAIL = '[Kyma] Load Open ID Token Fail';
export const LOAD_OPEN_ID_TOKEN_SUCCESS = '[Kyma] Load Open ID Token Success';

export class LoadOpenIdToken extends StateLoaderActions.LoaderLoadAction {
  readonly type = LOAD_OPEN_ID_TOKEN;
  constructor(public payload: { username: string; password: string }) {
    super(OPEN_ID_TOKEN_DATA);
  }
}

export class LoadOpenIdTokenFail extends StateLoaderActions.LoaderFailAction {
  readonly type = LOAD_OPEN_ID_TOKEN_FAIL;
  constructor(public payload: any) {
    super(OPEN_ID_TOKEN_DATA, payload);
  }
}

export class LoadOpenIdTokenSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = LOAD_OPEN_ID_TOKEN_SUCCESS;
  constructor(public payload: OpenIdToken) {
    super(OPEN_ID_TOKEN_DATA);
  }
}

export type OpenIdTokenActions =
  | LoadOpenIdToken
  | LoadOpenIdTokenFail
  | LoadOpenIdTokenSuccess;

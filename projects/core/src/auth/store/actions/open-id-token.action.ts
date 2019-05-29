import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import { OpenIdToken } from '../../models/token-types.model';
import { OPEN_ID_TOKEN_DATA } from '../auth-state';

export const LOAD_OPEN_ID_TOKEN = '[Token] Create Open ID Token';
export const LOAD_OPEN_ID_TOKEN_FAIL = '[Token] Create Open ID Token Fail';
export const LOAD_OPEN_ID_TOKEN_SUCCESS =
  '[Token] Create Open ID Token Success';

export class LoadOpenIdToken extends LoaderLoadAction {
  readonly type = LOAD_OPEN_ID_TOKEN;
  constructor(public payload: { username: string; password: string }) {
    super(OPEN_ID_TOKEN_DATA);
  }
}

export class LoadOpenIdTokenFail extends LoaderFailAction {
  readonly type = LOAD_OPEN_ID_TOKEN_FAIL;
  constructor(public payload: any) {
    super(OPEN_ID_TOKEN_DATA, payload);
  }
}

export class LoadOpenIdTokenSuccess extends LoaderSuccessAction {
  readonly type = LOAD_OPEN_ID_TOKEN_SUCCESS;
  constructor(public payload: OpenIdToken) {
    super(OPEN_ID_TOKEN_DATA);
  }
}

export type OpenIdTokenActions =
  | LoadOpenIdToken
  | LoadOpenIdTokenFail
  | LoadOpenIdTokenSuccess;

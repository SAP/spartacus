import { ConsentTemplateList } from '../../../occ/occ-models/additional-occ.models';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import { USER_CONSENTS } from '../user-state';

export const LOAD_USER_CONSENTS = '[User] Load User Consents';
export const LOAD_USER_CONSENTS_SUCCESS = '[User] Load User Consents Success';
export const LOAD_USER_CONSENTS_FAIL = '[User] Load User Consents Fail';

// TODO:#1184 - test

export class LoadUserConsents extends LoaderLoadAction {
  readonly type = LOAD_USER_CONSENTS;
  constructor() {
    super(USER_CONSENTS);
  }
}

export class LoadUserConsentsFail extends LoaderFailAction {
  readonly type = LOAD_USER_CONSENTS_FAIL;
  constructor(public payload: any) {
    super(USER_CONSENTS, payload);
  }
}

export class LoadUserConsentsSuccess extends LoaderSuccessAction {
  readonly type = LOAD_USER_CONSENTS_SUCCESS;
  constructor(public payload: ConsentTemplateList) {
    super(USER_CONSENTS);
  }
}

export type UserConsentsAction =
  | LoadUserConsents
  | LoadUserConsentsFail
  | LoadUserConsentsSuccess;

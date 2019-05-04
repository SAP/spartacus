import {
  ConsentTemplate,
  ConsentTemplateList,
} from '../../../occ/occ-models/additional-occ.models';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  EntityFailAction,
  EntityLoadAction,
  EntityResetAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderResetAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import { GIVE_CONSENT_PROCESS_ID, USER_CONSENTS } from '../user-state';

export const LOAD_USER_CONSENTS = '[User] Load User Consents';
export const LOAD_USER_CONSENTS_SUCCESS = '[User] Load User Consents Success';
export const LOAD_USER_CONSENTS_FAIL = '[User] Load User Consents Fail';
export const RESET_LOAD_USER_CONSENTS = '[User] Reset Load User Consents';
export const GIVE_USER_CONSENT = '[User] Give User Consent';
export const GIVE_USER_CONSENT_FAIL = '[User] Give User Consent Fail';
export const GIVE_USER_CONSENT_SUCCESS = '[User] Give User Consent Success';
export const RESET_GIVE_USER_CONSENT_PROCESS =
  '[User] Reset Give User Consent Process';

// TODO:#1184 - test

export class LoadUserConsents extends LoaderLoadAction {
  readonly type = LOAD_USER_CONSENTS;
  constructor(public payload: string) {
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

export class ResetLoadUserConsents extends LoaderResetAction {
  readonly type = RESET_LOAD_USER_CONSENTS;
  constructor() {
    super(USER_CONSENTS);
  }
}

export class GiveUserConsent extends EntityLoadAction {
  readonly type = GIVE_USER_CONSENT;
  constructor(
    public payload: {
      userId: string;
      consentTemplateId: string;
      consentTemplateVersion: number;
    }
  ) {
    super(PROCESS_FEATURE, GIVE_CONSENT_PROCESS_ID);
  }
}

export class GiveUserConsentFail extends EntityFailAction {
  readonly type = GIVE_USER_CONSENT_FAIL;
  constructor(payload: any) {
    super(PROCESS_FEATURE, GIVE_CONSENT_PROCESS_ID, payload);
  }
}

export class GiveUserConsentSuccess extends EntitySuccessAction {
  readonly type = GIVE_USER_CONSENT_SUCCESS;
  constructor(public consent: ConsentTemplate) {
    super(PROCESS_FEATURE, GIVE_CONSENT_PROCESS_ID);
  }
}
export class ResetGiveUserConsentProcess extends EntityResetAction {
  readonly type = RESET_GIVE_USER_CONSENT_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, GIVE_CONSENT_PROCESS_ID);
  }
}

export type UserConsentsAction =
  | LoadUserConsents
  | LoadUserConsentsFail
  | LoadUserConsentsSuccess
  | ResetLoadUserConsents
  | GiveUserConsent
  | GiveUserConsentFail
  | GiveUserConsentSuccess;

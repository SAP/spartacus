import { ConsentTemplate } from '../../../model/consent.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import {
  GIVE_CONSENT_PROCESS_ID,
  USER_CONSENTS,
  WITHDRAW_CONSENT_PROCESS_ID,
} from '../user-state';

export const LOAD_USER_CONSENTS = '[User] Load User Consents';
export const LOAD_USER_CONSENTS_SUCCESS = '[User] Load User Consents Success';
export const LOAD_USER_CONSENTS_FAIL = '[User] Load User Consents Fail';
export const RESET_LOAD_USER_CONSENTS = '[User] Reset Load User Consents';

export const GIVE_USER_CONSENT = '[User] Give User Consent';
export const GIVE_USER_CONSENT_FAIL = '[User] Give User Consent Fail';
export const GIVE_USER_CONSENT_SUCCESS = '[User] Give User Consent Success';
export const RESET_GIVE_USER_CONSENT_PROCESS =
  '[User] Reset Give User Consent Process';
export const TRANSFER_ANONYMOUS_CONSENT = '[User] Transfer Anonymous Consent';

export const WITHDRAW_USER_CONSENT = '[User] Withdraw User Consent';
export const WITHDRAW_USER_CONSENT_FAIL = '[User] Withdraw User Consent Fail';
export const WITHDRAW_USER_CONSENT_SUCCESS =
  '[User] Withdraw User Consent Success';
export const RESET_WITHDRAW_USER_CONSENT_PROCESS =
  '[User] Reset Withdraw User Consent Process';

export class LoadUserConsents extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_USER_CONSENTS;
  constructor(public payload: string) {
    super(USER_CONSENTS);
  }
}

export class LoadUserConsentsFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_USER_CONSENTS_FAIL;
  constructor(public payload: any) {
    super(USER_CONSENTS, payload);
  }
}

export class LoadUserConsentsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_USER_CONSENTS_SUCCESS;
  constructor(public payload: ConsentTemplate[]) {
    super(USER_CONSENTS);
  }
}

export class ResetLoadUserConsents extends StateUtils.LoaderResetAction {
  readonly type = RESET_LOAD_USER_CONSENTS;
  constructor() {
    super(USER_CONSENTS);
  }
}

export class GiveUserConsent extends StateUtils.EntityLoadAction {
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

export class GiveUserConsentFail extends StateUtils.EntityFailAction {
  readonly type = GIVE_USER_CONSENT_FAIL;
  constructor(payload: any) {
    super(PROCESS_FEATURE, GIVE_CONSENT_PROCESS_ID, payload);
  }
}

export class GiveUserConsentSuccess extends StateUtils.EntitySuccessAction {
  readonly type = GIVE_USER_CONSENT_SUCCESS;
  constructor(public consentTemplate: ConsentTemplate) {
    super(PROCESS_FEATURE, GIVE_CONSENT_PROCESS_ID);
  }
}

export class ResetGiveUserConsentProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_GIVE_USER_CONSENT_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, GIVE_CONSENT_PROCESS_ID);
  }
}

export class TransferAnonymousConsent {
  readonly type = TRANSFER_ANONYMOUS_CONSENT;
  constructor(
    public payload: {
      userId: string;
      consentTemplateId: string;
      consentTemplateVersion: number;
    }
  ) {}
}

export class WithdrawUserConsent extends StateUtils.EntityLoadAction {
  readonly type = WITHDRAW_USER_CONSENT;
  constructor(
    public payload: {
      userId: string;
      consentCode: string;
    }
  ) {
    super(PROCESS_FEATURE, WITHDRAW_CONSENT_PROCESS_ID);
  }
}

export class WithdrawUserConsentFail extends StateUtils.EntityFailAction {
  readonly type = WITHDRAW_USER_CONSENT_FAIL;
  constructor(payload: any) {
    super(PROCESS_FEATURE, WITHDRAW_CONSENT_PROCESS_ID, payload);
  }
}

export class WithdrawUserConsentSuccess extends StateUtils.EntitySuccessAction {
  readonly type = WITHDRAW_USER_CONSENT_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, WITHDRAW_CONSENT_PROCESS_ID);
  }
}

export class ResetWithdrawUserConsentProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_WITHDRAW_USER_CONSENT_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, WITHDRAW_CONSENT_PROCESS_ID);
  }
}

export type UserConsentsAction =
  | LoadUserConsents
  | LoadUserConsentsFail
  | LoadUserConsentsSuccess
  | ResetLoadUserConsents
  | GiveUserConsent
  | GiveUserConsentFail
  | GiveUserConsentSuccess
  | ResetGiveUserConsentProcess
  | WithdrawUserConsent
  | WithdrawUserConsentFail
  | WithdrawUserConsentSuccess
  | ResetWithdrawUserConsentProcess;

import {
  AnonymousConsent,
  ConsentTemplate,
} from '../../../model/consent.model';
import { StateUtils } from '../../../state/utils/index';
import { ANONYMOUS_CONSENTS } from '../anonymous-consents-state';

export const LOAD_ANONYMOUS_CONSENT_TEMPLATES =
  '[Anonymous Consents] Load Anonymous Consent Templates';
export const LOAD_ANONYMOUS_CONSENT_TEMPLATES_SUCCESS =
  '[Anonymous Consents] Load Anonymous Consent Templates Success';
export const LOAD_ANONYMOUS_CONSENT_TEMPLATES_FAIL =
  '[Anonymous Consents] Load Anonymous Consent Templates Fail';
export const RESET_LOAD_ANONYMOUS_CONSENT_TEMPLATES =
  '[Anonymous Consents] Reset Load Anonymous Consent Templates';

export const GET_ALL_ANONYMOUS_CONSENTS =
  '[Anonymous Consents] Get All Anonymous Consents';
export const GET_ANONYMOUS_CONSENT =
  '[Anonymous Consents] Get Anonymous Consent';
export const SET_ANONYMOUS_CONSENTS =
  '[Anonymous Consents] Set Anonymous Consents';
export const GIVE_ANONYMOUS_CONSENT =
  '[Anonymous Consents] Give Anonymous Consent';
export const WITHDRAW_ANONYMOUS_CONSENT =
  '[Anonymous Consents] Withdraw Anonymous Consent';

export const TOGGLE_ANONYMOUS_CONSENTS_BANNER_DISMISSED =
  '[Anonymous Consents] Toggle Anonymous Consents Banner Dismissed';
export const TOGGLE_ANONYMOUS_CONSENT_TEMPLATES_UPDATED =
  '[Anonymous Consents] Anonymous Consent Templates Updated';
export const ANONYMOUS_CONSENT_CHECK_UPDATED_VERSIONS =
  '[Anonymous Consents] Check Updated Versions';

export class LoadAnonymousConsentTemplates extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_ANONYMOUS_CONSENT_TEMPLATES;
  constructor() {
    super(ANONYMOUS_CONSENTS);
  }
}

export class LoadAnonymousConsentTemplatesSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_ANONYMOUS_CONSENT_TEMPLATES_SUCCESS;
  constructor(public payload: ConsentTemplate[]) {
    super(ANONYMOUS_CONSENTS);
  }
}
export class LoadAnonymousConsentTemplatesFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_ANONYMOUS_CONSENT_TEMPLATES_FAIL;
  constructor(payload: any) {
    super(ANONYMOUS_CONSENTS, payload);
  }
}

export class ResetLoadAnonymousConsentTemplates extends StateUtils.LoaderResetAction {
  readonly type = RESET_LOAD_ANONYMOUS_CONSENT_TEMPLATES;
  constructor() {
    super(ANONYMOUS_CONSENTS);
  }
}

export class GetAllAnonymousConsents {
  readonly type = GET_ALL_ANONYMOUS_CONSENTS;
  constructor() {}
}

export class GetAnonymousConsent {
  readonly type = GET_ANONYMOUS_CONSENT;
  constructor(public templateCode: string) {}
}

export class SetAnonymousConsents {
  readonly type = SET_ANONYMOUS_CONSENTS;
  constructor(public payload: AnonymousConsent[]) {}
}

export class GiveAnonymousConsent {
  readonly type = GIVE_ANONYMOUS_CONSENT;
  constructor(public templateCode: string) {}
}

export class WithdrawAnonymousConsent {
  readonly type = WITHDRAW_ANONYMOUS_CONSENT;
  constructor(public templateCode: string) {}
}

export class ToggleAnonymousConsentsBannerDissmissed {
  readonly type = TOGGLE_ANONYMOUS_CONSENTS_BANNER_DISMISSED;
  constructor(public dismissed: boolean) {}
}

export class ToggleAnonymousConsentTemplatesUpdated {
  readonly type = TOGGLE_ANONYMOUS_CONSENT_TEMPLATES_UPDATED;
  constructor(public updated: boolean) {}
}

export class AnonymousConsentCheckUpdatedVersions {
  readonly type = ANONYMOUS_CONSENT_CHECK_UPDATED_VERSIONS;
  constructor() {}
}

export type AnonymousConsentsActions =
  | LoadAnonymousConsentTemplates
  | LoadAnonymousConsentTemplatesSuccess
  | LoadAnonymousConsentTemplatesFail
  | ResetLoadAnonymousConsentTemplates
  | GetAllAnonymousConsents
  | SetAnonymousConsents
  | GetAnonymousConsent
  | GiveAnonymousConsent
  | WithdrawAnonymousConsent
  | ToggleAnonymousConsentsBannerDissmissed
  | ToggleAnonymousConsentTemplatesUpdated
  | AnonymousConsentCheckUpdatedVersions;

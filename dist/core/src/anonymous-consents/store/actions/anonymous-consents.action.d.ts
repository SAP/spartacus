import { AnonymousConsent, ConsentTemplate } from '../../../model/consent.model';
import { StateUtils } from '../../../state/utils/index';
export declare const LOAD_ANONYMOUS_CONSENT_TEMPLATES = "[Anonymous Consents] Load Anonymous Consent Templates";
export declare const LOAD_ANONYMOUS_CONSENT_TEMPLATES_SUCCESS = "[Anonymous Consents] Load Anonymous Consent Templates Success";
export declare const LOAD_ANONYMOUS_CONSENT_TEMPLATES_FAIL = "[Anonymous Consents] Load Anonymous Consent Templates Fail";
export declare const RESET_LOAD_ANONYMOUS_CONSENT_TEMPLATES = "[Anonymous Consents] Reset Load Anonymous Consent Templates";
export declare const GET_ALL_ANONYMOUS_CONSENTS = "[Anonymous Consents] Get All Anonymous Consents";
export declare const GET_ANONYMOUS_CONSENT = "[Anonymous Consents] Get Anonymous Consent";
export declare const SET_ANONYMOUS_CONSENTS = "[Anonymous Consents] Set Anonymous Consents";
export declare const GIVE_ANONYMOUS_CONSENT = "[Anonymous Consents] Give Anonymous Consent";
export declare const WITHDRAW_ANONYMOUS_CONSENT = "[Anonymous Consents] Withdraw Anonymous Consent";
export declare const TOGGLE_ANONYMOUS_CONSENTS_BANNER_DISMISSED = "[Anonymous Consents] Toggle Anonymous Consents Banner Dismissed";
export declare const TOGGLE_ANONYMOUS_CONSENT_TEMPLATES_UPDATED = "[Anonymous Consents] Anonymous Consent Templates Updated";
export declare const ANONYMOUS_CONSENT_CHECK_UPDATED_VERSIONS = "[Anonymous Consents] Check Updated Versions";
export declare class LoadAnonymousConsentTemplates extends StateUtils.LoaderLoadAction {
    readonly type = "[Anonymous Consents] Load Anonymous Consent Templates";
    constructor();
}
export declare class LoadAnonymousConsentTemplatesSuccess extends StateUtils.LoaderSuccessAction {
    payload: ConsentTemplate[];
    readonly type = "[Anonymous Consents] Load Anonymous Consent Templates Success";
    constructor(payload: ConsentTemplate[]);
}
export declare class LoadAnonymousConsentTemplatesFail extends StateUtils.LoaderFailAction {
    readonly type = "[Anonymous Consents] Load Anonymous Consent Templates Fail";
    constructor(payload: any);
}
export declare class ResetLoadAnonymousConsentTemplates extends StateUtils.LoaderResetAction {
    readonly type = "[Anonymous Consents] Reset Load Anonymous Consent Templates";
    constructor();
}
export declare class GetAllAnonymousConsents {
    readonly type = "[Anonymous Consents] Get All Anonymous Consents";
    constructor();
}
export declare class GetAnonymousConsent {
    templateCode: string;
    readonly type = "[Anonymous Consents] Get Anonymous Consent";
    constructor(templateCode: string);
}
export declare class SetAnonymousConsents {
    payload: AnonymousConsent[];
    readonly type = "[Anonymous Consents] Set Anonymous Consents";
    constructor(payload: AnonymousConsent[]);
}
export declare class GiveAnonymousConsent {
    templateCode: string;
    readonly type = "[Anonymous Consents] Give Anonymous Consent";
    constructor(templateCode: string);
}
export declare class WithdrawAnonymousConsent {
    templateCode: string;
    readonly type = "[Anonymous Consents] Withdraw Anonymous Consent";
    constructor(templateCode: string);
}
export declare class ToggleAnonymousConsentsBannerDissmissed {
    dismissed: boolean;
    readonly type = "[Anonymous Consents] Toggle Anonymous Consents Banner Dismissed";
    constructor(dismissed: boolean);
}
export declare class ToggleAnonymousConsentTemplatesUpdated {
    updated: boolean;
    readonly type = "[Anonymous Consents] Anonymous Consent Templates Updated";
    constructor(updated: boolean);
}
export declare class AnonymousConsentCheckUpdatedVersions {
    readonly type = "[Anonymous Consents] Check Updated Versions";
    constructor();
}
export type AnonymousConsentsActions = LoadAnonymousConsentTemplates | LoadAnonymousConsentTemplatesSuccess | LoadAnonymousConsentTemplatesFail | ResetLoadAnonymousConsentTemplates | GetAllAnonymousConsents | SetAnonymousConsents | GetAnonymousConsent | GiveAnonymousConsent | WithdrawAnonymousConsent | ToggleAnonymousConsentsBannerDissmissed | ToggleAnonymousConsentTemplatesUpdated | AnonymousConsentCheckUpdatedVersions;

import { ConsentTemplate } from '../../../model/consent.model';
import { StateUtils } from '../../../state/utils/index';
export declare const LOAD_USER_CONSENTS = "[User] Load User Consents";
export declare const LOAD_USER_CONSENTS_SUCCESS = "[User] Load User Consents Success";
export declare const LOAD_USER_CONSENTS_FAIL = "[User] Load User Consents Fail";
export declare const RESET_LOAD_USER_CONSENTS = "[User] Reset Load User Consents";
export declare const GIVE_USER_CONSENT = "[User] Give User Consent";
export declare const GIVE_USER_CONSENT_FAIL = "[User] Give User Consent Fail";
export declare const GIVE_USER_CONSENT_SUCCESS = "[User] Give User Consent Success";
export declare const RESET_GIVE_USER_CONSENT_PROCESS = "[User] Reset Give User Consent Process";
export declare const TRANSFER_ANONYMOUS_CONSENT = "[User] Transfer Anonymous Consent";
export declare const WITHDRAW_USER_CONSENT = "[User] Withdraw User Consent";
export declare const WITHDRAW_USER_CONSENT_FAIL = "[User] Withdraw User Consent Fail";
export declare const WITHDRAW_USER_CONSENT_SUCCESS = "[User] Withdraw User Consent Success";
export declare const RESET_WITHDRAW_USER_CONSENT_PROCESS = "[User] Reset Withdraw User Consent Process";
export declare class LoadUserConsents extends StateUtils.LoaderLoadAction {
    payload: string;
    readonly type = "[User] Load User Consents";
    constructor(payload: string);
}
export declare class LoadUserConsentsFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Load User Consents Fail";
    constructor(payload: any);
}
export declare class LoadUserConsentsSuccess extends StateUtils.LoaderSuccessAction {
    payload: ConsentTemplate[];
    readonly type = "[User] Load User Consents Success";
    constructor(payload: ConsentTemplate[]);
}
export declare class ResetLoadUserConsents extends StateUtils.LoaderResetAction {
    readonly type = "[User] Reset Load User Consents";
    constructor();
}
export declare class GiveUserConsent extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        consentTemplateId: string | undefined;
        consentTemplateVersion: number | undefined;
    };
    readonly type = "[User] Give User Consent";
    constructor(payload: {
        userId: string;
        consentTemplateId: string | undefined;
        consentTemplateVersion: number | undefined;
    });
}
export declare class GiveUserConsentFail extends StateUtils.EntityFailAction {
    readonly type = "[User] Give User Consent Fail";
    constructor(payload: any);
}
export declare class GiveUserConsentSuccess extends StateUtils.EntitySuccessAction {
    consentTemplate: ConsentTemplate;
    readonly type = "[User] Give User Consent Success";
    constructor(consentTemplate: ConsentTemplate);
}
export declare class ResetGiveUserConsentProcess extends StateUtils.EntityLoaderResetAction {
    readonly type = "[User] Reset Give User Consent Process";
    constructor();
}
export declare class TransferAnonymousConsent {
    payload: {
        userId: string;
        consentTemplateId: string | undefined;
        consentTemplateVersion: number | undefined;
    };
    readonly type = "[User] Transfer Anonymous Consent";
    constructor(payload: {
        userId: string;
        consentTemplateId: string | undefined;
        consentTemplateVersion: number | undefined;
    });
}
export declare class WithdrawUserConsent extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        consentCode: string;
        consentId?: string;
    };
    readonly type = "[User] Withdraw User Consent";
    constructor(payload: {
        userId: string;
        consentCode: string;
        consentId?: string;
    });
}
export declare class WithdrawUserConsentFail extends StateUtils.EntityFailAction {
    readonly type = "[User] Withdraw User Consent Fail";
    constructor(payload: any);
}
export declare class WithdrawUserConsentSuccess extends StateUtils.EntitySuccessAction {
    readonly type = "[User] Withdraw User Consent Success";
    constructor();
}
export declare class ResetWithdrawUserConsentProcess extends StateUtils.EntityLoaderResetAction {
    readonly type = "[User] Reset Withdraw User Consent Process";
    constructor();
}
export type UserConsentsAction = LoadUserConsents | LoadUserConsentsFail | LoadUserConsentsSuccess | ResetLoadUserConsents | GiveUserConsent | GiveUserConsentFail | GiveUserConsentSuccess | ResetGiveUserConsentProcess | WithdrawUserConsent | WithdrawUserConsentFail | WithdrawUserConsentSuccess | ResetWithdrawUserConsentProcess;

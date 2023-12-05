export interface ConsentTemplate {
    id?: string;
    name?: string;
    description?: string;
    version?: number;
    currentConsent?: Consent;
}
export interface Consent {
    code?: string;
    consentGivenDate?: Date;
    consentWithdrawnDate?: Date;
}
export interface AnonymousConsent {
    templateCode?: string;
    templateVersion?: number;
    consentState?: ANONYMOUS_CONSENT_STATUS;
}
export declare enum ANONYMOUS_CONSENT_STATUS {
    GIVEN = "GIVEN",
    WITHDRAWN = "WITHDRAWN"
}
export declare const ANONYMOUS_CONSENTS_HEADER = "X-Anonymous-Consents";

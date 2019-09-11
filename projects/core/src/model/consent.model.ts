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
  version?: number;
  consentState?: ANONYMOUS_CONSENT_STATUS;
}

export enum ANONYMOUS_CONSENT_STATUS {
  ANONYMOUS_CONSENT_GIVEN = 'GIVEN',
  ANONYMOUS_CONSENT_WITHDRAWN = 'WITHDRAWN',
}

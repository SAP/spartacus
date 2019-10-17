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
  GIVEN = 'GIVEN',
  WITHDRAWN = 'WITHDRAWN',
}

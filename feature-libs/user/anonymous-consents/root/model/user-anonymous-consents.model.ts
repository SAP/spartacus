// TODO:#anon - make augmentable?

// TODO:#anon - move to the user/consents
export interface ConsentTemplate {
  id?: string;
  name?: string;
  description?: string;
  version?: number;
  currentConsent?: Consent;
}

// TODO:#anon - move to the user/consents
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

export enum ANONYMOUS_CONSENT_STATUS {
  GIVEN = 'GIVEN',
  WITHDRAWN = 'WITHDRAWN',
}

export const ANONYMOUS_CONSENTS_HEADER = 'X-Anonymous-Consents';

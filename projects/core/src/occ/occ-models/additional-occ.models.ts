export interface ConsentTemplateList {
  consentTemplates?: ConsentTemplate[];
}
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

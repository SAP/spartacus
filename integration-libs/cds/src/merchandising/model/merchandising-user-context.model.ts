export interface MerchandisingUserContext {
  category?: string;
  // This property is productCodes in OCC
  products?: string[];
  facets?: string;
  consentReference?: string;
}

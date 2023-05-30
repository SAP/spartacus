export interface CdcSiteConsentTemplate {
  siteConsentDetails: {
    [key: string]: { isMandatory: boolean; isActive: boolean };
  };
}

export interface CdcLocalStorageTemplate {
  id: string;
  required: boolean;
}


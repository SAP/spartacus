import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CdcConsentTemplate {
  documentUrl?: string;
  required?: Boolean;
}

declare module '@spartacus/core' {
  interface ConsentTemplate extends CdcConsentTemplate {}
}

export interface CdcSiteConsentTemplate {
  status: number;
  statusMessage: string;
  errorCode: number;
  errorMessage: string;
  siteConsentDetails: {
    [key: string]: siteConsentDetail;
  };
}

export interface siteConsentDetail {
  defaultLang: string;
  isActive: boolean;
  isMandatory: boolean;
  legalStatements: {
    [key: string]: legalStatement;
  };
}

export interface legalStatement {
  currentDocVersion: number;
  minDocVersion: number;
  purpose: string;
  documentUrl: string;
}

export interface userConsentPreferences {
  inTransition: boolean;
  errorCode: number;
  errorMessage: string;
  UID: string;
  preferences: any;
}

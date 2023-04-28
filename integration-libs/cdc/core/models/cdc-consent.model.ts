/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CdcSiteConsentTemplate {
  status: number;
  statusMessage: string;
  errorCode: number;
  errorMessage: string;
  siteConsentDetails: siteConsentDetailTemplate[];
}

export interface siteConsentDetailTemplate {
  defaultLang: string;
  isActive: Boolean;
  isMandatory: Boolean;
  legalStatements: legalStatement[];
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

// export interface preferences: any;

export interface preference {
  isConsentGranted: boolean;
  actionTimestamp: string;
  lastConsentModified: Date;
  language: string;
  docVersion: float;
  docDate: Date;
  customdata: [{}];
  tags: string[];
  entitlements: [];
  locales: [];
}

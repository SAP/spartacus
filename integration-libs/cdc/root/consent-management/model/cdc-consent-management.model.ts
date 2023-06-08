/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CdcSiteConsentTemplate {
  siteConsentDetails: {
    [key: string]: { isMandatory: boolean; isActive: boolean };
  };
}

export interface CdcLocalStorageTemplate {
  id: string;
  required: boolean;
}

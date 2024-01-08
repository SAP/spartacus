/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    CDC_RECONSENT = 'CDC_RECONSENT',
  }
}

declare module '@spartacus/user/profile/root' {
  export interface UserSignUp {
    firstName?: string;
    lastName?: string;
    password?: string;
    titleCode?: string;
    uid?: string;
    preferences?: any;
  }
}
export interface CdcSiteConsentTemplate {
  siteConsentDetails: {
    [key: string]: { isMandatory: boolean; isActive: boolean };
  };
}

export interface CdcLocalStorageTemplate {
  id: string;
  required: boolean;
}

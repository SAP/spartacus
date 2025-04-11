/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';
import { CdcConsent } from '../consent-management';

/**
 * Indicates the failure during the loading of the user token.
 */
export class CdcLoadUserTokenFailEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CdcLoadUserTokenFailEvent';
}

export class CdcReConsentEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'CdcReConsentEvent';
  user: string;
  password: string;
  consentIds: string[];
  errorMessage: string;
  regToken: string;
  preferences?: Record<string, CdcConsent>;
}

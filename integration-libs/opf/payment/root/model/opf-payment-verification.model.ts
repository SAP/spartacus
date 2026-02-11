/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpfKeyValueMap } from '@spartacus/opf/base/root';

export interface OpfPaymentVerificationPayload {
  responseMap: Array<OpfKeyValueMap>;
}

export interface OpfPaymentVerificationResponse {
  result: string;
}

export enum OpfPaymentVerificationResult {
  AUTHORIZED = 'AUTHORIZED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  CANCELLED = 'CANCELLED',
  DELAYED = 'DELAYED',
}

export enum OpfPaymentVerificationUrlInput {
  OPF_AFTER_REDIRECT_SCRIPT_FLAG = 'opfAfterRedirectScriptFlag',
  OPF_PAYMENT_SESSION_ID = 'opfPaymentSessionId',
}

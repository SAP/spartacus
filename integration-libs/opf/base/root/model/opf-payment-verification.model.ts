/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OpfPaymentVerificationPayload {
  responseMap: OpfResponseMapElement[];
}

export interface OpfResponseMapElement {
  key: string;
  value: string;
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

export enum OpfPaymenVerificationUrlInput {
  PAYMENT_SESSION_ID = 'paymentSessionId',
  ORDER_ID = 'orderId',
}

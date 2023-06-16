/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OpfRenderPaymentMethodEvent {
  isLoading: boolean;
  isError: boolean;
  renderType?: OpfPaymentMethodType | null;
  data?: string | null;
}

export enum OpfPaymentMethodType {
  DESTINATION = 'DESTINATION',
  DYNAMIC_SCRIPT = 'DYNAMIC_SCRIPT',
}

export enum PaymentProcessingState {
  IN_PROGRESS = 'inProgress',
  NOT_IN_PROGRESS = 'notInProgress',
}

export interface OpfPaymentMetadata {
  termsAndConditionsChecked: boolean;
  selectedPaymentOptionId: number | undefined;
  paymentProcessingState: PaymentProcessingState;
}

/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentDestination, PaymentPattern } from './opf-payment.model';

export interface OpfRenderPaymentMethodEvent {
  isLoading: boolean;
  isError: boolean;
  renderType?: PaymentPattern;
  data?: string | null;
  destination?: PaymentDestination;
}

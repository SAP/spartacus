/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OccDpPaymentRequest {
  postUrl?: string;
  parameters?: {
    entry?: Array<{ key?: string; value?: string }>;
  };
}

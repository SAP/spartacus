/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CustomerCouponEntry {
  code: string | undefined;
  name: string | undefined;
  applied: boolean;
  codeForApplyAction: string;
}

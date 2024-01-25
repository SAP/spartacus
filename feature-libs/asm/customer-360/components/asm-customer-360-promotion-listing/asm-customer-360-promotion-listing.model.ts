/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PromotionListEntry {
  [key: string]: string | boolean | undefined;
}

export interface GeneralEntry extends PromotionListEntry {
  applied: boolean;
  code: string;
  name?: string;
}

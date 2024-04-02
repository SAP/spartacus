/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Translatable {
  key?: string;
  params?: TranslatableParams;
  raw?: string;
}

export interface TranslatableParams {
  [param: string]: any;
}

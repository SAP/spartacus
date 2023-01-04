/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Translatable {
  key?: string | string[];
  params?: TranslatableParams;
  raw?: string;
}

export interface TranslatableParams {
  [param: string]: any;
}

export function isTranslatable(input: any): input is Translatable {
  return typeof input !== 'string' && ('key' in input || 'raw' in input);
}

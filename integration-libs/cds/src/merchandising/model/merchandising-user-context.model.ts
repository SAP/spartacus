/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MerchandisingUserContext {
  category?: string;
  // This property is productCodes in OCC
  products?: string[];
  facets?: string;
  consentReference?: string;
  searchPhrase?: string;
}

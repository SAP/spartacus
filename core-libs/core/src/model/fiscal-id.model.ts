/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export enum FiscalIdMode {
  DISABLED = 'SAP_DISABLED',
  OPTIONAL_UNCHECKED = 'SAP_OPTIONAL_UNCHECKED',
  OPTIONAL_STRICT = 'SAP_OPTIONAL_STRICT',
  REQUIRED_UNCHECKED = 'SAP_REQUIRED_UNCHECKED',
  REQUIRED_STRICT = 'SAP_REQUIRED_STRICT',
}

export interface FiscalIdEntry {
  sapValue?: string;
  sapType?: string;
}

export interface FiscalId {
  sapCountry?: string;
  sapFiscalIdEntries?: FiscalIdEntry[];
}

export interface FiscalIdRuleEntry {
  sapType?: string;
}

export interface FiscalIdRule {
  sapCountry?: string;
  sapFiscalIdRuleEntries?: FiscalIdRuleEntry[];
}

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/** Maps the six standard LLD error codes to fiscalId.errors; all others use unknown. */
export function getFiscalIdErrorKey(errorCode?: string): string {
  switch (errorCode) {
    case 'fiscal.id.invalid.format':
      return 'invalidFormat';
    case 'fiscal.id.checksum.invalid':
      return 'checksumInvalid';
    case 'fiscal.id.custom.validation.failed':
      return 'customValidationFailed';
    case 'fiscal.id.rules.not.configured':
      return 'rulesNotConfigured';
    case 'fiscal.id.country.required':
      return 'countryRequired';
    case 'fiscal.id.store.disabled':
      return 'storeDisabled';
    default:
      return 'unknown';
  }
}

/** Supplies the country placeholder used by the LLD's two country-specific messages. */
export function getFiscalIdErrorParams(
  errorKey: string,
  country?: string
): { country: string } | undefined {
  return errorKey === 'invalidFormat' || errorKey === 'rulesNotConfigured'
    ? { country: country ?? '' }
    : undefined;
}

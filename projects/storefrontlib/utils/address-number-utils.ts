/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from '@spartacus/core';

/**
 * Get strings for phone and mobile numbers
 */
export function getAddressNumbers(
  address: Address,
  textPhone: string,
  textMobile: string
): string | undefined {
  if (address.cellphone && address.phone) {
    if (address.cellphone === address.phone) {
      return textMobile + ': ' + address.cellphone;
    }
    return `${textPhone}: ${address.phone}\n${textMobile}: ${address.cellphone}`;
  }

  if (address.cellphone) {
    return textMobile + ': ' + address.cellphone;
  }

  if (address.phone) {
    return textPhone + ': ' + address.phone;
  }

  return undefined;
}

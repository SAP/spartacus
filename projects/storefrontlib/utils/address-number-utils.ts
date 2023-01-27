/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
  let numbers;
  if (address.cellphone && address.phone) {
    numbers = `${textPhone}: ${address.phone}\n${textMobile}: ${address.cellphone}`;
    if (address.cellphone === address.phone) {
      numbers = textMobile + ': ' + address.cellphone;
    }
  } else if (address.cellphone) {
    numbers = textMobile + ': ' + address.cellphone;
  } else if (address.phone) {
    numbers = textPhone + ': ' + address.phone;
  }
  return numbers;
}

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from "@spartacus/core";


/**
 * Get strings for phone and mobile numbers
 */
export function getAddressNumbers(address: Address): string {
  let numbers= '';
  if (address.cellphone && address.phone) {
    numbers =
    `P: ${address.phone}
    M: ${address.cellphone}`;
    if(address.cellphone === address.phone) {
      numbers = 'M: ' + address.cellphone;
    }
  } else if (address.cellphone) {
    numbers = 'M: ' + address.cellphone;
  } else if (address.phone) {
    numbers =  'P: ' + address.phone;
  }

  return numbers;
}

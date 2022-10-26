/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Address } from "@spartacus/core";


/**
 * Get strings for phone and mobile numbers
 */
export function getAddressNumbers(
  address: Address, 
  textPhone: string, 
  textMobile: string): string|undefined {
  let numbers= undefined;
  if (address.cellphone && address.phone) {
    numbers =
    `${textPhone}: ${address.phone}
    ${textMobile}: ${address.cellphone}`;
    if(address.cellphone === address.phone) {
      numbers = textMobile + ': '  + address.cellphone;
    }
  } else if (address.cellphone) {
    numbers = textMobile + ': ' + address.cellphone;
  } else if (address.phone) {
    numbers =  textPhone + ': ' + address.phone;
  }
  return numbers;
}

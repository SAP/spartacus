/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '@spartacus/core';
import { Card } from '@spartacus/storefront';

@Pipe({
  name: 'cxGetAddressCardContent',
})
export class GetAddressCardContent implements PipeTransform {
  transform(address: Address): Card {
    if (!address) {
      return {};
    }

    return {
      textBold: `${address.firstName} ${address.lastName}`,
      text: [
        address.line1,
        address.line2,
        this.getTownLine(address),
        address.postalCode,
        address.phone,
      ],
    } as Card;
  }

  protected getTownLine(address: Address): string {
    const region = address.region?.isocode || '';
    const town = address.town || '';
    const countryIsocode = address.country?.isocode || '';

    const townLineParts = [];

    if (town) {
      townLineParts.push(town);
    }

    if (region) {
      if (town) {
        townLineParts.push(', ');
      }
      townLineParts.push(region);
    }

    if (countryIsocode) {
      if (town || region) {
        townLineParts.push(', ');
      }
      townLineParts.push(countryIsocode);
    }

    return townLineParts.join('');
  }
}

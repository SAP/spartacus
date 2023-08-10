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

    let region = '';

    if (address.region && address.region.isocode) {
      region = address.region.isocode;
    }

    let townLine = '';

    if (address.town || region || address.country?.isocode) {
      townLine += address.town ? address.town : '';
      townLine +=
        address.town && (region || address.country?.isocode) ? ', ' : '';
      townLine += region ? `${region}, ` : '';
      townLine += address.country?.isocode ? `${address.country?.isocode}` : '';
    }

    return {
      textBold: address.firstName + ' ' + address.lastName,
      text: [
        address.line1,
        address.line2,
        townLine,
        address.postalCode,
        address.phone,
      ],
    } as Card;
  }
}

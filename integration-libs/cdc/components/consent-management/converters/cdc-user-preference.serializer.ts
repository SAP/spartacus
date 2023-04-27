/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ConsentTemplate, Converter } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class CdcUserPreferenceSerializer
  implements Converter<ConsentTemplate, any>
{
  constructor() {
    // Intentional empty constructor
  }

  //maintaining any for target because 'preferences' can have any structure
  convert(source: ConsentTemplate, target?: any): any {
    if (target === undefined) {
      target = { ...(source as any) } as any;
    }

    if (source) {
      target = {};
      let preference = source.id?.concat('.isConsentGranted');
      if (preference) {
        if (source.currentConsent?.consentGivenDate)
          target = this.convertToCdcPreference(target, preference, true);
        else target = this.convertToCdcPreference(target, preference, false);
      }
    }

    return target;
  }

  private convertToCdcPreference(target: any, path: string, value: any): any {
    var consentCode = target;
    var list = path.split('.');
    var len = list.length;
    for (var i = 0; i < len - 1; i++) {
      var elem = list[i];
      if (!consentCode[elem]) consentCode[elem] = {};
      consentCode = consentCode[elem];
    }

    consentCode[list[len - 1]] = value;
    return target;
  }
}

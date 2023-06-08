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

  convert(source: ConsentTemplate, target?: any): any {
    if (target === undefined) {
      target = { ...(source as any) } as any;
    }

    if (source) {
      let preference = source.id?.concat('.isConsentGranted');
      if (preference) {
        if (source.currentConsent?.consentGivenDate)
          target = this.convertToCdcPreference(preference, true);
        else target = this.convertToCdcPreference(preference, false);
      }
    }

    return target;
  }
  /**
   * converts a dot separated string to deeply nested object
   * @param path : dot separated string
   * @param value : true if consent is given, false if consent is withdrawn
   * @returns preference object compatible for cdc
   * example:
   * input path x.y.z.isConsentGranted
   * input value: true
   * output=  x:{y:{z:{isConsentGranted: true}}}
   */
  private convertToCdcPreference(path: string, value: any): any {
    var target: any = {};
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

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
    if (source) {
      const preference = source.id?.concat('.isConsentGranted');
      let giveConsent: boolean = false;
      if (preference) {
        if (source.currentConsent?.consentGivenDate) {
          giveConsent = true;
        }
        target = this.convertToCdcPreference(preference, giveConsent);
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
    const target: any = {};
    let consentCode = target;
    const list = path.split('.');
    const len = list.length;
    for (let i = 0; i < len - 1; i++) {
      const elem = list[i];
      if (!consentCode[elem]) {
        consentCode[elem] = {};
      }
      consentCode = consentCode[elem];
    }
    consentCode[list[len - 1]] = value;
    return target;
  }
}

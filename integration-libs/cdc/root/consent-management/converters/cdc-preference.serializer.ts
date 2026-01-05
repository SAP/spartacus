/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, deepMerge } from '@spartacus/core';
import { CdcConsent } from '../model';

@Injectable({ providedIn: 'root' })
export class CdcPreferenceSerializer implements Converter<CdcConsent[], any> {
  /**
   * Generate CDC preferences from consent objects
   * @param cdcConsents List of consents with their statuses
   * @returns Serialized and deeply nested preferences object
   */
  convert(source: CdcConsent[], _target?: any): any {
    return source.reduce((preferences: any, cdcConsent) => {
      if (!cdcConsent.id) {
        return preferences;
      }
      const path = `${cdcConsent.id}.isConsentGranted`;
      const value = cdcConsent.isConsentGranted === true;
      const serializedPreference = this.convertToCdcPreference(path, value);
      return deepMerge(preferences, serializedPreference);
    }, {});
  }

  /**
   * Converts a dot-separated string to a deeply nested object.
   * @param path Dot-separated string representing keys
   * @param value Value to set
   * @returns Nested object
   */
  private convertToCdcPreference(path: string, value: any): any {
    return path.split('.').reduceRight((acc, key) => ({ [key]: acc }), value);
  }
}

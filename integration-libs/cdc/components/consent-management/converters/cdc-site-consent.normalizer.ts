/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, ConsentTemplate, LanguageService } from '@spartacus/core';
import {
  CdcSiteConsentTemplate,
  siteConsentDetailTemplate,
} from 'integration-libs/cdc/core';
import { CdcSiteConsentService } from '../cdc-site-consent.service';

@Injectable({ providedIn: 'root' })
export class CdcSiteConsentNormalizer
  implements Converter<CdcSiteConsentTemplate, ConsentTemplate[]>
{
  constructor(
    protected languageService: LanguageService,
    protected cdcSiteConsentService: CdcSiteConsentService
  ) {}

  convert(
    source: CdcSiteConsentTemplate,
    target: ConsentTemplate[]
  ): ConsentTemplate[] {
    if (target === undefined) {
      target = { ...(source as any) } as ConsentTemplate[];
    }
    if (source.siteConsentDetails) {
      target = this.convertConsentEntries(source.siteConsentDetails);
    }
    return target;
  }

  private convertConsentEntries(
    site: siteConsentDetailTemplate[]
  ): ConsentTemplate[] {
    var consents: ConsentTemplate[] = [];
    var currentLanguage = this.cdcSiteConsentService.getActiveLanguage();
    for (var key in site) {               //key will be a string with dot separated IDs
      if (Object.hasOwn(site, key)) {
        if (site[key].isActive === true) {
          var legalStatements = site[key].legalStatements;
          var required = site[key].isMandatory;
          if (key.startsWith('terms') || key.startsWith('privacy'))
            required = true;
          for (var lang in legalStatements) {
            if (Object.hasOwn(legalStatements, lang)) {
              if (lang === currentLanguage) {
                consents.push({
                  id: key,
                  description: legalStatements[lang]?.purpose,
                  version: legalStatements[lang].currentDocVersion,
                  documentUrl: legalStatements[lang].documentUrl,
                  required: required,
                  currentConsent: {
                    code: key, //in CDC there is no alpha numeric code, so filling in ID for code
                    consentGivenDate: undefined,
                    consentWithdrawnDate: undefined,
                  },
                });
              }
            }
          }
        }
      }
    }
    return consents;
  }
}

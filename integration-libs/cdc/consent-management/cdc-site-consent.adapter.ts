/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  ConsentTemplate,
  ConverterService,
  UserConsentAdapter,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CDC_SITE_CONSENT_NORMALIZER } from './converters/cdc-site-consent.converters';
import { CdcSiteConsentService } from './cdc-site-consent.service';

@Injectable({ providedIn: 'root' })
export class CdcSiteConsentAdapter implements UserConsentAdapter {
  constructor(
    protected cdcSiteConsentService: CdcSiteConsentService,
    protected cdcJsService: CdcJsService,
    protected converter: ConverterService
  ) {}
  loadConsents(): Observable<ConsentTemplate[]> {
    return this.cdcJsService
      .getSiteConsentDetails()
      .pipe(this.converter.pipeable(CDC_SITE_CONSENT_NORMALIZER))
      .pipe(
        switchMap((consents: ConsentTemplate[]) => {
          return this.cdcSiteConsentService.maintainUserConsentPreferences(
            consents
          );
        })
      );
  }
  giveConsent(
    userId: string,
    consentTemplateId: string
  ): Observable<ConsentTemplate> {
    return this.cdcSiteConsentService.updateConsent(
      userId,
      true,
      consentTemplateId
    );
  }

  withdrawConsent(userId: string, consentCode: string): Observable<{}> {
    return this.cdcSiteConsentService.updateConsent(userId, false, consentCode);
  }
}

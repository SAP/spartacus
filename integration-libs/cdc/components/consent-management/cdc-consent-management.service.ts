/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { AnonymousConsentsConfig, UserConsentService } from '@spartacus/core';
import { ConsentManagementService } from 'projects/storefrontlib/cms-components/myaccount/consent-management/components/consent-management.service';

@Injectable()
export class CdcConsentManagementService extends ConsentManagementService {
  constructor(
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected userConsentService: UserConsentService
  ) {
    super(anonymousConsentsConfig);
  }
  fillRequiredConsents(): string[] {
    var requiredConsents: string[] = [];
    this.userConsentService
      .getConsents()
      .subscribe((allConsents) => {
        for (let consent of allConsents) {
          /** make a consent disabled only if it is required and is already set */
          if (
            consent?.required === true &&
            consent.id &&
            consent.currentConsent?.consentGivenDate
          )
            requiredConsents.push(consent.id);
        }
      })
      .unsubscribe();
    return requiredConsents;
  }

  hideConsentName(): boolean {
    return true;
  }
}

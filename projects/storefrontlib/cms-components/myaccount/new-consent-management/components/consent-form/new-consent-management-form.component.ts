/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '@spartacus/core';

@Component({
  selector: 'cx-new-consent-management-form',
  templateUrl: './new-consent-management-form.component.html',
})
export class NewConsentManagementFormComponent implements OnInit {
  consentGiven = false;
  consentApprovedTime: string;

  @Input()
  consentTemplate: ConsentTemplate;

  @Input()
  requiredConsents: string[] = [];

  @Input()
  consent: AnonymousConsent | null;

  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();

  constructor() {
    // Intentional empty constructor
  }

  ngOnInit(): void {
    if (this.consent) {
      this.consentGiven = Boolean(
        this.consent.consentState === ANONYMOUS_CONSENT_STATUS.GIVEN
      );
    } else {
      if (this.consentTemplate && this.consentTemplate.currentConsent) {
        if (this.consentTemplate.currentConsent.consentWithdrawnDate) {
          this.consentGiven = false;
        } else if (this.consentTemplate.currentConsent.consentGivenDate) {
          this.consentGiven = true;
          const date = new Date(
            this.consentTemplate.currentConsent.consentGivenDate
          );
          this.consentApprovedTime = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        }
      }
    }
  }

  onConsentChange(): void {
    this.consentGiven = !this.consentGiven;

    this.consentChanged.emit({
      given: this.consentGiven,
      template: this.consentTemplate,
    });
  }

  isRequired(templateId: string | undefined): boolean {
    return templateId ? this.requiredConsents.includes(templateId) : false;
  }
}

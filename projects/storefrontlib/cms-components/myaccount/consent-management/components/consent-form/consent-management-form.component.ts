/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
  FeatureConfigService,
} from '@spartacus/core';

@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './consent-management-form.component.html',
  standalone: false,
})
export class ConsentManagementFormComponent implements OnInit, OnChanges {
  consentGiven = false;

  @Input()
  consentTemplate: ConsentTemplate;

  @Input()
  requiredConsents: string[] = [];

  @Input()
  consent: AnonymousConsent | null;

  @Input() disabled: boolean = false;

  @Input()
  showMandatory: boolean = false;

  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();

  private featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

  constructor() {
    // Intentional empty constructor
  }

  ngOnInit(): void {
    this.updateConsentGiven();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.featureConfigService?.isEnabled('updateConsentGivenInOnChanges') &&
      (changes.consent || changes.consentTemplate)
    ) {
      this.updateConsentGiven();
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

  protected updateConsentGiven(): void {
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
        }
      }
    }
  }
}

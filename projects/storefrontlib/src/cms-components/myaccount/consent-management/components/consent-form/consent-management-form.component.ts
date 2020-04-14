import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '@spartacus/core';

@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './consent-management-form.component.html',
})
export class ConsentManagementFormComponent implements OnInit {
  consentGiven = false;

  @Input()
  consentTemplate: ConsentTemplate;

  @Input()
  requiredConsents: string[] = [];

  @Input()
  consent: AnonymousConsent;

  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();

  constructor() {}

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

  isRequired(templateId: string): boolean {
    return this.requiredConsents.includes(templateId);
  }
}

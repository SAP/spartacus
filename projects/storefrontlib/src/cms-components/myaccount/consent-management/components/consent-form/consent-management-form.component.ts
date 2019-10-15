import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsentTemplate } from '@spartacus/core';

@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './consent-management-form.component.html',
})
export class ConsentManagementFormComponent implements OnInit {
  @Input()
  consentTemplate: ConsentTemplate;

  @Input()
  requiredConsents: string[] = [];

  // TODO(issue:4989) Anonymous consents - remove
  @Input()
  isAnonymousConsentsEnabled = false;

  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();

  consentGiven = false;

  constructor() {}

  ngOnInit(): void {
    if (this.consentTemplate && this.consentTemplate.currentConsent) {
      if (this.consentTemplate.currentConsent.consentWithdrawnDate) {
        this.consentGiven = false;
      } else if (this.consentTemplate.currentConsent.consentGivenDate) {
        this.consentGiven = true;
      }
    }
  }

  onConsentChange(): void {
    this.consentChanged.emit({
      given: !this.consentGiven,
      template: this.consentTemplate,
    });
  }

  isRequired(templateId: string): boolean {
    // TODO(issue:4989) Anonymous consents - remove this.isAnonymousConsentsEnabled check
    return this.isAnonymousConsentsEnabled
      ? this.requiredConsents.includes(templateId)
      : false;
  }
}

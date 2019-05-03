import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsentTemplate } from '@spartacus/core';

@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './consent-management-form.component.html',
  styleUrls: ['./consent-management-form.component.scss'],
})
export class ConsentManagementFormComponent implements OnInit {
  @Input()
  consentTemplate: ConsentTemplate;

  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();

  consentGiven = false;

  constructor() {}

  ngOnInit(): void {
    if (
      this.consentTemplate.currentConsent &&
      this.consentTemplate.currentConsent.consentGivenDate
    ) {
      this.consentGiven = true;
    }
  }

  onConsentChange(): void {
    this.consentChanged.emit({
      given: !this.consentGiven,
      template: this.consentTemplate,
    });
  }
}

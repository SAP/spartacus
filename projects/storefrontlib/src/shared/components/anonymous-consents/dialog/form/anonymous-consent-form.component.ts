import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '@spartacus/core';

@Component({
  selector: 'cx-anonymous-consent-form',
  templateUrl: './anonymous-consent-form.component.html',
})
export class AnonymousConsentFormComponent implements OnInit {
  @Input()
  template: ConsentTemplate;

  @Input()
  consent: AnonymousConsent;

  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();

  consentGiven = false;

  constructor() {}

  ngOnInit(): void {
    if (this.consent) {
      this.consentGiven =
        this.consent.consentState ===
        ANONYMOUS_CONSENT_STATUS.ANONYMOUS_CONSENT_GIVEN;
    }
  }

  onConsentChange(): void {
    this.consentChanged.emit({
      given: !this.consentGiven,
      template: this.template,
    });
  }
}

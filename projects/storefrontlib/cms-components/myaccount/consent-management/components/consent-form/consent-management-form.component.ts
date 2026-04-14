/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ANONYMOUS_CONSENT_STATUS,
  AnonymousConsent,
  ConsentTemplate,
  FeatureConfigService,
  TranslatePipe,
} from '@spartacus/core';

@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './consent-management-form.component.html',
  imports: [NgIf, NgTemplateOutlet, TranslatePipe],
})
export class ConsentManagementFormComponent
  implements OnInit, OnChanges, AfterViewChecked
{
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

  @ViewChild('checkboxInput') checkboxInput: ElementRef<HTMLInputElement>;

  private hadFocus = false;
  private document = inject(ElementRef).nativeElement.ownerDocument;
  private featureConfigService = inject(FeatureConfigService);

  constructor() {
    // Intentional empty constructor
  }

  ngOnInit(): void {
    this.updateConsentGiven();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.consent || changes.consentTemplate) {
      this.updateConsentGiven();
    }
    if (
      changes.disabled?.currentValue === true &&
      this.featureConfigService.isEnabled(
        'a11yConsentManagementFocusPreservation'
      )
    ) {
      this.hadFocus =
        this.checkboxInput?.nativeElement === this.document.activeElement;
    }
  }

  ngAfterViewChecked(): void {
    if (this.hadFocus && !this.disabled && this.checkboxInput?.nativeElement) {
      this.hadFocus = false;
      this.checkboxInput.nativeElement.focus();
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

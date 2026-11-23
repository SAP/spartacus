/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  output,
  input,
  viewChild,
} from '@angular/core';
import {
  ANONYMOUS_CONSENT_STATUS,
  AnonymousConsent,
  ConsentTemplate,
  FeatureToggles,
  TranslatePipe,
} from '@spartacus/core';

@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './consent-management-form.component.html',
  imports: [NgTemplateOutlet, TranslatePipe],
})
export class ConsentManagementFormComponent
  implements OnInit, OnChanges, AfterViewChecked
{
  consentGiven = false;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  consentTemplate: ConsentTemplate;

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  requiredConsents: string[] = [];

  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input()
  consent: AnonymousConsent | null;

  readonly disabled = input<boolean>(false);

  readonly showMandatory = input<boolean>(false);

  readonly consentChanged = output<{
    given: boolean;
    template: ConsentTemplate;
  }>();

  readonly checkboxInput =
    viewChild<ElementRef<HTMLInputElement>>('checkboxInput');

  private hadFocus = false;
  private document = inject(ElementRef).nativeElement.ownerDocument;
  private featureToggles = inject(FeatureToggles);

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
      this.featureToggles.a11yConsentManagementFocusPreservation
    ) {
      this.hadFocus =
        this.checkboxInput()?.nativeElement === this.document.activeElement;
    }
  }

  ngAfterViewChecked(): void {
    const checkboxInput = this.checkboxInput();
    if (
      this.hadFocus &&
      !this.disabled() &&
      checkboxInput?.nativeElement &&
      this.featureToggles.a11yConsentManagementFocusPreservation
    ) {
      this.hadFocus = false;
      checkboxInput.nativeElement.focus();
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

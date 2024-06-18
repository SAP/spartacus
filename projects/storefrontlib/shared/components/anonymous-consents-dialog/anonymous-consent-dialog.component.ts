/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  Optional,
  inject,
} from '@angular/core';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ConsentTemplate,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  useFeatureStyles,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, take, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/index';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/index';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';

@Component({
  selector: 'cx-anonymous-consent-dialog',
  templateUrl: './anonymous-consent-dialog.component.html',
})
export class AnonymousConsentDialogComponent implements OnInit, OnDestroy {
  @HostBinding('attr.role') role = 'dialog';
  @HostBinding('attr.aria-modal') modal = true;

  private subscriptions = new Subscription();
  private featureConfigService = inject(FeatureConfigService);

  showLegalDescription: boolean | undefined = true;
  iconTypes = ICON_TYPE;
  requiredConsents: string[] = [];

  loading$: Observable<boolean>;
  templates$: Observable<ConsentTemplate[]>;
  consents$: Observable<AnonymousConsent[]>;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'input[type="checkbox"]',
    focusOnEscape: true,
  };

  @Optional() globalMessageService = inject(GlobalMessageService, {
    optional: true,
  });

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  constructor(
    protected config: AnonymousConsentsConfig,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected el: ElementRef,
    protected launchDialogService: LaunchDialogService
  ) {
    if (this.config.anonymousConsents) {
      this.showLegalDescription =
        this.config.anonymousConsents.showLegalDescriptionInDialog;
      if (this.config.anonymousConsents.requiredConsents) {
        this.requiredConsents = this.config.anonymousConsents.requiredConsents;
      }
    }
    useFeatureStyles('a11yUseButtonsForBtnLinks');
  }

  ngOnInit(): void {
    this.templates$ = this.anonymousConsentsService.getTemplates();
    this.consents$ = this.anonymousConsentsService.getConsents();
    this.loading$ = this.anonymousConsentsService.getLoadTemplatesLoading();
  }

  close(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  rejectAll(): void {
    this.subscriptions.add(
      combineLatest([this.templates$, this.consents$])
        .pipe(
          take(1),
          distinctUntilChanged(),
          tap(([templates, consents]) =>
            templates.forEach((template) => {
              const consent = this.getCorrespondingConsent(template, consents);
              if (
                consent &&
                this.anonymousConsentsService.isConsentGiven(consent)
              ) {
                if (this.isRequiredConsent(template)) {
                  return;
                }

                if (template.id) {
                  this.anonymousConsentsService.withdrawConsent(template.id);
                }
              }
            })
          )
        )
        .subscribe(() => this.onConsentWithdrawnSuccess())
    );
    this.close('rejectAll');
  }

  allowAll(): void {
    this.subscriptions.add(
      combineLatest([this.templates$, this.consents$])
        .pipe(
          take(1),
          distinctUntilChanged(),
          tap(([templates, consents]) =>
            templates.forEach((template) => {
              const consent = this.getCorrespondingConsent(template, consents);
              if (
                consent &&
                (consent.consentState == null ||
                  this.anonymousConsentsService.isConsentWithdrawn(consent))
              ) {
                if (this.isRequiredConsent(template)) {
                  return;
                }

                if (template.id) {
                  this.anonymousConsentsService.giveConsent(template.id);
                }
              }
            })
          )
        )
        .subscribe(() => this.onConsentGivenSuccess())
    );
    this.close('allowAll');
  }

  private isRequiredConsent(template: ConsentTemplate): boolean {
    return Boolean(
      template.id &&
        this.config.anonymousConsents?.requiredConsents &&
        this.config.anonymousConsents.requiredConsents.includes(template.id)
    );
  }

  onConsentChange({
    given,
    template,
  }: {
    given: boolean;
    template: ConsentTemplate;
  }): void {
    if (template.id) {
      if (given) {
        this.anonymousConsentsService.giveConsent(template.id);
        this.onConsentGivenSuccess();
      } else {
        this.anonymousConsentsService.withdrawConsent(template.id);
        this.onConsentWithdrawnSuccess();
      }
    }
  }

  getCorrespondingConsent(
    template: ConsentTemplate,
    consents: AnonymousConsent[] = []
  ): AnonymousConsent | null {
    for (const consent of consents) {
      if (template.id === consent.templateCode) {
        return consent;
      }
    }
    return null;
  }

  private onConsentGivenSuccess(): void {
    if (
      this.featureConfigService.isEnabled(
        'a11yNotificationsOnAnonymousConsentChange'
      )
    ) {
      this.globalMessageService?.add(
        { key: 'consentManagementForm.message.success.given' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  private onConsentWithdrawnSuccess(): void {
    if (
      this.featureConfigService.isEnabled(
        'a11yNotificationsOnAnonymousConsentChange'
      )
    ) {
      this.globalMessageService?.add(
        { key: 'consentManagementForm.message.success.withdrawn' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

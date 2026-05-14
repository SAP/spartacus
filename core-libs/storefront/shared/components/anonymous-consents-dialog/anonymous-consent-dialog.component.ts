/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
  TranslatePipe,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, take, tap } from 'rxjs/operators';
import { IconComponent } from '../../../cms-components/misc/icon/icon.component';
import { ICON_TYPE } from '../../../cms-components/misc/icon/index';
import { MessageComponent } from '../../../cms-components/misc/message/message.component';
import { ConsentManagementFormComponent } from '../../../cms-components/myaccount/consent-management/components/consent-form/consent-management-form.component';
import { FocusDirective } from '../../../layout/a11y/keyboard-focus/focus.directive';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/index';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'cx-anonymous-consent-dialog',
  templateUrl: './anonymous-consent-dialog.component.html',
  imports: [
    FocusDirective,
    NgIf,
    SpinnerComponent,
    IconComponent,
    MessageComponent,
    NgFor,
    ConsentManagementFormComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class AnonymousConsentDialogComponent implements OnInit, OnDestroy {
  protected winRef = inject(WindowRef);

  private subscriptions = new Subscription();

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
  /**
   * We store the selected input when making a selection to restore the focus to
   * this element after closing the message dialog.
   */
  selectedInput: HTMLElement;

  @Optional() globalMessageService = inject(GlobalMessageService, {
    optional: true,
  });
  globalMessageType = GlobalMessageType;
  message$ = new Subject<{ type: GlobalMessageType; key: string } | null>();

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

  protected onConsentGivenSuccess(): void {
    this.selectedInput = <HTMLElement>this.winRef.document.activeElement;
    this.message$.next({
      type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      key: 'consentManagementForm.message.success.given',
    });
  }

  protected onConsentWithdrawnSuccess(): void {
    this.selectedInput = <HTMLElement>this.winRef.document.activeElement;
    this.message$.next({
      type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      key: 'consentManagementForm.message.success.withdrawn',
    });
  }

  closeMessage(): void {
    this.selectedInput?.focus();
    this.message$.next(null);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

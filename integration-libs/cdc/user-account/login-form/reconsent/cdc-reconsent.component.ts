/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
  CdcConsent,
  CdcConsentManagementComponentService,
} from '@spartacus/cdc/root';
import {
  AnonymousConsentsService,
  ConsentTemplate,
  TranslatePipe,
} from '@spartacus/core';
import {
  BtnLikeLinkDirective,
  ConsentManagementFormComponent,
  FocusConfig,
  FocusDirective,
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable, Subscription, map, of } from 'rxjs';
import { CdcReconsentComponentService } from './cdc-reconsent-component.service';

@Component({
  selector: 'cx-anonymous-consent-dialog', //reusing existing selector
  templateUrl: './cdc-reconsent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FocusDirective,
    NgIf,
    IconComponent,
    NgFor,
    ConsentManagementFormComponent,
    BtnLikeLinkDirective,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class CdcReconsentComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  protected cdcConsentManagementComponentService = inject(
    CdcConsentManagementComponentService
  );

  form: UntypedFormGroup = new UntypedFormGroup({});
  iconTypes = ICON_TYPE;
  loaded$: Observable<boolean> = of(false);
  templateList$: Observable<ConsentTemplate[]>;
  reconsentEvent: any = {};
  requiredReconsents: string[] = [];
  selectedConsents: string[] = [];
  disableSubmitButton: boolean = true;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected cdcReconsentService: CdcReconsentComponentService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data) => {
        this.reconsentEvent = { ...data };
        this.loadConsents(data.consentIds);
      })
    );
  }

  loadConsents(reconsentIds: string[]): void {
    this.templateList$ = this.anonymousConsentsService
      .getTemplates(true)
      .pipe(
        map((templates) =>
          templates.filter((template) =>
            reconsentIds.includes(template.id || '')
          )
        )
      );
    this.requiredReconsents = reconsentIds.filter((id) =>
      this.cdcConsentManagementComponentService
        .getCdcConsentIDs(true)
        .includes(id)
    );
    this.disableSubmitButton = this.requiredReconsents.length > 0;
    this.loaded$ = of(true);
  }

  onConsentChange(event: { given: boolean; template: ConsentTemplate }) {
    if (!event.template?.id) {
      return;
    }

    const { given, template } = event;
    this.updateSelectedConsents(given, template.id ?? '');

    this.areAllMandatoryConsentsGiven().subscribe((result) => {
      this.disableSubmitButton = !result;
    });
  }

  dismissDialog(reason?: any, message?: string): void {
    if (reason === 'Proceed To Login') {
      this.loaded$ = of(false);
      this.templateList$.subscribe((templates) => {
        const consents = this.buildPreferenceList(templates);
        if (consents.length) {
          this.cdcReconsentService.savePreferencesAndLogin(
            consents,
            this.reconsentEvent
          );
        }
      });
    } else {
      this.cdcReconsentService.handleReconsentUpdateError(reason, message);
    }
  }

  private buildPreferenceList(templates: ConsentTemplate[]): CdcConsent[] {
    const preferences: Record<string, CdcConsent> =
      this.reconsentEvent.preferences || {};
    const consents = Object.entries(preferences).map(([id, value]) => ({
      id,
      isConsentGranted: value?.isConsentGranted || false,
    }));

    templates.forEach((template) => {
      const existingIndex = consents.findIndex(
        (consent) => consent.id === template.id
      );
      // If id is already present, remove the existing entry
      if (existingIndex !== -1) {
        consents.splice(existingIndex, 1);
      }
      consents.push({
        id: template.id || '',
        isConsentGranted: this.selectedConsents.includes(template.id || ''),
      });
    });
    return consents;
  }

  private areAllMandatoryConsentsGiven(): Observable<boolean> {
    return this.templateList$.pipe(
      map((templates) =>
        templates.every(
          (template) =>
            !this.requiredReconsents.includes(template.id || '') ||
            this.selectedConsents.includes(template.id || '')
        )
      )
    );
  }

  private updateSelectedConsents(given: boolean, templateId: string): void {
    if (given) {
      if (!this.selectedConsents.includes(templateId)) {
        this.selectedConsents.push(templateId);
      }
    } else {
      this.selectedConsents = this.selectedConsents.filter(
        (id) => id !== templateId
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

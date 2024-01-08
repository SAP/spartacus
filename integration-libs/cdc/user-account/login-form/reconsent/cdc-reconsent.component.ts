/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AnonymousConsentsService, ConsentTemplate } from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdcReconsentComponentService } from './cdc-reconsent-component.service';

@Component({
  selector: 'cx-anonymous-consent-dialog', //reusing existing selector
  templateUrl: './cdc-reconsent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdcReconsentComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();

  form: UntypedFormGroup = new UntypedFormGroup({});
  iconTypes = ICON_TYPE;
  loaded$: Observable<boolean> = of(false);

  templateList$: Observable<ConsentTemplate[]>;
  reconsentEvent: any = {};

  selectedConsents: string[] = [];
  disableSubmitButton: boolean = true;
  totalConsents: number = 0;

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
        this.reconsentEvent['user'] = data.user;
        this.reconsentEvent['password'] = data.password;
        this.reconsentEvent['regToken'] = data.regToken;
        this.reconsentEvent['errorMessage'] = data.errorMessage;
        this.loadConsents(data.consentIds);
      })
    );
  }

  loadConsents(reconsentIds: string[]): void {
    this.templateList$ = this.anonymousConsentsService.getTemplates(true).pipe(
      map((templateList) => {
        const output: ConsentTemplate[] = [];
        templateList.forEach((template) => {
          if (template.id && reconsentIds.includes(template.id)) {
            output.push(template);
          }
        });
        this.totalConsents = output.length;
        return output;
      })
    );
    this.loaded$ = of(true);
  }

  onConsentChange(event: { given: boolean; template: ConsentTemplate }) {
    if (event.given === false && event.template?.id) {
      const index: number = this.selectedConsents.indexOf(event.template.id);
      if (index !== -1) {
        this.selectedConsents.splice(index, 1);
      }
    } else if (event.given === true && event.template?.id) {
      this.selectedConsents.push(event.template.id);
    }
    if (this.totalConsents === this.selectedConsents.length) {
      this.disableSubmitButton = false;
    } else {
      this.disableSubmitButton = true;
    }
  }

  dismissDialog(reason?: any, message?: string): void {
    if (reason === 'Proceed To Login') {
      this.loaded$ = of(false);
      this.cdcReconsentService.saveConsentAndLogin(
        this.selectedConsents,
        this.reconsentEvent
      );
    } else {
      this.cdcReconsentService.handleReconsentUpdateError(reason, message);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

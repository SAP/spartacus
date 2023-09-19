/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthService,
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
  UserConsentService,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, skipWhile, tap, withLatestFrom } from 'rxjs/operators';
import { ConsentManagementComponentService } from '../../consent-management/consent-management-component.service';

@Component({
  selector: 'cx-new-consent-management',
  templateUrl: './new-consent-management.component.html',
})
export class NewConsentManagementComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private allConsentsLoading = new BehaviorSubject<boolean>(false);

  templateList$: Observable<ConsentTemplate[]>;
  loading$: Observable<boolean>;

  requiredConsents: string[] = [];

  constructor(
    protected userConsentService: UserConsentService,
    protected globalMessageService: GlobalMessageService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected authService: AuthService,
    protected consentManagementComponentService?: ConsentManagementComponentService
  ) {}

  ngOnInit(): void {
    this.loading$ = combineLatest([
      this.userConsentService.getConsentsResultLoading(),
      this.userConsentService.getGiveConsentResultLoading(),
      this.userConsentService.getWithdrawConsentResultLoading(),
      this.authService.isUserLoggedIn(),
      this.allConsentsLoading,
    ]).pipe(
      map(
        ([
          consentLoading,
          giveConsentLoading,
          withdrawConsentLoading,
          isUserLoggedIn,
          allConsentsLoading,
        ]) =>
          consentLoading ||
          giveConsentLoading ||
          withdrawConsentLoading ||
          !isUserLoggedIn ||
          allConsentsLoading
      )
    );
    this.consentListInit();
    this.giveConsentInit();
    this.withdrawConsentInit();
  }

  private consentListInit(): void {
    this.templateList$ = this.userConsentService.getConsents().pipe(
      withLatestFrom(
        this.anonymousConsentsService.getTemplates(),
        this.authService.isUserLoggedIn()
      ),
      filter(
        ([_templateList, _anonymousTemplates, isUserLoggedIn]) => isUserLoggedIn
      ),
      tap(([templateList, _anonymousTemplates]) => {
        if (!this.consentsExists(templateList)) {
          this.userConsentService.loadConsents();
        }
      }),
      map(([templateList, anonymousTemplates]) => {
        this.requiredConsents = this.consentManagementComponentService
          ? this.consentManagementComponentService.getRequiredConsents(
              templateList
            )
          : [];
        if (
          this.anonymousConsentsConfig.anonymousConsents &&
          this.anonymousConsentsConfig.anonymousConsents.consentManagementPage
        ) {
          return this.hideAnonymousConsents(templateList, anonymousTemplates);
        }

        return templateList;
      })
    );
  }

  private hideAnonymousConsents(
    templateList: ConsentTemplate[],
    anonymousTemplates: ConsentTemplate[] = []
  ): ConsentTemplate[] {
    let hideTemplateIds: string[] = [];

    if (
      !this.anonymousConsentsConfig.anonymousConsents?.consentManagementPage
        ?.showAnonymousConsents
    ) {
      hideTemplateIds = anonymousTemplates.map((template) => template.id ?? '');
      return this.userConsentService.filterConsentTemplates(
        templateList,
        hideTemplateIds
      );
    }

    if (
      this.anonymousConsentsConfig.anonymousConsents.consentManagementPage
        .hideConsents &&
      this.anonymousConsentsConfig.anonymousConsents.consentManagementPage
        .hideConsents.length > 0
    ) {
      hideTemplateIds =
        this.anonymousConsentsConfig.anonymousConsents.consentManagementPage
          .hideConsents;
    }

    return this.userConsentService.filterConsentTemplates(
      templateList,
      hideTemplateIds
    );
  }

  private giveConsentInit(): void {
    this.userConsentService.resetGiveConsentProcessState();
    this.subscriptions.add(
      this.userConsentService
        .getGiveConsentResultSuccess()
        .subscribe((success) => this.onConsentGivenSuccess(success))
    );
  }

  private withdrawConsentInit(): void {
    this.userConsentService.resetWithdrawConsentProcessState();
    this.subscriptions.add(
      this.userConsentService
        .getWithdrawConsentResultLoading()
        .pipe(
          skipWhile(Boolean),
          withLatestFrom(
            this.userConsentService.getWithdrawConsentResultSuccess()
          ),
          map(([, withdrawalSuccess]) => withdrawalSuccess),
          tap((withdrawalSuccess) => {
            if (withdrawalSuccess) {
              this.userConsentService.loadConsents();
            }
          })
        )
        .subscribe((withdrawalSuccess) =>
          this.onConsentWithdrawnSuccess(withdrawalSuccess)
        )
    );
  }

  private consentsExists(templateList: ConsentTemplate[]): boolean {
    return Boolean(templateList) && templateList.length > 0;
  }

  onConsentChange({
    given,
    template,
  }: {
    given: boolean;
    template: ConsentTemplate;
  }): void {
    if (given && template.id && template.version !== undefined) {
      this.userConsentService.giveConsent(template.id, template.version);
    } else if (template.currentConsent?.code) {
      this.userConsentService.withdrawConsent(
        template.currentConsent.code,
        template?.id
      );
    }
  }

  private onConsentGivenSuccess(success: boolean): void {
    if (success) {
      this.userConsentService.resetGiveConsentProcessState();
      this.globalMessageService.add(
        { key: 'consentManagementForm.message.success.given' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  private onConsentWithdrawnSuccess(success: boolean): void {
    if (success) {
      this.userConsentService.resetWithdrawConsentProcessState();
      this.globalMessageService.add(
        { key: 'consentManagementForm.message.success.withdrawn' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.allConsentsLoading.unsubscribe();

    this.userConsentService.resetGiveConsentProcessState();
    this.userConsentService.resetWithdrawConsentProcessState();
  }
}

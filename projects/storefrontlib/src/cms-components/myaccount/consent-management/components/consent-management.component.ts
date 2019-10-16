import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthService,
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
  isFeatureLevel,
  UserConsentService,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, skipWhile, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'cx-consent-management',
  templateUrl: './consent-management.component.html',
})
export class ConsentManagementComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  templateList$: Observable<ConsentTemplate[]>;
  loading$: Observable<boolean>;

  requiredConsents: string[] = [];

  // TODO(issue:4989) Anonymous consents - remove
  isAnonymousConsentsEnabled = isFeatureLevel(
    this.anonymousConsentsConfig,
    '1.3'
  );

  constructor(
    userConsentService: UserConsentService,
    globalMessageService: GlobalMessageService,
    anonymousConsentsConfig: AnonymousConsentsConfig,
    anonymousConsentsService: AnonymousConsentsService,
    authService: AuthService
  );

  /**
   * @deprecated since version 1.3
   * Instead, use:
   ```ts
   constructor(
     userConsentService: UserConsentService,
     globalMessageService: GlobalMessageService,
     anonymousConsentsConfig : AnonymousConsentsConfig,
     anonymousConsentsService : AnonymousConsentsService,
     authService: AuthService,
   ) 
   ```
   */
  constructor(
    userConsentService: UserConsentService,
    globalMessageService: GlobalMessageService
  );
  constructor(
    private userConsentService: UserConsentService,
    private globalMessageService: GlobalMessageService,
    private anonymousConsentsConfig?: AnonymousConsentsConfig,
    private anonymousConsentsService?: AnonymousConsentsService,
    private authService?: AuthService
  ) {}

  ngOnInit(): void {
    this.loading$ = combineLatest([
      this.userConsentService.getConsentsResultLoading(),
      this.userConsentService.getGiveConsentResultLoading(),
      this.userConsentService.getWithdrawConsentResultLoading(),
      this.authService.isUserLoggedIn(),
    ]).pipe(
      map(
        ([
          consentLoading,
          giveConsentLoading,
          withdrawConsentLoading,
          isUserLoggedIn,
        ]) =>
          consentLoading ||
          giveConsentLoading ||
          withdrawConsentLoading ||
          !isUserLoggedIn
      )
    );
    this.consentListInit();
    this.giveConsentInit();
    this.withdrawConsentInit();
  }

  private consentListInit(): void {
    this.templateList$ = this.userConsentService.getConsents().pipe(
      tap(templateList => {
        if (!this.consentsExists(templateList)) {
          this.userConsentService.loadConsents();
        }
      }),
      withLatestFrom(this.anonymousConsentsService.getTemplates()),
      map(([templateList, anonymousTemplates]) => {
        if (!this.isAnonymousConsentsEnabled) {
          return templateList;
        }

        if (Boolean(this.anonymousConsentsConfig.anonymousConsents)) {
          if (
            Boolean(
              this.anonymousConsentsConfig.anonymousConsents.requiredConsents
            )
          ) {
            this.requiredConsents = this.anonymousConsentsConfig.anonymousConsents.requiredConsents;
          }
          if (
            Boolean(
              this.anonymousConsentsConfig.anonymousConsents
                .consentManagementPage
            )
          ) {
            return this.hideAnonymousConsents(templateList, anonymousTemplates);
          }
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
      !this.anonymousConsentsConfig.anonymousConsents.consentManagementPage
        .showAnonymousConsents
    ) {
      hideTemplateIds = anonymousTemplates.map(template => template.id);
      return this.userConsentService.filterConsentTemplates(
        templateList,
        hideTemplateIds
      );
    }

    if (
      Boolean(
        this.anonymousConsentsConfig.anonymousConsents.consentManagementPage
          .hideConsents
      ) &&
      this.anonymousConsentsConfig.anonymousConsents.consentManagementPage
        .hideConsents.length > 0
    ) {
      hideTemplateIds = this.anonymousConsentsConfig.anonymousConsents
        .consentManagementPage.hideConsents;
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
        .subscribe(success => this.onConsentGivenSuccess(success))
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
          tap(withdrawalSuccess => {
            if (withdrawalSuccess) {
              this.userConsentService.loadConsents();
            }
          })
        )
        .subscribe(withdrawalSuccess =>
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
    if (given) {
      this.userConsentService.giveConsent(template.id, template.version);
    } else {
      this.userConsentService.withdrawConsent(template.currentConsent.code);
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

  rejectAll(templates: ConsentTemplate[]): void {
    templates.forEach(template => {
      if (this.isConsentGiven(template)) {
        if (this.isRequiredConsent(template)) {
          return;
        }

        this.userConsentService.withdrawConsent(template.currentConsent.code);
      }
    });

    this.subscriptions.add(
      this.userConsentService
        .getWithdrawConsentResultSuccess()
        .subscribe(_ => this.userConsentService.loadConsents())
    );
  }

  private isConsentGiven(consentTemplate: ConsentTemplate): boolean {
    return (
      Boolean(consentTemplate.currentConsent) &&
      Boolean(consentTemplate.currentConsent.consentGivenDate) &&
      !Boolean(consentTemplate.currentConsent.consentWithdrawnDate)
    );
  }

  allowAll(templates: ConsentTemplate[]): void {
    templates.forEach(template => {
      if (this.isConsentWithdrawn(template)) {
        if (this.isRequiredConsent(template)) {
          return;
        }

        this.userConsentService.giveConsent(template.id, template.version);
      }
    });

    this.subscriptions.add(
      this.userConsentService
        .getGiveConsentResultSuccess()
        .subscribe(_ => this.userConsentService.loadConsents())
    );
  }

  private isConsentWithdrawn(consentTemplate: ConsentTemplate): boolean {
    if (Boolean(consentTemplate.currentConsent)) {
      return Boolean(consentTemplate.currentConsent.consentWithdrawnDate);
    }
    return true;
  }

  private isRequiredConsent(template: ConsentTemplate): boolean {
    return (
      Boolean(this.anonymousConsentsConfig.anonymousConsents) &&
      Boolean(
        this.anonymousConsentsConfig.anonymousConsents.requiredConsents
      ) &&
      this.anonymousConsentsConfig.anonymousConsents.requiredConsents.includes(
        template.id
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.userConsentService.resetGiveConsentProcessState();
    this.userConsentService.resetWithdrawConsentProcessState();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
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

  constructor(
    private userConsentService: UserConsentService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.loading$ = combineLatest([
      this.userConsentService.getConsentsResultLoading(),
      this.userConsentService.getGiveConsentResultLoading(),
      this.userConsentService.getWithdrawConsentResultLoading(),
    ]).pipe(
      map(
        ([consentLoading, giveConsentLoading, withdrawConsentLoading]) =>
          consentLoading || giveConsentLoading || withdrawConsentLoading
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
      })
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.userConsentService.resetGiveConsentProcessState();
    this.userConsentService.resetWithdrawConsentProcessState();
  }
}

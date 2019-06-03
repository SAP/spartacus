import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
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
    private userService: UserService,
    private routingService: RoutingService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.loading$ = combineLatest(
      this.userService.getConsentsResultLoading(),
      this.userService.getGiveConsentResultLoading(),
      this.userService.getWithdrawConsentResultLoading()
    ).pipe(
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
    this.templateList$ = this.userService.getConsents().pipe(
      tap(templateList => {
        if (!this.consentsExists(templateList)) {
          this.userService.loadConsents();
        }
      })
    );
  }

  private giveConsentInit(): void {
    this.userService.resetGiveConsentProcessState();
    this.subscriptions.add(
      this.userService
        .getGiveConsentResultSuccess()
        .subscribe(success => this.onConsentGivenSuccess(success))
    );
  }

  private withdrawConsentInit(): void {
    this.userService.resetWithdrawConsentProcessState();
    this.subscriptions.add(
      this.userService
        .getWithdrawConsentResultLoading()
        .pipe(
          skipWhile(Boolean),
          withLatestFrom(this.userService.getWithdrawConsentResultSuccess()),
          map(([, withdrawalSuccess]) => withdrawalSuccess),
          tap(withdrawalSuccess => {
            if (withdrawalSuccess) {
              this.userService.loadConsents();
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
      this.userService.giveConsent(template.id, template.version);
    } else {
      this.userService.withdrawConsent(template.currentConsent.code);
    }
  }

  onDone(): void {
    this.routingService.go({ cxRoute: 'home' });
  }

  private onConsentGivenSuccess(success: boolean): void {
    if (success) {
      this.userService.resetGiveConsentProcessState();
      this.globalMessageService.add(
        { key: 'consentManagementForm.message.success.given' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }
  private onConsentWithdrawnSuccess(success: boolean): void {
    if (success) {
      this.userService.resetWithdrawConsentProcessState();
      this.globalMessageService.add(
        { key: 'consentManagementForm.message.success.withdrawn' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.userService.resetGiveConsentProcessState();
    this.userService.resetWithdrawConsentProcessState();
  }
}

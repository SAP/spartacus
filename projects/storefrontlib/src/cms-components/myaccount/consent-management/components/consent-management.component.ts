import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsentTemplate,
  ConsentTemplateList,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  filter,
  map,
  skipWhile,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Component({
  selector: 'cx-consent-management',
  templateUrl: './consent-management.component.html',
})
export class ConsentManagementComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  templateList$: Observable<ConsentTemplateList>;
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
    this.templateList$ = combineLatest(
      this.userService.get(),
      this.userService.getConsents()
    ).pipe(
      filter(([user]) => Boolean(user) && Boolean(user.uid)),
      tap(([user, templateList]) => {
        if (!this.consentsExists(templateList)) {
          this.userService.loadConsents(user.uid);
        }
      }),
      map(([_, templateList]) => templateList)
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
          withLatestFrom(
            this.userService.getWithdrawConsentResultSuccess(),
            this.userService.get()
          ),
          map(([_loading, withdrawalSuccess, user]) => {
            return { withdrawalSuccess, user };
          }),
          tap(data => {
            if (data.withdrawalSuccess) {
              this.userService.loadConsents(data.user.uid);
            }
          })
        )
        .subscribe(data =>
          this.onConsentWithdrawnSuccess(data.withdrawalSuccess)
        )
    );
  }

  private consentsExists(templateList: ConsentTemplateList): boolean {
    return (
      Boolean(templateList) &&
      Boolean(templateList.consentTemplates) &&
      templateList.consentTemplates.length > 0
    );
  }

  onConsentChange({
    given,
    template,
  }: {
    given: boolean;
    template: ConsentTemplate;
  }): void {
    this.userService
      .get()
      .pipe(
        map(user => user.uid),
        tap(userId => {
          if (given) {
            this.userService.giveConsent(userId, template.id, template.version);
          } else {
            this.userService.withdrawConsent(
              userId,
              template.currentConsent.code
            );
          }
        }),
        take(1)
      )
      .subscribe();
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

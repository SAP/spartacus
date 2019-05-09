import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsentTemplate,
  ConsentTemplateList,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
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
  templateListloading$: Observable<boolean>;
  giveConsentLoading$: Observable<boolean>;
  withdrawConsentLoading$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private routingService: RoutingService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.consentListInit();
    this.giveConsentInit();
    this.withdrawConsentInit();
  }

  private consentListInit(): void {
    this.templateList$ = this.userService.getConsents().pipe(
      withLatestFrom(this.userService.get()),
      filter(([_, user]) => Boolean(user) && Boolean(user.uid)),
      tap(([templateList, user]) => {
        if (this.consentsExists(templateList)) {
          this.userService.loadConsents(user.uid);
        }
      }),
      map(([templateList, _user]) => templateList)
    );
    this.templateListloading$ = this.userService.getConsentsResultLoading();
  }

  private giveConsentInit(): void {
    this.userService.resetGiveConsentProcessState();
    this.giveConsentLoading$ = this.userService.getGiveConsentResultLoading();
    this.subscriptions.add(
      this.userService
        .getGiveConsentResultSuccess()
        .subscribe(success => this.onConsentGivenSuccess(success))
    );
  }

  private withdrawConsentInit(): void {
    this.userService.resetWithdrawConsentProcessState();
    this.withdrawConsentLoading$ = this.userService.getWithdrawConsentResultLoading();
    this.subscriptions.add(
      this.withdrawConsentLoading$
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
      templateList &&
      templateList.consentTemplates &&
      !templateList.consentTemplates.length
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
    this.routingService.go({ route: 'home' });
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

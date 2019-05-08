import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsentTemplate,
  ConsentTemplateList,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  TranslationService,
  UserService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map, take, tap, withLatestFrom } from 'rxjs/operators';

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
    private globalMessageService: GlobalMessageService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.consentListInit();
    this.giveConsentInit();
    this.withdrawConsentInit();
  }

  private consentListInit(): void {
    // TODO:#1185 - reset templateList loading state? This triggers a new http request.
    // this.userService.resetConsentsProcessState();
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
    this.giveConsentLoading$ = this.userService.giveConsentResultLoading();
    this.subscriptions.add(
      this.userService
        .giveConsentResultSuccess()
        .pipe(
          withLatestFrom(
            this.translationService.translate(
              'consentManagementForm.message.success.given'
            )
          )
        )
        .subscribe(([success, message]) =>
          this.onConsentGivenSuccess(success, message)
        )
    );
  }

  private withdrawConsentInit(): void {
    this.userService.resetWithdrawConsentProcessState();
    this.withdrawConsentLoading$ = this.userService.withdrawConsentResultLoading();
    this.subscriptions.add(
      this.withdrawConsentLoading$
        .pipe(
          filter(loading => !loading),
          withLatestFrom(
            this.userService.withdrawConsentResultSuccess(),
            this.userService.get(),
            this.translationService.translate(
              'consentManagementForm.message.success.withdrawn'
            )
          ),
          map(([_loading, withdrawalSuccess, user, translatedMessage]) => {
            return { withdrawalSuccess, user, translatedMessage };
          }),
          filter(data => Boolean(data.user)),
          tap(data => {
            if (data.withdrawalSuccess) {
              this.userService.loadConsents(data.user.uid);
            }
          })
        )
        .subscribe(data =>
          this.onConsentWithdrawnSuccess(
            data.withdrawalSuccess,
            data.translatedMessage
          )
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
        filter(Boolean),
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

  private onConsentGivenSuccess(success: boolean, message: string): void {
    if (success) {
      this.userService.resetGiveConsentProcessState();
      this.globalMessageService.add(
        message,
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }
  private onConsentWithdrawnSuccess(success: boolean, message: string): void {
    if (success) {
      this.userService.resetWithdrawConsentProcessState();
      this.globalMessageService.add(
        message,
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    }
  }

  ngOnDestroy(): void {
    // TODO:#1185 - reset templateList loading state here?
    this.userService.resetGiveConsentProcessState();
    this.userService.resetWithdrawConsentProcessState();
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}

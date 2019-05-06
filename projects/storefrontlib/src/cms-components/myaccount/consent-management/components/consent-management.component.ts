import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsentTemplate,
  ConsentTemplateList,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, take, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'cx-consent-management',
  templateUrl: './consent-management.component.html',
})
export class ConsentManagementComponent implements OnInit, OnDestroy {
  templateList$: Observable<ConsentTemplateList>;
  templateListloading$: Observable<boolean>;
  templateListSuccess$: Observable<boolean>;
  templateListError$: Observable<boolean>;

  giveConsentLoading$: Observable<boolean>;
  giveConsentSuccess$: Observable<boolean>;
  giveConsentError$: Observable<boolean>;

  withdrawConsentLoading$: Observable<boolean>;
  withdrawConsentSuccess$: Observable<boolean>;
  withdrawConsentError$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private routingService: RoutingService
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
      // TODO:#1184 - check for falsy value? (everywhere)
      withLatestFrom(this.userService.get()),
      tap(([templateList, user]) => {
        if (user && this.consentsExists(templateList)) {
          this.userService.loadConsents(user.uid);
        }
      }),
      map(([templateList, _user]) => templateList)
    );
    this.templateListloading$ = this.userService.getConsentsResultLoading();
    this.templateListSuccess$ = this.userService.getConsentsResultSuccess();
    this.templateListError$ = this.userService.getConsentsResultError();
  }

  private giveConsentInit(): void {
    this.userService.resetGiveConsentProcessState();
    this.giveConsentLoading$ = this.userService.giveConsentResultLoading();
    this.giveConsentError$ = this.userService.giveConsentResultError();
    this.giveConsentSuccess$ = this.userService.giveConsentResultSuccess();
  }

  private withdrawConsentInit(): void {
    this.userService.resetWithdrawConsentProcessState();
    this.withdrawConsentLoading$ = this.userService.withdrawConsentResultLoading();
    this.withdrawConsentError$ = this.userService.withdrawConsentResultError();
    this.withdrawConsentSuccess$ = this.userService.withdrawConsentResultSuccess();
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

  ngOnDestroy(): void {
    // TODO:#1185 - reset templateList loading state here?
    this.userService.resetGiveConsentProcessState();
    this.userService.resetWithdrawConsentProcessState();
  }
}

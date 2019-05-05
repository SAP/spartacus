import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsentTemplate,
  ConsentTemplateList,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-consent-management',
  templateUrl: './consent-management.component.html',
  styleUrls: ['./consent-management.component.scss'],
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
    this.userService.resetConsentsProcessState();
    this.templateList$ = this.userService.getConsents().pipe(
      tap(templateList => {
        if (this.consentsExists(templateList)) {
          this.userService.loadConsents();
        }
        return templateList;
      })
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

    this.withdrawConsentSuccess$ = combineLatest(
      this.userService.withdrawConsentResultSuccess(),
      this.userService.getConsentsResultSuccess()
    ).pipe(
      tap(x => console.log(`before filter`, x)),
      filter(([withdrawalSuccess, _]) => withdrawalSuccess),
      tap(x => console.log(`after filter`, x)),
      tap(_ => this.userService.loadConsents()),
      tap(x => console.log(`after tap (load consents)`, x)),
      map(
        ([withdrawalSuccess, loadConsentsSuccess]) =>
          withdrawalSuccess && loadConsentsSuccess
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
    if (given) {
      this.userService.giveConsent(template.id, template.version);
    } else {
      this.userService.withdrawConsent(template.currentConsent.code);
    }
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

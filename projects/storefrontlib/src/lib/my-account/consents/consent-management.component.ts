import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsentTemplate,
  ConsentTemplateList,
  RoutingService,
  User,
  UserService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(
    private userService: UserService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.templateListInit();
    this.giveConsentInit();
  }

  private templateListInit(): void {
    // TODO:#1185 - reset templateList loading state? This triggers a new http request.
    this.userService.resetConsentsProcessState();
    this.templateList$ = combineLatest(
      this.userService.getConsents(),
      this.userService.get()
    ).pipe(
      map(([templateList, user]) => {
        if (this.consentsExists(templateList) && this.userExists(user)) {
          this.userService.loadConsents(user.uid);
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
    this.giveConsentSuccess$ = this.userService.giveConsentResultSuccess();
    this.giveConsentError$ = this.userService.giveConsentResultError();
    this.giveConsentSuccess$ = this.userService.giveConsentResultSuccess();
  }

  private consentsExists(templateList: ConsentTemplateList): boolean {
    return (
      templateList &&
      templateList.consentTemplates &&
      !templateList.consentTemplates.length
    );
  }
  private userExists(user: User): boolean {
    return Boolean(user) && Boolean(user.uid);
  }

  onConsentChange({
    given,
    template,
  }: {
    given: boolean;
    template: ConsentTemplate;
  }): void {
    if (given) {
      this.userService.giveConsent(
        // TODO:#1185 - combine with the current user. how to subscribe?
        'xxx@xxx.xxx',
        template.id,
        template.version
      );
    } else {
      // TODO:#1185 - withdraw consent
    }
  }

  onDone(): void {
    this.routingService.go({ route: 'home' });
  }

  ngOnDestroy(): void {
    // TODO:#1185 - reset templateList loading state?
    this.userService.resetGiveConsentProcessState();
  }
}

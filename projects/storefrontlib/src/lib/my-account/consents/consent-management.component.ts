import { Component, OnInit } from '@angular/core';
import { ConsentTemplateList, User, UserService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-consent-management',
  templateUrl: './consent-management.component.html',
  styleUrls: ['./consent-management.component.scss'],
})
export class ConsentManagementComponent implements OnInit {
  consents$: Observable<ConsentTemplateList>;
  loading$: Observable<boolean>;
  success$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.consents$ = combineLatest(
      this.userService.getConsents(),
      this.userService.get()
    ).pipe(
      map(([consents, user]) => {
        if (this.consentsExists(consents) && this.userExists(user)) {
          this.userService.loadConsents(user.uid);
        }
        return consents;
      })
    );

    this.loading$ = this.userService.getConsentsResultLoading();
    this.success$ = this.userService.getConsentsResultSuccess();
    this.error$ = this.userService.getConsentsResultError();
  }

  private consentsExists(consents: ConsentTemplateList): boolean {
    return (
      consents && consents.consentTemplates && !consents.consentTemplates.length
    );
  }
  private userExists(user: User): boolean {
    return Boolean(user) && Boolean(user.uid);
  }
}

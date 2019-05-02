import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsentTemplateList, UserService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-consent-management',
  templateUrl: './consent-management.component.html',
  styleUrls: ['./consent-management.component.scss'],
})
export class ConsentManagementComponent implements OnInit, OnDestroy {
  consents$: Observable<ConsentTemplateList>;
  loading$: Observable<boolean>;
  success$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.resetConsentsProcessState();
    this.consents$ = combineLatest(
      this.userService.getConsents(),
      this.userService.get()
    ).pipe(
      map(([consents, user]) => {
        if (!consents || !consents.consentTemplates.length) {
          this.userService.loadConsents(user.uid);
        }
        return consents;
      })
    );

    this.loading$ = this.userService.getConsentsResultLoading();
    this.success$ = this.userService.getConsentsResultSuccess();
    this.error$ = this.userService.getConsentsResultError();
  }

  ngOnDestroy(): void {
    this.userService.resetConsentsProcessState();
  }
}

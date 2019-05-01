import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsentTemplateList, UserService } from '@spartacus/core';
import { Observable } from 'rxjs';

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
    this.consents$ = this.userService.getConsents();
    this.loading$ = this.userService.getConsentsResultLoading();
    this.success$ = this.userService.getConsentsResultSuccess();
    this.error$ = this.userService.getConsentsResultError();

    this.userService.loadConsents('xxx@xxx.xxx');
  }

  ngOnDestroy(): void {
    this.userService.resetConsentsProcessState();
  }
}

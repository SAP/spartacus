import { Component, OnInit } from '@angular/core';
import { AccountSummaryDetails } from '@spartacus/organization/account-summary/core';
import { AccountSummaryFacade } from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
@Component({
  selector: 'cx-account-summary-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  headerDetails$: Observable<AccountSummaryDetails>;
  currentUnitCode: string;

  constructor(
    private accountSummaryFacade: AccountSummaryFacade) { }

  ngOnInit(): void {

    this.headerDetails$ = this.accountSummaryFacade.getAccountSummary();


  }
}

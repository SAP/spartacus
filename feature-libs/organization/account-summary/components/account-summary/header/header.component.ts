import { Component, OnInit } from '@angular/core';
import { AccountSummaryFacade } from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
@Component({
  selector: 'cx-account-summary-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  accountSummary$: Observable<any | undefined>;

  constructor(private accountSummaryFacade: AccountSummaryFacade) { }

  ngOnInit(): void {
    this.accountSummary$ = this.accountSummaryFacade.getAccountSummary();
  }
}

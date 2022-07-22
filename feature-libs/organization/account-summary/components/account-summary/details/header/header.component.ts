import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
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
    private routingService: RoutingService,
    private accountSummaryFacade: AccountSummaryFacade) { }

  ngOnInit(): void {
    this.accountSummaryFacade.getAccountSummary();

    this.routingService.getRouterState().subscribe((value) => {
      const urlArr = value.state.context.id.split('/');
      this.currentUnitCode = urlArr[urlArr.length - 1];
    });

    this.headerDetails$ = this.accountSummaryFacade.getAccountSummary();


  }
}

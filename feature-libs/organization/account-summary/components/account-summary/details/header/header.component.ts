import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { AccountSummaryDetailsService } from '../../../services';

@Component({
  selector: 'cx-account-summary-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  currentUnitCode: string;
  res: string;

  constructor(
    private routingService: RoutingService,
    private accountSummaryDetailsService: AccountSummaryDetailsService
  ) {
    this.routingService.getRouterState().subscribe((value) => {
      const urlArr = value.state.context.id.split('/');
      this.currentUnitCode = urlArr[urlArr.length - 1];
    });

    this.accountSummaryDetailsService.getHeaderData(this.currentUnitCode).subscribe((response: any) => {
      this.res = response;
      console.log(this.res);
    });
  }

  ngOnInit(): void {

  }

}

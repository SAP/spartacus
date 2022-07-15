import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { AccountSummaryDetailsService } from '../../../services';
import {Observable} from "rxjs";

@Component({
  selector: 'cx-account-summary-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  currentUnitCode: string;
  headerDetails$: Observable<any>
  response: any;

  constructor(
    private routingService: RoutingService,
    private accountSummaryDetailsService: AccountSummaryDetailsService
  ) { }

  ngOnInit(): void {
    this.routingService.getRouterState().subscribe((value) => {
      const urlArr = value.state.context.id.split('/');
      this.currentUnitCode = urlArr[urlArr.length - 1];
    });

    this.headerDetails$ = this.accountSummaryDetailsService.getHeaderData(this.currentUnitCode);
    this.accountSummaryDetailsService.getDocumentData(this.currentUnitCode).subscribe(res => console.log(res));
  }

}

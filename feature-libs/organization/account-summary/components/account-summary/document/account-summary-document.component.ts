import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { AccountSummaryDocument } from '@spartacus/organization/account-summary/core';

@Component({
  selector: 'cx-account-summary-document',
  templateUrl: './account-summary-document.component.html',
})
export class AccountSummaryDocumentComponent implements OnInit {
  currentUnitCode: string;
  documents: Array<AccountSummaryDocument> = [];

  constructor(
    private routingService: RoutingService
  ) // private accountSummaryFacade: AccountSummaryFacade
  {}

  ngOnInit(): void {
    this.routingService.getRouterState().subscribe((value) => {
      const urlArr = value.state.context.id.split('/');
      this.currentUnitCode = urlArr[urlArr.length - 1];
    });

    // this.accountSummaryFacade.getDocumentData(this.currentUnitCode).subscribe(response => {
    //   if (response) {
    //     this.documents = response.documents;
    // response.pagination ToDo: add form control for pages
    // response.sorts ToDo: add form control for sort
    //   }
    // });
  }
}

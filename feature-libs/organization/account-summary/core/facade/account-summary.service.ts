import { Injectable } from '@angular/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import { AccountSummaryFacade } from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AccountSummaryConnector } from '../connector/account-summary-connector';
import { AccountSummaryDetails, AccountSummaryList, DocumentQueryParams } from '../model';
@Injectable({
  providedIn: 'root',
})
export class AccountSummaryService implements AccountSummaryFacade {
  unitCode$ = this.routingService.getRouterState().pipe(
    map((routingData) => routingData.state.params),
    distinctUntilChanged()
  );
  userId: string;
  unitCode: string;

  constructor(
    private routingService: RoutingService,
    private userIdService: UserIdService,
    private accountSummaryConnector: AccountSummaryConnector
  ) {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.userId = userId;
    });
    this.unitCode$.subscribe((params) => this.unitCode = params.unitCode);
  }

  getAccountSummary(): Observable<AccountSummaryDetails> {
    return this.accountSummaryConnector.getAccountSummary(
      this.userId,
      this.unitCode
    );
  }

  getDocumentList(params: DocumentQueryParams): Observable<AccountSummaryList> {
    return this.accountSummaryConnector.getDocumentList(
      this.userId,
      this.unitCode,
      params
    );
  }
}

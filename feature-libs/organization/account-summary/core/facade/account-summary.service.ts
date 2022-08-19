import { Injectable } from '@angular/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import { AccountSummaryDetails, AccountSummaryFacade, AccountSummaryList, DocumentQueryParams } from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { AccountSummaryConnector } from '../connectors';
@Injectable({
  providedIn: 'root',
})
export class AccountSummaryService implements AccountSummaryFacade {

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
    this.routingService.getRouterState().pipe(
      map((routingData) => routingData.state.params),
      distinctUntilChanged()
    ).subscribe((params) => this.unitCode = params.unitCode);
  }

  getAccountSummary(): Observable<AccountSummaryDetails> {
    return this.accountSummaryConnector.getAccountSummary(
      this.userId,
      this.unitCode
    ).pipe(shareReplay(1));
  }

  getDocumentList(params: DocumentQueryParams): Observable<AccountSummaryList> {
    return this.accountSummaryConnector.getDocumentList(
      this.userId,
      this.unitCode,
      params
    ).pipe(shareReplay(1));
  }
}

import { Injectable } from '@angular/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import {
  AccountSummaryDetails,
  AccountSummaryFacade,
  AccountSummaryList,
  DocumentQueryParams,
} from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { AccountSummaryConnector } from '../connectors/account-summary.connector';
@Injectable({
  providedIn: 'root',
})
export class AccountSummaryService implements AccountSummaryFacade {
  userId: string;
  orgUnitId: string;

  constructor(
    private routingService: RoutingService,
    private userIdService: UserIdService,
    private accountSummaryConnector: AccountSummaryConnector
  ) {
    this.userIdService.takeUserId().subscribe((userId) => {
      this.userId = userId;
    });
    this.getOrgUnitId().subscribe((orgUnitId) => (this.orgUnitId = orgUnitId));
  }

  getAccountSummary(orgUnitId?: string): Observable<AccountSummaryDetails> {
    return this.accountSummaryConnector
      .getAccountSummary(this.userId, orgUnitId ?? this.orgUnitId)
      .pipe(shareReplay(1));
  }

  getDocumentList(
    params: DocumentQueryParams,
    orgUnitId?: string
  ): Observable<AccountSummaryList> {
    return this.accountSummaryConnector
      .getDocumentList(this.userId, orgUnitId || this.orgUnitId, params)
      .pipe(shareReplay(1));
  }

  getDocumentAttachment(
    orgDocumentId: string,
    orgDocumentAttachmentId: string,
    orgUnitId?: string
  ): Observable<Blob> {
    return this.accountSummaryConnector
      .getDocumentAttachment(
        this.userId,
        orgUnitId || this.orgUnitId,
        orgDocumentId,
        orgDocumentAttachmentId
      )
      .pipe(shareReplay(1));
  }

  protected getOrgUnitId(): Observable<string> {
    return this.routingService.getRouterState().pipe(
      map((routingData) => routingData.state.params),
      distinctUntilChanged(),
      map((params) => params.orgUnit)
    );
  }
}

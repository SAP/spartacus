import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facadeFactory } from '@spartacus/core';
import { ACCOUNT_SUMMARY_FEATURE } from '../feature-name';
import { AccountSummaryDetails, AccountSummaryList, DocumentQueryParams } from '../model/account-summary';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AccountSummaryFacade,
      feature: ACCOUNT_SUMMARY_FEATURE,
      methods: ['getAccountSummary', 'getDocumentList'],
      async: true,
    }),
})
export abstract class AccountSummaryFacade {
  abstract getAccountSummary(): Observable<AccountSummaryDetails>;

  abstract getDocumentList(params: DocumentQueryParams): Observable<AccountSummaryList>;
}

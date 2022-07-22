import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facadeFactory } from '@spartacus/core';
import { ACCOUNT_SUMMARY_FEATURE } from '../feature-name';
import { AccountSummary, AccountSummaryDetails } from '../../core/model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AccountSummaryFacade,
      feature: ACCOUNT_SUMMARY_FEATURE,
      methods: ['getAccountSummary', 'getAccountSummaryDocument'],
      async: true,
    }),
})
export abstract class AccountSummaryFacade {
  abstract getAccountSummary(): Observable<AccountSummaryDetails>;

  abstract getAccountSummaryDocument(
    userId: string,
    unitCode: string
  ): Observable<AccountSummary>;
}

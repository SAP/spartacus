import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facadeFactory } from '@spartacus/core';
import { ACCOUNT_SUMMARY_FEATURE } from '../feature-name';

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
  abstract getAccountSummary(): Observable<any | undefined>;
  // userId: string,
  // unitCode: string

  abstract getAccountSummaryDocument(
    userId: string,
    unitCode: string
  ): Observable<any | undefined>;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { AccountSummary, AccountSummaryDetails } from '@spartacus/organization/account-summary/core';
import { Observable } from 'rxjs';
import { AccountSummaryAdapter } from '../../core/connector/account-summary-adapter';
import { ACCOUNT_SUMMARY_NORMALIZER } from '../../core/connector/converters';

@Injectable()
export class OccAccountSummaryAdapter implements AccountSummaryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) { }

  getAccountSummary(userId: string, unitCode: string): Observable<AccountSummaryDetails> {
    return this.http.get<any>(this.getAccountSummaryEndPoint(userId, unitCode)).pipe(
      this.converter.pipeable(ACCOUNT_SUMMARY_NORMALIZER)
    );
  }

  getDocumentList(userId: string, unitCode: string): Observable<AccountSummary> {
    this.getDocumentListEndPoint(userId, unitCode);
    //TODO
    throw new Error('getDocumentList is not implemented');
  }


  private getAccountSummaryEndPoint(userId: string, unitCode: string): string {
    return this.occEndpoints.buildUrl('accountSummary', {
      urlParams: { userId },
      queryParams: { unit: unitCode },
    });
  }

  private getDocumentListEndPoint(userId: string, unitCode: string): string {
    console.log(userId);
    console.log(unitCode);
    //TODO
    return "";
  }
}

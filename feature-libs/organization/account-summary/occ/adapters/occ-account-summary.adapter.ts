import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { AccountSummary, AccountSummaryDetails, DocumentQueryParams } from '@spartacus/organization/account-summary/core';
import { Observable } from 'rxjs';
import { AccountSummaryAdapter } from '../../core/connector/account-summary-adapter';
import { ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER, ACCOUNT_SUMMARY_NORMALIZER } from '../../core/connector/converters';

@Injectable()
export class OccAccountSummaryAdapter implements AccountSummaryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) { }

  getAccountSummary(userId: string, unitCode: string): Observable<AccountSummaryDetails> {
    return this.http.get<AccountSummaryDetails>(this.getAccountSummaryEndPoint(userId, unitCode)).pipe(
      this.converter.pipeable(ACCOUNT_SUMMARY_NORMALIZER)
    );
  }

  getDocumentList(userId: string, unitCode: string, params: DocumentQueryParams): Observable<AccountSummary> {
    return this.http.get<AccountSummary>(this.getDocumentListEndPoint(userId, unitCode, params)).pipe(
      this.converter.pipeable(ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER)
    );
  }

  private getAccountSummaryEndPoint(userId: string, unitCode: string): string {
    return this.occEndpoints.buildUrl('accountSummary', {
      urlParams: { userId },
      queryParams: { unit: unitCode },
    });
  }

  private getDocumentListEndPoint(userId: string, unit: string, params: DocumentQueryParams): string {
    return this.occEndpoints.buildUrl('accountSummaryDocument', {
      urlParams: { userId },
      queryParams: {
        b2bUnitCode: unit,
        params
      },
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AccountSummaryAdapter } from '../../core/connector/account-summary-adapter';
// import { ACCOUNT_SUMMARY_NORMALIZER } from '../../core/connector/converters';

@Injectable()
export class OccAccountSummaryAdapter implements AccountSummaryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getAccountSummary(userId: string, unitCode: string): Observable<any> {
    console.log(userId);
    console.log(unitCode);
    throw new Error('Method not implemented.');
  }

  getDocumentList(userId: string, unitCode: string): Observable<any> {
    console.log(userId);
    console.log(unitCode);
    throw new Error('getDocumentList is not implemented');
  }
}

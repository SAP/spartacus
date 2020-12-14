import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BaseSiteService,
  ConverterService,
  InterceptorUtil,
  OccEndpointsService,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CUSTOMER_SEARCH_PAGE_NORMALIZER } from '../../core//connectors/converters';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../../core//models/asm.models';
import { AsmConfig } from '../../core/config/asm-config';
import { AsmAdapter } from '../../core/connectors/asm.adapter';

@Injectable()
export class OccAsmAdapter implements AsmAdapter {
  private activeBaseSite: string;

  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService,
    protected config: AsmConfig,
    protected baseSiteService: BaseSiteService
  ) {
    this.baseSiteService
      .getActive()
      .subscribe((value) => (this.activeBaseSite = value));
  }

  customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage> {
    const headers = InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );
    let params: HttpParams = new HttpParams()
      .set('baseSite', this.activeBaseSite)
      .set('sort', 'byNameAsc');

    if (typeof options['query'] !== 'undefined') {
      params = params.set('query', '' + options.query);
    }

    if (typeof options['pageSize'] !== 'undefined') {
      params = params.set('pageSize', '' + options.pageSize);
    }

    const url = this.occEndpointsService.getRawEndpoint('asmCustomerSearch');

    return this.http
      .get<CustomerSearchPage>(url, { headers, params })
      .pipe(this.converterService.pipeable(CUSTOMER_SEARCH_PAGE_NORMALIZER));
  }
}

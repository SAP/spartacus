import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsmConfig } from '../../../../../../../../projects/core/src/asm/config/asm-config';
import { AsmAdapter } from '../../../../../../../../projects/core/src/asm/connectors/asm.adapter';
import { CUSTOMER_SEARCH_PAGE_NORMALIZER } from '../../../../../../../../projects/core/src/asm/connectors/converters';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../../../../../../../../projects/core/src/asm/models/asm.models';
import { BaseSiteService } from '../../../../../../../../projects/core/src/site-context/facade/base-site.service';
import { ConverterService } from '../../../../../../../../projects/core/src/util/converter.service';
import { OccEndpointsService } from '../../../../../../../../projects/core/src/occ/services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../../../../../../../projects/core/src/occ/utils/interceptor-util';

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

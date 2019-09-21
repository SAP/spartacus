import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsmConfig } from '../../../asm/config/asm-config';
import { CUSTOMER_SEARCH_PAGE_NORMALIZER } from '../../../asm/connectors/converters';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../../../asm/models/asm.models';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { ConverterService } from '../../../util/converter.service';
import {
  InterceptorUtil,
  USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
} from '../../utils/interceptor-util';

@Injectable()
export class OccCustomerAdapter {
  private activeBaseSite: string;

  constructor(
    protected http: HttpClient,
    protected config: AsmConfig,
    protected converterService: ConverterService,
    protected baseSiteService: BaseSiteService
  ) {
    this.baseSiteService
      .getActive()
      .subscribe(value => (this.activeBaseSite = value));
  }

  search(options: CustomerSearchOptions): Observable<CustomerSearchPage> {
    const headers = InterceptorUtil.createHeader(
      USE_CUSTOMER_SUPPORT_AGENT_TOKEN,
      true,
      new HttpHeaders()
    );

    const params: HttpParams = new HttpParams()
      .set('baseSite', this.activeBaseSite)
      .set('query', options.query);

    const url =
      this.config.backend.occ.baseUrl +
      '/assistedservicewebservices/customers/search';
    return this.http
      .get<CustomerSearchPage>(url, { headers, params })
      .pipe(this.converterService.pipeable(CUSTOMER_SEARCH_PAGE_NORMALIZER));
  }
}

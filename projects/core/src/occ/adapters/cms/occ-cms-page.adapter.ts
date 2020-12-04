import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsPageAdapter } from '../../../cms/connectors/page/cms-page.adapter';
import { CMS_PAGE_NORMALIZER } from '../../../cms/connectors/page/converters';
import { CmsStructureModel } from '../../../cms/model/page.model';
import { PageType } from '../../../model/cms.model';
import {
  HOME_PAGE_ID,
  PageContext,
} from '../../../routing/models/page-context.model';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable({
  providedIn: 'root',
})
export class OccCmsPageAdapter implements CmsPageAdapter {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(
    pageContext: PageContext,
    fields?: string
  ): Observable<CmsStructureModel> {
    // load page by PageContext
    const httpParams = this.getPagesRequestParams(pageContext);
    return this.http
      .get(this.getPagesEndpoint(httpParams, fields), {
        headers: this.headers,
      })
      .pipe(this.converter.pipeable(CMS_PAGE_NORMALIZER));
  }

  /**
   * Returns the endpoint configuration for OCC CMS page endpoint.
   *
   * If no fields are provided we rely on the backend configuration to use the DEFAULT field configuration.
   *
   * @param params query parameters to build the occ cms page endpoint configuration
   * @param fields Specific occ field configuration to refine the response data.
   */
  protected getPagesEndpoint(
    params: {
      [key: string]: string;
    },
    fields?: string
  ): string {
    if (fields) {
      params.fields = fields;
    }
    return this.occEndpoints.getUrl('pages', {}, { ...params });
  }

  protected getPagesRequestParams(
    pageContext: PageContext
  ): { [key: string]: any } {
    let httpParams = {};

    // SmartEdit preview page is loaded by previewToken which added by interceptor
    if (
      pageContext.id !== 'smartedit-preview' &&
      pageContext.id !== HOME_PAGE_ID
    ) {
      httpParams = { pageType: pageContext.type };

      if (pageContext.type === PageType.CONTENT_PAGE) {
        httpParams['pageLabelOrId'] = pageContext.id;
      } else {
        httpParams['code'] = pageContext.id;
      }
    }
    return httpParams;
  }
}

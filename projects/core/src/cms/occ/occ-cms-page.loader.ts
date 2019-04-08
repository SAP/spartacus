import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  CmsComponentList,
  CMSPage,
  PageType,
} from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsStructureConfig } from '../config/cms-structure.config';
import { IdList } from '../model/idList.model';
import { CmsPageAdapter } from '../services/cms-page.adapter';
import { CmsPageLoader } from '../services/cms-page.loader';
import { CmsStructureConfigService } from '../services/cms-structure-config.service';

@Injectable()
export class OccCmsPageLoader extends CmsPageLoader<CMSPage> {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    protected config: CmsStructureConfig,
    protected cmsStructureConfigService: CmsStructureConfigService,
    @Optional() protected adapter: CmsPageAdapter<CMSPage>,
    private occEndpoints: OccEndpointsService
  ) {
    super(cmsStructureConfigService, adapter);
  }

  load(pageContext: PageContext, fields?: string): Observable<CMSPage> {
    const httpParams = this.getPagesRequestParams(pageContext);

    return this.http.get(this.getPagesEndpoint(httpParams, fields), {
      headers: this.headers,
    });
  }

  loadListComponents(
    idList: IdList,
    pageContext: PageContext,
    fields?: string,
    currentPage?: number,
    pageSize?: number,
    sort?: string
  ): Observable<CmsComponentList> {
    const requestParams = this.getComponentsRequestParams(
      pageContext,
      currentPage,
      pageSize,
      sort
    );

    return this.http
      .post<CmsComponentList>(
        this.getComponentsEndpoint(requestParams, fields),
        idList,
        {
          headers: this.headers,
        }
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getBaseEndPoint(): string {
    return this.occEndpoints.getEndpoint('cms');
  }

  protected getPagesEndpoint(
    params: {
      [key: string]: string;
    },
    fields?: string
  ): string {
    fields = fields ? fields : 'DEFAULT';
    return this.occEndpoints.getUrl('pages', { fields }, params);
  }

  protected getPagesRequestParams(
    pageContext: PageContext
  ): { [key: string]: any } {
    let httpParams: { [key: string]: any };

    if (pageContext.id !== 'smartedit-preview') {
      httpParams = { pageType: pageContext.type };

      if (pageContext.type === PageType.CONTENT_PAGE) {
        httpParams['pageLabelOrId'] = pageContext.id;
      } else {
        httpParams['code'] = pageContext.id;
      }
    }
    return httpParams;
  }

  protected getComponentsEndpoint(
    requestParams: {
      [key: string]: string;
    },
    fields?: string
  ): string {
    fields = fields ? fields : 'DEFAULT';
    return this.occEndpoints.getUrl('components', { fields }, requestParams);
  }

  protected getComponentsRequestParams(
    pageContext: PageContext,
    currentPage?: number,
    pageSize?: number,
    sort?: string
  ): { [key: string]: string } {
    let requestParams = {};
    switch (pageContext.type) {
      case PageType.PRODUCT_PAGE: {
        requestParams = { productCode: pageContext.id };
        break;
      }
      case PageType.CATEGORY_PAGE: {
        requestParams = { categoryCode: pageContext.id };
        break;
      }
      case PageType.CATALOG_PAGE: {
        requestParams = { catalogCode: pageContext.id };
        break;
      }
    }

    if (currentPage !== undefined) {
      requestParams['currentPage'] = currentPage.toString();
    }
    if (pageSize !== undefined) {
      requestParams['pageSize'] = pageSize.toString();
    }
    if (sort !== undefined) {
      requestParams['sort'] = sort;
    }

    return requestParams;
  }
}

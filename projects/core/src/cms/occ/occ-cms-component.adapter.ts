import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsComponent, CmsComponentList, PageType } from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsComponentAdapter } from '../connectors/component/cms-component.adapter';
import { IdList } from '../model/idList.model';

@Injectable()
export class OccCmsComponentAdapter
  implements CmsComponentAdapter<CmsComponent, CmsComponentList> {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  protected getBaseEndPoint(): string {
    return this.occEndpoints.getEndpoint('cms');
  }

  load<T extends CmsComponent>(
    id: string,
    pageContext: PageContext
  ): Observable<T> {
    return this.http.get<T>(this.getBaseEndPoint() + `/components/${id}`, {
      headers: this.headers,
      params: new HttpParams({
        fromString: this.getRequestParams(pageContext),
      }),
    });
  }

  loadList(
    idList: IdList,
    pageContext: PageContext,
    fields?: string,
    currentPage?: number,
    pageSize?: number,
    sort?: string
  ): Observable<CmsComponentList> {
    let requestParams = this.getRequestParams(pageContext, fields);
    if (currentPage !== undefined) {
      requestParams === ''
        ? (requestParams = requestParams + 'currentPage=' + currentPage)
        : (requestParams = requestParams + '&currentPage=' + currentPage);
    }
    if (pageSize !== undefined) {
      requestParams = requestParams + '&pageSize=' + pageSize;
    }
    if (sort !== undefined) {
      requestParams = requestParams + '&sort=' + sort;
    }

    return this.http.post<CmsComponentList>(
      this.getBaseEndPoint() + `/components`,
      idList,
      {
        headers: this.headers,
        params: new HttpParams({
          fromString: requestParams,
        }),
      }
    );
  }

  private getRequestParams(pageContext: PageContext, fields?: string): string {
    let requestParams = '';
    switch (pageContext.type) {
      case PageType.PRODUCT_PAGE: {
        requestParams = 'productCode=' + pageContext.id;
        break;
      }
      case PageType.CATEGORY_PAGE: {
        requestParams = 'categoryCode=' + pageContext.id;
        break;
      }
      case PageType.CATALOG_PAGE: {
        requestParams = 'catalogCode=' + pageContext.id;
        break;
      }
    }

    if (fields !== undefined) {
      requestParams === ''
        ? (requestParams = requestParams + 'fields=' + fields)
        : (requestParams = requestParams + '&fields=' + fields);
    }

    return requestParams;
  }
}

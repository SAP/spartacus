import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CmsComponent,
  CmsComponentList,
  PageType,
} from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsComponentAdapter } from '../connectors/component/cms-component.adapter';
import { IdList } from '../model/idList.model';
import { ConverterService } from '../../util/converter.service';
import { CMS_COMPONENT_NORMALIZER } from '../connectors/component/converters';
import { pluck } from 'rxjs/operators';

@Injectable()
export class OccCmsComponentAdapter implements CmsComponentAdapter {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getBaseEndPoint(): string {
    return this.occEndpoints.getEndpoint('cms');
  }

  load<T extends CmsComponent>(
    id: string,
    pageContext: PageContext
  ): Observable<T> {
    return this.http
      .get<T>(this.getBaseEndPoint() + `/components/${id}`, {
        headers: this.headers,
        params: new HttpParams({
          fromString: this.getRequestParams(pageContext),
        }),
      })
      .pipe(this.converter.pipeable<any, T>(CMS_COMPONENT_NORMALIZER));
  }

  loadList(
    ids: string[],
    pageContext: PageContext,
    fields = 'DEFAULT',
    currentPage = 0,
    pageSize = ids.length,
    sort?: string
  ): Observable<CmsComponent[]> {
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

    const idList: IdList = { idList: ids };

    return this.http
      .post<CmsComponentList>(this.getBaseEndPoint() + `/components`, idList, {
        headers: this.headers,
        params: new HttpParams({
          fromString: requestParams,
        }),
      })
      .pipe(
        pluck('component'),
        this.converter.pipeableMany(CMS_COMPONENT_NORMALIZER)
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

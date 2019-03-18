import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { IdList } from './../model/idList.model';
import { CmsConfig } from '../config/cms-config';
import { PageContext } from '../../routing/index';
import {
  CMSPage,
  PageType,
  CmsComponent,
  CmsComponentList
} from '../../occ/occ-models/index';
import { OccCmsConvertor } from '../converter/occ-cms.converter';

@Injectable()
export class OccCmsService {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private config: CmsConfig,
    private convertor: OccCmsConvertor
  ) {}

  protected getBaseEndPoint(): string {
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/cms'
    );
  }

  loadPageData(pageContext: PageContext, fields?: string): Observable<CMSPage> {
    let httpStringParams = '';

    if (pageContext.id !== 'smartedit-preview') {
      httpStringParams = 'pageType=' + pageContext.type;

      if (pageContext.type === PageType.CONTENT_PAGE) {
        httpStringParams =
          httpStringParams + '&pageLabelOrId=' + pageContext.id;
      } else {
        httpStringParams = httpStringParams + '&code=' + pageContext.id;
      }
    }

    if (fields !== undefined) {
      httpStringParams = httpStringParams + '&fields=' + fields;
    }

    return this.http
      .get(this.getBaseEndPoint() + `/pages`, {
        headers: this.headers,
        params: new HttpParams({
          fromString: httpStringParams
        })
      })
      .pipe(
        map(page => this.convertor.convert(page)),
        catchError((error: any) => throwError(error.json()))
      );
  }

  loadComponent<T extends CmsComponent>(
    id: string,
    pageContext: PageContext,
    fields?: string
  ): Observable<T> {
    return this.http
      .get<T>(this.getBaseEndPoint() + `/components/${id}`, {
        headers: this.headers,
        params: new HttpParams({
          fromString: this.getRequestParams(pageContext, fields)
        })
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadListComponents(
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

    return this.http
      .post<CmsComponentList>(this.getBaseEndPoint() + `/components`, idList, {
        headers: this.headers,
        params: new HttpParams({
          fromString: requestParams
        })
      })
      .pipe(catchError((error: any) => throwError(error.json())));
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

  get baseUrl(): string {
    return this.config.server.baseUrl || '';
  }
}

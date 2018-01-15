import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { PageContext, PageType } from '../../routing/models/page-context.model';
import { ConfigService } from '../config.service';

@Injectable()
export class OccCmsService {
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private config: ConfigService) {}

  protected getBaseEndPoint() {
    return (
      this.config.server.baseUrl +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/cms'
    );
  }

  loadPageData(pageContext: PageContext, fields?: string): Observable<any> {
    let params: HttpParams;
    let paramName: string;
    switch (pageContext.type) {
      case PageType.PRODUCT_PAGE: {
        paramName = 'productCode';
        break;
      }
      case PageType.CATEGORY_PAGE: {
        paramName = 'categoryCode';
        break;
      }
      case PageType.CATALOG_PAGE: {
        paramName = 'catalogCode';
        break;
      }
      default: {
        paramName = 'pageId';
        break;
      }
    }
    if (fields === undefined) {
      params = new HttpParams().set(paramName, pageContext.id);
    } else {
      params = new HttpParams()
        .set(paramName, pageContext.id)
        .set('fields', fields);
    }

    return this.http
      .get(this.getBaseEndPoint() + `/page`, {
        headers: this.headers,
        params: params
      })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  loadComponent(id: string, fields?: string): Observable<any> {
    let params: HttpParams;
    if (fields !== undefined) {
      params = new HttpParams().set('fields', fields);
    }

    return this.http
      .get(this.getBaseEndPoint() + `/components/${id}`, {
        headers: this.headers,
        params: params
      })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  get baseUrl(): string {
    return this.config.server.baseUrl;
  }
}

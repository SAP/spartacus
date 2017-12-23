import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { PageContext, PageType } from "../../routing/models/page-context.model";
import { ConfigService } from "../config.service";

@Injectable()
export class OccCmsService {
  protected headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private config: ConfigService) {}

  protected getBaseEndPoint() {
    return (
      this.config.server.baseUrl +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      "/cms"
    );
  }

  loadPageData(pageContext: PageContext): Observable<any> {
    let params: HttpParams;
    switch (pageContext.type) {
      case PageType.PRODUCT_PAGE: {
        params = new HttpParams().set("productCode", pageContext.id);
        break;
      }
      case PageType.CATEGORY_PAGE: {
        params = new HttpParams().set("categoryCode", pageContext.id);
        break;
      }
      case PageType.CATALOG_PAGE: {
        params = new HttpParams().set("catalogCode", pageContext.id);
        break;
      }
      default: {
        params = new HttpParams().set("pageId", pageContext.id);
        break;
      }
    }
    return this.http
      .get(this.getBaseEndPoint() + `/page?fields=DEFAULT`, {
        headers: this.headers,
        params: params
      })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  loadComponent(id: string): Observable<any> {
    return this.http
      .get(this.getBaseEndPoint() + `/components/${id}`, {
        headers: this.headers
      })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  get baseUrl(): string {
    return this.config.server.baseUrl;
  }
}

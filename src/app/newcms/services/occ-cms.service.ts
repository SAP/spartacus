import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { PageContext, PageType } from "../../routing/models/page-context.model";
import { ConfigService } from "../config.service";

@Injectable()
export class OccCmsService {
  protected headers = new Headers({ "Content-Type": "application/json" });

  constructor(private http: Http, private config: ConfigService) {}

  protected getBaseEndPoint() {
    return (
      this.config.server.baseUrl +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      "/cms"
    );
  }

  loadPageData(pageContext: PageContext): Observable<any> {
    const params = new URLSearchParams();
    switch (pageContext.type) {
      case PageType.PRODUCT_PAGE: {
        params.set("productCode", pageContext.id);
        break;
      }
      case PageType.CATALOG_PAGE: {
        params.set("categoryCode", pageContext.id);
        break;
      }
      case PageType.CATALOG_PAGE: {
        params.set("catalogCode", pageContext.id);
        break;
      }
      default: {
        params.set("pageId", pageContext.id);
        break;
      }
    }

    const requestOptions = new RequestOptions({
      headers: this.headers,
      params: params
    });
    return this.http
      .get(this.getBaseEndPoint() + `/page?fields=DEFAULT`, requestOptions)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  loadComponent(id: string): Observable<any> {
    return this.http
      .get(this.getBaseEndPoint() + `/components/${id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  public getBaseUrl() {
    return this.config.server.baseUrl;
  }
}

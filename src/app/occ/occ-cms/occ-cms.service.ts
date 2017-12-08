import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config.service';

@Injectable()
export class OccCmsService {

    protected headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private config: ConfigService) {}


    protected getBaseEndPoint() {
        return this.config.server.baseUrl +
            this.config.server.occPrefix +
            this.config.site.baseSite + '/cms';
    }

    loadPageData(pageId: string, productCode: string, categoryCode: string, catalogCode: string): Observable<any> {
        const params = new URLSearchParams();
        params.set('pageId', pageId);
        params.set('productCode', productCode);
        params.set('categoryCode', categoryCode);
        params.set('catalogCode', catalogCode);
            
        const requestOptions = new RequestOptions({headers: this.headers, params: params});
        return this.http.get(this.getBaseEndPoint()+`/page?fields=DEFAULT`, requestOptions);
    }

    loadComponent(id: string): Observable<any> {
        return this.http.get(this.getBaseEndPoint()+`/components/${id}`);
    }

    public getBaseUrl() {
        return this.config.server.baseUrl;
    }
}
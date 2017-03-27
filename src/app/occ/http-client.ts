import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Request, Response, ConnectionBackend, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const USER_TOKEN_KEY = 'y_user_token';

@Injectable()
export class HttpClient extends Http {

    constructor(protected _backend: ConnectionBackend, protected _defaultOptions: RequestOptions) {
        super(_backend, _defaultOptions);
    }

    get(url: string, options?): Observable<Response> {
        options = this.setCustomHeaders(url, options);
        url = this.setLanguage(url);
        url = this.setCurrency(url);
        return super.request(url, options);
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>  {
        options = this.setCustomHeaders(url, options);
        return super.post(url, body, options);
    }

    delete(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>  {
        options = this.setCustomHeaders(url, options);
        return super.delete(url, options);
    }

    private setCustomHeaders(url, options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            options = new RequestOptions({});
        }
        if (sessionStorage.getItem(USER_TOKEN_KEY)) {
            if (!options.headers) {
                options.headers = new Headers();
            }
            options.headers.set('authorization', 'Bearer ' + this.getToken());
        }
        return options;
    }

    private setLanguage(url: string) {
        const lang = 'de';
        url += (url.indexOf('?') > -1) ? '&' : '?';
        url += 'lang=';
        url += lang;
        return url;
    }

    private setCurrency(url: string) {
        const currency = 'JPY';
        url += (url.indexOf('?') > -1) ? '&' : '?';
        url += 'curr=';
        url += currency;
        return url;
    }

    private getToken(): string {
        const token = JSON.parse(sessionStorage.getItem(USER_TOKEN_KEY));
        return (token && token.access_token) ? token.access_token : '' ;
    }
}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Request, Response, ConnectionBackend, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';

// const USER_TOKEN_KEY = 'y_user_token';

@Injectable()
export class HttpClient extends Http {

    constructor (
        protected backend: ConnectionBackend,
        protected defaultOptions: RequestOptions,
        protected configService: ConfigService
    ) {
        super(backend, defaultOptions);
    }

    get(url: string, options?): Observable<Response> {
        options = this.setCustomHeaders(url, options);
        url = this.addLanguage(url);
        url = this.addCurrency(url);
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
        if (!options.headers) {
            options.headers = new Headers();
        }
        if (this.configService.authentication.userToken) {
            options.headers.set('authorization', 'Bearer ' + this.getToken());
        }
        return options;
    }

    private addLanguage(url: string) {
        url += (url.indexOf('?') > -1) ? '&' : '?';
        url += 'lang=';
        url += this.configService.site.language || 'en';
        return url;
    }

    private addCurrency(url: string) {
        url += (url.indexOf('?') > -1) ? '&' : '?';
        url += 'curr=';
        url += this.configService.site.currency || 'USD';
        return url;
    }

    private getToken(): string {
        const token = this.configService.authentication.userToken;
        return (token && token['access_token']) ? token['access_token'] : '' ;
    }
}

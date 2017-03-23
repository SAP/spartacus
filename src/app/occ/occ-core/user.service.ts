import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OccUserService extends BaseService {

    // some extending from baseservice is not working here...
    constructor(
        protected http: Http,
        protected configService: ConfigService
    ) {
        super(http, configService);
    }

    public loadUser = (accessToken: string, username: string): Observable<any> => {
        const url = this.getUserEndpoint() + username;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', 'Bearer ' + accessToken);
        // headers.append('withCredentials', 'true');

        const options = new RequestOptions({
            headers: headers,
            withCredentials: true // only works when Access-Control-Allow-Credentials response header (server) is set to “true”
        });

        return this.http.get(url, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    loadToken = (username: string, password: string): Observable<any> => {

        const url = this.getOAuthEndpoint();
 
        let creds = '';
        creds += 'client_id=' + this.configService.settings.oauth.client_id;
        creds += '&client_secret=' + this.configService.settings.oauth.client_secret;
        creds += '&grant_type=password'; // authorization_code, client_credentials, password
        creds += '&username=' + username + '&password=' + password;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.post(url, creds, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

}

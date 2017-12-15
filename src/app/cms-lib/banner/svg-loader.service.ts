import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AsyncSubject } from 'rxjs/AsyncSubject';

@Injectable()
export class SvgLoaderService {

    constructor(
        private http: Http
    ) { }

    isSVG(url): Boolean {
        return url && (url.indexOf('.svg') > -1);
    }

    loadSVG(url): AsyncSubject<any> {
        const subject = new AsyncSubject<any>();
        if (this.isSVG(url)) {

            // add_header 'Access-Control-Allow-Methods' 'GET';
            // add_header 'Access-Control-Allow-Origin' 'https://your.domain.com';

            const headers = new Headers();
            headers.append('Access-Control-Allow-Methods', 'GET');
            headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

            const params = new URLSearchParams();
            const requestOptions = new RequestOptions({headers: headers, params: params});

            this.http.get(url, requestOptions).subscribe((data) => {
                subject.next(data.text());
                subject.complete();
            });
        }

        return subject;
    }
}

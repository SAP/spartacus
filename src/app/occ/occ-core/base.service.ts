import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { ConfigService } from '../config.service';

const ENDPOINT_PRODUCT = 'products';
const ENDPOINT_PRODUCT_SEARCH = 'products/search';
const ENDPOINT_PRODUCT_SUGGESTIONS = 'products/suggestions';

@Injectable()
export class BaseService {

    constructor(
        protected http: Http,
        protected configService: ConfigService
    ) { }

    protected promise(url: string): Promise<any> {
        return new Promise((resolve) => {
            this.http.get(url).subscribe((data) => {
                resolve(data.json());
            },
            err => this.logError(err));
        });
    }

    protected logError(err) {
        console.error('There was an error: ' + err);
    }

    protected getBaseEndPoint() {
        return this.configService.settings.baseUrl +
            this.configService.settings.occPrefix +
            this.configService.settings.baseSite + '/';
    }

    getProductEndpoint() {
        return this.getBaseEndPoint() + ENDPOINT_PRODUCT;
    }

    getProductSearchEndpoint() {
        return this.getBaseEndPoint() + ENDPOINT_PRODUCT_SEARCH;
    }

    getProductSuggestionsEndpoint() {
        return this.getBaseEndPoint() + ENDPOINT_PRODUCT_SUGGESTIONS;
    }

    getCartEndpoint(userId = 'anonymous') {
        const cartEndpoint = 'users/' + userId + '/carts/';
        return this.getBaseEndPoint() + cartEndpoint;
    }

}

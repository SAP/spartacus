import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ConfigService } from '../config.service';
import { BaseService } from './base.service';

import { ProductImageConverterService } from './converters/product-image-converter.service';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class OccCartService extends BaseService {

    // Extending from baseservice is not working here for some reasons
    // we got errors when we didn't construct the configService.
    constructor(
        protected http: Http,
        protected configService: ConfigService,
        protected productImageConverter: ProductImageConverterService,
    ) {
        super(http, configService);
    }

    public loadLatestCart = (userId: string): Observable<any> => {
        const url = this.getCartEndpoint(userId);
        return this.http.get(url)
            .map((response) => {
                const cartsData = response.json();
                // TODO: implement latest card strategy
                return (cartsData && cartsData.carts) ? cartsData.carts[0] : null ;
            });
    }


    public mergeCartWithLatestCart(userId: string, oldCartToken: string, toMergeCart: any) {
        const toAdd = JSON.stringify({ });
        let url = this.getCartEndpoint(userId);
        url += '?oldCartId=' + oldCartToken;
        if (toMergeCart) {
            url += '&toMergeCartGuid=' + toMergeCart.guid;
        }
        url += '&fields=DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),entries(totalPrice(formattedValue),product(images(FULL)))';

        return this.http.post(url, toAdd)
            .map((response: Response) => {
                const cartData = response.json();
                if (cartData.entries) {
                    for (const entry of cartData.entries) {
                        this.productImageConverter.convertProduct(entry.product);
                    }
                }
                return cartData;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public loadCart = (userId: string, cartId: string): Observable<any> => {
        let url = this.getCartEndpoint(userId);
        url += cartId;
        url += '?fields=DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),entries(totalPrice(formattedValue),product(images(FULL)))';

        return this.http.get(url)
            .map((response) => {
                const cartData = response.json();

                if (cartData.entries) {
                    for (const entry of cartData.entries) {
                        this.productImageConverter.convertProduct(entry.product);
                    }
                }
                return cartData;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public createCart = (userId: string): Observable<any> => {
        const url = this.getCartEndpoint(userId);
        const toAdd = JSON.stringify({ });
        return this.http.post(url, toAdd)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public add = (userId: string, cartId: string, productCode: string, quantity: number): Observable<any> => {
        const toAdd = JSON.stringify({});

        let url = this.getCartEndpoint(userId);
        url += cartId;
        url += '/entries?code=' + productCode + '&qty=' + quantity;

        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.post(url, toAdd, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public remove = (userId: string, cartId: string, entryNumber: string): Observable<any> => {

        let url = this.getCartEndpoint(userId);
        url += cartId;
        url += '/entries/';
        url += entryNumber;

        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this.http.delete(url, { headers: headers })
            .map((response: Response) => response)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }


}

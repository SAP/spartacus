import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../config.service';
import { ProductImageConverterService } from './converters/product-image-converter.service';
import { ProductReferenceConverterService } from './converters/product-reference-converter.service';

const ENDPOINT_PRODUCT = 'products';
const ENDPOINT_PRODUCT_SEARCH = 'products/search';

@Injectable()
export class BaseService {
    
    constructor(
        protected http: Http,
        protected configService: ConfigService,
        protected productImageConverter: ProductImageConverterService,
        protected productReferenceConverter: ProductReferenceConverterService
    ) { }

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

}

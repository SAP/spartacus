import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { JsonLdBuilder } from '../schema.interface';
import * as i0 from "@angular/core";
/**
 * Builds the structured data for the product offer, see https://schema.org/offers.
 * The data includes the price, currency and availability level.
 */
export declare class JsonLdProductOfferBuilder implements JsonLdBuilder<Product> {
    build(product: Product): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JsonLdProductOfferBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JsonLdProductOfferBuilder>;
}

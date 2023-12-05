import { Price, Product, ProductScope, ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { BulkPrice } from '../model/bulk-price.model';
import * as i0 from "@angular/core";
export declare class BulkPricingService {
    protected productService: ProductService;
    protected readonly PRODUCT_SCOPE = ProductScope.BULK_PRICES;
    constructor(productService: ProductService);
    getBulkPrices(productCode: string): Observable<BulkPrice[] | undefined>;
    protected convert(productPriceScope: Product | undefined): BulkPrice[] | undefined;
    protected parsePrice(priceTier: Price, basePrice: number | undefined): BulkPrice;
    protected calculateDiscount(bulkPriceTemplate: BulkPrice, basePrice: number | undefined): BulkPrice;
    static ɵfac: i0.ɵɵFactoryDeclaration<BulkPricingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BulkPricingService>;
}

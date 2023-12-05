import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../model/product.model';
import { ProductAdapter } from '../../../product/connectors/product/product.adapter';
import { ScopedProductData } from '../../../product/connectors/product/scoped-product-data';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccRequestsOptimizerService } from '../../services/occ-requests-optimizer.service';
import * as i0 from "@angular/core";
export declare class OccProductAdapter implements ProductAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected requestsOptimizer: OccRequestsOptimizerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService, requestsOptimizer: OccRequestsOptimizerService);
    load(productCode: string, scope?: string): Observable<Product>;
    loadMany(products: ScopedProductData[]): ScopedProductData[];
    protected getEndpoint(code: string, scope?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccProductAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccProductAdapter>;
}

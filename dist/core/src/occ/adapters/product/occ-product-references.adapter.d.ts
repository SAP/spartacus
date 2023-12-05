import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductReference } from '../../../model/product.model';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { ConverterService } from '../../../util/converter.service';
import { ProductReferencesAdapter } from '../../../product/connectors/references/product-references.adapter';
import * as i0 from "@angular/core";
export declare class OccProductReferencesAdapter implements ProductReferencesAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(productCode: string, referenceType?: string, pageSize?: number): Observable<ProductReference[]>;
    protected getEndpoint(code: string, reference?: string, pageSize?: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccProductReferencesAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccProductReferencesAdapter>;
}

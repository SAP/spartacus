import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CdsEndpointsService } from '../../../services/cds-endpoints.service';
import { MerchandisingStrategyAdapter } from '../../connectors/strategy/merchandising-strategy.adapter';
import { StrategyProducts } from '../../model/strategy-products.model';
import { StrategyRequest } from './../../../cds-models/cds-strategy-request.model';
import * as i0 from "@angular/core";
export declare class CdsMerchandisingStrategyAdapter implements MerchandisingStrategyAdapter {
    private cdsEndpointsService;
    protected http: HttpClient;
    constructor(cdsEndpointsService: CdsEndpointsService, http: HttpClient);
    loadProductsForStrategy(strategyId: string, strategyRequest?: StrategyRequest): Observable<StrategyProducts>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdsMerchandisingStrategyAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdsMerchandisingStrategyAdapter>;
}

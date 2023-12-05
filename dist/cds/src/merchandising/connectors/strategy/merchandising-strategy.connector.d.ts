import { Observable } from 'rxjs';
import { StrategyProducts } from '../../model/strategy-products.model';
import { StrategyRequest } from './../../../cds-models/cds-strategy-request.model';
import { MerchandisingStrategyAdapter } from './merchandising-strategy.adapter';
import * as i0 from "@angular/core";
export declare class MerchandisingStrategyConnector {
    protected strategyAdapter: MerchandisingStrategyAdapter;
    constructor(strategyAdapter: MerchandisingStrategyAdapter);
    loadProductsForStrategy(strategyId: string, strategyRequest?: StrategyRequest): Observable<StrategyProducts>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MerchandisingStrategyConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MerchandisingStrategyConnector>;
}

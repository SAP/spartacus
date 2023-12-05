import { Observable } from 'rxjs';
import { StrategyResponse } from '../model';
import { MerchandisingStrategyConnector } from '../connectors';
import { CdsMerchandisingSiteContextService } from './cds-merchandising-site-context.service';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';
import * as i0 from "@angular/core";
export declare class CdsMerchandisingProductService {
    protected strategyConnector: MerchandisingStrategyConnector;
    protected merchandisingUserContextService: CdsMerchandisingUserContextService;
    protected merchandisingSiteContextService: CdsMerchandisingSiteContextService;
    constructor(strategyConnector: MerchandisingStrategyConnector, merchandisingUserContextService: CdsMerchandisingUserContextService, merchandisingSiteContextService: CdsMerchandisingSiteContextService);
    loadProductsForStrategy(strategyId: string, numberToDisplay?: number): Observable<StrategyResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdsMerchandisingProductService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdsMerchandisingProductService>;
}

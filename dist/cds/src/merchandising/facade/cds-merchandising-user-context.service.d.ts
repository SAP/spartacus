import { ProductSearchService, RoutingService } from '@spartacus/core';
import { FacetService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ProfileTagEventService, ProfileTagLifecycleService } from '../../profiletag';
import { MerchandisingUserContext } from '../model';
import * as i0 from "@angular/core";
export declare class CdsMerchandisingUserContextService {
    private routingService;
    private productSearchService;
    private profileTagEventService;
    private profileTagLifecycleService;
    private facetService;
    constructor(routingService: RoutingService, productSearchService: ProductSearchService, profileTagEventService: ProfileTagEventService, profileTagLifecycleService: ProfileTagLifecycleService, facetService: FacetService);
    getUserContext(): Observable<MerchandisingUserContext>;
    private getConsentReferenceContext;
    private getPageContext;
    private getSearchContext;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdsMerchandisingUserContextService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdsMerchandisingUserContextService>;
}

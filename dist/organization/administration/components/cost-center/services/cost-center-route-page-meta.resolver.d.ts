import { CostCenter, DefaultRoutePageMetaResolver, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentCostCenterService } from './current-cost-center.service';
import * as i0 from "@angular/core";
export declare class CostCenterRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    protected currentItemService: CurrentCostCenterService;
    constructor(translation: TranslationService, currentItemService: CurrentCostCenterService);
    protected getParams(): Observable<CostCenter | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CostCenterRoutePageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CostCenterRoutePageMetaResolver>;
}

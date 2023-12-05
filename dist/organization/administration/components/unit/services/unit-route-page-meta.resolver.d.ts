import { B2BUnit, DefaultRoutePageMetaResolver, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUnitService } from './current-unit.service';
import * as i0 from "@angular/core";
export declare class UnitRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    protected currentItemService: CurrentUnitService;
    constructor(translation: TranslationService, currentItemService: CurrentUnitService);
    protected getParams(): Observable<B2BUnit | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitRoutePageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitRoutePageMetaResolver>;
}

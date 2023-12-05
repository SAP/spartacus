import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot, UnifiedInjector } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentsService } from './cms-components.service';
import * as i0 from "@angular/core";
export declare class CmsGuardsService {
    protected cmsComponentsService: CmsComponentsService;
    protected unifiedInjector: UnifiedInjector;
    constructor(cmsComponentsService: CmsComponentsService, unifiedInjector: UnifiedInjector);
    cmsPageCanActivate(componentTypes: string[], route: CmsActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>;
    canActivateGuard(guardClass: any, route: CmsActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsGuardsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsGuardsService>;
}

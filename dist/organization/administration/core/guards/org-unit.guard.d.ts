import { Router, UrlTree } from '@angular/router';
import { GlobalMessageService, SemanticPathService } from '@spartacus/core';
import { OrgUnitService } from '../services';
import * as i0 from "@angular/core";
export declare class OrgUnitGuard {
    protected globalMessageService: GlobalMessageService;
    protected orgUnitService: OrgUnitService;
    protected semanticPathService: SemanticPathService;
    protected router: Router;
    constructor(globalMessageService: GlobalMessageService, orgUnitService: OrgUnitService, semanticPathService: SemanticPathService, router: Router);
    canActivate(): boolean | UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrgUnitGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrgUnitGuard>;
}

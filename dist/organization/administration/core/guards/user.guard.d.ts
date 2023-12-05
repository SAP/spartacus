import { CanActivate, Router, UrlTree } from '@angular/router';
import { GlobalMessageService, SemanticPathService } from '@spartacus/core';
import { B2BUserService } from '../services';
import * as i0 from "@angular/core";
export declare class UserGuard implements CanActivate {
    protected globalMessageService: GlobalMessageService;
    protected b2bUserService: B2BUserService;
    protected semanticPathService: SemanticPathService;
    protected router: Router;
    constructor(globalMessageService: GlobalMessageService, b2bUserService: B2BUserService, semanticPathService: SemanticPathService, router: Router);
    canActivate(): boolean | UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGuard>;
}

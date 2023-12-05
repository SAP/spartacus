import { CanActivate, Router, UrlTree } from '@angular/router';
import { SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderCancellationService } from './order-cancellation.service';
import * as i0 from "@angular/core";
export declare class OrderCancellationGuard implements CanActivate {
    protected orderAmendService: OrderCancellationService;
    protected semanticPathService: SemanticPathService;
    protected router: Router;
    constructor(orderAmendService: OrderCancellationService, semanticPathService: SemanticPathService, router: Router);
    canActivate(): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderCancellationGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderCancellationGuard>;
}

import { CanActivate, Router, UrlTree } from '@angular/router';
import { SemanticPathService } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OrderConfirmationGuard implements CanActivate {
    protected orderFacade: OrderFacade;
    protected router: Router;
    protected semanticPathService: SemanticPathService;
    constructor(orderFacade: OrderFacade, router: Router, semanticPathService: SemanticPathService);
    canActivate(): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderConfirmationGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderConfirmationGuard>;
}

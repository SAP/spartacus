import { CanActivate } from '@angular/router';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class UnitLevelOrdersViewerGuard implements CanActivate {
    protected userAccountFacade: UserAccountFacade;
    protected routingService: RoutingService;
    protected globalMessageService: GlobalMessageService;
    constructor(userAccountFacade: UserAccountFacade, routingService: RoutingService, globalMessageService: GlobalMessageService);
    canActivate(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitLevelOrdersViewerGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitLevelOrdersViewerGuard>;
}

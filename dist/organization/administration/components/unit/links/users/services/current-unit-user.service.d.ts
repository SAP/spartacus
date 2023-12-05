import { B2BUser, RoutingService } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../../../shared/current-item.service';
import * as i0 from "@angular/core";
export declare class CurrentUnitUserService extends CurrentItemService<B2BUser> {
    protected routingService: RoutingService;
    protected b2bUserService: B2BUserService;
    constructor(routingService: RoutingService, b2bUserService: B2BUserService);
    getDetailsRoute(): string;
    protected getParamKey(): string;
    protected getItem(customerId: string): Observable<B2BUser>;
    getError(code: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentUnitUserService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrentUnitUserService>;
}

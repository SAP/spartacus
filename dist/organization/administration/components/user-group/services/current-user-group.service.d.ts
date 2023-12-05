import { RoutingService } from '@spartacus/core';
import { UserGroup, UserGroupService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';
import * as i0 from "@angular/core";
export declare class CurrentUserGroupService extends CurrentItemService<UserGroup> {
    protected routingService: RoutingService;
    protected userGroupService: UserGroupService;
    constructor(routingService: RoutingService, userGroupService: UserGroupService);
    protected getParamKey(): string;
    protected getItem(code: string): Observable<UserGroup>;
    getError(code: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentUserGroupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrentUserGroupService>;
}

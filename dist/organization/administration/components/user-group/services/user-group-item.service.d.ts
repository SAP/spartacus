import { RoutingService } from '@spartacus/core';
import { OrganizationItemStatus, UserGroup, UserGroupService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { UserGroupFormService } from '../form/user-group-form.service';
import { CurrentUserGroupService } from './current-user-group.service';
import * as i0 from "@angular/core";
export declare class UserGroupItemService extends ItemService<UserGroup> {
    protected currentItemService: CurrentUserGroupService;
    protected routingService: RoutingService;
    protected formService: UserGroupFormService;
    protected userGroupService: UserGroupService;
    constructor(currentItemService: CurrentUserGroupService, routingService: RoutingService, formService: UserGroupFormService, userGroupService: UserGroupService);
    load(code: string): Observable<UserGroup>;
    update(code: string, value: UserGroup): Observable<OrganizationItemStatus<UserGroup>>;
    delete(code: string): Observable<OrganizationItemStatus<UserGroup>>;
    protected create(value: UserGroup): Observable<OrganizationItemStatus<UserGroup>>;
    protected getDetailsRoute(): string;
    protected launchList(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGroupItemService>;
}

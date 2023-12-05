import { B2BUser, RoutingService } from '@spartacus/core';
import { B2BUserService, OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { UserFormService } from '../form/user-form.service';
import { CurrentUserService } from './current-user.service';
import * as i0 from "@angular/core";
export declare class UserItemService extends ItemService<B2BUser> {
    protected currentItemService: CurrentUserService;
    protected routingService: RoutingService;
    protected formService: UserFormService;
    protected userService: B2BUserService;
    constructor(currentItemService: CurrentUserService, routingService: RoutingService, formService: UserFormService, userService: B2BUserService);
    load(code: string): Observable<B2BUser>;
    update(code: string, value: B2BUser): Observable<OrganizationItemStatus<B2BUser>>;
    protected create(value: B2BUser): Observable<OrganizationItemStatus<B2BUser>>;
    protected getDetailsRoute(): string;
    launchDetails(item: B2BUser): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserItemService>;
}

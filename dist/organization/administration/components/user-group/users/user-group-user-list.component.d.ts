import { UserGroup } from '@spartacus/organization/administration/core';
import { SubListComponent } from '../../shared/sub-list/sub-list.component';
import { CurrentUserGroupService } from '../services/current-user-group.service';
import { UserGroupUserListService } from './user-group-user-list.service';
import * as i0 from "@angular/core";
export declare class UserGroupUserListComponent {
    protected currentUserGroupService: CurrentUserGroupService;
    protected userGroupUserListService: UserGroupUserListService;
    constructor(currentUserGroupService: CurrentUserGroupService, userGroupUserListService: UserGroupUserListService);
    subList: SubListComponent;
    unassignAll(): void;
    protected notify(item: UserGroup | undefined): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupUserListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UserGroupUserListComponent, "cx-org-user-group-user-list", never, {}, {}, never, never, false, never>;
}

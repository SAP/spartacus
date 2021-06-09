import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  UserGroup,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { UserGroupFormService } from '../form/user-group-form.service';
import { CurrentUserGroupService } from './current-user-group.service';

@Injectable({
  providedIn: 'root',
})
export class UserGroupItemService extends ItemService<UserGroup> {
  constructor(
    protected currentItemService: CurrentUserGroupService,
    protected routingService: RoutingService,
    protected formService: UserGroupFormService,
    protected userGroupService: UserGroupService
  ) {
    super(currentItemService, routingService, formService);
  }

  load(code: string): Observable<UserGroup> {
    this.userGroupService.load(code);
    return this.userGroupService.get(code);
  }

  update(
    code: string,
    value: UserGroup
  ): Observable<OrganizationItemStatus<UserGroup>> {
    this.userGroupService.update(code, value);
    return this.userGroupService.getLoadingStatus(value.uid);
  }

  delete(code: string): Observable<OrganizationItemStatus<UserGroup>> {
    this.launchList();
    this.userGroupService.delete(code);
    return this.userGroupService.getLoadingStatus(code);
  }

  protected create(
    value: UserGroup
  ): Observable<OrganizationItemStatus<UserGroup>> {
    this.userGroupService.create(value);
    return this.userGroupService.getLoadingStatus(value.uid);
  }

  protected getDetailsRoute(): string {
    return 'orgUserGroupDetails';
  }

  protected launchList() {
    this.routingService.go({
      cxRoute: 'orgUserGroup',
    });
  }
}

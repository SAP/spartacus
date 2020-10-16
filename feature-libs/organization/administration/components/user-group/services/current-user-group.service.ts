import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  UserGroup,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../../constants';
import { CurrentOrganizationItemService } from '../../shared/current-organization-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserGroupService extends CurrentOrganizationItemService<
  UserGroup
> {
  constructor(
    protected routingService: RoutingService,
    protected userGroupService: UserGroupService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.userGroupCode;
  }

  protected getItem(code: string): Observable<UserGroup> {
    return this.userGroupService.get(code);
  }
}

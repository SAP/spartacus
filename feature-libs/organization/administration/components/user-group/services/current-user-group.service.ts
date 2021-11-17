import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  UserGroup,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserGroupService extends CurrentItemService<UserGroup> {
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

  getError(code: string): Observable<boolean> {
    return this.userGroupService.getErrorState(code);
  }
}

import { Injectable } from '@angular/core';
import { Budget, RoutingService, UserGroupService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationService } from '../shared/base-current.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserGroupService extends CurrentOrganizationService<
  Budget
> {
  constructor(
    protected routingService: RoutingService,
    protected userGroupService: UserGroupService
  ) {
    super(routingService);
  }

  protected getParam() {
    return ROUTE_PARAMS.userGroupCode;
  }

  protected getModel(code: string): Observable<Budget> {
    return this.userGroupService.get(code);
  }
}

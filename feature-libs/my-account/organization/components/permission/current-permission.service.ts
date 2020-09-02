import { Injectable } from '@angular/core';
import { Permission, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PermissionService } from '@spartacus/my-account/organization/core';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationItemService } from '../shared/current-organization-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentPermissionService extends CurrentOrganizationItemService<
  Permission
> {
  constructor(
    protected routingService: RoutingService,
    protected permissionService: PermissionService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.permissionCode;
  }

  protected getItem(code: string): Observable<Permission> {
    return this.permissionService.get(code);
  }
}

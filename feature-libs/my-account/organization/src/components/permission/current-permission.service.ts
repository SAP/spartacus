import { Injectable } from '@angular/core';
import { Permission, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PermissionService } from '../../core/services/permission.service';
import { ROUTE_PARAMS } from '../constants';
import { CurrentItemService } from '../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentPermissionService extends CurrentItemService<Permission> {
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

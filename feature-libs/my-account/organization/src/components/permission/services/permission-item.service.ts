import { Injectable } from '@angular/core';
import { Permission, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Budget, PermissionService } from '../../../core/index';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { PermissionFormService } from '../form/permission-form.service';
import { CurrentPermissionService } from './current-permission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionItemService extends OrganizationItemService<Permission> {
  constructor(
    protected currentItemService: CurrentPermissionService,
    protected routingService: RoutingService,
    protected formService: PermissionFormService,
    protected permissionService: PermissionService
  ) {
    super(currentItemService, routingService, formService);
  }

  load(code: string): Observable<Budget> {
    this.permissionService.loadPermission(code);
    return this.permissionService.get(code);
  }

  update(code, value: Budget) {
    this.permissionService.update(code, value);
  }

  protected create(value: Budget) {
    this.permissionService.create(value);
  }

  protected getDetailsRoute(): string {
    return 'permissionDetails';
  }
}

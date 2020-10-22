import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { PermissionFormService } from '../form/permission-form.service';
import { CurrentPermissionService } from './current-permission.service';
import { MessageService } from '../../shared/organization-message/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionItemService extends OrganizationItemService<Permission> {
  constructor(
    protected currentItemService: CurrentPermissionService,
    protected routingService: RoutingService,
    protected formService: PermissionFormService,
    protected permissionService: PermissionService,
    protected messageService: MessageService
  ) {
    super(currentItemService, routingService, formService, messageService);
  }

  protected i18nRoot = 'permission';

  load(code: string): Observable<Permission> {
    this.permissionService.loadPermission(code);
    return this.permissionService.get(code);
  }

  update(
    code,
    value: Permission
  ): Observable<OrganizationItemStatus<Permission>> {
    this.permissionService.update(code, value);
    return this.permissionService.getLoadingStatus(code);
  }

  protected create(value: Permission) {
    this.permissionService.create(value);
  }

  protected getDetailsRoute(): string {
    return 'permissionDetails';
  }
}

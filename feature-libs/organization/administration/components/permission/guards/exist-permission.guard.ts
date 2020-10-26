import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import {
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../../constants';
import { ExistOrganizationItemGuard } from '../../shared/exist-organization-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ExistPermissionGuard extends ExistOrganizationItemGuard<
  Permission
> {
  protected code = ROUTE_PARAMS.permissionCode;

  constructor(
    protected permissionService: PermissionService,
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected globalMessageService: GlobalMessageService
  ) {
    super();
  }
  protected getItem(code: string): Observable<Permission> {
    return this.permissionService.get(code);
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('permission'));
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.notExist',
        params: { item: 'Purchase limit' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}

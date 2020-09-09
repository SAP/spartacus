import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { GlobalMessageType, Permission } from '@spartacus/core';
import { ExistPermissionGuard } from './exist-permission.guard';

@Injectable({
  providedIn: 'root',
})
export class ActivePermissionGuard extends ExistPermissionGuard {
  protected isValid(permission: Permission): boolean {
    return permission.active;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    const urlPath = this.semanticPathService.transform({
      cxRoute: 'permissionDetails',
      params: { code: _urlParams.code },
    });

    return this.router.parseUrl(urlPath.join('/'));
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.disabled',
        params: { item: 'Purchase limit' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}

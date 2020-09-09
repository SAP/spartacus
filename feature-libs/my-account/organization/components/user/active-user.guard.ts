import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { B2BUser, GlobalMessageType } from '@spartacus/core';
import { ExistUserGuard } from './exist-user.guard';

@Injectable({
  providedIn: 'root',
})
export class ActiveUserGuard extends ExistUserGuard {
  protected isValid(user: B2BUser): boolean {
    return user.active;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    const urlPath = this.semanticPathService.transform({
      cxRoute: 'userDetails',
      params: { code: _urlParams.code },
    });

    return this.router.parseUrl(urlPath.join('/'));
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.disabled',
        params: { item: 'User' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}

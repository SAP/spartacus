import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {
  B2BUser,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import {
  B2BUserService,
  Budget,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { ExistOrganizationItemGuard } from '../shared/exist-organization-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ExistUserGuard extends ExistOrganizationItemGuard<B2BUser> {
  constructor(
    protected userService: B2BUserService,
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected globalMessageService: GlobalMessageService
  ) {
    super();
  }

  protected getItem(code: string): Observable<Budget> {
    return this.userService.get(code);
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('user'));
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.notExist',
        params: { item: 'User' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}

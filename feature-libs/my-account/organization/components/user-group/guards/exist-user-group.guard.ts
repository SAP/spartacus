import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import {
  UserGroup,
  UserGroupService,
} from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { ExistOrganizationItemGuard } from '../../shared/exist-organization-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ExistUserGroupGuard extends ExistOrganizationItemGuard<UserGroup> {
  constructor(
    protected userGroupService: UserGroupService,
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected globalMessageService: GlobalMessageService
  ) {
    super();
  }

  protected getItem(code: string): Observable<UserGroup> {
    return this.userGroupService.get(code);
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('userGroup'));
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.notExist',
        params: { item: 'User Group' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}

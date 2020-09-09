import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {
  B2BUnit,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { ExistOrganizationItemGuard } from '../shared/exist-organization-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ExistUnitGuard extends ExistOrganizationItemGuard<B2BUnit> {
  constructor(
    protected unitService: OrgUnitService,
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected globalMessageService: GlobalMessageService
  ) {
    super();
  }

  protected getItem(code: string): Observable<B2BUnit> {
    return this.unitService.get(code);
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('orgUnits'));
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.notExist',
        params: { item: 'Unit' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}

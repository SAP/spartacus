import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {
  CostCenter,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { CostCenterService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { ExistOrganizationItemGuard } from '../shared/exist-organization-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ExistCostCenterGuard extends ExistOrganizationItemGuard<
  CostCenter
> {
  constructor(
    protected costCenterService: CostCenterService,
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected globalMessageService: GlobalMessageService
  ) {
    super();
  }

  protected getItem(code: string): Observable<CostCenter> {
    return this.costCenterService.get(code);
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('costCenter'));
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.notExist',
        params: { item: 'Cost Center' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}

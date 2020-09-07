import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {
  SemanticPathService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Budget, BudgetService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { ExistOrganizationItemGuard } from '../shared/exist-organization-item.guard';
import { ROUTE_PARAMS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ExistBudgetGuard extends ExistOrganizationItemGuard<Budget> {
  protected code = ROUTE_PARAMS.budgetCode;

  constructor(
    protected budgetService: BudgetService,
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected globalMessageService: GlobalMessageService
  ) {
    super();
  }

  protected getItem(code: string): Observable<Budget> {
    return this.budgetService.get(code);
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('budget'));
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.notExist',
        params: { item: 'Budget' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}

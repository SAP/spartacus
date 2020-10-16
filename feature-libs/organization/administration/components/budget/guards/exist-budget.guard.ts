import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import {
  Budget,
  BudgetService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../../constants';
import { ExistOrganizationItemGuard } from '../../shared/exist-organization-item.guard';

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

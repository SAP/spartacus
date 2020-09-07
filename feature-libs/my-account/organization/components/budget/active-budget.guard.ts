import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Budget } from '@spartacus/my-account/organization/core';
import { ExistBudgetGuard } from './exist-budget.guard';

@Injectable({
  providedIn: 'root',
})
export class ActiveBudgetGuard extends ExistBudgetGuard {
  protected message = {
    key: 'organization.warning.inactivatedItem',
    params: { item: 'Budget' },
  };

  protected isValid(budget: Budget): boolean {
    return budget.active;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    const urlPath = this.semanticPathService.transform({
      cxRoute: 'budgetDetails',
      params: { code: _urlParams.code },
    });

    return this.router.parseUrl(urlPath.join('/'));
  }
}

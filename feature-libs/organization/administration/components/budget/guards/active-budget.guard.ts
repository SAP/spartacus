import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { GlobalMessageType } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { ExistBudgetGuard } from './exist-budget.guard';

@Injectable({
  providedIn: 'root',
})
export class ActiveBudgetGuard extends ExistBudgetGuard {
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

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.disabled',
        params: { item: 'Budget' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}

import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Budget } from '@spartacus/core';
import { ExistBudgetGuard } from './exist-budget.guard';

@Injectable({
  providedIn: 'root',
})
export class ActiveBudgetGuard extends ExistBudgetGuard {
  protected isValid(budget: Budget): boolean {
    return budget.active;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(
      this.semanticPathService
        .transform({
          cxRoute: 'budgetDetails',
          params: { code: _urlParams.code },
        })
        .join('/')
    );
  }
}

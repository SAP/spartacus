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
  protected getRedirectUrl(_code?: string): UrlTree {
    return this.router.parseUrl(`organization/budgets/${_code}`);
  }
}

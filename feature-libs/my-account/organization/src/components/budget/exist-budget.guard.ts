import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Budget, BudgetService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExistBudgetGuard implements CanActivate {
  constructor(
    protected budgetService: BudgetService,
    protected router: Router
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const code = activatedRoute.params['code'];
    return this.budgetService.get(code).pipe(
      map((budget) => {
        if (budget && this.isValid(budget)) {
          return true;
        }

        return this.getRedirectUrl(code);
      })
    );
  }

  protected isValid(budget: Budget): boolean {
    return Object.keys(budget).length !== 0;
  }

  protected getRedirectUrl(_code?: string): UrlTree {
    return this.router.parseUrl(`/organization/budgets`);
  }
}

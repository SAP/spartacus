import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Budget, BudgetService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExistBudgetGuard implements CanActivate {
  constructor(
    protected budgetService: BudgetService,
    protected router: Router,
    protected semanticPathService: SemanticPathService
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const urlParams = {
      code: '',
    };

    urlParams.code = activatedRoute.params['code'];

    return this.budgetService.get(urlParams.code).pipe(
      map((budget) => {
        if (budget && this.isValid(budget)) {
          return true;
        }

        return this.getRedirectUrl(urlParams);
      })
    );
  }

  protected isValid(budget: Budget): boolean {
    return Object.keys(budget).length !== 0;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('budget'));
  }
}

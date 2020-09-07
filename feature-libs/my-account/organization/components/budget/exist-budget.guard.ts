import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { Budget, BudgetService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTE_PARAMS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ExistBudgetGuard implements CanActivate {
  constructor(
    protected budgetService: BudgetService,
    protected router: Router,
    protected semanticPathService: SemanticPathService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const urlParams = {
      code: activatedRoute.params[ROUTE_PARAMS.budgetCode],
    };

    return this.budgetService.get(urlParams.code).pipe(
      map((budget) => {
        if (budget && this.isValid(budget)) {
          return true;
        }
        this.showErrorMessage();

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

  protected showErrorMessage() {
    this.globalMessageService.add(
      { key: 'organization.error.notExist' },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}

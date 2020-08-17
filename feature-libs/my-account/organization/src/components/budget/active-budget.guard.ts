import { Injectable } from '@angular/core';
import { BudgetService, RoutingService, Budget } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActiveBudgetGuard implements CanActivate {
  constructor(
    protected budgetService: BudgetService,
    protected routingService: RoutingService
  ) {}

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
    const code = activatedRoute.params['code'];
    return this.budgetService.get(code).pipe(
      map((budget) => {
        if (budget && this.isActive(budget)) {
          return true;
        }

        this.routingService.go({ cxRoute: 'budget' });
        return false;
      })
    );
  }

  protected isActive(budget: Budget): boolean {
    return budget.active;
  }
}

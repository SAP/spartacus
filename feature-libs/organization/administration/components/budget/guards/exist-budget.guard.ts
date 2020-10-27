import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { BudgetService } from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ExistOrganizationItemGuard } from '../../shared/exist-organization-item.guard';
import { CurrentBudgetService } from '../services/current-budget.service';

@Injectable({
  providedIn: 'root',
})
export class ExistBudgetGuard extends ExistOrganizationItemGuard {
  constructor(
    protected budgetService: BudgetService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected currentBudgetService: CurrentBudgetService
  ) {
    super(routingService, globalMessageService);
  }
  canActivate() {
    return this.currentBudgetService.key$.pipe(
      switchMap((code) => this.budgetService.getErrorState(code)),
      map((error) => {
        if (error) {
          this.redirect('budget');
          this.showErrorMessage('Budget');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}

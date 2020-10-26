import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CurrentBudgetService } from '../services/current-budget.service';
import { ROUTE_PARAMS } from '../../constants';
import { ActiveOrganizationItemGuard } from '../../shared/active-organization-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ActiveBudgetGuard extends ActiveOrganizationItemGuard {
  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected currentBudgetService: CurrentBudgetService
  ) {
    super(routingService, globalMessageService);
  }

  readonly budgetCode = ROUTE_PARAMS.budgetCode;

  canActivate() {
    return this.currentBudgetService.item$.pipe(
      map((item) => {
        if (!this.isValid(item)) {
          this.redirect(item.code, 'budgetDetails', this.budgetCode);
          this.showErrorMessage('Budget');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}

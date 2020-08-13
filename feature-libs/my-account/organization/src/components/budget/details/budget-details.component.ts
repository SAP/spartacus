import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Budget, BudgetService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { map, switchMap, tap } from 'rxjs/operators';
import { ParamRoutingService } from '../../budget.router.service';
import { BudgetListService } from '../list/budget-list.service';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent {
  // budget$: Observable<Budget> = this.budgetRouterService.key$.pipe(
  //   // TODO: we should do this in the facade
  //   tap((code) => this.budgetService.loadBudget(code)),
  //   switchMap((code) => this.budgetService.get(code)),
  //   shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
  // );

  budget$ = this.budgetRouterService.params$.pipe(
    map((params) => params['budgetKey']),
    tap((code) => this.budgetService.loadBudget(code)),
    switchMap((code) => this.budgetService.get(code))
  );

  constructor(
    protected route: ActivatedRoute,
    protected budgetService: BudgetService,
    // TODO: consider relying on css only
    protected modalService: ModalService,
    protected budgetListService: BudgetListService,

    protected budgetRouterService: ParamRoutingService
  ) {
    console.log('construct detail component');
  }

  update(budget: Budget) {
    this.budgetService.update(budget.code, budget);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}

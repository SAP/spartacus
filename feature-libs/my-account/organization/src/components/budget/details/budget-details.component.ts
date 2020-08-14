import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap, shareReplay } from 'rxjs/operators';
import { BudgetService } from '../../../core/services/budget.service';
import { Budget } from '../../../core/model/budget.model';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent {
  protected code$: Observable<string> = this.route.params.pipe(
    map((params) => params['code']),
    filter((code) => Boolean(code))
  );

  budget$: Observable<Budget> = this.code$.pipe(
    // TODO: we should do this in the facade
    tap((code) => this.budgetService.loadBudget(code)),
    switchMap((code) => this.budgetService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
  );

  constructor(
    protected route: ActivatedRoute,
    protected budgetService: BudgetService,
    // TODO: consider relying on css only
    protected modalService: ModalService
  ) {}

  update(budget: Budget) {
    this.budgetService.update(budget.code, budget);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
